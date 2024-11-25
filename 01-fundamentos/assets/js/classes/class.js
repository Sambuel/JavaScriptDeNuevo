
// sintaxis de las clases
class Persona {

    static _conteo = 0; // sirve para ver cuantas instancias de mi clase tengo 
    static get conteo(){
        return Persona._conteo + " instancias"
    }

    // metodo
    static mensaje() {
        console.log(this.nombre); // undefined
        console.log("Hola a todos soy un metodo estatico");
    }

    nombre = "";
    codigo  ="";
    frase = "";
    comida = "";


    constructor(nombre = "sin nombre",codigo = "sin codigo",frase ="sin frase"){
        // if (!nombre)throw Error("Necesitamos el nombre")
        this.nombre = nombre;
        this.codigo = codigo;
        this.frase = frase;

        Persona._conteo++;

    }
    // el set es para establecer un valor 
    // el set normalmente solo recibe un argumento
    set setComidaFavorita(comida){
        this.comida = comida.toUpperCase();

    };

    // Es para establecer un valor  
    get getComidaFavorita(){
        return `La Comida fav de ${this.nombre} es ${this.comida}`
    };

    quienSoy(){
        console.log(`soy ${this.nombre} y mi identidad es ${this.codigo}`);
    };


    miFrase(){
        this.quienSoy(); // para ocupar el metodo quienSoy adentro del metodo miFrase
        console.log(`${this.codigo} dice: ${this.frase}`);
    };

};

const spiderMan = new Persona("peter parker","spiderMan","Besame mary jane");
console.log(spiderMan);

const GwenPool = new Persona("Gwen Stacy","GwenPool","Besame Andrew o spiderman");
console.log(GwenPool);

// llamado al metodo quiensoy();
spiderMan.quienSoy();
// GwenPool.miFrase();

spiderMan.setComidaFavorita = "El pie de cereza de la tia May";
// spiderMan.comida = "Duen de verde";

// console.log(spiderMan.getComidaFavorita);
// console.log(spiderMan);
// Persona._conteo = 2;

console.log("Conteo statico", Persona._conteo);
console.log(Persona.conteo); // es el get de conteo
Persona.mensaje(); // es el metodo estatico 

Persona.propiedadExterna = "Hola Mundo"
console.log(Persona.propiedadExterna);
console.log(Persona);

console.log("============================");

class Domicilio {
    
    calle = "";
    numero = "";
    delegacion = "";
    
    constructor(calle = "Aun no hay calle",numero = "Aun no hay numero",delegacion = "no hay delegacion"){

        this.calle = calle;
        this.numero = numero;
        this.delegacion = delegacion;
    }
};


const señoraGuadalupe = new Domicilio("Mar del golfo de mexico","1300","sierra de Guadalupe");
console.log(señoraGuadalupe);


const samuelPonce = new Domicilio("Lago xochimilco","65","Miguel Hidalgo")
console.log(samuelPonce);


class Animal {

    animal = "";
    nombreCientifico = "";
    cicloDeVida = ""

    constructor(animal = "sin valor" , nombreCientifico = "sin valor" , cicloDeVida = "sin valor"){

        this.animal = animal; 
        this.nombreCientifico = nombreCientifico;
        this.cicloDeVida = cicloDeVida;

    }

};



const perro = new Animal("Perro","Perrocinio","depende el tipo de perro");
console.log(perro);

const lagarto = new Animal("Lagarto","aligaitor","10 años o mas");
console.log(lagarto);


class Animal1 {

// Es opcional declarlas aqui no causa ningun error
    // animal = "";
    // nombreCientifico = "";
    // cicloDeVida = ""

    constructor(animal = "sin valor" , nombreCientifico = "sin valor" , cicloDeVida = "sin valor"){

        this.animal = animal; 
        this.nombreCientifico = nombreCientifico;
        this.cicloDeVida = cicloDeVida;

    }

};
