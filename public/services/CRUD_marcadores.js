//Esta es la función que lee los productos
async function getMarcador() {
    try {
        const response = await fetch('http://localhost:3001/marcador', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const productos = await response.json()
        return productos

    } catch (error) {
        console.log("Ocurrió un error al obtener el marcador" + error)
    }
}

//Esta es la función que crea los productos
async function createMarcador(nuevoMarcador) {
    try {
        const response = await fetch('http://localhost:3001/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoMarcador)
        })

        const productos = await response.json()
        return productos

    } catch (error) {
        console.log("Ocurrió un error al crear el marcador" + error)
    }
}

//Esta es la función que elimina los productos
async function deleteMarcador(id) {
    try {
        const url = 'http://localhost:3001/productos/' + id
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        location.reload()
    } catch (error) {
        console.log("Hubo un error al eliminar el marcador", error);

    }
}

//Esta es la función que actualiza los productos
async function updateMarcador(id, datosActualizados) {
    try {
        const url = 'http://localhost:3001/productos/' + id
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosActualizados)
        })
    } catch (error) {
        console.log("Hubo un error al modificar el marcador", error)
    }
}


//Esto exporta las funciones
export { getMarcador, createMarcador, deleteMarcador, updateMarcador }