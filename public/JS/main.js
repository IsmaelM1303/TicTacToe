// Importaciones
import { iniciarPvp } from "./casillas.js";
import { iniciarPve } from "./ia.js";
import { mostrarMarcadores } from "./marcadores.js";

//Constantes globales
const btnPvp = document.getElementById("btnPvp")
const btnPve = document.getElementById("btnPve")

//document.querySelectorAll(".casilla").
btnPvp.addEventListener("click", iniciarPvp)
btnPve.addEventListener("click", iniciarPve)


mostrarMarcadores()

window.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('header h1');
    const randomDuration = (Math.random() * 1.5 + 1).toFixed(2); 
    h1.style.animation = `pulseGlow ${randomDuration}s infinite alternate ease-in-out`;
})