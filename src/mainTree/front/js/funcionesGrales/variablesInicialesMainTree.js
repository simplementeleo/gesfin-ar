//////atributos numericos
const importevalidacionMainTree = /[\d.,]{1,30}$/
const unidades = { nombre: `unidades`, type: `texto`, referencia: `unidades`, key: [`name`], validacion: { texto: `Seleccione una opcion` } };
const unidadesDestino = { nombre: `unidadesDestino`, type: `texto`, referencia: `unidades`, key: [`name`], validacion: { texto: `Seleccione una opcion` } }
//////////////////////////////////////
const totales = { nombre: `totales`, type: `importe`, maxCaract: 30, validacion: { match: importevalidacionMainTree, texto: `Importe Obligatorio` } };
const cochera = { nombre: `cochera`, type: `texto`, observaciones: `Oficinas en una edificio`, maxCaract: 100 };
const cocheraTotal = { nombre: `cocheraTotal`, type: `texto`, observaciones: `Cantidad de cocheras que contiene el fideicomiso`, maxCaract: 100 };
const mono = { nombre: `mono`, type: `texto`, observaciones: `Cantidad de departamentos monoambiente que posee un edificio`, maxCaract: 100 };
const deptos = { nombre: `deptos`, type: `texto`, observaciones: `Cantidad de departaentos totales que tiene un edificio`, maxCaract: 100 };
const cuatroHab = { nombre: `cuatroHab`, type: `texto` };
const locales = { nombre: `locales`, type: `texto`, observaciones: `Locales en un edificio` };
const localesTotal = { nombre: `localesTotal`, type: `texto`, observaciones: `Cantidad de locales que contiene el fideicomiso`, maxCaract: 100 };
const piso = { nombre: `piso`, type: `texto`, observaciones: `Cantidad de pisos que tiene un edificio`, maxCaract: 100 };
const pisos = { nombre: `pisos`, type: `texto`, observaciones: `Cantidad de pisos que tiene un edificio`, maxCaract: 100 };
const plantaBaja = { nombre: `plantaBaja`, type: `texto`, observaciones: `Planta bajas de los fideicomiso`, maxCaract: 100 };
const subsuelo = { nombre: `subsuelo`, type: `texto`, observaciones: `Cantidad de subsuelos que tienen los fideicomiso`, maxCaract: 100 };
const torres = { nombre: `torres`, type: `texto`, observaciones: `Cantidad de torres que tiene el fideicomiso`, maxCaract: 100 };
const tresHab = { nombre: `tresHab`, type: `texto`, observaciones: `Cantidad de departamentos tres habitaciones que posee un edificio`, maxCaract: 100 };
const unaHab = { nombre: `unaHab`, type: `texto`, observaciones: `Cantidad de departamentos una habitaciones que posee un edificio`, maxCaract: 100 };
const dosHab = { nombre: `dosHab`, type: `texto`, observaciones: `Cantidad de departamentos dos habitaciones que posee un edificio`, maxCaract: 100 };
const oficina = { nombre: `oficina`, type: `texto`, observaciones: `Importe en Pesos` };
const oficinaTotal = { nombre: `oficinaTotal`, type: `texto`, observaciones: `Cantidad de oficinas que contiene el fideicomiso` };

const unidadesTorres = {
    titulos: `Torres`,
    nombre: `unidadesTorres`,
    type: `coleccionTotal`,
    key: `texto`,
    componentes: {
        texto: texto,
        descripcion: descripcion,

    }
}
