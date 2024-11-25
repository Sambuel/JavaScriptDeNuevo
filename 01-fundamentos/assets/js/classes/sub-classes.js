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


    class Heroe extends Persona{

        clan = "Sin clan";
        constructor(nombre,codigo,frase){
            super(nombre,codigo,frase); // asi llamamos al constructor de Persona, siempre se llama al super despues del constructor
            this.clan = "Los avengers"
        };

        quienSoy(){
            console.log(`soy ${this.nombre}, y soy de los  ${this.clan} `);
            super.quienSoy(); // si se puede llamar al metodo de la clase padre pero llamandolo con super
        }
    } 

    // const spiderMan = new Persona("peter parker","spiderMan","Besame mary jane");
    const spiderMan = new Heroe("peter parker","spiderMan","Besame mary jane");

    // const spiderMan = new Heroe();
    spiderMan.quienSoy();
    console.log(spiderMan);
