const Joi = require("joi");
let nombre = Joi.string().min(3);
let apellido = Joi.string().min(3);
let edad = Joi.number().min(3);
let dni = Joi.string().min(3);
let curso = Joi.string().min(3);
let nota = Joi.number().min(3);
let ingreso = Joi.boolean();

const estudiantesSchema = {
    nombre: nombre.required(),
    apellido: apellido.required(),
    dni: dni.required(),
    curso: curso.required(),
    nota: nota.required()
}


module.exports = {
    estudiantesSchema
}