const { faker } = require('@faker-js/faker');
const express = require("express");
const moment = require("moment");
let path = require("path");
let cors = require("cors");

const {Server: HttpServer} = require("http");
let {Server:SocketIO} = require("socket.io");

let {config} = require("./config");
let db_maria = require("./config/mariaDB");
let db_sqlite = require("./config/sqlite");
let users = require("./UsersController");

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

// Functions MariaDB
(async () => {
    try {
        let exist = await db_maria.schema.hasTable("products");
        if(!exist) {
            await db_maria.schema.createTable("products", table => {
                table.increments("id").primary(),
                table.string("title"),
                table.float("price"),
                table.string("thumbnail")
            });
        } else {
            console.log("This table already exists, MariaDB");
        }
    } catch (error) {
        console.log(error);
    }
})();

async function addProduct(data) {
    try {
        await db_maria.from("products").insert(data);
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
        let response = await db_maria.from("products");
        response = JSON.parse(JSON.stringify(response));
        return response;
    } catch(e) {
        console.log(e);
        throw e;
    }
};

// Functions Sqlite3
(async () => {
    try {
        let exist = await db_sqlite.schema.hasTable("messages");
        if(!exist) {
            await db_sqlite.schema.createTable("messages", table => {
                table.increments("id").primary(),
                table.string("email"),
                table.string("message"),
                table.string("date")
            });
        } else {
            console.log("This table already exists, Sqlite");
        }
    } catch (error) {
        console.log(error);
    }
})();

async function addMessage(data) {
    try {
        await db_sqlite.from("messages").insert(data);
        getMessages().then(result => {
            io.sockets.emit("reload_messages", result);
        }).catch(error => {
            console.log(error);
        });
    } catch(e) {
        console.log(e);
        throw e;
    }
};

async function getMessages() {
    try {
        let response = await db_sqlite.from("messages");
        response = JSON.parse(JSON.stringify(response));
        return response;
    } catch(e) {
        console.log(e);
        throw e;
    }
};

// Test Functions
function getFakeProds() {
    let ans = [];
    for (let i = 0; i < 5; i++) {
        let prod = {
            "id": faker.datatype.number(),
            "title": faker.commerce.product(),
            "price": parseFloat(faker.commerce.price()),
            "thumbnail": faker.image.image(),
        };
        ans.push(prod);
    }
    return ans;
};

// Connections
app.get("/", (req, res) => res.render("index"));
app.get("/test", (req, res) => res.render("faker", {faked: getFakeProds()}));

io.on("connection", socket => {
    getProducts().then(result_prods => {
        getMessages().then(result_msg => {
            socket.emit('init', [result_prods, result_msg]);
        }).catch(err => {
            console.log(err);
        });
    }).catch(error => {
        console.log(error);
    });

    socket.on("save_product", data => addProduct(data));

    socket.on("new_message", data => {
        if(users.exist(data.email)) {
            if(users.isValid(data.email, socket.id))
                addMessage({...data, date: moment().format("DD/MM/YYYY HH:MM:SS")});
            else
                socket.emit("error", `El usuario ${data.email} ya está en uso`);
        } else {
            users.create({email:data.email, id:socket.id, status:"active"});
            addMessage({...data, date: moment().format("DD/MM/YYYY HH:MM:SS")});
        }      
    });
});

const server = http.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
server.on("error", error => console.log(error));
