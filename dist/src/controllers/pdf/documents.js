"use strict";
// import { Content, ContentStack, StyleDictionary, Table, TableCell, TDocumentDefinitions } from "pdfmake/interfaces";
// import { PrestamoInfo } from "../../data/types";
Object.defineProperty(exports, "__esModule", { value: true });
// const styles: StyleDictionary = {
//     text_header: {
//         fontSize: 18,
//         bold: true,
//         margin: [0, 0, 0, 10] // margin: [izquierda, arriba, derecha, abajo]
//     },
//     text_subheader: {
//         fontSize: 16,
//         bold: true,
//         margin: [0, 10, 0, 5]
//     },
// }
// // Individual Document Definition 
// export function createIndividualdDocDefinition(prestamo: PrestamoInfo) {
//     const individualDocDefinition: TDocumentDefinitions = {
//         info: {
//             title: `Autorización de Prestamo - ${prestamo.nombre} ${prestamo.apellido} - ${prestamo.fecha}`,
//             author: 'Caja de Ahorro de los Empleados, Jubilados y Pensionados Administrativos de la Gobernación del Estado Bolivar.',
//         },
//         content: [
//             {
//                 columns: [
//                     {
//                         image: `src/middleware/pdf/images/logoGobernacion.png`,
//                         width: 120, height: 60,
//                         margin: [0, 0, 0, 0], alignment: "left",
//                     },
//                     {
//                         text: `CAJA DE AHORRO DE LOS EMPLEADOS, JUBILADOS Y PENSIONADOS 
//                                 ADMINISTRATIVOS DE LA GOBERNACIÓN DEL ESTADO BOLIVAR 
//                                 (CAEJPA-GEB) Registro Nº 766 del Sector Público. Rif. Nº J-31336163-1`,
//                         width: "auto",
//                         bold: true,
//                         fontSize: 10,
//                         color: "#0032C4",
//                         alignment: "center"
//                     }
//                 ]
//             },
//             { text: `Ciudad Bolívar, ${prestamo.fecha}`, alignment: "right", margin: [0, 20, 0, 0] },
//             { text: 'AUTORIZACIÓN', style: 'text_header', alignment: "center", margin: [0, 10, 0, 0] },
//             {
//                 text: [
//                     'Yo, ',
//                     { text: `${prestamo.nombre} ${prestamo.apellido}, `, bold: true },
//                     'titular de la Cédula de Identidad ',
//                     { text: ` Nº ${prestamo.cedula}, `, bold: true },
//                     `autorizo a la Caja de ahorro de los Empleados, Jubilados y Pensionados Administrativos de la Gobernación del Estado Bolívar (CAEJPA-GEB), a descontar por nómina el préstamo ESPECIAL solicitado`
//                 ],
//                 margin: [0, 20]
//             },
//             {
//                 table: {
//                     widths: [200, 200],
//                     heights: 20,
//                     body: [
//                         ['Monto Solicitado', `${prestamo.cantidad}Bs`],
//                         ['Gastos Administrativos', `${prestamo.gastosAdministrativos}Bs`],
//                         ['Servicio de Transferencia Efectiva', `${prestamo.servicioDeTransferencia}Bs`],
//                         ['Porcentaje de Intereses', `${prestamo.porcentajeDeIntereses}%`],
//                         ['Total en intereses', `${prestamo.montoDeIntereses}Bs`],
//                         ['Tiempo de Pago', `${prestamo.tiempoDePago} Meses`],
//                         ['Fiadores', ``],
//                         ['Total Prestamo', `${prestamo.total}Bs`],
//                         ['Cuota Mensual', `${prestamo.cuotaMensual}Bs`],
//                         ['Cuota Quincenal', `${prestamo.cuotaQuincenal}Bs`],
//                     ],
//                 },
//                 margin: [45, 40, 0, 0],
//             },
//             {
//                 margin: [0, 100, 0, 0],
//                 columns: [
//                     {
//                         width: "*",
//                         alignment: "center",
//                         canvas: [
//                             {
//                                 type: 'line',
//                                 x1: 0, // Starting x-coordinate
//                                 y1: 50, // Starting y-coordinate
//                                 x2: 150, // Ending x-coordinate (595 is the width of A4 paper)
//                                 y2: 50, // Ending y-coordinate
//                                 lineWidth: 1, // Line width
//                                 lineColor: 'black' // Line color
//                             },
//                         ],
//                     },
//                     {
//                         width: "*",
//                         alignment: "center",
//                         canvas: [
//                             {
//                                 type: 'line',
//                                 x1: 0, // Starting x-coordinate
//                                 y1: 50, // Starting y-coordinate
//                                 x2: 150, // Ending x-coordinate (595 is the width of A4 paper)
//                                 y2: 50, // Ending y-coordinate
//                                 lineWidth: 1, // Line width
//                                 lineColor: 'black' // Line color
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 margin: [0, 5, 0, 0],
//                 columns: [
//                     {
//                         width: "*",
//                         text: "Firma Afiliado",
//                         alignment: "center"
//                     },
//                     {
//                         width: "*",
//                         text: "Firma",
//                         alignment: "center"
//                     }
//                 ]
//             },
//             {
//                 text: [
//                     `Dirección: Calle Bolívar, casco histórico, al lado de comercial Dia a Día, de la Plaza Farreras. Teléf.: 0285 – 4443763 – 0285 6329012. 
//                     Correo electrónico: `,
//                     { text: `caejpa_geb@hotmail.com, `, bold: true },
//                     `Ciudad Bolívar, Edo. Bolívar`
//                 ],
//                 fontSize: 9,
//                 color: "#7C808A",
//                 margin: [0, 60]
//             }
//         ],
//         styles: styles
//     };
//     return individualDocDefinition
// }
// // Grupal Document Definition
// export function createGrupalDocDefinition(prestamos: PrestamoInfo[], from: string, to: string) {
//     function generateTableBody(prestamosArr: PrestamoInfo[]) {
//         var body: string[][] = [];
//         var titulos = ["Expediente", "Fecha", "Nombre y Apellido", "Cedula", "100%", "Gastos Administrativos",
//             "Servicio de Transferencia Efectiva", "% de Intereses", "Monto de Intereses", "Monto del Pago",
//             "Tiempo de Pago", "Cuota Mensual", "Cuota Quincenal", "Concepto"]; // Static headers
//         body.push(titulos); // Push headers to the body
//         for (let key in prestamosArr) {
//             if (prestamosArr.hasOwnProperty(key)) {
//                 let prestamo = prestamosArr[key];
//                 let fila = [prestamo.expediente, `${prestamo.fecha}`, `${prestamo.nombre} ${prestamo.apellido}`,
//                 `V-${prestamo.cedula}`, `${prestamo.cantidad}Bs`, `${prestamo.gastosAdministrativos}Bs`, `${prestamo.servicioDeTransferencia}Bs`,
//                 `${prestamo.porcentajeDeIntereses}Bs`, `${prestamo.montoDeIntereses}Bs`, `${prestamo.total}Bs`,
//                 `${prestamo.tiempoDePago} Meses`, `${prestamo.cuotaMensual} Bs`, `${prestamo.cuotaQuincenal} Bs`, prestamo.concepto];
//                 body.push(fila); // Push each row to the body
//             }
//         }
//         return body
//     }
//     const grupalDocDefinition: TDocumentDefinitions = {
//         pageSize: "A2",
//         content: [
//             {text: `Prestamos registrados desde el ${from} hasta el ${to}`},
//             {
//                 alignment: "center",
//                 table: {
//                     headerRows: 1,
//                     body: generateTableBody(prestamos)
//                 }
//             }
//         ],
//         styles: styles
//     };
//     return grupalDocDefinition
// }
