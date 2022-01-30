const express = require("express");
let { config } = require("./config");
let fs = require("fs");
const app = express();
const PORT = config.port;

app.engine("gab", async (filePath, options, callback)=>{
    try {
        const content = await fs.promises.readFile(filePath, "utf-8");
        const rendered = content.toString()
            .replace("^^titulo$$", `${options.titulo}`)
            .replace("^^mensaje$$", `${options.mensaje}`)
            .replace("^^autor$$", `${options.autor}`)
            .replace("^^version$$", `${options.version}`);
            return callback(null, rendered);
    } catch (error) {
        return callback(new Error(error));
    }
});
app.set("views", "./views/custom");
app.set("view engine", "gab");

app.get("/", (req, res, next)=>{
    let data = {
        titulo: "Harry Potter y la piedra filosofal",
        mensaje: "Harry Potter y la piedra filosofal es el primer volumen de la ya clásica serie de novelas fantásticas de la autora británica J.K. Rowling",
        autor: "J. K. Rowling",
        version: 1
    }
    
    res.render("index", data);
})

app.listen(PORT, err=>{
    console.log(`Server on http://localhost:${PORT} ||| Clase ${config.class}`);
})