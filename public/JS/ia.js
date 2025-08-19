//Importaciones
import { crearCasillas, buscarResultado, incContador, decContador, obtenerContador } from "./casillas.js";

//Datos globales
const resultado = document.getElementById("mostrarResultado")

//Estas son las combinaciones ganadoras
const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
    [0, 4, 8], [2, 4, 6]             // Diagonales
]

//Esta función inicia el PVE
function iniciarPve() {
    crearCasillas(2)
}
function validacionPve(casilla) {
    const marca = document.createElement("h2");
    const contadorActual = obtenerContador();
    console.log("Contador actual:", contadorActual);

    // Turno de X
    if (contadorActual === 1 && casilla.textContent === "") {
        marca.textContent = "X";
        casilla.textContent = marca.textContent;
        incContador();
        resultado.innerHTML = "Turno de jugador 'O'";
        buscarResultado(casilla.id, marca.textContent);

        //Turno de O, uso un timeout para que parezca que piensa
        setTimeout(() => {
            bot();
            decContador();
            resultado.innerHTML = "Turno de jugador 'X'";
        }, 1000);
    }
}

//Esta fue la primera versión del bot
//function bot() {
//const casillas = document.querySelectorAll(".casilla");
//    let jugada;
//    do {
//        jugada = Math.floor(Math.random() * casillas.length);
//    } while (casillas[jugada].textContent !== "");
//
//    casillas[jugada].textContent = "O";
//    buscarResultado(casillas[jugada].id, "O");
//}




//Esta versión del bot es con minimax, se buscaron tutoriales y explicaciones desde copilot. Falta ver si se puede refactorizar
function bot() {
    const casillas = document.querySelectorAll(".casilla")
    const tablero = Array.from(casillas).map(c => c.textContent) //Esto es el desgloce de lo que dice cada casilla
    let mejorJugada
    let mejorPuntaje = -Infinity

    for (let i = 0; i < tablero.length; i++) {
        if (tablero[i] === "") {
            tablero[i] = "O";
            const puntaje = simulacion(tablero, 0, false);
            tablero[i] = "";
            if (puntaje > mejorPuntaje) {
                mejorPuntaje = puntaje;
                mejorJugada = i;
            }
        }
    }
    if (typeof mejorJugada === "number" && casillas[mejorJugada]) {
        casillas[mejorJugada].textContent = "O";
        buscarResultado(casillas[mejorJugada].id, "O");
    }
}

//Esto es lo que simula las partidas
function simulacion(tablero, profundidad, esBot) {
    const resultado = evaluar(tablero);
    if (resultado !== null) return resultado;

    if (esBot) {
        let mejorPuntaje = -Infinity;
        for (let i = 0; i < tablero.length; i++) {
            if (tablero[i] === "") {
                tablero[i] = "O";
                const puntaje = simulacion(tablero, profundidad + 1, false);
                tablero[i] = "";
                mejorPuntaje = Math.max(puntaje, mejorPuntaje);
            }
        }
        return mejorPuntaje;
    } else {
        let peorPuntaje = Infinity;
        for (let i = 0; i < tablero.length; i++) {
            if (tablero[i] === "") {
                tablero[i] = "X";
                const puntaje = simulacion(tablero, profundidad + 1, true);
                tablero[i] = "";
                peorPuntaje = Math.min(puntaje, peorPuntaje);
            }
        }
        return peorPuntaje;
    }

}

//Esto evalúa cómo está el tablero
function evaluar(tablero) {
    const combinaciones = [             //Creo que esto se puede refactorizar
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of combinaciones) {
        const [a, b, c] = combo;
        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
            return tablero[a] === "O" ? 1 : -1;
        }
    }
    if (tablero.every(c => c !== "")) return 0; // Empate
    return null; // Juego no terminado
}
//----------------------------------------------------------------------------------------------------------------
export { iniciarPve, validacionPve }