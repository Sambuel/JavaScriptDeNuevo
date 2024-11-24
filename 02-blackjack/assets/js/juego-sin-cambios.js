

/**
 * 2C = two of clubs 
 * 2D = two of Diaminds
 * 2H = two of hearts 
 * 2S = two of spades 
 */

let deck = []; // se va manipular por ser let 
const tipos = ["C","D","H","S"];
const especiales = ["A","J","Q","K"];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias de HTML
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo")

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector("#computadora-cartas")

const puntosHTML = document.querySelectorAll("small");


// console.log(btnPedir);


// INSTRUCCION PARA CREAR EL DECK  y tambien crea una nueva baraja o deck 
const crearDeck = () =>{

    for(let i = 2; i <= 10; i++ ){
        for (let  tipo of tipos) {
            deck.push(i + tipo);
        };
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    };

    // console.log(deck);
    deck = _.shuffle(deck); // el shuffle sirve para poder revolver los elementos del arreglo
    console.log(deck);
    return deck;
};

crearDeck();


// Esta Funcion me permite tomar una carta 
const pedirCarta = () => {

    if(deck.length === 0 ){
        throw "NO hay cartas en el deck";
    };

    const carta = deck.pop()

    
    // console.log(carta); // carta debe de ser la baraja y que debe de dejar de existir en la baraa del deck 
    return carta;
};


// pediCarta();
const valorCarta = (carta) => {

    const valor = carta.substring(0,carta.length -1);
    return (isNaN(valor)) ? 
            (valor === "A") ? 11 : 10
            : valor * 1; // se multiplica por uno para que de el valor en numero y no en string

    // let puntos = 0;
    // // 2 = 2 , 3 = 3 , 10 = 10 
    // if (isNaN(valor)) {

    //     puntos =(valor === "A") ? 11 : 10; 

    // }else{
    //     puntos = valor * 1;
    // }

    // console.log(puntos);

};


// turno de la computadora 
const turnoComputadora = (puntosMinimos) => {

    do{

    const carta = pedirCarta();
    

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

     // <img class="carta" src="assets/cartas/2C.png">
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
    imgCarta.classList.add("carta")
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
        break;
    }


    } while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {    
    if (puntosComputadora === puntosMinimos) {
        alert("Nadie Gana :(");
    } else if(puntosMinimos > 21){
        alert("Perdiste Humano, Gano el Bot")
    }else if (puntosComputadora > 21) {
        alert("Humano gana")
    }else{
        alert("Bot Gana")
    }
        }, 10);
};




// Eventos
btnPedir.addEventListener("click", () => {
    
    const carta = pedirCarta();
    

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;// aqui en el puntosHTML se le puso 
    // la posicion 0, por que arriba en las referencias html estamos ocupando el 
    // querySelectorAll y hay dos por es en la posi 0.

    // <img class="carta" src="assets/cartas/2C.png">
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
    imgCarta.classList.add("carta")
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn("Lo siento Mucho, Perdiste");
        btnPedir.disabled = true; // el disabled sirve para bloquear el boton de btnPedir cuando ya rebasa los 21
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21){
        console.warn("21, Genial");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    }

});


btnDetener.addEventListener("click", () => {
    turnoComputadora(puntosJugador);
    btnPedir.disabled = true;
    btnDetener.disabled = true;


});


btnNuevo.addEventListener("click", () => {
    deck = [];
    console.clear();
    deck = crearDeck(); // nuevo arreglo vacio

    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = "";
    divCartasJugador.innerHTML = "";

    btnPedir.disabled = false;
    btnDetener.disabled = false;



});




