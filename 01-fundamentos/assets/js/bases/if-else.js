

let a = 4;

if (a >= 10) { // undefined,null, una asignacion
    console.log("A es mayor o igual a 10");
}else{
    console.log("No es mayor a 10 ");
};

// console.log("Fin de Programa ");


const hoy = new Date(); // {}
let dia = hoy.getDay(); // 0: Domingo, 1: lunes, 2: martes.....


console.log({dia});


if (dia === 0  ) {
    console.log(" Es Domingo");
}else if (dia === 1){

    console.log("Lunes");
    // if (dia === 1 ) {
    //     console.log("Lunes");
    // }else{
    //     console.log("No es Lunes ni domingo");
    // };
}else if(dia === 2 ){
    console.log("Martes");
}else{
    console.log("No es lunes , ni martes, Ni domingo");
};


// Sin usar If Else, o Swicht , unicamente objetos 
dia = 3; //  0: Domingo, 1: lunes, 2: martes.....

// Imprimir dia de la semana 


// numero claves o keys y los dias son valores 
let diaLetras = { 
    0:"Domingo",  
    1: "Lunes",
    3: "Martes",
    4: "Miercoles",
    5: "jueves",
    6: "Sabado",
};

console.log(diaLetras[dia]);

