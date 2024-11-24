

const carros = ["Ford","Mazda","Honda","Toyota"];


let i = 0;
// while ( i < carros.length ) { //condicion verdadera 
//     console.log(carros[i]);
//     // i = i + 1;
//     i++;
// };


console.warn("Ciclo While");
// Condiciones Falsas 
// undefined 
// null
// false 
while ( carros[i] ) { //condicion verdadera 
    if (i === 1 ) {
        // break;
        i++;
        continue;
    }
    console.log(carros[i]);
    // i = i + 1;
    i++;
};

console.warn("Do While");

let j = 0;
do {
console.log(carros[j]);
    j++;
}while(carros[j]); // aqui va la condicion 
