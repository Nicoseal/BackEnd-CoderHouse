const express = require("express");
const Productos = require('./ProductsController.js');
const hbs =  require('express-handlebars');
const app = express();
const PORT = 8080;

app.engine("handlebars", hbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let productos = new Productos();

app.get("/", (req, res, next) => {
    res.render("form");
})

app.get("/productos", (req, res, next) => {
    let products = productos.getAll();
    res.render("table", {products});
})

app.post("/productos", (req, res, next) => {
    productos.add(req.body);
    res.redirect("/")
})

const server = app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
server.on("error", error => console.log(error));
