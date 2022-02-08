let servidor = "";
//let servidor = 'http://localhost:5000';
let contador = 0; // Contador para definir Id de cada pestaña
let ultNum = 0;
let usu = $("#oculto").val();
let acumuladoPesos = "";
let acumuladoUsd = "";
let losInput = false;
let tc = "";
let formularioIndAbm = false;
let fideicomiso = "";
let fechaD = new Date();
fechaD.setDate(fechaD.getDate() - 30)
let fechaDesde = moment(fechaD).format('YYYY-MM-DD');
let fechaHasta = moment(Date.now()).format('YYYY-MM-DD');
let meses = [`Ene`, `Feb`, `Mar`, `Abr`, `May`, `Jun`, `Jul`, `Ago`, `Sep`, `Oct`, `Nov`, `Dic`, `Ene`, `Feb`, `Mar`, `Abr`, `May`, `Jun`, `Jul`, `Ago`, `Sep`, `Oct`, `Nov`, `Dic`];
let objetivoClickMenuContextual = ""
let formIndividualPestana = false
/// valoresInciales 
$(`#fechaTextoDe`).val(fechaDesde)
$(`#fechaTextoHasta`).val(fechaHasta)
//let objeto = new Object

//////atributos numericos
const importe = { nombre: `importe`, type: `importe`, maxCaract: 50 };
const importeArs = { nombre: `importeArs`, type: `importe`, observaciones: `Importe en Pesos`, maxCaract: 50 };
const importeUsd = { nombre: `importeUsd`, type: `importe`, observaciones: `Importe en Dolares`, maxCaract: 50 };
const iva = { nombre: `iva`, type: `importe`, maxCaract: 50 };
const ivaArs = { nombre: `ivaArs`, type: `importe`, maxCaract: 50 };
const ivaUsd = { nombre: `ivaUsd`, type: `importe`, maxCaract: 50 };
const otrosImp = { nombre: `otrosImp`, type: `importe`, maxCaract: 50 };
const otrosImpuestos = { nombre: `otrosImpuestos`, type: `importe`, maxCaract: 50 };
const otrosImpuestosArs = { nombre: `otrosImpuestosArs`, type: `importe`, maxCaract: 50 };
const otrosImpuestosUsd = { nombre: `otrosImpuestosUsd`, type: `importe`, maxCaract: 50 };
const otrosImpArs = { nombre: `otrosImpArs`, type: `importe`, maxCaract: 50 };
const otrosImpUsd = { nombre: `otrosImpUsd`, type: `importe`, maxCaract: 50 };
const importeAcopio = { nombre: `importeAcopio`, type: `importe`, maxCaract: 50 };
const importeAcopioArs = { nombre: `importeAcopioArs`, type: `importe`, maxCaract: 50 };
const importeAcopioUsd = { nombre: `importeAcopioUsd`, type: `importe`, maxCaract: 50 };
const importeTotal = { nombre: `importeTotal`, type: `importe`, maxCaract: 50 };
const importeTotalArs = { nombre: `importeTotalArs`, type: `importe`, maxCaract: 50 };
const importeTotalUsd = { nombre: `importeTotalUsd`, type: `importe`, maxCaract: 50 };
const importeBruto = { nombre: `importeBruto`, type: `importe`, maxCaract: 50 };
const importeBrutoArs = { nombre: `importeBrutoArs`, type: `importe`, maxCaract: 50 };
const importeBrutoUsd = { nombre: `importeBrutoUsd`, type: `importe`, maxCaract: 50 };
const importePrest = { nombre: `importePrest`, type: `importe`, maxCaract: 50 };
const importeArsPrest = { nombre: `importeArsPrest`, type: `importe`, maxCaract: 50 };
const importeUsdPrest = { nombre: `importeUsdPrest`, type: `importe`, maxCaract: 50 };
const devolucionImporte = { nombre: `devolucionImporte`, type: `importe`, maxCaract: 50 };
const previsto = { nombre: `previsto`, type: `importe`, maxCaract: 50 };
const gastoReal = { nombre: `gastoReal`, type: `importe`, maxCaract: 50 };
const pagado = { nombre: `pagado`, type: `importe`, maxCaract: 50 };
const aPagar = { nombre: `aPagar`, type: `importe`, maxCaract: 50 };
const total = { nombre: `total`, type: `importe`, maxCaract: 50 }; ////// lo agrego solo para hacer solo lectura en registro de factura
const totalArs = { nombre: `totalArs`, type: `importe`, maxCaract: 50 }; ////// lo agrego solo para hacer solo lectura en registro de factura
const totalUsd = { nombre: `totalUsd`, type: `importe`, maxCaract: 50 }; ////// lo agrego solo para hacer solo lectura en registro de factura
const precioUnitario = { nombre: `precioUnitario`, type: `importe`, maxCaract: 50 };
const precioUnitarioArs = { nombre: `precioUnitarioArs`, type: `importe`, maxCaract: 50 };
const precioUnitarioUsd = { nombre: `precioUnitarioUsd`, type: `importe`, maxCaract: 50 };
const orden = { nombre: `orden`, type: `numero`, maxCaract: 4 };

