// Importaciones
import { iniciarPvp } from "./casillas.js";
import { iniciarPve } from "./ia.js";
import { mostrarMarcadores } from "./marcadores.js";
import { musicaFondo, reproducirMusica } from "./funcionesExtra.js";

//Constantes globales
const btnPvp = document.getElementById("btnPvp")
const btnPve = document.getElementById("btnPve")
const btnMusic = document.getElementById("btnMusic")
const cerrarSesion = document.getElementById("cerrarSesion") 

btnPvp.addEventListener("click", iniciarPvp)
btnPve.addEventListener("click", iniciarPve)
btnMusic.addEventListener("click", musicaFondo)
cerrarSesion.addEventListener("click", function (){
    window.location.href = "/pages/index.html"
})



mostrarMarcadores()

window.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('header h1');
    const randomDuration = (Math.random() * 1.5 + 1).toFixed(2);
    h1.style.animation = `pulseGlow ${randomDuration}s infinite alternate ease-in-out`;

    const contenedor = document.getElementById("contenedorMarcadores");
    contenedor.scrollTop = 0
});


window.addEventListener('load', () => {
    document.addEventListener("click", () => {
        reproducirMusica();
        estadoMusica = true;
    }, { once: true });

});