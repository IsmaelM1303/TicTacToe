//Esta es la función que lee los usuarios
async function getUser() {
    try {
        const response = await fetch('http://localhost:3001/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const usuarios = await response.json()
        return usuarios

    } catch (error) {
        console.log("Ocurrió un error al obtener el usuario" + error)
    }
}

//Esta es la función que crea los usuarios
async function createUser(nuevoUsuario) {
    try {
        const response = await fetch('http://localhost:3001/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
        })

        const usuarios = await response.json()
        return usuarios

    } catch (error) {
        console.log("Ocurrió un error al crear el usuario" + error)
    }
}

//Esta es la función que elimina los usuarios
async function deleteUser(id) {
    try {
        const url = 'http://localhost:3001/usuarios/' + id
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    } catch (error) {
        console.log("Hubo un error al eliminar el usuario", error);

    }
}

//Esta es la función que actualiza los usuarios
async function updateUser(id, datosActualizados) {
    try {
        const url = 'http://localhost:3001/usuarios/' + id
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosActualizados)
        })
    } catch (error) {
        console.log("Hubo un error al modificar el usuario", error)
    }
}

//--------------------------------------------Esto es para la validación-----------------------------------------------
//Esta es la funcion que obtiene el dato de validación
async function getValidacion() {
    try {
        const response = await fetch('http://localhost:3001/usuarios/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const validacion = await response.json()
        console.log(validacion);
        
        return validacion

    } catch (error) {
        console.log("Ocurrió un error al obtener la validacion" + error)
    }
}
//Esto exporta las funciones
export {getUser, createUser, deleteUser, updateUser}