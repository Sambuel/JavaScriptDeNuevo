
// sintaxis de las clases
class Persona {
    nombre = "";
    codigo  ="";
    frase = "";

    constructor(nombre = "sin nombre",codigo = "sin codigo",frase ="sin frase"){
        // if (!nombre)throw Error("Necesitamos el nombre")
        this.nombre = nombre;
        this.codigo = codigo;
        this.frase = frase;

    }

};



const spiderMan = new Persona("peter parker","spiderMan","Besame mary jane");
console.log(spiderMan);

const GwenPool = new Persona("Gwen Stacy","GwenPool","Besame Andrew o spiderman");
console.log(GwenPool);



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
