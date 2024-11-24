

const fer = {
    nombre: "Fernando",
    edad: 30,
    imprimir(){
        console.log(`Nombre : ${this.nombre} - edad:  ${this.edad}`)
    },
};



const pedro = {
    nombre: "pedro",
    edad: 15,
    imprimir(){
        console.log(`Nombre : ${this.nombre} - edad:  ${this.edad}`)
    },

};



// fer.imprimir();
// pedro.imprimir();

// ok esto se debe de crear con la palabra new
function Persona(nombre,edad) { // upper camelCase
    console.log("Se ejecuto esta linea");

    this.nombre = nombre;
    this.edad = edad;

    this.imprimir = function(){
        console.log(`Nombre : ${this.nombre} - edad:  ${this.edad}`)
    }

}


const maria = new Persona("maria",18);
console.log(maria);
maria.imprimir();