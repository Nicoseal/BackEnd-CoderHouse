let testingController = require("./controllers/clase11Controller")
let { Router } = require("express");
let router = new Router();

module.exports = app =>{
    app.use("/testing", router);
    router.get("/test", testingController.test);
    router.get("/popular", testingController.popular);
    router.get("/", testingController.get);
    router.get("/:id([0-9]+)", testingController.get);
    router.delete("/:id([0-9]+)", testingController.delete);
    router.put("/:id([0-9]+)", testingController.update);
}