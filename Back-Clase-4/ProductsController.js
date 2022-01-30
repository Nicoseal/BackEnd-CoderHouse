const fs = require('fs');

class Productos {
    constructor(file_name) {
        this.file_name = file_name;
        this.productos = [];
    }

    getAll() {
        return this.productos;
    }

    getById(id) {
        if(this.productos.length <= 0)
            return -1;
        for (let x = 0;x < this.productos.length && this.productos[x].id <= id; x++)
            if (this.productos[x].id == id)
                return this.productos[x];
        return -1;
    }

    add(obj) {
        if(this.productos.length <= 0)
            obj.id = 1;
        else
            obj.id = this.productos[this.productos.length-1].id + 1;
        this.productos.push(obj);
        return obj;
    }

    modif(id, obj) {
        if(this.productos.length <= 0)
            return -1;
        for (let x = 0;x < this.productos.length && this.productos[x].id <= id; x++)
            if (this.productos[x].id == id) {
                for (var [key, value] of Object.entries(obj))
                    if(value != "")
                        this.productos[x][key] = value;
                return this.productos[x];
            }
        return -1;
    }

    deleteById(id) {
        if(this.productos.length <= 0)
            return -1;
        for (let x = 0;x < this.productos.length && this.productos[x].id <= id; x++)
            if (this.productos[x].id == id)
                return this.productos.splice(x, 1);
        return -1;
    }
}

module.exports = Productos;