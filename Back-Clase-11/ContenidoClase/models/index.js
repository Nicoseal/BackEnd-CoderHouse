let { mongoose } = require("../config/mongoDB");
let { Schema, model } = mongoose;
let Estudianteschema = require("./schemas/estudiante");
// console.log(Estudianteschema);
let estudianteSchema = new Schema(Estudianteschema);
// console.log(estudianteSchema);
const schema = new Schema({
    name: { type: String },
    nested: {
      firstName: { type: String },
      lastName: { type: String }
    }
  });
  
let EstudianteModel = new model('estudiante', schema);
// console.log("-------------------------------");
// console.log(EstudianteModel);
module.exports = {
    EstudianteModel
}

