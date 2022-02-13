let moment = require("moment");
const fs = require('fs');

class Productos {
    constructor() {
        this.file_name = "products.txt";
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
        if(arr.length < 1)
            obj.id = 1;
        else
            obj.id = arr[arr.length-1].id + 1;
        obj.timestamp = moment().format("DD/MM/YYYY HH:MM:SS");
        arr.push(obj);
        fs.writeFileSync(this.file_name, JSON.stringify(arr, null, 2));
        return obj;
    }

    getAll() {
        const miArchivo = fs.readFileSync(this.file_name);
        if (miArchivo.length < 1)
            return [];
        return JSON.parse(miArchivo);
    }

    getById(id) {
        const miArchivo = fs.readFileSync(this.file_name);
        if (miArchivo.length < 1)
            return -1;
        let arr = JSON.parse(miArchivo);
        for (let x = 0;x < arr.length && arr[x].id <= id; x++)
            if (arr[x].id == id)
                return arr[x];
        return -1;
    }

    modify(id, obj) {
        const miArchivo = fs.readFileSync(this.file_name);
        if (miArchivo.length < 1)
            return -1;
        let arr = JSON.parse(miArchivo);
        for (let x = 0;x < arr.length && arr[x].id <= id; x++)
            if (arr[x].id == id) {
                for (var [key, value] of Object.entries(obj))
                    if(value != "")
                        arr[x][key] = value;
                return arr[x];
            }
        return -1;
    }

    deleteById(id) {
        const miArchivo = fs.readFileSync(this.file_name);
        if (miArchivo.length < 1)
            return -1;
        let arr = JSON.parse(miArchivo);
        for (let x = 0;x < arr.length && arr[x].id <= id; x++)
            if (arr[x].id == id) {
                let deleted = arr.splice(x, 1);
                fs.writeFileSync(this.file_name, JSON.stringify(arr, null, 2));
                return deleted;
            }
        return -1;
    }
}

module.exports = Productos;