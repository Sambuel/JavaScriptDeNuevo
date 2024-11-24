


let a  = 10;
let b = a;

a = 30 ;


console.log({a,b});

let juan = {nombre : "juan",}
let ana ={ ...juan};
ana.nombre = "ana";

console.log({juan,ana});


const cambiaNombre = ({...persona}) => {
    persona.nombre = "Tony";
    return persona;
};

let peter = {nombre: "peter"};
let tony = cambiaNombre(peter);

console.log({peter,tony});


// arreglos 

const frutas = ["manzana","Pera","Piña"];

console.time("Slice");
const otrasFrutas = frutas.slice();
console.timeEnd("Slice");

console.time("spread");
const otrasFrutas2 = [...frutas]; //hacerlo asi por que es un  nuevo arreglo  
console.timeEnd("spread");

otrasFrutas.push("Mango");
console.table({frutas,otrasFrutas});




const verduras = ["espinaca","Coliflor","cilantro"];

const otrasVerduras = [...verduras];
console.table({verduras,otrasVerduras});

otrasVerduras.push("Espinaca");
console.table({verduras,otrasVerduras});





