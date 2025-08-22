import { getUser, createUser, deleteUser, updateUser } from "../services/CRUD_Usuarios.js"

//Datos globales
const mostrarUsuarios = document.getElementById("mostrarUsuarios")
const loginExito = document.getElementById("loginExito")
document.getElementById("agregarUsuario").addEventListener("click", crearUsuario)

//Función para crear al usuario
async function crearUsuario() {
    const inputUsuario = document.getElementById("inputUsuario")
    const inputPassword = document.getElementById("inputPassword")

    if (inputUsuario.value.trim() && inputPassword.value.trim()) {
        let nuevoUsuario = {
            nombre: inputUsuario.value.toLowerCase().replace(/\s+/g, ''),
            password: inputPassword.value,
        }
        await createUser(nuevoUsuario)
    } else {
        console.warn("Ingrese un nombre y contraseña válidos")
    }
}

function limpiarUsuario() {
    mostrarUsuarios.innerHTML = ""
}

function cargarInicio() {
    const validados = parseInt(localStorage.getItem("estadoAdmin"))
    if (validados === 2) {
        mostrarUsuario()
        console.log("Estado actual:", validados)
        return
    } else if (validados === 1) {
        limpiarUsuario()
        console.log("Estado actual:", validados)
        return
    }
}

const btnLogin = document.getElementById("inicioSesion")
btnLogin.addEventListener("click", validarLogin)

async function validarLogin(e) {
    e.preventDefault()

    const nombreInput = document.getElementById("nombreLogin").value.trim().toLowerCase().replace(/\s+/g, '')
    const passwordInput = document.getElementById("passwordLogin").value.trim()

    if (!nombreInput || !passwordInput) {
        console.warn("Por favor, ingrese nombre y contraseña")
        return
    }

    const usuarios = await getUser()
    const usuarioValido = usuarios.find(usuario =>
        usuario.nombre === nombreInput && usuario.password === passwordInput
    )

    if (usuarioValido) {
        localStorage.setItem("estadoAdmin", usuarioValido.esAdmin)
        window.location.href = "./juego.html"
    } else {
        console.warn("Usuario o contraseña incorrectos")
    }
}

export { cargarInicio }
