const express = require("express");
const Productos = require('./ProductsController.js');
const app = express();
const {Router} = express;

const PORT = 8080;
const router = new Router();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let productos = new Productos('productos.txt');

router.get('/', (req, res) => {
    res.send(productos.getAll());
})

router.get('/:id', (req, res) => {
    let ans = productos.getById(req.params.id);
    if(ans == -1)
        res.send({error: "producto no encontrado"});
    else
        res.send(ans);
})

router.post('/', (req, res) => {
    let new_prod = productos.add(req.body);
    res.send(new_prod);
})

router.put('/:id', (req, res) => {
    let ans = productos.modif(req.params.id, req.body);
    if(ans == -1)
        res.send({error: "producto no encontrado"});
    else
        res.send(ans);
})

router.delete('/:id', (req, res) => {
    let ans = productos.deleteById(req.params.id);
    if(ans == -1)
        res.send({error: "producto no encontrado"});
    else
        res.send(ans);
})

app.use('/api/productos', router);

const server = app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
server.on("error", error => console.log(error));
