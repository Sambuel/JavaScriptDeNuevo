

class Rectangulo {

    #area = 0; // propiedad privada

    constructor(base = 0, altura = 0){
        this.base = base;
        this.altura = altura;

        this.#area = base * altura;
    }

    calcularArea(){
        console.log(this.#area * 2);
    };
};


const rectangulo = new Rectangulo(10,15);
// rectangulo.#area = 100;
rectangulo.calcularArea();

console.log(rectangulo);


// con el hashtag podemos poner la propiedad privada asi como esta el #area
// otro ejemplo: #base : 30


// ya se pueden utilizar las clases privadas  
