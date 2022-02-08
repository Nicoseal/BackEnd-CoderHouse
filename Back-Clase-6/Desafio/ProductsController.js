class Productos {
    constructor() {
        this.productos = [];
    }

    getAll() {
        return this.productos;
    }

    add(obj) {
        if(this.productos.length <= 0)
            obj.id = 1;
        else
            obj.id = this.productos[this.productos.length-1].id + 1;
        this.productos.push(obj);
    }
}

module.exports = Productos;