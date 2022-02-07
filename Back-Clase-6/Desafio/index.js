const express = require("express");
let app = express();
let moment = require("moment");
let path = require("path");
let {Server: HttpServer} = require("http");
let {Server:SocketIO} = require("socket.io");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs")

app.use(express.static("./public"));

const Productos = require('./ProductsController.js');
let productos = new Productos();

app.get("/", (req, res, next) => {
    res.render("index");
})

let http = new HttpServer(app);
let io = new SocketIO(http);

io.on("connection", socket => {
    socket.emit('init', productos.getAll());

    socket.on("save_product", data => {
        productos.add(data);
        io.sockets.emit("reload_products", productos.getAll())
    })
})

const server = http.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
server.on("error", error => console.log(error));
