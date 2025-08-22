// Importaciones
import { getMarcador } from "../services/CRUD_marcadores.js"

// Datos globales
const contenedorMarcadores = document.getElementById("contenedorMarcadores")

// Obtener marcadores desde el servicio
async function obtenerMarcador() {
    try {
        const marcadores = await getMarcador()
        return marcadores
    } catch (error) {
        console.error("Ha ocurrido un error al intentar obtener los marcadores:", error)
        return []
    }
}

// Mostrar marcadores en el DOM
async function mostrarMarcadores() {
    try {
        contenedorMarcadores.innerHTML = ""
        const marcadores = await obtenerMarcador()
        contenedorMarcadores.innerHTML = ""

        marcadores.forEach(marcador => {
            crearMostrar(marcador)
        })
    } catch (error) {
        console.error("Ocurrió un error al mostrar los marcadores:", error)
    }
}

// Crear y mostrar un marcador individual
function crearMostrar(marcador) {
    const fechaMarcador = document.createElement("p")
    fechaMarcador.textContent = marcador.fecha
    fechaMarcador.className = "mostrarDato"

    const modoMarcador = document.createElement("p")
    modoMarcador.textContent = marcador.modo
    modoMarcador.className = "mostrarDato"

    const desenlaceMarcador = document.createElement("p")
    desenlaceMarcador.textContent = marcador.desenlace
    desenlaceMarcador.className = "mostrarDato"

    const divContenedor = document.createElement("div")
    divContenedor.className = "marcador"

    divContenedor.appendChild(fechaMarcador)
    divContenedor.appendChild(modoMarcador)
    divContenedor.appendChild(desenlaceMarcador)

    contenedorMarcadores.prepend(divContenedor)
}

export { mostrarMarcadores }
