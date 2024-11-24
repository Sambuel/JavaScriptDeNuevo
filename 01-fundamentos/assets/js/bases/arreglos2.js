let juegos = ["Zelda","Mario","Metroid","Crhono"];
console.log("Largo:", juegos.length);



let primero = juegos[2-2];
let ultimo = juegos[juegos.length - 1 ];


console.log({primero,ultimo});

// juegos.forEach((element,indice,arr) => {
// console.log({element,indice,arr});
// });

let nuevaLongitud = juegos.push("Fortnite")
console.log({nuevaLongitud,juegos}); // Para agregar un nuevo valor al arreglo queda al ultimo el valor 

 nuevaLongitud = juegos.unshift("Fire Emblem") /// para agregar un valor nuevo al inicio del arreglo
console.log({nuevaLongitud,juegos});

 juegoBorrado = juegos.pop("fortnite") // para borrar el ultimo elemento del arreglo
console.log({juegoBorrado,juegos});


let pos = 2; // indice 

console.log(juegos); 
let juegosBorrados =  juegos.splice(pos, 3  ); // En los tres ya esta contando la pos 2., osea que tambien va borrar la posicion numero 2 a la tercera Posición 
console.log({juegosBorrados,juegos});

// y el metodo slice sirve para borrar un valor en especifico 


let metroidIndex = juegos.indexOf("Zelda"); // para saber el indice de un valor y es casesensitive
console.log({metroidIndex});

// TODO: Referencia 