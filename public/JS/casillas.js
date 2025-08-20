//Importaciones
import { validacionPve } from "./ia.js";
//Datos globales
export let contador = 0
const contenedorCasillas = document.getElementById("contenedorCasillas")
const tablero = Array(9).fill("");
const resultado = document.getElementById("mostrarResultado")
let modo

function cambiarModo() {
    modo = 2
    return modo
}
//funciones de aumento y decrecimiento de contador
function incContador() {
    contador++
}
function decContador() {
    contador--
}
function obtenerContador() {
    return contador;
}

//Esta función inicia el PVP
function iniciarPvp() {
    modo = 1
    crearCasillas(modo)
}

//Funciones de verificación de juego
let juegoTerminado = false;

//Esta también crea un marcador que se verá en la sección de marcadores
function terminarJuego(num, j1, j2) {
    juegoTerminado = true;
    const ahora = new Date();
    const fechaHora = ahora.toLocaleString();
    
    let modoJuego
    let desenlaceJuego
    if (num == 1) {
        modoJuego= "Jugador contra jugador"
    } else if (num == 2) {
        modoJuego = "Jugador contra la máquina"
    }

    
    if (j1 === j2) {
    desenlaceJuego = "Es empate";
} else {
    const ganaJ1 = j1 > j2;

    //Descubrí una forma nueva de declarar condicionales
    if (num === 1) {
        desenlaceJuego = ganaJ1 ? "Ganó el jugador 1" : "Ganó el jugador 2";
    } else if (num === 2) {
        desenlaceJuego = ganaJ1 ? "Ganó el jugador" : "Ganó la máquina";
    }
}

    const nuevoMarcador = {
        fecha: fechaHora,
        modo: modoJuego,
        desenlace: desenlaceJuego
    }
    console.log(nuevoMarcador);
    
    
    


}

function reiniciarJuego() {
    juegoTerminado = false;
}

// Esto crea las casillas
function crearCasillas(n) {
    limpiarCasillas();
    contador = 1;
    for (let i = 0; i < 9; i++) {
        const casilla = document.createElement("div");
        casilla.className = "casilla";
        casilla.id = i;
        contenedorCasillas.appendChild(casilla);
        resultado.innerHTML = "Turno de jugador 'X'";
        casilla.addEventListener("click", () => {
            if (n === 1) {
                validacion(casilla);
            } else if (n === 2) {
                if (contador === 1) {
                    validacionPve(casilla);

                } else {
                    resultado.innerHTML = "Espera tu turno...";
                }
            }
        });
    }
}


//Esto limpia las cosas
function limpiarCasillas() {
    // Vaciar el array del tablero
    for (let i = 0; i < tablero.length; i++) {
        tablero[i] = "";
    }

    contenedorCasillas.innerHTML = ""

    // Vaciar el contenido visual de cada casilla
    for (let i = 0; i < 9; i++) {
        const marca = document.getElementById(i);
        if (marca) {
            marca.textContent = "";
        }
    }
    contador = 0;
    resultado.innerHTML = ""
}

//Esta es para que ponga X o O dependiendo del contador que está arriba
function validacion(casilla) {
    const marca = document.createElement("h2")
    //Aquí no sé por qué pero hay que poner invertido quién va para que se muestre bien, esto se puede mejorar
    if (contador == 1 && casilla.textContent != "O") {
        marca.textContent = "X"
        casilla.textContent = marca.textContent
        contador++
        resultado.innerHTML = "Turno de jugador 'O'"

    } else if (contador == 2 && casilla.textContent != "X") {
        marca.textContent = "O"
        casilla.textContent = marca.textContent
        contador--
        resultado.innerHTML = "Turno de jugador 'X'"

    }
    buscarResultado(casilla.id, marca.textContent)
}

//Esto busca resultados ganadores o empates

function buscarResultado(posicion, marca) {
    if (juegoTerminado) return;

    tablero[posicion] = marca;

    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const hayGanador = combinacionesGanadoras.some(([a, b, c]) =>
        tablero[a] !== "" && tablero[a] === tablero[b] && tablero[b] === tablero[c]
    );

    if (hayGanador) {
        juegoTerminado = true;

        if (modo === 1) {
            if (contador == 2) {
                resultado.innerHTML = "Gana jugador 1";
                setTimeout(() => {
                    terminarJuego(1, 1, 0);
                    limpiarCasillas();
                    juegoTerminado = false;
                }, 2000);
            } else if (contador == 1) {
                resultado.innerHTML = "Gana jugador 2";
                setTimeout(() => {
                    terminarJuego(1, 0, 1);
                    limpiarCasillas();
                    juegoTerminado = false;
                }, 2000);
            }
        } else if (modo === 2) {
            // PvE: marca determina quién ganó
            if (marca === "X") {
                resultado.innerHTML = "¡Gana el jugador!";
                setTimeout(() => {
                    terminarJuego(2, 1, 0); // modo 2, humano gana
                    limpiarCasillas();
                    juegoTerminado = false;
                }, 2000);
            } else if (marca === "O") {
                resultado.innerHTML = "¡Gana la computadora!";
                setTimeout(() => {
                    terminarJuego(2, 0, 1); // modo 2, computadora gana
                    limpiarCasillas();
                    juegoTerminado = false;
                }, 2000);
            }
        }

    } else if (tablero.every(casilla => casilla !== "")) {
        resultado.innerHTML = "¡Empate!";
        juegoTerminado = true;

        setTimeout(() => {
            if (modo === 1) {
                terminarJuego(1, 0, 0); // empate en PvP
            } else if (modo === 2) {
                terminarJuego(2, 0, 0); // empate en PvE
            }
            limpiarCasillas();
            juegoTerminado = false;
        }, 2000);
    }
}


export { crearCasillas, limpiarCasillas, iniciarPvp, validacion, buscarResultado, incContador, decContador, obtenerContador, juegoTerminado, terminarJuego, reiniciarJuego, cambiarModo}