/////idDesen
const idDesen = { nombre: `idDesen`, type: `texto`, maxCaract: 100 };
const idDesenAct = { nombre: `idDesenAct`, type: `texto`, maxCaract: 100 };
const desen = { nombre: `desen`, type: `texto`, maxCaract: 100 };
const idColec = { nombre: `idColec`, type: `texto`, maxCaract: 100 };
const contadorId = { nombre: `contadorId`, type: `texto`, maxCaract: 100 };
/////tc
const tipoCambio = { nombre: `tipoCambio`, type: `tipoCambio`, maxCaract: 20 };
const tipoCambioAlternativo = { nombre: `tipoCambioAlternativo`, type: `tipoCambio`, maxCaract: 20 };
/////// Importe
const cantidad = { nombre: `cantidad`, type: `numero`, maxCaract: 20 };
const tiempoEstimado = { nombre: `tiempoEstimado`, type: `numero`, maxCaract: 20 };
const cantidadDos = { nombre: `cantidadDos`, type: `numero`, maxCaract: 20 };
const tiempoConsumido = { nombre: `tiempoConsumido`, type: `numero`, maxCaract: 20 };
const cantidadTres = { nombre: `cantidadTres`, type: `numero`, maxCaract: 20 };
const tiempoRemanente = { nombre: `tiempoRemanente`, type: `numero`, maxCaract: 20 };
const num = { nombre: `num`, type: `numerador`, maxCaract: 10 };
/////// Porcentage
const tasaImpuesto = { nombre: `tasaImpuesto`, type: `porcentage`, maxCaract: 10 };
const porcentage = { nombre: `porcentage`, type: `porcentage`, maxCaract: 10 };
////// numeroMask
const numeroFactura = { nombre: `numeroFactura`, type: `texto`, maxCaract: 13 };
////// adjunto
const adjunto = { nombre: `adjunto`, type: `adjunto` };
const adjuntoColeccion = { nombre: `adjuntoColeccion`, type: `adjunto` };

