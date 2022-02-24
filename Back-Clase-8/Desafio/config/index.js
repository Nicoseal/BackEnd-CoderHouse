require("dotenv").config();

let config = {
    dev: process.env.NODE_ENV !== 'prod',
    port: process.env.PORT
}

let db = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'clase8'
}


module.exports = { config, db }