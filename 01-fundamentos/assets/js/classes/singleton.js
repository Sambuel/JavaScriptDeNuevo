// singleton: instancia unica de mi clase

class Singleton {

    static instancia; // null, undefined ? 
    nombre = "";

    constructor(nombre = ""){

        if (!!Singleton.instancia) {
            return Singleton.instancia;
        }

        Singleton.instancia = this;
        this.nombre = nombre;

        // return this;

    };
};


const instancia1 = new Singleton("iroman");
const instancia2 = new Singleton("Capitan America")
const instancia3= new Singleton("spiderman")


console.log(`nombre en la instancia1 es: ${instancia1.nombre}`);
console.log(`nombre en la instancia2 es: ${instancia2.nombre}`);
console.log(`nombre en la instancia3 es: ${instancia3.nombre}`);



class Singleton2{
    static instancia;
    heroe = ""

    constructor(heroe = ""){
        
        if (Singleton2.instancia) {
            return Singleton2.instancia
        }

        Singleton2.instancia = this
        this.heroe = heroe;
    };

};

const heroe1 = new Singleton2("kickass");
console.log(heroe1);

const heroe2 = new Singleton2("blackPanter");
console.log(heroe2);