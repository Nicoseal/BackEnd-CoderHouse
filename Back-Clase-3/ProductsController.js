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

    size() {
        const miArchivo = fs.readFileSync(this.file_name);
        return JSON.parse(miArchivo).length;
    }
}

module.exports = Contenedor;