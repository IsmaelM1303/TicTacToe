const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});

// Ruta específica para juego.html
app.get('/juego.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'juego.html'));
});

// Ruta para obtener usuarios desde json-server
app.get('/api/users', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error al obtener usuarios');
    }
});

// Escuchar en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
