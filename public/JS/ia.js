//Importaciones
import { crearCasillas, limpiarCasillas, buscarResultado, incContador, decContador, obtenerContador } from "./casillas.js";

//Datos globales
const resultado = document.getElementById("mostrarResultado")

//Esta función inicia el PVE
function iniciarPve() {
    crearCasillas(2)
}
function validacionPve(casilla) {
    const marca = document.createElement("h2");
    const contadorActual = obtenerContador();
    console.log(contadorActual);

    if (contadorActual != 2) {
        if (contadorActual == 1 && casilla.textContent != "O") {
            marca.textContent = "X";
            casilla.textContent = marca.textContent;
            incContador();
            resultado.innerHTML = "Turno de jugador 'X'";
            console.log(contadorActual);

        }

    } else if (contadorActual == 2 && casilla.textContent != "X") {
        bot()
        decContador();
        resultado.innerHTML = "Turno de jugador 'O'";
        console.log(contadorActual);

    }

    buscarResultado(casilla.id, marca.textContent);
}

function bot() {
    console.log("hola");

}

export { iniciarPve, validacionPve }