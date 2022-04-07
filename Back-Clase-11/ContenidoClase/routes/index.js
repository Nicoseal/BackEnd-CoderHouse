let clase11Api = require("../components/clase11");

module.exports = app =>{
    clase11Api(app);
    app.get("/", (req, res, next)=>{
        res.send("Todo ok!");
    })
}