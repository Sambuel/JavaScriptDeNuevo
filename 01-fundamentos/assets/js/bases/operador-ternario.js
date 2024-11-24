/**
 * Días de semana abrimos a las 11, 
 * pero los fines de semana abrimos a las 9
 */

// Entra a un sitio web, para consultar si está abierto hoy....
// const dia = 0; // 0: Domingo, 1: Lunes....
// const horaActual = 10;

// let horaApertura;
// let mensaje; // Esta Abierto, esta cerrado, hoy abrimos a las XX 

// if (dia === 0 || dia === 6 ) { // or // o 
//     console.log("Fin de semana");
//     horaApertura = 9; 
// }else{
//     console.log("Dia de la semana");
//     horaApertura = 11;

// };

// if (horaActual >= horaApertura) {
//     mensaje = "Esta Abierto";

// }else{
//     mensaje = `Esta cerrado, hoy abrimos a las ${horaApertura}`
// }

// console.log({horaApertura,mensaje});


const dia = 0; // 0: Domingo, 1: Lunes....
const horaActual = 10;

let horaApertura;
let mensaje; // Esta Abierto, esta cerrado, hoy abrimos a las XX 

// if (dia === 0 || dia === 6 ) { // or // o 
//     if ([0,6].includes(dia)) {
//     console.log("Fin de semana");
//     horaApertura = 9; 
// }else{
//     console.log("Dia de la semana");
//     horaApertura = 11;

// };

horaApertura = ([0,6].includes(dia)) ? 9 : 11;

// if (horaActual >= horaApertura) {
//     mensaje = "Esta Abierto";

// }else{
//     mensaje = `Esta cerrado, hoy abrimos a las ${horaApertura}`
// }

mensaje = (horaActual >= horaApertura) ?  "Esta Abierto" : `Esta cerrado, hoy abrimos a las ${horaApertura}`

console.log({horaApertura,mensaje}); 