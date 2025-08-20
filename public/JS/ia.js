//Importaciones
import { crearCasillas, buscarResultado, incContador, decContador, obtenerContador, juegoTerminado, cambiarModo} from "./casillas.js";

//Datos globales
const resultado = document.getElementById("mostrarResultado")

//Esta función inicia el PVE
function iniciarPve() {
    const pve = cambiarModo()
    crearCasillas(pve)
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

//Esta función combina la primera versión con el minimax para que no sea invencible
function bot() {
    const casillas = document.querySelectorAll(".casilla");
    if (juegoTerminado) {
        buscarResultado()
        return
    };

    const numero = Math.floor(Math.random() * 20) + 1;
    console.log(numero);
    

    //Esto es para que juegue de manera aleatoria
    if ((numero % 2 === 0 && numero >10) || (numero % 2 !== 0 && numero < 10)) {
        aleatorio(casillas)
    } else {
        //Esto es para que juegue de manera analítica con minimax
        minimax(casillas)
    }
}
//Esto hace que funcione el jugar aleatoriamente
function aleatorio(casillas){
    let jugada;
        do {
            jugada = Math.floor(Math.random() * casillas.length);
        } while (casillas[jugada].textContent !== "");

        casillas[jugada].textContent = "O";
        buscarResultado(casillas[jugada].id, "O");
}

//Esto hace que funcione el jugar analizando la mejor jugada
function minimax(casillas){
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