/////Fechas
const fecha = { nombre: `fecha`, type: `fecha`, maxCaract: 10 };
const fechaDos = { nombre: `fechaDos`, type: `fecha`, maxCaract: 10 };
const fechaTres = { nombre: `fechaTres`, type: `fecha`, maxCaract: 10 };
const fechaDevolucion = { nombre: `fechaDevolucion`, type: `fecha`, maxCaract: 10 };
const vencimiento = { nombre: `vencimiento`, type: `fecha`, maxCaract: 10 };
const vencimientoAcopio = { nombre: `vencimientoAcopio`, type: `fecha`, maxCaract: 10 };
////atributos texto completo
const observacionesCompleto = { nombre: `observacionesCompleto`, type: `textarea`, maxCaract: 10000 };
const descripcionCompleto = { nombre: `descripcionCompleto`, type: `textarea`, maxCaract: 10000 };
//////atriutos textos
const apellido = { nombre: `surname`, type: `texto`, maxCaract: 100, validacion: { match: /.{3}$/, texto: `Campo obligatorio y la primera letra debe ser mayuscula` } };
const password = { nombre: `password`, type: `password`, maxCaract: 100 };
const post = { nombre: `post`, type: `texto`, maxCaract: 20 };
const devolucionImporteArs = { nombre: `devolucionImporteArs`, type: `texto`, maxCaract: 100 };
const devolucionImporteUsd = { nombre: `devolucionImporteUsd`, type: `texto`, maxCaract: 100 };
const devolucion = { nombre: `devolucion`, type: `texto`, maxCaract: 100 };
const saldo = { nombre: `saldo`, type: `texto`, maxCaract: 100 };
const saldoArs = { nombre: `saldoArs`, type: `texto`, maxCaract: 100 };
const saldoUsd = { nombre: `saldoUsd`, type: `texto`, maxCaract: 100 };
const origen = { nombre: `origen`, type: `texto`, Observaciones: `Representa el orgine de la las operaciones desencadenadas`, maxCaract: 100 };
const destino = { nombre: `destino`, type: `texto`, maxCaract: 100 };
const destinoColec = { nombre: `destinoColec`, type: `texto`, maxCaract: 100 };
const _id = { nombre: `_id`, type: `texto`, maxCaract: 100 };
const abrev = { nombre: `abrev`, type: `texto`, observaciones: `Abrevietura de tres letras maximo 5 caracteres`, validacion: { match: /.{5}$/, texto: `Debe contener entre 3 caracteres` } };
const cochera = { nombre: `cochera`, type: `texto`, observaciones: `Oficinas en una edificio`, maxCaract: 100 };
const cocheraTotal = { nombre: `cocheraTotal`, type: `texto`, observaciones: `Cantidad de cocheras que contiene el fideicomiso`, maxCaract: 100 };
const cuatroHab = { nombre: `cuatroHab`, type: `texto` };
const date = { nombre: `date`, type: `date`, observaciones: `Cantidad de departamentos cuatro habitaciones que posee un edificio`, maxCaract: 100 };
const deptos = { nombre: `deptos`, type: `texto`, observaciones: `Cantidad de departaentos totales que tiene un edificio`, maxCaract: 100 };
const descripcion = { nombre: `descripcion`, type: `texto`, maxCaract: 100 };
const direccion = { nombre: `direccion`, type: `texto`, maxCaract: 100 };
const dni = { nombre: `dni`, type: `texto`, maxCaract: 100 };
const dosHab = { nombre: `dosHab`, type: `texto`, observaciones: `Cantidad de departamentos dos habitaciones que posee un edificio`, maxCaract: 100 };
const email = { nombre: `email`, type: `texto`, validacion: { match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, texto: `Debe contener "@" y ".com"` } };
const id = { nombre: `id`, type: `texto`, maxCaract: 100 };
const letra = { nombre: `letra`, type: `texto`, observaciones: `Letra de los departamentos`, maxCaract: 100 };
const locales = { nombre: `locales`, type: `texto`, observaciones: `Locales en un edificio` };
const localesTotal = { nombre: `localesTotal`, type: `texto`, observaciones: `Cantidad de locales que contiene el fideicomiso`, maxCaract: 100 };
const mono = { nombre: `mono`, type: `texto`, observaciones: `Cantidad de departamentos monoambiente que posee un edificio`, maxCaract: 100 };
const nombre = { nombre: `name`, type: `texto`, validacion: { match: /.{3}$/, texto: `Campo obligatorio y la primera letra debe ser mayuscula` } };
const name = { validacion: { match: /.{3}$/, texto: `Campo obligatorio y la primera letra debe ser mayuscula` } }
const nume = { nombre: `nume`, type: `texto`, observaciones: `Quedo guardado para cuando no queria usar numerador predefinido`, maxCaract: 100 }; /*Eliminar hoy esta en rubro egresos*/
const numer = { nombre: `numer`, type: `texto`, observaciones: `Numero de los departamentos`, maxCaract: 100 };
const observaciones = { nombre: `observaciones`, type: `texto`, maxCaract: 100 };
const observacionesColec = { nombre: `observacionesColec`, type: `texto`, maxCaract: 100 };
const oficina = { nombre: `oficina`, type: `texto`, observaciones: `Importe en Pesos`, maxCaract: 100 };
const oficinaTotal = { nombre: `oficinaTotal`, type: `texto`, observaciones: `Cantidad de oficinas que contiene el fideicomiso`, maxCaract: 100 };
const piso = { nombre: `piso`, type: `texto`, observaciones: `Numero de piso en la direccion del departamento`, maxCaract: 100 };
const pisos = { nombre: `pisos`, type: `texto`, observaciones: `Cantidad de pisos que tiene un edificio`, maxCaract: 100 };
const plantaBaja = { nombre: `plantaBaja`, type: `texto`, observaciones: `Planta bajas de los fideicomiso`, maxCaract: 100 };
const subsuelo = { nombre: `subsuelo`, type: `texto`, observaciones: `Cantidad de subsuelos que tienen los fideicomiso`, maxCaract: 100 };
const telefono = { nombre: `telefono`, type: `texto`, maxCaract: 100 };
const torres = { nombre: `torres`, type: `texto`, observaciones: `Cantidad de torres que tiene el fideicomiso`, maxCaract: 100 };
const totales = { nombre: `totales`, type: `texto`, maxCaract: 100 }
const impuesto = { nombre: `impuesto`, type: `texto`, maxCaract: 100 }
const tresHab = { nombre: `tresHab`, type: `texto`, observaciones: `Cantidad de departamentos tres habitaciones que posee un edificio`, maxCaract: 100 };
const unaHab = { nombre: `unaHab`, type: `texto`, observaciones: `Cantidad de departamentos una habitaciones que posee un edificio`, maxCaract: 100 };
const usuario = { nombre: `usuario`, type: `texto`, maxCaract: 100 };
const username = { nombre: `username`, type: `texto`, maxCaract: 100 };
const position = { nombre: `position`, type: `text`, maxCaract: 50 };
//////referencia
const letraComprobante = { nombre: `letraComprobante`, type: `texto`, maxCaract: 1, key: [`letraComprobante`] };
const prestamosFideicomisosAb = { nombre: `prestamosFideicomisosAb`, type: `texto`, Observaciones: `Referencia a los proveedores existentes`, maxCaract: 100, key: [`name`] };
const subRubroPagos = { nombre: `subRubroPagos`, type: `texto`, Observaciones: `Referencia a los sub rubros pagos creados`, maxCaract: 100, key: [`name`] };
const rubro = { nombre: `rubro`, type: `referencia`, observaciones: `Referencia a concepto del pago`, maxCaract: 100, key: [`name`] };
const rubroPagos = { nombre: `rubroPagos`, type: `referencia`, Observaciones: `Referencia a los rubros pagos creados`, maxCaract: 100, key: [`nume`, `name`] };
const cliente = { nombre: `cliente`, type: `texto`, maxCaract: 100, key: [`name`] };
const ciudad = { nombre: `ciudad`, type: `texto`, maxCaract: 100, key: [`name`] };
const proveedor = { nombre: `proveedor`, type: `texto`, Observaciones: `Referencia a los proveedores existentes`, maxCaract: 100, key: [`name`] };
const pais = { nombre: `pais`, type: `texto`, referencia: `pais`, maxCaract: 100, key: [`name`] };
const provincia = { nombre: `provincia`, type: `texto`, referencia: `provincia`, maxCaract: 100, key: [`name`] };
const tipoPago = { nombre: `tipoPago`, type: `texto`, referencia: `tipoPago`, maxCaract: 100, key: [`name`] };
const tipoPagoColeccion = { nombre: `tipoPagoColeccion`, type: `texto`, referencia: `tipoPago`, maxCaract: 100, key: [`name`] };
const tipoUnidad = { nombre: `tipoUnidad`, type: `texto`, referencia: `tipoPago`, maxCaract: 100, key: [`name`] };
const unidades = { nombre: `unidades`, type: `texto`, referencia: `unidades`, maxCaract: 100, key: [`name`] };
const unidadesDestino = { nombre: `unidadesDestino`, type: `texto`, referencia: `unidades`, maxCaract: 100, key: [`name`] }
const tipoComprobante = { nombre: `tipoComprobante`, type: `texto`, maxCaract: 100, key: [`letraComprobante`] };
const moneda = { nombre: `moneda`, type: `texto`, observaciones: `Referencia a la moneda del comprobante`, maxCaract: 100, key: [`abrev`] };
const agrupadorRubrosPago = { nombre: `agrupadorRubrosPago`, type: `texto`, maxCaract: 100, key: [`name`] };
const criticidad = { nombre: `criticidad`, type: `texto`, maxCaract: 100, key: [`name`] }
const estadoProceso = { nombre: `estadoProceso`, type: `texto`, maxCaract: 100, key: [`name`] }
const tarea = { nombre: `tarea`, type: `texto`, maxCaract: 100, key: [`name`] }

