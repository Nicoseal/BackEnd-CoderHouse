let faker = require("faker");
faker.locale = "es";
let respuesta = [];

class Testing {
    constructor(){
        this.nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana'];
        this.apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei'];
        this.colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta'];
    }
    async getUsers(cant) {
        try {
            for (let i = 0; i < cant; i++) {
                // const obj = {
                //     nombre: this.nombres[Math.floor(Math.random() * this.nombres.length)],
                //     apellido: this.apellidos[Math.floor(Math.random() * this.apellidos.length)],
                //     color: this.colores[Math.floor(Math.random() * this.colores.length)]
                // }
                const obj = {
                    id: i + 1,
                    nombre: faker.name.firstName(),
                    apellido: faker.name.lastName(),
                    color: faker.internet.color()
                }
                respuesta.push(obj);
            }
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }

    async popular(cant) {
        try {
            for (let i = 0; i < cant; i++) {
                const obj = {
                    id: i + 1,
                    nombre: faker.name.firstName(),
                    apellido: faker.name.lastName(),                    
                    email: faker.internet.email(),
                    photo:faker.image.fashion(),
                    website: faker.internet.domainName()
                }
                respuesta.push(obj);
            }
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }

    async get(id) {
        try {
            return id ? respuesta.filter(obj => obj.id == id) : respuesta;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj){
        try {
            respuesta = respuesta.map(user =>{
                if(user.id == id){
                    return {id, ...obj}
                }
                return user;
            })
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id){
        try {
            respuesta = respuesta.filter(obj => obj.id !== id);
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Testing();