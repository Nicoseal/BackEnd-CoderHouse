const express = require("express");
let app = express();
const PORT = 8080;

let path = require("path");
let {Server: HttpServer} = require("http");
let {Server:SocketIO} = require("socket.io");

const Productos = require('./ProductsController.js');

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let productos = new Productos();

app.get("/", (req, res, next) => {
    let products = productos.getAll();
    res.render("index", {products});
})

const server = app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
server.on("error", error => console.log(error));