///////logico
const acopio = { nombre: `acopio`, type: `logico`, maxCaract: 1 };
const logico = { nombre: `logico`, type: `logico`, maxCaract: 1 };
///////logico
const estado = { nombre: `estado`, type: `texto`, maxCaract: 50 };
const habilitado = { nombre: `habilitado`, type: `texto`, maxCaract: 50 };
/////////// el archivo adjunto, solo para ocultar
const filename = { nombre: `filename`, type: `texto`, maxCaract: 500 };
const originalname = { nombre: `originalname`, type: `texto`, maxCaract: 500 };
const path = { nombre: `path`, type: `texto`, maxCaract: 500 }

//////////////////atributos Descripción
const modficarTodo = `Se puede modificar todo desde el formulario Abm o del formulario de unica instancia`;
const modficarInd = `Se puede modifcar algunos atributos del fomulario ABM y todos los atributos desde el formulario
de unica instancia`;


///////////atributo compuesto/////

const tareas = {
    titulos: `Tareas`,
    nombre: `tareas`,
    type: `coleccionTotal`,
    key: `tarea`,
    componentes: {
        tarea: tarea,
        tiempoEstimado: cantidad,
        tiempoConsumido: cantidadDos,
        tiempoRemanente: cantidadTres,
        observacionesColec: observacionesColec
    }
}
const adjuntos = {
    titulos: `Adjuntos`,
    nombre: `adjuntos`,
    type: `coleccionAdjuntos`,
    key: `filenamecolecCount`,
    componentes: {
        descripcionAdjunto: descripcion,
        adjuntoColeccion: adjunto,
    }
}
const componenteFiscalCompra = {
    titulos: `Items`,
    nombre: `componenteFiscalCompra`,
    type: `coleccionTotal`,
    key: `rubro`,
    componentes: {
        cantidad: cantidad,
        rubro: rubro,
        descripcion: descripcion,
        precioUnitario: importe,
        precioUnitarioArs: importeArs,
        precioUnitarioUsd: importeUsd,
        iva: iva,
        ivaArs: ivaArs,
        ivaUsd: ivaUsd,
        otrosImpuestos: otrosImpuestos,
        otrosImpuestosArs: otrosImpuestosArs,
        otrosImpuestosUsd: otrosImpuestosUsd,
        total: importe,
        totalArs: importeArs,
        totalUsd: importeUsd

    }
}
const componenteFiscal = {
    titulos: `Items`,
    nombre: `componenteFiscal`,
    type: `coleccionTotal`,
    key: `rubroPagos`,
    componentes: {
        cantidad: cantidad,
        rubroPagos: rubroPagos,
        subRubroPagos: subRubroPagos,
        descripcion: descripcion,
        precioUnitario: importe,
        precioUnitarioArs: importeArs,
        precioUnitarioUsd: importeUsd,
        iva: iva,
        ivaArs: ivaArs,
        ivaUsd: ivaUsd,
        otrosImpuestos: otrosImpuestos,
        otrosImpuestosArs: otrosImpuestosArs,
        otrosImpuestosUsd: otrosImpuestosUsd,
        total: importe,
        totalArs: importeArs,
        totalUsd: importeUsd

    }
}
const componenteAcopio = {
    titulos: `Items Acopiados`,
    nombre: `componenteAcopio`,
    type: `coleccionTotal`,
    key: `descripcion`,
    componentes: {
        cantidad: cantidad,
        descripcion: descripcion,
        importeAcopio: importe,
        importeAcopioArs: importeArs,
        importeAcopioUsd: importeUsd,
        adjuntoColeccion: adjunto,


    }
}
const departamento = {
    titulos: `Departamentos`,
    nombre: `departamento`,
    type: `coleccionTotal`,
    key: `unidades`,
    componentes: {
        unidades: unidades,
        piso: piso,
        letra: letra,
        numer: numer,
        tipoUnidad: tipoUnidad,
        descripcion: descripcion,
    }
}
const compuestoCobranza = {
    titulos: `Items`,
    nombre: `compuestoCobranza`,
    type: `coleccionTotal`,
    key: `rubro`,
    componentes: {
        rubro: rubro,
        descripcion: descripcion,
        importe: importe,
        importeArs: importeArs,
        importeUsd: importeUsd,
        otrosImpuestos: otrosImpuestos,
        otrosImpuestosArs: otrosImpuestosArs,
        otrosImpuestosUsd: otrosImpuestosUsd,
        total: importe,
        totalArs: importeArs,
        totalUsd: importeUsd

    }
}
const prestamoCompuesto = {
    titulos: `Devolcion Prestamo`,
    nombre: `prestamoCompuesto`,
    type: `coleccionTotal`,
    key: `importe`,
    componentes: {
        fechaDevolucion: fecha,
        importe: importe,
        importeArs: importeArs,
        importeUsd: importeUsd,
        descripcion: descripcion,
        tipoPagoColeccion: tipoPagoColeccion,
        idColec: idColec,
        destinoColec: destinoColec,
        post: post
    }
}

