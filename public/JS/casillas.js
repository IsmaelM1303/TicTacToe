//Importaciones
let contador = 0
const contenedorCasillas = document.getElementById("contenedorCasillas")

function crearCasillas(){
    limpiarCasillas()
    contador = 1
    for (let i = 0; i < 9; i++) {
        const casilla = document.createElement("div")
        casilla.className = "casilla"
        contenedorCasillas.appendChild(casilla)
        casilla.addEventListener("click", () => validacion(casilla))        
    }
}
function limpiarCasillas(){
    contenedorCasillas.innerHTML = ""
}

function validacion (casilla){
    if (contador==1 && casilla.textContent != "O") {
        const x = document.createElement("h2")
        x.textContent = "X"
        casilla.innerHTML = x.textContent
        contador++

    } else if (contador == 2 && casilla.textContent != "X"){
        const o = document.createElement("h2")
        o.textContent = "O"
        casilla.innerHTML = o.textContent
        contador--

    }
}


function iniciarPvp(){
    crearCasillas()
}


export {crearCasillas, limpiarCasillas, iniciarPvp}