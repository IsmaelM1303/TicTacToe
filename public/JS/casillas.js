//Importaciones

//datos globales
let contador = 0
const contenedorCasillas = document.getElementById("contenedorCasillas")
const tablero = Array(9).fill("");

function crearCasillas() {
    limpiarCasillas()
    contador = 1
    for (let i = 0; i < 9; i++) {
        const casilla = document.createElement("div")
        casilla.className = "casilla"
        casilla.id = i
        contenedorCasillas.appendChild(casilla)
        casilla.addEventListener("click", () => validacion(casilla))

    }

}
function limpiarCasillas() {
    // Vaciar el array del tablero
    for (let i = 0; i < tablero.length; i++) {
        tablero[i] = "";
    }

    // Vaciar el contenido visual de cada casilla
    for (let i = 0; i < 9; i++) {
        const marca = document.getElementById(i);
        if (marca) {
            marca.textContent = " ";
        }
    }
    contador = 0;
}

function validacion(casilla) {
    const marca = document.createElement("h2")
    if (contador == 1 && casilla.textContent != "O") {
        marca.textContent = "X"
        casilla.innerHTML = marca.textContent
        contador++

    } else if (contador == 2 && casilla.textContent != "X") {
        marca.textContent = "O"
        casilla.innerHTML = marca.textContent
        contador--
    }
    buscarResultado(casilla.id, marca.textContent)
}

function iniciarPvp() {
    crearCasillas()
}

function buscarResultado(posicion, marca) {
    //Creo las variables de la cuadrícula
    tablero[posicion] = marca

    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    const hayGanador = combinacionesGanadoras.some(([a, b, c]) =>
        tablero[a] !== "" && tablero[a] === tablero[b] && tablero[b] === tablero[c]
    );
    if (hayGanador) {
        console.log("Hay ganador");
        limpiarCasillas()

    }
}


export { crearCasillas, limpiarCasillas, iniciarPvp }
