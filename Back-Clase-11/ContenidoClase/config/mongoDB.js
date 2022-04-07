const mongoose = require("mongoose");
const { mongo_db } = require("./");

const MONGO_URI = `${mongo_db.uri}/${mongo_db.name}`;
const MONGO_ATLAS = `${mongo_db.mongo_atlas}`;

let connection;
(async ()=>{
    try {
        connection = await mongoose.connect(MONGO_ATLAS, {useNewUrlParser:true,useUnifiedTopology: true });
        console.log("Conexión establecida!");
    } catch (error) {
        console.log(error);
    }
})();


module.exports = { connection, mongoose }