const expresiones = {
    //usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    //nombre: /^[a-zA-ZÀ-ÿ\s]{1,70}$/, // Letras y espacios, pueden llevar acentos.
    tipoCambio: /d.{1,80}$/, //  /^\d{1,20}$/,
    tipoCambioAlternativo: /.{1,80}$/, //  /^\d{1,20}$/,
    // Letras y espacios, pueden llevar acentos.
    //password: /^.{4,12}$/, // 4 a 12 digitos.
    cantidad: /^\d{1,10}$/,
    direccion: /^[a-zA-ZÀ-ÿ\s0-9]{1,80}$/, // Letras, numeros, guion y guion_bajo
    descripcion: /^[a-zA-ZÀ-ÿ\s0-9]{1,80}$/,
    dni: /^\d{7,12}$/,
    adjunto: /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    fecha: /^[a-zA-Z0-9\_\-]{4,16}$/,
    fechaDevolucion: /^[a-zA-Z0-9\_\-]{4,16}$/,
    vencimiento: /^[a-zA-Z0-9\_\-]{4,16}$/,
    importeArs: /.{1,20}$/,
    importeUsd: /.{1,20}$/,
    importe: /.{1,20}$/,
    importeTotal: /.{1,20}$/,
    iva: /.{1,20}$/,
    total: /.{1,20}$/,
    numeroFactura: /.{12,13}$/,
    // letra: /.{1,2}$/,
    letraComprobante: /[A-Z]{1,2}$/,
    nume: /.{1,5}$/,
    num: /.{1,5}$/,
    //numer: /.{1,2}$/,
    piso: /.{1,2}$/,
    precioUnitario: /.{1,20}$/,
    tc: /.{1,8}$/,
    telefono: /^\d{7,20}$/ // 7 a 20 numeros.
}

