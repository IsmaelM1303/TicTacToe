//Importaciones
import { validacionPve } from "./ia.js";
//Datos globales
export let contador = 0
const contenedorCasillas = document.getElementById("contenedorCasillas")
const tablero = Array(9).fill("");
const resultado = document.getElementById("mostrarResultado")
//funciones de aumento y decrecimiento de contador
function incContador(){
    contador++
}
function decContador(){
    contador--
}
function obtenerContador() {
    return contador;
}

//Esta función inicia el PVP
function iniciarPvp() {
    crearCasillas(1)
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
    if (contador == 1 && casilla.textContent != "O") {
        marca.textContent = "X"
        casilla.textContent = marca.textContent
        contador++
        resultado.innerHTML = "Turno de jugador 'X'"

    } else if (contador == 2 && casilla.textContent != "X") {
        marca.textContent = "O"
        casilla.textContent = marca.textContent
        contador--
        resultado.innerHTML = "Turno de jugador 'O'"

    }
    buscarResultado(casilla.id, marca.textContent)
}

//Esto busca resultados ganadores o empates
function buscarResultado(posicion, marca) {
    //Creo las variables de la cuadrícula
    tablero[posicion] = marca

    //Estas son las combinaciones ganadoras
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    //Esto es lo que compara
    const hayGanador = combinacionesGanadoras.some(([a, b, c]) =>
        tablero[a] !== "" && tablero[a] === tablero[b] && tablero[b] === tablero[c]
    );

    //Esto es el resultado
    if (hayGanador) {
        //Como el contador cambia con el click, cuando se gana cambia y se muestra al inverso. Por eso lo pongo al revés para que invierta esa inversión
        if (contador == 2) {
            resultado.innerHTML = "Gana jugador 1"
            setTimeout(() => {
                limpiarCasillas()
            }, 2000);
        }
        else if (contador == 1) {
            resultado.innerHTML = "Gana jugador 2"
            setTimeout(() => {
                limpiarCasillas()
            }, 2000);
        }
        //Esto es el empate
    } else if (tablero.every(casilla => casilla !== "")) {
        resultado.innerHTML = "¡Empate!"
        setTimeout(() => {
            limpiarCasillas()
        }, 2000);
    }
}


export { crearCasillas, limpiarCasillas, iniciarPvp, validacion, buscarResultado, incContador, decContador, obtenerContador}
