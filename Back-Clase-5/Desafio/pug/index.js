const express = require("express");
const Productos = require('./ProductsController.js');
let pug = require("pug");
const app = express();
const PORT = 8080;

app.set("view engine", "pug");
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
