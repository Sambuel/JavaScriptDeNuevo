
// function crearPersona(nombre,apellido){
//     return{nombre,apellido};
// };
const crearPersona = (nombre,apellido) => ({nombre,apellido});


const persona = crearPersona("Samuel","Ponce")
console.log(persona);


function imprimeArgumentos() {
    console.log(arguments);
}

const imprimeArgumentos2 = (...arguments) => { // ... = parametro rest, crea un arreglo con todos los valores completos y no puede tener otro parametro despues del rest
    // console.log(arguments);
    return arguments;
};


imprimeArgumentos(10,true,false,"Sam","Hola");

const [casado,vivo,nombre,saludo] = imprimeArgumentos2(10,true,false,"Sam","Hola");
console.log({casado,vivo,nombre,saludo} );


const {apellido} = crearPersona("Samuel","Ponce");
console.log({apellido});

const  tony = {
    nombre: "Tony Stark",
    codeName: "IronMan",
    vivo : false,
    edad: 40,
    trajes: ['Mark I', 'Mark V', 'Hulkbuster'],
};

// const imprimePropiedades = (personaje) =>{
//     console.log(personaje.nombre);
//     console.log(personaje.codeName);
//     console.log(personaje.vivo);
//     console.log(personaje.edad);
//     console.log(personaje.trajes);

// };


// DESESTRUCTURACION DE ARGUMENTOS 
const imprimePropiedades = ({ nombre, codeName, vivo, edad = 15, trajes }) => {

    console.log({nombre});
    console.log({codeName});
    console.log({vivo});
    console.log({edad});
    console.log({trajes});
}

imprimePropiedades(tony);
