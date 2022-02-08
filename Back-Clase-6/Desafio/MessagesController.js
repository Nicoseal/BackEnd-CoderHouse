const fs = require('fs');

class Mensajes {
    constructor() {
        this.file_name = "messages.txt";
        try {
            fs.readFileSync(this.file_name);
        } catch {
            fs.writeFileSync(this.file_name, "");
        }
    }

    add(obj) {
        const miArchivo = fs.readFileSync(this.file_name);
        let arr = [];
        if (miArchivo.length > 0)
            arr = JSON.parse(miArchivo);
        arr.push(obj);
        fs.writeFileSync(this.file_name, JSON.stringify(arr, null, 2));
    }

    getAll() {
        const miArchivo = fs.readFileSync(this.file_name);
        if (miArchivo.length <= 0)
            return [];
        return JSON.parse(miArchivo);
    }
}

module.exports = Mensajes;