const textoExpresiones = {
    //usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    cantidad: `Debe contener al menos un numero`,
    direccion: `La direccion es obligatoria`,
    descripcion: `Campo obligatorio`,
    dni: `Debe contener entre 7 y 10 num`,
    adjunto: `Es obligatorio adjuntar factura`,
    fecha: `Campo obligatorio`,
    fechaDevolucion: `Campo obligatorio`,
    vencimiento: `Campo obligatorio`,
    letraComprobante: `Debe contener un caracter MAYUSCULA`,
    importeArs: `Campo obligatorio`,
    importeUsd: `Campo obligatorio`,
    importe: `Campo obligatorio`,
    importeTotal: `Campo obligatorio`,
    total: `Campo obligatorio`,
    iva: `Campo obligatorio`,
    letra: `Campo obligatorio`,
    nume: `Debe contener entre 1 y 5 num`,
    numeroFactura: `Campo obligatorio con 12 digitos`,
    num: `Debe contener entre 1 y 5 num`,
    numer: `Campo obligatorio`,
    tipoCambio: `Campo obligatorio`,
    tipoCambioAlternativo: `Campo obligatorio`,
    piso: `Campo obligatorio`,
    precioUnitario: `Campo obligatorio`,
    tc: `Campo obligatorio`,
    telefono: `El telefono es obligatorio`,
    agrupadorRubrosPago: `Seleccione una opcion`,

    provincia: `Seleccione una opcion`,
    pais: `Seleccione una opcion`,
    ciudad: `Seleccione una opcion`,
    tipoPago: `Seleccione una opcion`,
    cliente: `Seleccione una opcion`,
    proveedor: `Seleccione una opcion`,
    rubro: `Seleccione una opcion`,
    rubroPagos: `Seleccione una opcion`,
    subRubroPagos: `Seleccione una opcion`,
    unidades: `Seleccione una opcion`,
    unidadesDestino: `Seleccione una opcion`,
    tipoUnidad: `Seleccione una opcion`,
    tipoCobros: `Seleccione una opcion`,
    tipoPago: `Seleccione una opcion`,
    moneda: `Seleccione una opcion`,
    tarea: `Seleccione una opcion`,

    prestamosFideicomisosAb: `Seleccione una opcion`,
}


