
// patron modulo
const miModulo = (() => {
    "use strict"
    

        /**
     * 2C = two of clubs 
     * 2D = two of Diaminds
     * 2H = two of hearts 
     * 2S = two of spades 
     */

    let deck = []; // se va manipular por ser let 
    const tipos = ["C","D","H","S"],
            especiales = ["A","J","Q","K"];

    let puntosJugadores = [];

    // Referencias de HTML
    const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector("#btnNuevo");

        const divCartasJugadores = document.querySelectorAll(".divCartas"),
        puntosHTML = document.querySelectorAll("small");
        
        // Esta Funcion incializa el juego
        const inicializarJuego = (numJugadores = 2) => {
            deck = crearDeck();

            puntosJugadores = [];
            for(let i = 0; i < numJugadores; i++){
                puntosJugadores.push(0);
            };

            puntosHTML.forEach(elem => elem.innerHTML = 0);
            divCartasJugadores.forEach(elem => elem.innerHTML = "");
            btnPedir.disabled = false;
            btnDetener.disabled = false;


        
        };
        
    // INSTRUCCION PARA CREAR EL DECK  y tambien crea una nueva baraja o deck 
    const crearDeck = () =>{

        deck = [];
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
        // console.log(deck);
        return  _.shuffle(deck);// el shuffle sirve para poder revolver los elementos del arreglo
    };


    // Esta Funcion me permite tomar una carta 
    const pedirCarta = () => {

        if(deck.length === 0 ){
            throw "NO hay cartas en el deck";
        };

        
        // console.log(carta); // carta debe de ser la baraja y que debe de dejar de existir en la baraa del deck 
        return deck.pop();
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


    
    
    
    // turno 0 = 1 primer jugador y el ultimo la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }




    
    const crearCarta = (carta,turno) => {
        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add("carta");
        divCartasJugadores[turno].append(imgCarta);

        
    };

    const determinarGanador = () => {

        const [puntosMinimos,puntosComputadora] = puntosJugadores
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

    
    // turno de la computadora 
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {

        const carta = pedirCarta();
        acumularPuntos(carta, puntosJugadores.length - 1 );
        crearCarta(carta, puntosJugadores.length - 1);

        } while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    };




    // Eventos
    btnPedir.addEventListener("click", () => {
        
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);

        crearCarta(carta,0);

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
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores);
    });


    btnNuevo.addEventListener("click", () => {
        inicializarJuego();

    });



    return {
        nuevoJuego: inicializarJuego
    }
        })();


