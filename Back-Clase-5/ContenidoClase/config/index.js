require("dotenv").config();

let config = {
    port: process.env.PORT || 3001,
    class: process.env.CLASE
}

let sockets = {

}

module.exports = { config, sockets }