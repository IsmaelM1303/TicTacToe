// Importaciones
import {iniciarPvp} from "./casillas.js";
import { iniciarPve } from "./ia.js";
import { mostrarMarcadores } from "./marcadores.js";

//Constantes globales
const btnPvp = document.getElementById("btnPvp")
const btnPve = document.getElementById("btnPve")

//document.querySelectorAll(".casilla").
btnPvp.addEventListener("click", iniciarPvp)
btnPve.addEventListener("click", iniciarPve)


mostrarMarcadores()

