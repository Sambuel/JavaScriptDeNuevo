// const elMayor = (a,b) => {
//     return ( a > b) ? a : b
// };

const elMayor = (a,b) =>( a > b) ? a : b

const tieneMembresia = (miembro) => (miembro) ? "2 dolares" : "10 dolares"

console.log(elMayor(20,15));
console.log(tieneMembresia(true));

const amigo = false; 
const amigosArr = [
    "Peter",
    "Tony",
    "Dr.strange",
    amigo ? "Thor" : "loki",

];

console.log(amigosArr);


const nota = 6; // A+ A B+
const grado = nota >= 95 ? 'A+' :
              nota >= 90 ? 'A'  :
              nota >= 85 ? 'B+' :
              nota >= 80 ? 'B'  :
              nota >= 75 ? 'C+' :
              nota >= 70 ? 'C'  : 'F';

console.log({ nota, grado });