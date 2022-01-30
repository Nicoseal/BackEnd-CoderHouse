const express = require("express");
let { config } = require("./config");
let fs = require("fs");
const hbs = require("express-handlebars");
const app = express();
const PORT = config.port;

app.engine("handlebars", hbs.engine());
app.set("views", "./views/hbs");
app.set("view engine", "handlebars");

app.get("/", (req, res, next)=>{
    // let data = {
    //     titulo: "Harry Potter y la piedra filosofal",
    //     mensaje: "Harry Potter y la piedra filosofal es el primer volumen de la ya clásica serie de novelas fantásticas de la autora británica J.K. Rowling",
    //     autor: "J. K. Rowling",
    //     version: 1
    // }

    let data = {
        nombre: 'Mauro 237-5',
        apellido: 'Di Cesare',
        edad: 27,
        email: "maudo@dicesare.com",
        telefono: "312-1231212"
    }
    
    res.render("index", data);
})

app.listen(PORT, err=>{
    console.log(`Server on http://localhost:${PORT} ||| Clase ${config.class}`);
})