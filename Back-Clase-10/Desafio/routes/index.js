let productsController = require("../src/controllers/ProductsController");
let cartsController = require("../src/controllers/CartsController");
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
    routerCarr.post('/', cartsController.create)
    routerCarr.delete('/:id', cartsController.deleteById)
    routerCarr.get('/:id/productos', cartsController.getProds)
    routerCarr.post('/:id/productos/:id_prod', cartsController.addProd)
    routerCarr.delete('/:id/productos/:id_prod', cartsController.deleteProd)
}