import { Bsda } from "@prisma/client";
import * as QRCode from "qrcode";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { generatePdf } from "../../common/pdf";
import { expandBsdaFromDb } from "../converter";
import { getBsdaHistory } from "../database";
import { BsdaPdf } from "./components/BsdaPdf";
import concatStream from "concat-stream";
import { emptyValues } from "../../common/pdf/utils";

export async function buildPdf(bsda: Bsda) {
  const qrCode = await QRCode.toString(bsda.id, { type: "svg" });
  const expandedBsda = expandBsdaFromDb(bsda);

  const previousDbBsdas = await getBsdaHistory(bsda);
  const previousBsdas = previousDbBsdas.map(bsda => expandBsdaFromDb(bsda));

  const html = ReactDOMServer.renderToStaticMarkup(
    <BsdaPdf
      bsda={emptyValues(expandedBsda)}
      qrCode={qrCode}
      previousBsdas={emptyValues(previousBsdas)}
    />
  );
  return generatePdf(html);
}

export async function buildPdfAsBase64(bsda: Bsda): Promise<string> {
  const readableStream = await buildPdf(bsda);

  return new Promise((resolve, reject) => {
    const convertToBase64 = concatStream(buffer =>
      resolve(buffer.toString("base64"))
    );

    readableStream.on("error", reject);
    readableStream.pipe(convertToBase64);
  });
}
