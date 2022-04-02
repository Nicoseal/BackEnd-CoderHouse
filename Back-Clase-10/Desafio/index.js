const express = require("express");
const { config } = require("./src/config");
let serverRoutes = require("./routes");

let app = express();
const PORT = config.port;

// Settings
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// Funciones
function fancyError(code, route, method) {
    let ans = {
        error: code,
        description: `ruta ${route} metodo ${method} no autorizada`
    };
    return ans;
}

// Routes
serverRoutes(app);

const server = app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
server.on("error", error => console.log(error));