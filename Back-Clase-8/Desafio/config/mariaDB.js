let {db} = require("./index");
let knex = require("knex");

var mysql = knex ({
    client: 'mysql',
    connection: {
        ...db
    },
    pool: { min: 0, max: 7 }
});

class Database {
    static client;
    constructor() {
        if(Database.client) {
            return Database.client;
        }
        Database.client = mysql;
        this.client = Database.client;
    }
}

module.exports = new Database().client;
