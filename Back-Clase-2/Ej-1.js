class Letras{
    constructor(timer, fn){
        this.timer = timer;
        this.fn = fn;
        this.myInterval = 0;
    }
    mostrarLetras(palabra){
        let caracteres = palabra.split('');
        let countCaracteres = 0;
        this.myInterval = setInterval(()=>{
            if(countCaracteres == caracteres.length){
                this.stop();
                this.fn();
                return;
            }
            console.log(caracteres[countCaracteres]);
            countCaracteres++;
        }, this.timer);
    }
    stop(){
        clearInterval(this.myInterval);
    }
}

const fin = () => console.log(`Terminé!`);

const lt1 = new Letras(0, fin);
const lt2 = new Letras(250, fin);
const lt3 = new Letras(500, fin);
const lt4 = new Letras(1000, fin);

lt1.mostrarLetras("Rodrigo");
lt2.mostrarLetras("Nicolas");
lt3.mostrarLetras("Esteban");
lt4.mostrarLetras("Junior");


// ["R", "o", "d", "r", "i", "g", "o"];
