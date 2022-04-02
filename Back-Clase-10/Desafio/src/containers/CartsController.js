const fs = require('fs');

class Carritos {
    constructor() {
        this.file_name = "./src/DB/carts.txt";
        try {
            fs.readFileSync(this.file_name);
        } catch {
            fs.writeFileSync(this.file_name, "");
        }
    }

    create() {
        const miArchivo = fs.readFileSync(this.file_name);
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
        fs.writeFileSync(this.file_name, JSON.stringify(arr, null, 2));
        return new_cart.id;
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

    addProd(id, prod) {
        const miArchivo = fs.readFileSync(this.file_name);
        if (miArchivo.length < 1)
            return -1;
        let arr = JSON.parse(miArchivo);
        for (let x = 0;x < arr.length && arr[x].id <= id; x++)
            if (arr[x].id == id) {
                arr[x].productos.push(prod);
                return arr[x];
            }
        fs.writeFileSync(this.file_name, JSON.stringify(arr, null, 2));
        return -1;
    }

    getProds(id) {
        const miArchivo = fs.readFileSync(this.file_name);
        if (miArchivo.length < 1)
            return -1;
        let arr = JSON.parse(miArchivo);
        for (let x = 0;x < arr.length && arr[x].id <= id; x++)
            if (arr[x].id == id)
                return arr[x].productos;
        return -1;
    }

    deleteProd(id, id_prod) {
        const miArchivo = fs.readFileSync(this.file_name);
        if (miArchivo.length < 1)
            return -1;
        let arr = JSON.parse(miArchivo);
        for (let x = 0;x < arr.length && arr[x].id <= id; x++)
            if (arr[x].id == id) {
                for (let y = 0;y < arr[x].productos.length; y++) {
                    let deleted = arr[x].productos.splice(x, 1);
                    fs.writeFileSync(this.file_name, JSON.stringify(arr, null, 2));
                    return deleted;
                }
                return -2;
            }
        fs.writeFileSync(this.file_name, JSON.stringify(arr, null, 2));
        return -1;
    }
}

module.exports = Carritos;