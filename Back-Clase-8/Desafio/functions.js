async function createSchema() {
    try {
        let exist = await db_knex.schema.hasTable("productos");
        if(!exist) {
            await db_knex.schema.createTable("productos", table => {
                table.increments("id").primary(),
                table.string("nombre"),
                table.string("codigo"),
                table.float("precio"),
                table.integer("stock")
            });
        } else {
            console.log("Esta tabla ya existe");
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createSchema };