//Comandos completa ABM
let iCrear = `<div class="barraForm crear"><img src="/img/abm/plus.png" class="imgBarra crearBoton" alt="Crear registro" title="Crear una instancia"></div>`;
let iEdit = `<div class="barraForm"><img src="/img/abm/edit2.png" class="imgBarra editBoton" alt="Edit registro" title="Editar una instancia"></div>`;
let iDelete = `<div class="barraForm"><img src="/img/abm/eliminarTacho2.png" class="imgBarra deleteBoton" alt="Eliminar registro" title="Eliminar una instancia"></div>`;
let iDeshabilitar = `<div class="barraForm"><img src="/img/abm/eliminar.png" class="imgBarra desHabilitarBoton" alt="Eliminar registro" title="Deshabilitar un registro"></div>`;
let iExpo = `<div class="barraForm"><img src="/img/abm/expo.svg" class="imgBarra achiq1 expo" alt="Eliminar registro" title="Exportar Reporte"></div>`;
let iMail = `<div class="barraForm"><img src="/img/abm/email.svg" class="imgBarra agrande" alt="Eliminar registro" title="Enviar información por correo"></div>`;
let iOk = `<div class="barraForm"><img src="/img/abm/ok2.png" class="imgBarra achiq4 okBoton"  alt="Eliminar registro" title="Confirmar instacia"></div>`;
let iCruz = `<div class="barraForm"><img src="/img/abm/cancell2.png" class="imgBarra achiq5 cancelBoton" alt="Eliminar registro" title="Cancelar Cambios instacia"></div>`;
let iCalen = `<div class="barraForm"><img src="/img/abm/calen.svg" class="imgBarra achiq2" alt="Eliminar registro" title="Marcar un evento en el calendario"></div>`;
let iCheck = `<div class="barraForm"><img src="/img/abm/check.svg" class="imgBarra achiq1" alt="Eliminar registro" title="Habilita seleccion de elementos"></div>`;
let iDoble = `<div class="barraForm"><img src="/img/abm/letraD.svg" class="imgBarra dobleBoton" alt="Eliminar registro" title="Habilita seleccion de elementos"></div>`;
let ayuda = `<div class="barraForm iconoAyuda"><img src="/img/abm/ayuda.png" class="imgBarra ayuda" alt="ayuda" title="Ayuda"></div>`;
let video = `<div class="barraForm"><img src="/img/abm/video.png" class="imgBarra video" alt="ayuda" title="Instructivo en video"></div>`;

