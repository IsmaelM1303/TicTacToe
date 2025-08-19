//Importaciones
import { crearCasillas, limpiarCasillas, buscarResultado, incContador, decContador, obtenerContador } from "./casillas.js";

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
        }, 500);
    }
}


function bot() {
    const casillas = document.querySelectorAll(".casilla");
    let jugada;
    do {
        jugada = Math.floor(Math.random() * casillas.length);
    } while (casillas[jugada].textContent !== "");

    casillas[jugada].textContent = "O";
    buscarResultado(casillas[jugada].id, "O");
}


export { iniciarPve, validacionPve }