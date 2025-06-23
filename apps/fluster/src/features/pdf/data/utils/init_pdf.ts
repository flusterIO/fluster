"use client";
import type { Options } from "react-pdf/dist/esm/shared/types.js";

// export const options = {
//   standardFontDataUrl: "/standard_fonts/",
// };
//
export const pdfOptions: Options = {
  cMapUrl: "/cmaps/",
};

// pdfjs.GlobalWorkerOptions.workerSrc = '/utils/pdfWorker.js'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
