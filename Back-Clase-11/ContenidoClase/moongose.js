let { mongoose } = require("./config/mongoDB");
let { Schema, model } = mongoose;
// let Estudianteschema = require("./models/schemas/estudiante");
// console.log(Estudianteschema);
const Estudianteschema = new Schema({
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    edad: { type: Number, require: true },
    dni: { type: String, require: true },
    curso: { type: String, require: true },
    nota: { type: Number, require: true },
    ingreso: { type: Boolean, require: true }
  });
let estudianteSchemaModel = new Schema(Estudianteschema);
let EstudianteModel = new model('estudiantes', estudianteSchemaModel);
const estudiantes = [
    { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
    { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
    { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
    { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
    { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
    { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
    { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
    { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
    { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
    { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 },
    { nombre: 'Nuria', apellido: 'Braiza', edad: 28, dni: '3792346012213123', curso: '2A', nota: 8 }
];

// PUNTO 1 INSERCCION

(async ()=>{
    try {
        const inserciones = [];
        for (const estudiante of estudiantes) {
            inserciones.push(EstudianteModel.create(estudiante));
        }
        const result = await Promise.allSettled(inserciones);
        let rejected = result.filter(element => element.status == "rejected");
        // console.log(result);
        console.log("---------------------------");
        if(rejected.length > 0){
            console.log("Veeee, algo falló!");
        }else{
            console.log("Tooodo bien!")
        }
    } catch (error) {
        console.log(error);
    }
})();


// READ
(async ()=>{
    try {
        // A) 
        // let res = await EstudianteModel.find({}).sort({nombre: 1});

        // B) 
        // let res = await EstudianteModel.find({}).sort({edad: 1, '_id': 1}).limit(1);

        // C) 
        // let res = await EstudianteModel.find({curso: "2A"});

        // D)
        // let res = await EstudianteModel.find({}).sort({edad: 1, '_id': 1}).limit(1).skip(1);

        // E)
        // let res = await EstudianteModel.find({}, {nombre:1, apellido:1, curso:1, '_id':0}).sort({apellido: -1, '_id': 1});

        // F)
        // let res = await EstudianteModel.find({nota: 10}, {nombre:1, apellido:1, curso:1, '_id':0, nota:1});

        // G)
        // let res_g = await EstudianteModel.find({}, {nota:1, '_id':0});
        // let res = (res_g.reduce((prev,current)=> prev + current.nota, 0)) / res_g.length;

        // H)
        // let res_H = await EstudianteModel.find({curso: '1A'}, {nota:1, '_id':0});
        // let res = (res_H.reduce((prev,current)=> prev + current.nota, 0)) / res_H.length;

        // I) 
        // let res = await EstudianteModel.aggregate([
        //     { $match: { 'curso': '1A'}},
        //     { $group: { _id: null, promedio_1A: { $avg: '$nota' }}},
        //     { $project: { '_id': 0, 'promedio_1A': 1 } }
        // ])
    
        // console.log(res);
    } catch (error) {
        console.log(error);
    }
});



// CRUD
(async ()=>{
    try {
        // A) 
        // let res = await EstudianteModel.updateOne({nombre: 'Lucas'}, {dni: 20355875}).sort({nombre: 1});

        // B) 
        // let res = await EstudianteModel.updateMany({},{$set:{"ingreso":false}});


        // C) 
        // let res = await EstudianteModel.updateMany({'curso': '1A'}, {$set: {ingreso: true}})


        // D)
        // let res = await EstudianteModel.find({nota:{$gte:4}}, {_id:0, __v:0});

        // E)
        // let res = await EstudianteModel.find({ingreso: true}, {_id:0, __v:0});

        // F)
        // let res = await EstudianteModel.deleteMany({ingreso: true});

        // G)
        let res = await EstudianteModel.find({}, {__v:0});
        res.forEach(estudiante => {
            console.log(estudiante, new Date(estudiante._id.getTimestamp()).toLocaleString()            );
        });
        // console.log(res);
    } catch (error) {
        console.log(error);
    }
})


console.log("Init...");