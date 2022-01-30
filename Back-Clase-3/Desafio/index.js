const express = require("express");
const Contenedor = require('./ProductsController.js')

const app = express();
const PORT = 8080;

let cont = new Contenedor('./productos.txt');

app.get("/", (req, res, next) => res.send(`<h1>¿Que ondaa? Bienvenido a mi proyecto de la clase 3</h1><p>Att. Nicolas Ventieri</p>`))

app.get("/productos", (req, res, next) => {
    let ans = cont.getAll();
    res.json(ans);
})

app.get("/productoRandom", (req, res, next) => {
    let num = Math.floor(Math.random() * cont.size()) + 1;
    let ans = cont.getById(num);
    res.json(ans);
})

const server = app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))

server.on("error", error => console.log(error))