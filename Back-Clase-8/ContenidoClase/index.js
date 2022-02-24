const expres = require("express");
let {config} = require("./config");
let cors = require("cors");
let db_knex = require("./config/database");
let app = expres();
let PORT = config.port;

// Middlewares
app.use(cors("*"));

// Settings
app.use(expres.json());
app.use(expres.urlencoded({extended:true}));


// Route


// Punto Uno
(async () => {
    try {
        let existeTabla = await db_knex.schema.hasTable("articulos");
        if(!existeTabla){
            await db_knex.schema.createTable("articulos", table =>{
                table.increments("id").primary(),
                table.string("nombre"),
                table.string("codigo"),
                table.float("precio"),
                table.integer("stock")
            });
        }else{
            console.log("Esta tabla ya existe");
        }        
    } catch (error) {
        console.log(error);
    }
})();

// punto dos
(async () => {
    try {
        let data = [
            {  
                nombre: "Licuadora",
                codigo: "33E1K0",
                precio:"392.5",
                stock: 323
            },
            {
                nombre: "Calculadora",
                codigo: "AB123",
                precio:"15.5",
                stock: 25
            },
            { 
                nombre:"PlayStation 5", 
                codigo:"Gamer", 
                precio: "800.0", 
                stock: 1000
            },
            {
                nombre: "placa de video",
                codigo: "3577",
                precio:"230",
                stock: 25
            },
            {
                nombre: "brinquedos amaldiçoados",
                codigo: "8",
                precio:"122.5",
                stock: 10
            }
        ]
        let response = await db_knex.from("articulos").insert(data);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
});

// Punto 3
(async ()=>{
    try {
        let response = await db_knex.from("articulos");
        console.table(response);
    } catch (error) {
        console.log(error);
    }
});

// Punto 4
(async ()=>{
    try {
        let response = await db_knex.from("articulos").where("id","=",3).del();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
});


// // Punto 5
(async ()=>{
    try {
        let response = await db_knex.from("articulos").where("id","=",2).update({stock:0});
        console.log(response);
    } catch (error) {
        console.log(error);
    }
});

app.get("/", (req, res, next)=>{
    res.send("Todo Bien!");
})

app.listen(PORT, err=>{
    console.log(`Server on http://localhost:${PORT}`);
})