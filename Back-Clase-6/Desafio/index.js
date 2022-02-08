const express = require("express");
let moment = require("moment");
let app = express();
let path = require("path");
let {Server: HttpServer} = require("http");
let {Server:SocketIO} = require("socket.io");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");

const Productos = require('./ProductsController.js');
const Usuarios = require('./UsersController.js');
const Mensajes = require('./MessagesController.js');
let productos = new Productos();
let users = new Usuarios();
let mensajes = new Mensajes();

app.get("/", (req, res, next) => res.render("index"));

let http = new HttpServer(app);
let io = new SocketIO(http);

io.on("connection", socket => {
    socket.emit('init', [productos.getAll(), mensajes.getAll()]);

    socket.on("save_product", data => {
        productos.add(data);
        io.sockets.emit("reload_products", productos.getAll())
    });

    socket.on("new_message", data => {
        if(users.exist(data.email)) {
            if(users.isValid(data.email, socket.id)) {
                mensajes.add({...data, date: moment().format("DD/MM/YYYY HH:MM:SS")});
                io.sockets.emit("reload_messages", mensajes.getAll())
            } else {
                socket.emit("error", `El usuario ${data.email} ya está en uso`);
            }
        } else {
            users.create({email:data.email, id:socket.id, status:"active"});
            mensajes.add({...data, date: moment().format("DD/MM/YYYY HH:MM:SS")});
            io.sockets.emit("reload_messages", mensajes.getAll());
        }      
    });
});

const server = http.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
server.on("error", error => console.log(error));
