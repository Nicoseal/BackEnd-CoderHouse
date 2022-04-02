let { schema, normalize, denormalize } = require("normalizr")
let inspect = require("./utils/inspect");
const holding = {
  id: "10000",
  empresas: [
    {
      id: "1000",
      nombre: "Coderhouse",
      gerente: {
        id: "2",
        nombre: "Pedro",
        apellido: "Mei",
        DNI: "20442639",
        direccion: "CABA 457",
        telefono: "1567811544"
      },
      encargado: {
        id: "3",
        nombre: "Pablo",
        apellido: "Blanco",
        DNI: "20442640",
        direccion: "CABA 458",
        telefono: "1567811545"
      },
      empleados: [
        {
          id: "1",
          nombre: "Nicole",
          apellido: "Gonzalez",
          DNI: "20442638",
          direccion: "CABA 456",
          telefono: "1567811543"
        },
        {
          id: "2",
          nombre: "Pedro",
          apellido: "Mei",
          DNI: "20442639",
          direccion: "CABA 457",
          telefono: "1567811544"
        },
        {
          id: "3",
          nombre: "Pablo",
          apellido: "Blanco",
          DNI: "20442640",
          direccion: "CABA 458",
          telefono: "1567811545"
        },
        {
          id: "4",
          nombre: "Ana",
          apellido: "Rojo",
          DNI: "20442641",
          direccion: "CABA 459",
          telefono: "1567811546"
        },
        {
          id: "5",
          nombre: "Lucia",
          apellido: "Sorbo",
          DNI: "20442642",
          direccion: "CABA 460",
          telefono: "1567811547"
        },
        {
          id: "6",
          nombre: "Jose",
          apellido: "Pieres",
          DNI: "20442643",
          direccion: "CABA 461",
          telefono: "1567811548"
        },
        {
          id: "7",
          nombre: "Maria",
          apellido: "Lopez",
          DNI: "20442644",
          direccion: "CABA 462",
          telefono: "1567811549"
        }
      ]
    },
    {
      id: "1001",
      nombre: "Coderhouse2",
      gerente: {
        id: "6",
        nombre: "Jose",
        apellido: "Pieres",
        DNI: "20442643",
        direccion: "CABA 461",
        telefono: "1567811548"
      },
      encargado: {
        id: "5",
        nombre: "Lucia",
        apellido: "Sorbo",
        DNI: "20442642",
        direccion: "CABA 460",
        telefono: "1567811547"
      },
      empleados: [
        {
          id: "1",
          nombre: "Nicole",
          apellido: "Gonzalez",
          DNI: "20442638",
          direccion: "CABA 456",
          telefono: "1567811543"
        },
        {
          id: "2",
          nombre: "Pedro",
          apellido: "Mei",
          DNI: "20442639",
          direccion: "CABA 457",
          telefono: "1567811544"
        },
        {
          id: "5",
          nombre: "Lucia",
          apellido: "Sorbo",
          DNI: "20442642",
          direccion: "CABA 460",
          telefono: "1567811547"
        },
        {
          id: "6",
          nombre: "Jose",
          apellido: "Pieres",
          DNI: "20442643",
          direccion: "CABA 461",
          telefono: "1567811548"
        },
        {
          id: "7",
          nombre: "Maria",
          apellido: "Lopez",
          DNI: "20442644",
          direccion: "CABA 462",
          telefono: "1567811549"
        },
        {
          id: "8",
          nombre: "Lucio",
          apellido: "Garcia",
          DNI: "20442645",
          direccion: "CABA 463",
          telefono: "1567811550"
        }
      ]
    },
    {
      id: "1002",
      nombre: "Coderhouse3",
      gerente: {
        id: "9",
        nombre: "Diego",
        apellido: "Sojo",
        DNI: "20442646",
        direccion: "CABA 464",
        telefono: "1567811551"
      },
      encargado: {
        id: "8",
        nombre: "Lucio",
        apellido: "Garcia",
        DNI: "20442645",
        direccion: "CABA 463",
        telefono: "1567811550"
      },
      empleados: [
        {
          id: "4",
          nombre: "Ana",
          apellido: "Rojo",
          DNI: "20442641",
          direccion: "CABA 459",
          telefono: "1567811546"
        },
        {
          id: "5",
          nombre: "Lucia",
          apellido: "Sorbo",
          DNI: "20442642",
          direccion: "CABA 460",
          telefono: "1567811547"
        },
        {
          id: "6",
          nombre: "Jose",
          apellido: "Pieres",
          DNI: "20442643",
          direccion: "CABA 461",
          telefono: "1567811548"
        },
        {
          id: "7",
          nombre: "Maria",
          apellido: "Lopez",
          DNI: "20442644",
          direccion: "CABA 462",
          telefono: "1567811549"
        },
        {
          id: "9",
          nombre: "Diego",
          apellido: "Sojo",
          DNI: "20442646",
          direccion: "CABA 464",
          telefono: "1567811551"
        }
      ]
    }      
  ]
}

const empleado = new schema.Entity('trabajador');


const organigrama = new schema.Entity('organigrama', {
    gerente: empleado,
    encargado: empleado,
    empleados: [empleado]
});


const holding_schema = new schema.Entity('holding', {
  empresas: [organigrama]
})

// Normalizacion
let resultado_normalizado = normalize(holding, holding_schema);
inspect(resultado_normalizado);
let ln = JSON.stringify(holding).length;
let lnz = JSON.stringify(resultado_normalizado).length;
console.log("Longitud Normal ----->", ln);
console.log("Longitud Normalizada ----->", lnz);
console.log("COMPRESION Normalizada ----->", (lnz * 100)/ln);

let resultado_desnormalizado = denormalize(resultado_normalizado.result, holding_schema, resultado_normalizado.entities);
console.log("Longitud DESNormalizada ----->", JSON.stringify(resultado_desnormalizado).length);

// inspect(resultado_desnormalizado);