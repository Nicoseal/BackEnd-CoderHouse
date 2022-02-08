class Usuarios {
    constructor() {
        this.usuarios = [];
    }

    exist(email) {
        if(this.usuarios.length < 1)
            return false;
        for (let x = 0;x < this.usuarios.length; x++)
            if (this.usuarios[x].email == email)
                return true;
        return false;
    }

    /* En esta parte se le podria agregar una verificacion con contraseña en caso de que el usuario
    este inactivo para verificar la identidad del usuario*/
    isValid(email, sender_id) {
        if(this.usuarios.length < 1)
            return false;
        for (let x = 0;x < this.usuarios.length; x++)
            if (this.usuarios[x].email == email)
                if (this.usuarios[x].id == sender_id)
                    return true;
                else
                    if (this.usuarios[x].status != "active") {
                        this.usuarios[x].id = sender_id;
                        this.usuarios[x].status = "active";
                        return true
                    }
        return false;
    }

    create(obj) {
        this.usuarios.push(obj);
    }
}

module.exports = Usuarios;