const express = require("express");
let { config } = require("./config");
let fs = require("fs");
let pug = require("pug");
const app = express();
const PORT = config.port;

app.set("views", "./views/pug");
app.set("view engine", "pug");

app.get("/datos", (req, res, next)=>{
    let { min, max, nivel, titulo} = req.query;
    
    res.render("medidor", req.query);
})

app.listen(PORT, err=>{
    console.log(`Server on http://localhost:${PORT} ||| Clase ${config.class}`);
})