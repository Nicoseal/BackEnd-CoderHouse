class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.apellido}, ${this.nombre}`
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(name, author) {
        this.libros.push({nombre: name, autor: author});
    }

    getBookNames() {
        return this.libros.map(({nombre}) => nombre);
    }
}

// TEST
const usuario = new Usuario("Nicolas", "Ventieri", [], []);
console.log(usuario.getFullName());     //Primer Metodo
console.log(usuario.countMascotas());   //Tercer Metodo
usuario.addMascota("Alex");             //Segundo Metodo
console.log(usuario.countMascotas());   //Tercer Metodo
usuario.addBook("La Prueba", "Nicolas");   //Cuarto Metodo
console.log(usuario.getBookNames());    //Quinto Metodo