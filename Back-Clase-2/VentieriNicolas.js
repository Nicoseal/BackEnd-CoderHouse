const fs = require('fs');

class Contenedor {
    constructor(file_name) {
        this.file_name = file_name
    }

    async save(obj) {
        try {
            const miArchivo = await fs.promises.readFile(this.file_name);
            let arr = [];
            obj.id = 1;
            if (miArchivo.length > 0)
            {
                arr = JSON.parse(miArchivo);
                obj.id = arr[arr.length-1].id + 1;
            }
            arr.push(obj);
            await fs.promises.writeFile(this.file_name, JSON.stringify(arr, null, 2))
            console.log('Escritura correcta');
        }
        catch(error) {
            console.log(error);
        }
    }

    getById(id) {
        const miArchivo = fs.readFileSync(this.file_name);
        if (miArchivo.length <= 0)
            return null;
        let arr = JSON.parse(miArchivo);
        for (let x = 0;x < arr.length && arr[x].id <= id; x++) {
            if (arr[x].id == id)
                return arr[x];
        }
        return null;
    }

    getAll() {
        const miArchivo = fs.readFileSync(this.file_name);
        if (miArchivo.length <= 0) {
            console.log("Archivo vacio...");
            return null;
        }
        return JSON.parse(miArchivo);
    }

    async deleteById(id) {
        try {
            const miArchivo = await fs.promises.readFile(this.file_name);
            if (miArchivo.length <= 0) {
                console.log("Archivo vacio...");
                return;
            }
            let arr = JSON.parse(miArchivo);
            for (let x = 0;x < arr.length && arr[x].id <= id; x++) {
                if (arr[x].id == id)
                    arr.splice(x, 1)
            }
            console.log('Eliminacion Satisfactoria, guardando...')
            await fs.promises.writeFile(this.file_name, JSON.stringify(arr, null, 2))
            console.log('Guardado correcto');
        }
        catch(error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file_name, "")
            console.log('Borrado Satisfactorio');
        }
        catch(error) {
            console.log(error);
        }
    }
}

// TESTS
class Usuario {
    constructor(nombre, apellido, promedio) {
        this.id = 0;
        this.nombre = nombre;
        this.apellido = apellido;
        this.promedio = promedio;
    }
}

let cont = new Contenedor('./productos.txt');
const usr = new Usuario("Nicolas", "Ventieri", 3);
cont.save(usr);
//cont.getAll();
//console.log(cont.getById(3));
//console.log(cont.getAll());
//cont.deleteById(4);
//cont.deleteAll();
