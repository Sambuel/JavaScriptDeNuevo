
function saludar(nombre ) {
    console.log(arguments);
    console.log("Hola " + nombre);
    return [1,2,3,4];

    // Esto Nunca se va ejecutar 
    console.log("Soy un codigo depues del return");
};

const retornoDeSaludar = saludar("samuel",40,true,"Mexico" );
console.log(retornoDeSaludar);


const saludar2 = function(nombre) { // Funcion anonima 
    console.log("Hola " + nombre);
};
// saludar2("Mundo");



const saludarFlecha = (nombre ) => {
    console.log("Hola " + nombre);
}; 

// saludarFlecha("SJDIasdhsai")




function sumar(a, b){
    return a + b; 
};

console.log(sumar(1,3));

const sumar2 = (a,b) => { // funcion flecha 
    return a * b;  
};
console.log(sumar2(5,5));


const sumar3 = (a,b) => a * b;  // funcion flecha corta

console.log(sumar2(4,4));

function getAleatorio() {
    return Math.random();
};
// en una funcion de flecha, que no tenga llaves 
// getAleatorio2

const getAleatorio2 = () => Math.random();

console.log(getAleatorio());
console.log(getAleatorio2());


// function saludar2(a,b ) {
//     return a + b 
// };

// console.log(saludar2(1,2));



// function saludarr(saludo) {
//     return saludo

// };

// console.log(saludarr("Hola Pao"));



