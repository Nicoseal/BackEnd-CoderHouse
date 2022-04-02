require("dotenv").config();

let config = {
    port: process.env.PORT,
    cors: process.env.CORS
}

let mongo_db = {
    uri: process.env.MONGO_DB_URI,
    name: process.env.DB_NAME,
    mongo_atlas: process.env.MONGO_ATLAS
}

module.exports = { config, mongo_db };