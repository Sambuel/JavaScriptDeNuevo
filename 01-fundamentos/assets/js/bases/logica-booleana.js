

const regresaTrue = () => {
    console.log("Regresa true");
    return true;
};


const regresaFalse = () => {
    console.log("Regresa False");
    return false;
};


console.warn("not o la negacion");
console.log(true); // true
console.log(!true); // False 
console.log(!false); // true

console.log(!regresaFalse()); // true 


console.warn("And"); // true si todos los valores son verdaderos 
console.log(true && true ); // true 
console.log(true && false); // false
console.log(true && !false); // true

console.log("=========");
console.log(regresaFalse() && regresaTrue() ); // false
console.log(regresaTrue() && regresaFalse() ); // false

console.log("=====&&=====");
regresaFalse() && regresaTrue(); // si ponemos primero la condicion de false, solo se imprimira false y no true por que encontro primero el valor false que el true 

console.log("4 Condiciones",true && true && true && false); // False

console.warn("OR"); // true 
// con que solo haya una condicion true, siempre va ser true 
console.log(true || false); // true 
console.log(false || false); // false

console.log(regresaTrue() || regresaFalse() ); // true 
// el OR "||" , siempre va dar true, solo se enfocara en los valores true  

console.log("4 Condiciones",true || true || true || false); // true 

console.warn("Asignaciones");

const soyUndefined = undefined;
const soyNull= null;
const soyFalso = false;

const a1 = true && "Hola mundo" && 150; // ?
// simpre va tomar el ultimo valor de la asignacion
const a1_1 = false&& "Hola mundo" && 150; // ?
// aqui false por que ya no necesita evaluar las demas 

const a2 = "Hola" && "Mundo" && soyFalso && true ;
const a3 = soyFalso || "Ya no soy Falso";
const a4 = soyFalso || soyUndefined || soyNull || "Ya no soy Falso" || true ;
//En el a4 ya no se ejecuta el True, porque antes de encontrar el True, ya encontró el valor de ya no soy falso y ese se ejecuta s
const a5 = soyFalso || soyUndefined || regresaTrue() || "Ya no soy Falso" || true ;

console.log({a1,a2,a3,a4,a5});
