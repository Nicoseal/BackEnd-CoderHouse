const { faker } = require('@faker-js/faker');
let { schema, normalize, denormalize } = require("normalizr")
const express = require("express");
const moment = require("moment");
let path = require("path");
let cors = require("cors");
const fs = require('fs');

const {Server: HttpServer} = require("http");
let {Server:SocketIO} = require("socket.io");

let {config} = require("./config");

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

// Messages functions
async function save(msg) {
    try {
        const myFile = await fs.promises.readFile("./DB/messages.txt");
        let arr = [];
        msg.id = 1;
        if (myFile.length > 0)
        {
            arr = JSON.parse(myFile);
            msg.id = arr[arr.length-1].id + 1;
        }
        arr.push(msg);
        await fs.promises.writeFile("./DB/messages.txt", JSON.stringify(arr, null, 2))
        console.log('Escritura correcta');
    }
    catch(error) {
        console.log(error);
    }
}

async function getMessages() {
    try {
        const myFile = await fs.promises.readFile("./DB/messages.txt");
        if (myFile.length <= 0) {
            return null;
        }
        return JSON.parse(myFile);
    } catch(e) {
        console.log(e);
        throw e;
    }
}

// Faker Functions
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

// Normalizer
const user = new schema.Entity('authors');
const messageSchema = new schema.Entity('message', {
    author: user
});
const messagesSchema = new schema.Entity('messages', {
    messages: [messageSchema]
});

// Connections
app.get("/", (req, res) => res.render("index"));

io.on("connection", socket => {
    getMessages().then(result_msg => {
        let normalized = normalize({id: 'messages', messages: result_msg}, messagesSchema);
        let compression_value = 100 - parseInt(JSON.stringify(normalized).length * 100 / JSON.stringify(result_msg).length);
        socket.emit('init', [getFakeProds(), {value: normalized, compression: compression_value}]);
    }).catch(err => {
        console.log(err);
    });

    socket.on("new_message", data => {
        save({...data, date: moment().format("DD/MM/YYYY HH:MM:SS")});
        getMessages().then(result_msg => {
            let normalized = normalize({id: 'messages', messages: result_msg}, messagesSchema);
            let compression_value = 100 - parseInt(JSON.stringify(normalized).length * 100 / JSON.stringify(result_msg).length);
            socket.emit('reload_messages', {value: normalized, compression: compression_value});
        }).catch(err => {
            console.log(err);
        });
    });
});

const server = http.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
server.on("error", error => console.log(error));
