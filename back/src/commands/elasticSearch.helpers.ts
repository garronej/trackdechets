import fs from "fs";
import https from "https";
import path from "path";
import { Writable } from "stream";
import StreamZip from "node-stream-zip";
import logger from "../logging/logger";
import { client } from "../common/elastic";
import {
  ElasticBulkIndexError,
  ElasticBulkNonFlatPayload,
  ElasticBulkPayloadDocument,
  ElasticBulkPrepayload,
  IndexProcessConfig
} from "./types";
import { ApiResponse } from "@elastic/elasticsearch";

// Max size of documents to index at once, also depends on ES JVM memory available
const CHUNK_SIZE = 10_000;

// ES Mapping docs: https://www.elastic.co/guide/en/elasticsearch/reference/6.8/mapping.html
export const standardMapping = {
  _doc: {
    dynamic_templates: [
      {
        dateType: {
          match_pattern: "regex",
          match: "^date.*$",
          mapping: {
            type: "date",
            // docs : https://www.elastic.co/guide/en/elasticsearch/reference/6.8/ignore-malformed.html
            ignore_malformed: true
          }
        }
      }
    ]
  }
};

export const sireneIndexConfig: IndexProcessConfig = {
  alias: `stockunitelegale_utf8-${process.env.NODE_ENV}`,
  // to match the filename inside zip
  csvFileName: "StockUniteLegale_utf8.csv",
  // zip target filename
  zipFileName: "StockUniteLegale_utf8.zip",
  idKey: "siren",
  mappings: standardMapping
};

const INDEX_ALIAS_NAME_SEPARATOR = "-";
export const getIndexVersionName = (indexConfig: IndexProcessConfig) =>
  `${indexConfig.alias}${INDEX_ALIAS_NAME_SEPARATOR}${Date.now()}`;

/**
 * Create a new index with timestamp appended to the alias name
 * overrides the index alias with a timestamp in order to handle roll-over indices
 */
export const createIndexRelease = async (
  indexConfig: IndexProcessConfig
): Promise<string> => {
  const indexName = getIndexVersionName(indexConfig);
  const { mappings, settings } = indexConfig;
  await client.indices.create({
    index: indexName,
    body: {
      ...(mappings && { mappings }),
      ...(settings && { settings })
    }
  });
  logger.info(`Created a new index ${indexName}`);
  return indexName;
};

/**
 * Clean older indexes and attach the newest one to the alias
 */
export const cleanOldIndexes = async (
  indexAlias: string,
  indexName: string
) => {
  const aliases = await client.cat.aliases({
    name: indexAlias,
    format: "json"
  });
  const bindedIndexes = aliases.body.map(info => info.index);
  logger.info(
    `Pointing the index alias ${indexAlias} to the index ${indexName}`
  );
  await client.indices.putAlias({
    index: indexName,
    name: indexAlias
  });
  logger.info(
    `Removing alias pointers to older indices ${bindedIndexes.join(", ")}.`
  );
  // Delete old alias pointers
  await client.indices.deleteAlias({
    index: bindedIndexes,
    name: indexAlias
  });
  // Delete old indices completely
  const indices = await client.cat.indices({
    index: `${indexAlias}${INDEX_ALIAS_NAME_SEPARATOR}*`,
    format: "json"
  });
  const oldIndexes = indices.body
    .map(info => info.index)
    // Filter out the last indexName
    // TODO later : keep alse the previous index in order to roll-back
    .filter(name => name !== indexName);
  logger.info(
    `Removing ${oldIndexes.length} old index(es) (${oldIndexes.join(", ")})`
  );
  await client.indices.delete({ index: oldIndexes.join(",") });
};

/**
 * Bulk Index and collect errors
 * controls the maximum chunk size because unzip does not
 */
export const bulkIndex = async (
  body: ElasticBulkNonFlatPayload,
  indexConfig: IndexProcessConfig
) => {
  // Promise returning function chunks
  const request = async bodyChunk => {
    const requestBulkIndex = body => {
      if (!body || !body.length) {
        // nothing to index
        return Promise.resolve(null);
      }
      return client.bulk({
        body,
        // lighten the response
        _source_excludes: ["items.index._*", "took"]
      });
    };
    logger.info(`Bulk index ${bodyChunk.length} documents`);
    // append new data to the body before indexation
    if (typeof indexConfig.dataFormatterFn === "function") {
      const formattedChunk = await indexConfig.dataFormatterFn(bodyChunk, {
        sireneIndexConfig
      });
      return requestBulkIndex(formattedChunk.flat());
    }
    return requestBulkIndex(bodyChunk.flat());
  };

  const logBulkIndexErrors = (
    bulkResponse: ApiResponse,
    slice: [ElasticBulkPrepayload, ElasticBulkPayloadDocument][]
  ) => {
    if (bulkResponse?.body?.errors) {
      bulkResponse.body.items.forEach((action, k: number) => {
        const [operation] = Object.keys(action);
        if (action[operation].error) {
          const elasticBulkIndexError: ElasticBulkIndexError = {
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should fix the document content
            status: action[operation].status,
            error: action[operation].error,
            bulkBody: slice[k]
          };
          logger.error(`Error in bulkIndex operation`, {
            elasticBulkIndexError
          });
        }
      });
    }
  };

  // immediat return the chunk larger than the data streamed
  if (CHUNK_SIZE > body.length) {
    const bulkResponse = await request(body);
    // Collect error data
    logBulkIndexErrors(bulkResponse, body);
    return;
  }

  // loop over other chunks
  for (let i = 0; i < body.length; i += CHUNK_SIZE) {
    const end = i + CHUNK_SIZE;
    const slice = body.slice(i, end);
    const bulkResponse = await request(slice);
    // Collect error data
    logBulkIndexErrors(bulkResponse, slice);
  }
};

