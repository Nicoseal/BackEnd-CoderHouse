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

// Middlewares
app.use(cors("*"));

// Settings
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");

// Functions
(async () => {
    try {
        let exist = await db_knex.schema.hasTable("products");
        if(!exist) {
            await db_knex.schema.createTable("products", table => {
                table.increments("id").primary(),
                table.string("title"),
                table.float("price"),
                table.string("thumbnail")
            });
        } else {
            console.log("This table already exists");
        }
    } catch (error) {
        console.log(error);
    }
})();

async function addProduct(data) {
    try {
        await db_knex.from("products").insert(data);
        getProducts().then(result => {
            io.sockets.emit("reload_products", result);
        }).catch(error => {
            console.log(error);
        });
    } catch(e) {
        console.log(e);
        throw e;
    }
};

async function getProducts() {
    try {
        let response = await db_knex.from("products");
        response = JSON.parse(JSON.stringify(response));
        return response;
    } catch(e) {
        console.log(e);
        throw e;
    }
};

// Connections
app.get("/", (req, res, next) => res.render("index"));

io.on("connection", socket => {
    getProducts().then(result => {
        socket.emit('init', [result, []/*messages.getAll()*/]);
    }).catch(error => {
        console.log(error);
    });

    socket.on("save_product", data => addProduct(data));

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
