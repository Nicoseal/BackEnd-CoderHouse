let express = require("express");
let cors = require("cors");
let { config } = require("./config");
let app = express();
let serverRoutes = require("./routes");


// Settings
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// Middlewares
app.use(cors(`${config.cors}`));

// Routes 
serverRoutes(app);

// Error handler

app.listen(config.port, err=>{
    console.log(`Server on http://localhost:${config.port}`);
})