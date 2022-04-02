let productsController = require("../src/controllers/ProductsController")
const { faker } = require('@faker-js/faker');
let { Router } = require("express");
let routerProd = new Router();
let routerCarr = new Router();

module.exports = app =>{
    app.use('/api/productos', routerProd);
    app.use('/api/carrito', routerCarr);

    // Productos
    routerProd.get('/', productsController.getAll);
    routerProd.get('/:id', productsController.getById);
    routerProd.post('/', productsController.add);
    routerProd.put('/:id', productsController.modify);
    routerProd.delete('/:id', productsController.deleteById);

    // Carrito
    routerCarr.post('/', (req, res) => {
        res.send({id: carritos.create()});
    })

    routerCarr.delete('/:id', (req, res) => {
        let ans = carritos.deleteById(req.params.id);
        if(ans == -1)
            res.send({error: 405, description: "Carrito no encontrado"});
        else
            res.send(ans);
    })

    routerCarr.get('/:id/productos', (req, res) => {
        let ans = carritos.getProds(req.params.id);
        if(ans == -1)
            res.send({error: 405, description: "Carrito no encontrado"});
        else
            res.send(ans);
    })

    routerCarr.post('/:id/productos/:id_prod', (req, res) => {
        let prod = productos.getById(req.params.id_prod);
        if(prod == -1)
            res.send({error: 404, description: "Producto no encontrado"});
        let ans = carritos.addProd(req.params.id, prod);
        if(ans == -1)
            res.send({error: 405, description: "Carrito no encontrado"});
        else
            res.send(ans);
    })

    routerCarr.delete('/:id/productos/:id_prod', (req, res) => {
        let ans = carritos.deleteProd(req.params.id, req.params.id_prod);
        if(ans == -1)
            res.send({error: 405, description: "Carrito no encontrado"});
        else if(ans == -2)
            res.send({error: 404, description: "Producto no encontrado"});
        else
            res.send(ans);
    })

    app.get('/api/productos-test', (req, res) => {
        let ans = [];
        for (let i = 0; i < 5; i++) {
            let prod = {
                "name": faker.commerce.product(),
                "description": faker.lorem.paragraph(),
                "code": parseInt(faker.finance.amount()),
                "image": faker.image.image(),
                "price": parseFloat(faker.commerce.price()),
                "stock": parseInt(faker.finance.amount()),
                "id": i+1,
                "timestamp": parseInt(faker.datatype.number()**1.8)
            };
            ans.push(prod);
        }
        res.send(ans);
    })
}