//Comandos de formulario de unica instancia
let iCrearF = `<div><img src="/img/abm/crear.svg" class="imgB" alt="Crear registro" title="Crear una instancia"></div>`;
let iEditF = `<div><img src="/img/abm/edit2.png" class="imgB achiq1 editBoton" alt="Edit registro" title="Editar una instancia"></div>`;
let iDeleteF = `<div><img src="/img/abm/eliminarTacho2.png" class="imgB achiq1 deleteBoton" alt="Eliminar registro" title="Eliminar una instancia"></div>`;
let iDeshabilitarF = `<div><img src="/img/abm/eliminar.png" class="imgB achiq1 desHabilitarBoton" alt="Deshabiltar registro" title="Desabilitar una instancia"></div>`;
let iExpoF = `<div ><img src="/img/abm/expo.svg" class="imgB achiq1" alt="Eliminar registro" title="Exportar Reporte"></div>`;
let iMailF = `<div><img src="/img/abm/email.svg" class="imgB agrande" alt="Eliminar registro" title="Enviar información por correo"></div>`;
let iOkF = `<div><img src="/img/abm/ok2.png" class="imgB okfBoton" alt="Eliminar registro" title="Confirmar instacia"></div>`;
let iOkimprimirF = `<div><img src="/img/abm/imprimirOk.png" class="imgB achiq3 okfImprimirBoton" title="Confirmar e imprimir instancia"></div>`;
let iLupa = `<div><img src="/img/abm/previaImpresion.png" class="imgB achiq3 okfLupa" alt="Vista previa documento" title="Vista previa documento"></div>`;
let iImprimir = `<div><img src="/img/abm/imprimir2.png" class="imgB achiq3 okfImprimir" alt=Imprimir registro" title="Imprimir registro"></div>`;
let iCruzF = `<div><img src="/img/abm/cancell2.png" class="imgB cruzBoton" alt="Eliminar registro" title="Cancelar Cambios instacia"></div>`;
let iCalenF = `<div><img src="/img/abm/calen.svg" class="imgB achiq2" alt="Eliminar registro" title="Marcar un evento en el calendario"></div>`;
let iCheckF = `<div><img src="/img/abm/check.svg" class="imgB achiq1" alt="Eliminar registro" title="Habilita seleccion de elementos"></div>`;
let progressBar = `<div class="progressBar" style="--with: 10"></div>`;
let logoFormIndividual = `<div class="logoIndividual"><img alt=""></img></div>`

const formatoNumeroFactura = function (numero) {
    let primerosCuatro = (numero.slice(0, 4))
    let ultimosOcho = (numero.slice(4))

    let numeroFactura = `${primerosCuatro}-${ultimosOcho}`

    return numeroFactura
}

$(`#tablas, #formularioIndividual`).on(`keyup`, `.numeroFactura`, function (e) {

    if (e.keyCode != 8) {
        let value = this.value
        if (value != undefined) {
            if (value.length == 4) {
                let primerosCuatro = (value.slice(0, 4))
                let ultimosOcho = (value.slice(4))

                $(this).val(`${primerosCuatro}-${ultimosOcho}`)
            } else if (value.length > 4) {

                let primerosCuatro = (value.slice(0, 4))
                let ultimosOcho = (value.slice(5))

                $(this).val(`${primerosCuatro}-${ultimosOcho}`)
            } else {
                $(this).val(value)
            }
        }
    }
})

$(`body`).on('contextmenu', `th.tituloTablas`, function (e) {
    objetivoClickMenuContextual = $(this).attr(`filtro`)

    e.preventDefault();
    $("#menuContextualTitulo").css({ 'display': 'block', 'left': e.pageX, 'top': e.pageY });
    return objetivoClickMenuContextual;

});

$(`body`).on('contextmenu', `tr.fila`, function (e) {
    e.preventDefault();

    $("#menuContextualCuerpoTabla").css({ 'display': 'block', 'left': e.pageX, 'top': e.pageY });
    // return objetivoClickMenuContextual;

});

$(document).click(function (e) {
    if (e.button == 0) {
        $(`#menuContextualTitulo,
           #menuContextualCuerpoTabla`).css("display", "none");
        /////////////este cierre la venta emergente del pdf////////

    }
});

$(document).keydown(function (e) {
    if (e.keyCode == 27) {
        /////////////este cierre el menu contextual////////
        $(`#menuContextualTitulo,
           #menuContextualCuerpoTabla`).css("display", "none");
        /////////////este cierre la venta emergente del pdf////////
        $(`#vistaPrevia`).attr("src", "")
        $(`#canvas_container`).css("display", `none`)
    };
})

$(`#canvas_container .crossForm`).click(function () {

    /////////////este cierre la venta emergente del pdf////////
    $(`#vistaPrevia`).attr("src", "")
    $(`#canvas_container`).css("display", `none`)

})


$(`#videoTutorialDiv .crossForm`).click(function () {

    $(`#videoTutorialDiv`).removeClass("show")
    $(`#videoTutorial`).remove()

    let embed = `<embed id="videoTutorial" src="">`
    let emb = $(embed)
    emb.appendTo(`#videoTutorialDiv`)

})

let getFileExtension = function (filename) {
    return filename.split('.').pop();
}