/**
 * Writable stream that parses CSV to an ES bulk body
 */
export const getWritableParserAndIndexer = (
  indexConfig: IndexProcessConfig,
  headers: string[],
  indexName: string
) =>
  new Writable({
    // seems a reasonanle data size to go with CHUNK_SIZE = 10000
    highWaterMark: 8_192_000,
    writev: (chunks, next) => {
      const bufferChunk = chunks.map(({ chunk }) => chunk);
      const csvLines: string[] = bufferChunk.toString().split("\n");
      // get columns names in the csv header
      // pre-suppose that the first column === indexConfig.idKey (eg. "siren" or "siret")
      if (csvLines[0].startsWith(indexConfig.idKey) && !headers) {
        headers = csvLines[0].split(",");
        csvLines.shift();
      }

      const body: ElasticBulkNonFlatPayload = csvLines
        .filter(line => {
          // exclude invalid like ones not starting with a SIREN numbers string
          const values = line.split(",");
          return (
            values && values.length && values[0] && /^\d+$/.test(values[0])
          );
        })
        .map(line => {
          const values = line.split(",");
          const doc = {};
          // build the document to index
          for (let i = 0; i < headers.length; i++) {
            doc[headers[i]] = values[i];
          }
          return [
            {
              index: {
                _id: doc[indexConfig.idKey],
                _index: indexName,
                // Next major ES version won't need _type anymore
                _type: "_doc"
              }
            },
            doc
          ];
        });

      bulkIndex(body, indexConfig)
        .then(() => next())
        .catch(err => next(err));
    }
  });

/**
 * Streaming unzip, formatting documents and index them
 */
export const unzipAndIndex = async (
  zipPath: string,
  indexConfig: IndexProcessConfig
) => {
  const indexName = await createIndexRelease(indexConfig);
  const zip = new StreamZip.async({ file: zipPath });
  const stm = await zip.stream(indexConfig.csvFileName);
  let headers: string[];
  const writable = getWritableParserAndIndexer(indexConfig, headers, indexName);
  stm.pipe(writable);
  stm.on("end", async () => {
    zip.close();
    // roll-over index alias
    await cleanOldIndexes(indexConfig.alias, indexName);
    logger.info(
      `Finished indexing ${indexName} with alias ${indexConfig.alias}`
    );
  });
  stm.on("error", err => {
    throw err;
  });
};

/**
 * Download and launch indexation
 */

export const downloadAndIndex = async (
  url: string,
  indexConfig: IndexProcessConfig
) => {
  // path ../../csv* is in .gitignore or override with INSEE_DOWNLOAD_DIRECTORY
  const destination = fs.mkdtempSync(
    process.env.INSEE_DOWNLOAD_DIRECTORY ||
      path.join(__dirname, "..", "..", "csv")
  );

  const zipPath = path.join(destination, indexConfig.zipFileName);
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        const contentLength = parseInt(res.headers["content-length"], 10);
        logger.info(
          `Start downloading the INSEE archive of ${
            contentLength / 1000000
          } MB from ${url} to ${zipPath}`
        );
        const interval = setInterval(
          () =>
            logger.info(
              `Downloading the INSEE archive : ${currentLength / 1000000} MB`
            ),
          5000
        );
        // Bytes progess var
        let currentLength = 0;
        const file = fs.createWriteStream(zipPath);
        // monitor progress
        res.on("data", chunk => {
          currentLength += Buffer.byteLength(chunk);
        });
        // stream into the file
        res.pipe(file);
        // Close the file
        file.on("finish", () => {
          clearInterval(interval);
          file.close();
          logger.info(`Finished downloading the INSEE archive to ${zipPath}`);
        });
        res.on("end", () => {
          try {
            resolve(unzipAndIndex(zipPath, indexConfig));
          } catch (e) {
            reject(e.message);
          }
        });
      })
      .on("error", err => {
        logger.info("HTTP download Error: ", err.message);
        reject(err.message);
      });
  });
};
