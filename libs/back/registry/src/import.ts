import { format } from "@fast-csv/format";
import { logger } from "@td/logger";
import { Readable, Writable } from "node:stream";
import { SafeParseReturnType, z } from "zod";

import { endImport, startImport } from "./database";
import {
  CSV_DELIMITER,
  importOptions,
  ImportType,
  ParsedLine,
  UNAUTHORIZED_ERROR
} from "./options";
import { getTransformCsvStream, getTransformXlsxStream } from "./transformers";

export async function processStream({
  importId,
  importType,
  inputStream,
  outputErrorStream,
  fileType,
  createdById,
  allowedSirets,
  delegations
}: {
  importId: string;
  importType: ImportType;
  inputStream: Readable;
  outputErrorStream: Writable;
  fileType: "CSV" | "XLSX";
  createdById: string;
  allowedSirets: string[];
  delegations: Record<string, string>;
}) {
  logger.info(
    `Processing import ${importId}. File type ${fileType}, import ${importType}`,
    { importId, importType, inputStream, fileType }
  );
  const options = importOptions[importType];
  const stats = { errors: 0, insertions: 0, edits: 0, cancellations: 0 };

  const errorStream = format({
    delimiter: CSV_DELIMITER,
    headers: ["Erreur", ...Object.values(options.headers)],
    writeHeaders: true
  });
  errorStream.pipe(outputErrorStream);

  const transformStream =
    fileType === "CSV"
      ? getTransformCsvStream(options)
      : getTransformXlsxStream(options);

  try {
    await startImport(importId);

    const dataStream: AsyncIterable<{
      rawLine: Record<string, string>;
      result: SafeParseReturnType<unknown, ParsedLine>;
    }> = inputStream.pipe(transformStream).on("error", error => {
      stats.errors++;
      if (errorStream.writable) {
        errorStream.write([["errors", error.message]]);
      }
    });

    for await (const { rawLine, result } of dataStream) {
      if (!result.success) {
        stats.errors++;

        const errors = result.error.issues
          .map(issue => {
            const columnName = options.headers[issue.path[0]] ?? issue.path[0];
            return `${columnName} : ${issue.message}`;
          })
          .join("\n");

        // As we are renaming headers we need to provide an hash array
        errorStream.write([["errors", errors], ...Object.entries(rawLine)]);
        continue;
      }

      // Check rights
      if (
        !allowedSirets.includes(result.data.reportForSiret) &&
        delegations[result.data.reportForSiret] !== result.data.reportAsSiret
      ) {
        stats.errors++;

        errorStream.write([
          ["errors", UNAUTHORIZED_ERROR],
          ...Object.entries(rawLine)
        ]);
        continue;
      }

      if (result.data.reason === "MODIFIER") {
        stats.edits++;
      } else if (result.data.reason === "ANNULER") {
        stats.cancellations++;
      } else if (result.data.reason === "IGNORER") {
        continue;
      } else {
        stats.insertions++;
      }

      const line = { ...result.data, createdById };

      await options.saveLine({ line, importId });
    }
  } catch (err) {
    logger.error(`Error processing import ${importId}`, { importId, err });
  } finally {
    errorStream.end();

    const sirets = await options.getImportSiretsAssociations(importId);
    await endImport({ importId, stats, sirets });
  }

  return stats;
}
