const  personaje = {
    nombre: "Tony Stark",
    codeName: "IronMan",
    vivo : false,
    edad: 40,
    coords: {
        lat: 34.034,
        lng: -118.70,
    },
    trajes: ['Mark I', 'Mark V', 'Hulkbuster'],
    direccion:{
        zip :"1080, 90265",
        ubi:"Malibu,California",
    },
    ultima_pelicula: "EndGame",
};


console.log(personaje);
console.log("Nombre:",personaje.nombre);
console.log("Edad:", personaje.edad);

console.log("Coors:", personaje.coords);
console.log("Lat:", personaje.coords.lat);

console.log("No.Trajes:", personaje.trajes.length); // Ejercicio

console.log("Ultimo traje:", personaje.trajes[2]); 
console.log("Ultimo traje:", personaje.trajes[personaje.trajes.length -1] ); // otra forma para no poner un valor en duro 

const x = "vivo";
console.log("Vivo", personaje[x]);

// Más Detalles 

delete personaje.edad; // el delete para borrar propiedades 
console.log(personaje);

personaje.casado = true; // asi le podemos hacer para crear una nueva propiedad afuera del objeto literal 

const entriesPares = Object.entries(personaje); // la propiedad entries para acomodar el objeto como un array de 0,1,2,3,4
console.log(entriesPares);


Object.freeze(personaje); // sirve para congelar el objeto y no hacer modificaciones dejarlo como esta 
personaje.dinero = 1000000000;
console.log(personaje);

// aunque quise agregar la Propiedad dinero no se agrego por el freeze



// El getOwnPropertyNames sirve para enlistar las propiedades como un arreglo  
const  propiedades = Object.getOwnPropertyNames(personaje);
const  valores = Object.values(personaje);// el Object.values en lista los valores como un arreglo 

console.log({propiedades,valores});