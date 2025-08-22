//Importaciones
import { crearCasillas, buscarResultado, incContador, decContador, obtenerContador, juegoTerminado, cambiarModo } from "./casillas.js";
import { reproducirSegmento } from "./funcionesExtra.js";
import { clickBotones } from "./funcionesExtra.js";

//Datos globales
const resultado = document.getElementById("mostrarResultado");

//Esta función inicia el PVE
function iniciarPve() {
    clickBotones()
    setTimeout(() => {
        const pve = cambiarModo();
        crearCasillas(pve);
    }, 300);
}

function validacionPve(casilla) {
    const marca = document.createElement("h2");
    const contadorActual = obtenerContador();

    if (juegoTerminado) return;

    // Turno de X
    if (contadorActual === 1 && casilla.textContent === "") {
        reproducirSegmento(0.35, 1);
        marca.textContent = "X";
        casilla.textContent = marca.textContent;
        casilla.classList.add("x");

        incContador();
        buscarResultado(casilla.id, marca.textContent);

        // Verificar si el juego terminó después de la jugada de X
        if (juegoTerminado) {
            resultado.innerHTML = "Juego terminado";
            return;
        }

        resultado.innerHTML = "Turno de jugador 'O'";

        // Turno de O (bot)
        setTimeout(() => {
            if (juegoTerminado) return; // Verificar antes de que el bot juegue

            reproducirSegmento(0.35, 1);
            bot();

            // Verificar si el juego terminó después de la jugada del bot
            if (juegoTerminado) {
                resultado.innerHTML = "Juego terminado";
                return;
            }

            decContador();
            resultado.innerHTML = "Turno de jugador 'X'";
        }, 1000);
    }
}

//Esta función combina la primera versión con el minimax para que no sea invencible
function bot() {
    const casillas = document.querySelectorAll(".casilla");
    if (juegoTerminado) return;

    const numero = Math.floor(Math.random() * 20) + 1;

    //Esto es para que juegue de manera aleatoria
    if ((numero % 2 === 0 && numero > 10) || (numero % 2 !== 0 && numero < 10)) {
        aleatorio(casillas);
    } else {
        //Esto es para que juegue de manera analítica con minimax
        minimax(casillas);
    }
}

//Esto hace que funcione el jugar aleatoriamente
function aleatorio(casillas) {
    if (juegoTerminado) {
        return
    } else {
        let jugada;
        let intentos = 0;
        do {
            jugada = Math.floor(Math.random() * casillas.length);
            intentos++;
            if (intentos > 20) return;
        } while (casillas[jugada].textContent !== "");

        casillas[jugada].textContent = "O";
        casillas[jugada].classList.add("o");

        buscarResultado(casillas[jugada].id, "O");
    }
}

//Esto hace que funcione el jugar analizando la mejor jugada
function minimax(casillas) {
    if (juegoTerminado) {
        return
    } else {
        const tablero = Array.from(casillas).map(c => c.textContent);
        let mejorJugada;
        let mejorPuntaje = -Infinity;

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
            casillas[mejorJugada].classList.add("o");
            buscarResultado(casillas[mejorJugada].id, "O");
        }
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
export { iniciarPve, validacionPve };
