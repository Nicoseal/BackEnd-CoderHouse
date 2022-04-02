const fs = require('fs');

let file_name = "./src/DB/carts.txt";

class Cart {
    constructor() {
        try {
            fs.readFileSync(file_name);
        } catch {
            fs.writeFileSync(file_name, "");
        }
    }

    create(req, res) {
        const miArchivo = fs.readFileSync(file_name);
        let arr = [];
        let new_cart = {};
        if (miArchivo.length > 0)
            arr = JSON.parse(miArchivo);
        if(arr.length < 1)
            new_cart.id = 1;
        else
            new_cart.id = arr[arr.length-1].id + 1;
        new_cart.timestamp = Date.now();
        new_cart.productos = [];
        arr.push(new_cart);
        fs.writeFileSync(file_name, JSON.stringify(arr, null, 2));
        res.send({id: new_cart.id});
    }

    deleteById(req, res) {
        let id = req.params.id;
        const miArchivo = fs.readFileSync(file_name);
        if (miArchivo.length < 1)
            res.send({error: 405, description: "Cart not found"});
        let arr = JSON.parse(miArchivo);
        for (let x = 0;x < arr.length && arr[x].id <= id; x++)
            if (arr[x].id == id) {
                let deleted = arr.splice(x, 1);
                fs.writeFileSync(file_name, JSON.stringify(arr, null, 2));
                res.send(deleted);
            }
        res.send({error: 405, description: "Cart not found"});
    }

    addProd(req, res) {
        let id = req.params.id_prod;
        let prod;
        const prodsArchivo = fs.readFileSync("./src/DB/products.txt");
        if (prodsArchivo.length < 1)
            res.send({error: 404, description: "Producto no encontrado"});
        let arr = JSON.parse(prodsArchivo);
        for (let x = 0;x < arr.length && arr[x].id <= id; x++)
            if (arr[x].id == id)
                prod = arr[x];
        res.send({error: 404, description: "Producto no encontrado"});

        id = req.params.id;
        const miArchivo = fs.readFileSync(file_name);
        if (miArchivo.length < 1)
            res.send({error: 405, description: "Cart not found"});
        arr = JSON.parse(miArchivo);
        for (let x = 0;x < arr.length && arr[x].id <= id; x++)
            if (arr[x].id == id) {
                arr[x].productos.push(prod);
                res.send(arr[x]);
            }
        fs.writeFileSync(file_name, JSON.stringify(arr, null, 2));
        res.send({error: 405, description: "Cart not found"});
    }

    getProds(req, res) {
        let id = req.params.id;
        const miArchivo = fs.readFileSync(file_name);
        if (miArchivo.length < 1)
            res.send({error: 405, description: "Cart not found"});
        let arr = JSON.parse(miArchivo);
        for (let x = 0;x < arr.length && arr[x].id <= id; x++)
            if (arr[x].id == id)
                res.send(arr[x].productos);
        res.send({error: 405, description: "Cart not found"});
    }

    deleteProd(req, res) {
        let id = req.params.id;
        let id_prod = req.params.id_prod;
        const miArchivo = fs.readFileSync(file_name);
        if (miArchivo.length < 1)
            res.send({error: 405, description: "Cart not found"});
        let arr = JSON.parse(miArchivo);
        for (let x = 0;x < arr.length && arr[x].id <= id; x++)
            if (arr[x].id == id) {
                for (let y = 0;y < arr[x].productos.length; y++) {
                    let deleted = arr[x].productos.splice(x, 1);
                    fs.writeFileSync(file_name, JSON.stringify(arr, null, 2));
                    res.send(deleted);
                }
                res.send({error: 404, description: "Product not found"});
            }
        fs.writeFileSync(file_name, JSON.stringify(arr, null, 2));
        res.send({error: 405, description: "Cart not found"});
    }
}

module.exports = new Cart();