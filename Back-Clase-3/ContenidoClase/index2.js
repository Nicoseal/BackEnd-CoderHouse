const express = require("express");
const moment = require("moment");
const app = express();
const PORT = 3007;
let contador = 0;
app.get("/", (req, res, next)=>{
    res.send(`<h1 style="color:blue">Hola bienvenidos a su clase de Backend</h1>`);
})


app.get("/visitas", (req, res, next)=>{
    contador++;
    res.send(`Han visitado esta página ${contador} veces`);
})

app.get("/fyh", (req, res, next)=>{
    res.json({fyh: moment().format("DD/MM/YYYY HH:mm:SS")});
})



const server = app.listen(PORT, ()=>{
    console.log(`Server on http://localhost:${PORT}`);
})

server.on("error", error => console.log(error))