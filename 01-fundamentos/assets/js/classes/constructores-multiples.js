

class Persona {

    static porObjeto({nombre,apellido, pais}){
        return new Persona(nombre,apellido,pais);
    };


    constructor(nombre,apellido,pais){
        this.nombre =  nombre;
        this.apellido = apellido;
        this.pais = pais;
    };

    getInfo(){
        console.log(`info: ${this.nombre}, ${this.apellido}, ${this.pais}`);
    };

};

const nombre1 = "Melissa",
      apellido1 = "flores",
      pais1 = "honduras";


    const fher = {
        nombre:"Fernando",
        apellido: "Herrera",
        pais: "costa rica"
    }

    const persona1 = new Persona(nombre1,pais1,apellido1);
    const persona2 = Persona.porObjeto(fher)

    console.log(persona2);

    persona1.getInfo();




