"use strict";
// import type { PrestamoInfo } from "../../data/types"
// import { createGrupalDocDefinition, createIndividualdDocDefinition } from "./documents";
// import PdfPrinter from "pdfmake";
// import fs from "fs"
Object.defineProperty(exports, "__esModule", { value: true });
// let fonts = {
//     Roboto: {
//         normal: 'src/middleware/pdf/fonts/Roboto-Regular.ttf',
//         bold: 'src/middleware/pdf/fonts/Roboto-Medium.ttf',
//         italics: 'src/middleware/pdf/fonts/Roboto-Italic.ttf',
//         bolditalics: 'src/middleware/pdf/fonts/Roboto-MediumItalic.ttf'
//     }
// };
// const printer = new PdfPrinter(fonts);
// export function singleReport(prestamo: PrestamoInfo) {
//     const individualDocDefinition = createIndividualdDocDefinition(prestamo)
//     const pdfDoc = printer.createPdfKitDocument(individualDocDefinition);
//     pdfDoc.pipe(fs.createWriteStream('individualReport.pdf'));
//     pdfDoc.end();
// }
// export function multipleReport(prestamos: PrestamoInfo[], from: string, to: string) {
//     const grupalDocDefinition = createGrupalDocDefinition(prestamos, from, to)
//     const pdfDoc = printer.createPdfKitDocument(grupalDocDefinition);
//     pdfDoc.pipe(fs.createWriteStream('grupalReport.pdf'));
//     pdfDoc.end();
// }
