//Datos globales
const audio = document.getElementById("fondo");
let estadoMusica

//Para que suene. Esto lo tuve que buscar
function reproducirSegmento(inicio, duracion) {
    const sonido = document.getElementById('sonidoClickTablero')
    // Detiene cualquier reproducción anterior
    sonido.pause()
    sonido.currentTime = inicio
    sonido.play()

    // Limpia cualquier evento anterior
    sonido.removeEventListener('timeupdate', detener)

    // Define la función de corte
    function detener() {
        if (sonido.currentTime >= inicio + duracion) {
            sonido.pause()
            sonido.removeEventListener('timeupdate', detener)
        }
    }

    // Añade el evento para cortar el sonido
    sonido.addEventListener('timeupdate', detener)
}

const inicio = 2.7
const duracion = 1

function clickBotones() {
    const sonido = document.getElementById('sonidoClickBoton')

    sonido.pause()
    sonido.currentTime = inicio
    sonido.play()
    sonido.addEventListener('timeupdate', detener)
}

function detener() {
    const sonido = document.getElementById('sonidoClickBoton')
    if (sonido.currentTime >= inicio + duracion) {
        sonido.pause()
        sonido.removeEventListener('timeupdate', detener)
    }
}

function ganaAzul() {
    const pintarPantalla = document.getElementById("pintarPantalla");
    pintarPantalla.classList.add("activeBlue");
    setTimeout(() => {
        pintarPantalla.classList.remove("activeBlue");
    }, 2000);
}
function ganaRojo() {
    const pintarPantalla = document.getElementById("pintarPantalla");
    pintarPantalla.classList.add("activeRed");
    setTimeout(() => {
        pintarPantalla.classList.remove("activeRed");
    }, 2000);
}

function musicaFondo() {
    if (estadoMusica) {
        pausarMusica();
        estadoMusica = false;
    } else {
        reproducirMusica();
        estadoMusica = true;
    }
}

function reproducirMusica() {
    if (!audio) {
        console.warn("No se encontró el elemento con id 'fondo'");
        return;
    }

    audio.volume = 0.1;

    if (audio.paused) {
        audio.play().catch(err => {
            console.warn("No se pudo reproducir el audio:", err);
        });
    }
}

function pausarMusica() {
    if (audio && !audio.paused) {
        audio.pause();
    }
}


export { reproducirSegmento, clickBotones, ganaAzul, ganaRojo, musicaFondo, reproducirMusica}