const express = require("express");
const Productos = require('./ProductsController.js');
const app = express();

const PORT = 8080;
let personas = [];

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", "./views/ejs");

let productos = new Productos();

app.get("/", (req, res, next)=>{
    res.render("index", {personas});
})

app.post("/personas", (req, res, next)=>{
    personas.push(req.body);
    console.log(req.body);
    res.redirect("/")
})

const server = app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
server.on("error", error => console.log(error));
