const express = require("express");
const { config } = require("./config");
const Productos = require('./ProductsController.js');
const Carritos = require('./CartController.js');

const {Router} = express;
const routerProd = new Router();
const routerCarr = new Router();
let app = express();
const PORT = config.port;
let productos = new Productos();
let carritos = new Carritos();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Super Validacion Admin
let admin = true;

// Funciones
function fancyError(code, route, method) {
    let ans = {
        error: code,
        description: `ruta ${route} metodo ${method} no autorizada`
    };
    return ans;
}

// Productos
routerProd.get('/', (req, res) => {
    res.send(productos.getAll());
})

routerProd.get('/:id', (req, res) => {
    let ans = productos.getById(req.params.id);
    if(ans == -1)
        res.send({error: 404, description: "Producto no encontrado"});
    else
        res.send(ans);
})

routerProd.post('/', (req, res) => {
    if (admin) {
        let new_prod = productos.add(req.body);
        res.send(new_prod);
    }
    else
        res.send(fancyError(-1,"/api/productos", "POST"))
})

routerProd.put('/:id', (req, res) => {
    if (admin) {
        let ans = productos.modify(req.params.id, req.body);
        if(ans == -1)
            res.send({error: 404, description: "Producto no encontrado"});
        else
            res.send(ans);
    }
    else
        res.send(fancyError(-1,"/api/productos", "PUT"))
})

routerProd.delete('/:id', (req, res) => {
    if (admin) {
        let ans = productos.deleteById(req.params.id);
        if(ans == -1)
            res.send({error: 404, description: "Producto no encontrado"});
        else
            res.send(ans);
    }
    else
        res.send(fancyError(-1,"/api/productos", "DELETE"))
})

// Carrito
routerCarr.get('/', (req, res) => {
    res.send(carritos.getAll());
})

// Router
app.use('/api/productos', routerProd);
app.use('/api/carrito', routerCarr);

const server = app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
server.on("error", error => console.log(error));