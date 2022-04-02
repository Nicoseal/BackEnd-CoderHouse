require("dotenv").config();

let config = {
    port: process.env.PORT || 3030,
}

module.exports = { config }