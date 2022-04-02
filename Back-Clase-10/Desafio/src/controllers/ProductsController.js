let moment = require("moment");
const fs = require('fs');

const file_name = "./src/DB/products.txt";
let admin = true;

class Products {
    constructor() {
        try {
            fs.readFileSync(file_name);
        } catch {
            fs.writeFileSync(file_name, "");
        }
    }

    add(req, res) {
        if (admin) {
            let obj = req.body
            const miArchivo = fs.readFileSync(file_name);
            let arr = [];

            if (miArchivo.length > 0)
                arr = JSON.parse(miArchivo);
            if(arr.length < 1)
                obj.id = 1;
            else
                obj.id = arr[arr.length-1].id + 1;
            obj.timestamp = Date.now();
            arr.push(obj);
            fs.writeFileSync(file_name, JSON.stringify(arr, null, 2));
            res.send(obj);
        }
        else
            res.send({error: -1, description: `route /api/productos method POST not authorized`});
    }

    getAll(req, res) {
        const miArchivo = fs.readFileSync(file_name);
        if (miArchivo.length < 1)
            return [];
        res.send(JSON.parse(miArchivo));
    }

    getById(req, res) {
        let id = req.params.id;
        const miArchivo = fs.readFileSync(file_name);
        if (miArchivo.length < 1)
            res.send({error: 404, description: "Producto no encontrado"});
        let arr = JSON.parse(miArchivo);
        for (let x = 0;x < arr.length && arr[x].id <= id; x++)
            if (arr[x].id == id)
                res.send(arr[x]);
        res.send({error: 404, description: "Producto no encontrado"});
    }

    modify(req, res) {
        let id = req.params.id;
        let obj = req.body;
        if (admin) {
            const miArchivo = fs.readFileSync(this.file_name);
            if (miArchivo.length < 1)
                res.send({error: 404, description: "Producto no encontrado"});
            let arr = JSON.parse(miArchivo);
            for (let x = 0;x < arr.length && arr[x].id <= id; x++)
                if (arr[x].id == id) {
                    for (var [key, value] of Object.entries(obj))
                        if(value != "")
                            arr[x][key] = value;
                    res.send(arr[x]);
                }
            res.send({error: 404, description: "Producto no encontrado"});
        } else
            res.send({error: -1, description: `route /api/productos method PUT not authorized`})
    }

    deleteById(req, res) {
        let id = req.params.id;
        if (admin) {
            const miArchivo = fs.readFileSync(this.file_name);
            if (miArchivo.length < 1)
                res.send({error: 404, description: "Producto no encontrado"});
            let arr = JSON.parse(miArchivo);
            for (let x = 0;x < arr.length && arr[x].id <= id; x++)
                if (arr[x].id == id) {
                    let deleted = arr.splice(x, 1);
                    fs.writeFileSync(this.file_name, JSON.stringify(arr, null, 2));
                    res.send(deleted);
                }
            res.send({error: 404, description: "Producto no encontrado"});
        } else
            res.send(fancyError(-1,"/api/productos", "DELETE"));
    }
}

module.exports = new Products();