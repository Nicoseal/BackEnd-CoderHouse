const express = require("express");
let path = require("path");
let cors = require("cors");

const {Server: HttpServer} = require("http");
let {Server:SocketIO} = require("socket.io");

let {config} = require("./config");
let db_knex = require("./config/database");

let app = express();
let PORT = config.port;
let http = new HttpServer(app);
let io = new SocketIO(http);

const products = require('./ProductsController.js');
const users = require('./UsersController.js');
const messages = require('./MessagesController.js');

// Middlewares
app.use(cors("*"));

// Settings
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");

// Connections
app.get("/", (req, res, next) => res.render("index"));

io.on("connection", socket => {
    socket.emit('init', [products.getAll(), products.getAll()]);

    socket.on("save_product", data => {
        products.add(data);
        io.sockets.emit("reload_products", products.getAll())
    });

    socket.on("new_message", data => {
        if(users.exist(data.email)) {
            if(users.isValid(data.email, socket.id)) {
                messages.add({...data, date: moment().format("DD/MM/YYYY HH:MM:SS")});
                io.sockets.emit("reload_messages", messages.getAll())
            } else {
                socket.emit("error", `El usuario ${data.email} ya está en uso`);
            }
        } else {
            users.create({email:data.email, id:socket.id, status:"active"});
            messages.add({...data, date: moment().format("DD/MM/YYYY HH:MM:SS")});
            io.sockets.emit("reload_messages", messages.getAll());
        }      
    });
});

const server = http.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
server.on("error", error => console.log(error));
