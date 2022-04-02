let testingService = require("../services/clase11Service");
class Testing {
    async test(req, res, next) {
        try {
            let { cant } = req.query;
            if(!cant) cant = 10;            
            let response = await testingService.getUsers(Number(cant));
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }

    async popular(req, res, next) {
        try {
            let { cant } = req.query;
            if(!cant) cant = 50;            
            let response = await testingService.popular(Number(cant));
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }

    async get(req, res, next) {
        try {
            let { id } = req.params;
            if(id) id = Number(id);            
            let response = await testingService.get(id);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }

    async update(req, res, next) {
        try {
            let { id } = req.params;
            if(!id) throw new Error("No enviaste el identificador");              
            let response = await testingService.update(Number(id), req.body);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }

    async delete(req, res, next) {
        try {
            let { id } = req.params;
            if(!id) throw new Error("No enviaste el identificador");          
            let response = await testingService.delete(Number(id));
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }

    
}

module.exports = new Testing();