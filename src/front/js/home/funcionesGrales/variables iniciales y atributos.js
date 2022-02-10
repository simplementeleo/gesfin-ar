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

//////Importe
const importevalidacion = /[\d.,]{1,30}$/
const importe = { nombre: `importe`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeArs = { nombre: `importeArs`, type: `importe`, observaciones: `Importe en Pesos`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeUsd = { nombre: `importeUsd`, type: `importe`, observaciones: `Importe en Dolares`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const iva = { nombre: `iva`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const ivaArs = { nombre: `ivaArs`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const ivaUsd = { nombre: `ivaUsd`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const otrosImp = { nombre: `otrosImp`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const otrosImpuestos = { nombre: `otrosImpuestos`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const otrosImpuestosArs = { nombre: `otrosImpuestosArs`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const otrosImpuestosUsd = { nombre: `otrosImpuestosUsd`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const otrosImpArs = { nombre: `otrosImpArs`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const otrosImpUsd = { nombre: `otrosImpUsd`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeTotal = { nombre: `importeTotal`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeTotalArs = { nombre: `importeTotalArs`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeTotalUsd = { nombre: `importeTotalUsd`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeBruto = { nombre: `importeBruto`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeBrutoArs = { nombre: `importeBrutoArs`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeBrutoUsd = { nombre: `importeBrutoUsd`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importePrest = { nombre: `importePrest`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeArsPrest = { nombre: `importeArsPrest`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeUsdPrest = { nombre: `importeUsdPrest`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const precioUnitario = { nombre: `precioUnitario`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const precioUnitarioArs = { nombre: `precioUnitarioArs`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const precioUnitarioUsd = { nombre: `precioUnitarioUsd`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const orden = { nombre: `orden`, type: `numero`, maxCaract: 4 };
/////idDesen
const idDesen = { nombre: `idDesen`, type: `texto` };// Cuando un eslemento se crea desencadenado, este id en el destino el mismo id que lo creo en origen
const desen = { nombre: `desen`, type: `texto` };// cuando desencadena de un elemento, indica el tipo de descandenante, a fin de distinguir si tiene dos o mas desencadenante, ejemplo signo numero
const idColec = { nombre: `idColec`, type: `texto` };
const contadorId = { nombre: `contadorId`, type: `texto` };
const post = { nombre: `post`, type: `texto` };
const origen = { nombre: `origen`, type: `texto` };//Representa el orgine de la las operaciones desencadenadas
const destino = { nombre: `destino`, type: `texto` };
const destinoColec = { nombre: `destinoColec`, type: `texto` };
const position = { nombre: `position`, type: `text` };
/////tc
const tipoCAmbioValidacoin = /\d{1,4}[\s.,]\d{0,5}$/
const tipoCambio = { nombre: `tipoCambio`, type: `tipoCambio`, validacion: { match: tipoCAmbioValidacoin, texto: `Campo obligatorio numero` } };
const tipoCambioAlternativo = { nombre: `tipoCambioAlternativo`, type: `tipoCambio`, validacion: { match: tipoCAmbioValidacoin, texto: `Campo obligatorio numero` } };
/////// Cantidad
const cantidadValidacion = /^\d{1,10}$/
const cantidad = { nombre: `cantidad`, type: `numero`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
const cantidadDos = { nombre: `cantidadDos`, type: `numero`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
const cantidadTres = { nombre: `cantidadTres`, type: `numero`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
const tiempoEstimado = { nombre: `tiempoEstimado`, type: `numero`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
const tiempoConsumido = { nombre: `tiempoConsumido`, type: `numero`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
const tiempoRemanente = { nombre: `tiempoRemanente`, type: `numero`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
const num = { nombre: `num`, type: `numerador`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
/////// Porcentage
const porcentage = { nombre: `porcentage`, type: `porcentage` };
////// adjunto
const adjunto = { nombre: `adjunto`, type: `adjunto`, validacion: { match: /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, texto: `Campo oblogatorio` } };
const adjuntoColeccion = { nombre: `adjuntoColeccion`, type: `adjunto`, validacion: { match: /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, texto: `Campo oblogatorio` } };
/////Fechas
const fechaValidacion = /^[a-zA-Z0-9\_\-]{4,16}$/
const fecha = { nombre: `fecha`, type: `fecha`, validacion: { match: fechaValidacion, texto: `Campo Obligatorio` } };
const fechaDos = { nombre: `fechaDos`, type: `fecha`, validacion: { match: fechaValidacion, texto: `Campo Obligatorio` } };
const fechaTres = { nombre: `fechaTres`, type: `fecha`, validacion: { match: fechaValidacion, texto: `Campo Obligatorio` } };
////atributos texto completo
const observacionesCompleto = { nombre: `observacionesCompleto`, type: `textarea` };
const descripcionCompleto = { nombre: `descripcionCompleto`, type: `textarea` };
//////atriutos textos
const letra = { nombre: `letra`, type: `texto`, observaciones: `Texto de un caracter`, validacion: { match: /[A-Z]{1,2}$/, texto: `Una letra Mayuscula es obligatoria` } };
const apellido = { nombre: `surname`, type: `texto`, validacion: { match: /[A-Z]{1}\w*\s?([A-Z]{1}\w*)?/, texto: `La primera letra de cada palabra debe ser mayuscula` } };
const nombre = { nombre: `name`, type: `texto`, validacion: { match: /[A-Z]{1}\w*\s?([A-Z]{1}\w*)?/, texto: `La primera letra de cada palabra debe ser mayuscula` } };
const password = { nombre: `password`, type: `password` };
const _id = { nombre: `_id`, type: `texto` };
const id = { nombre: `id`, type: `texto` };
const abrev = { nombre: `abrev`, type: `texto`, observaciones: `Abrevietura de tres letras maximo 5 caracteres`, validacion: { match: /.{5}$/, texto: `Debe contener entre 3 caracteres` } };
const date = { nombre: `date`, type: `date`, observaciones: `Cantidad de departamentos cuatro habitaciones que posee un edificio` };
const descripcion = { nombre: `descripcion`, type: `texto`, validacion: { match: /.{1,500}$/, texto: `Campo obligatorio` } };
const direccion = { nombre: `direccion`, type: `texto`, validacion: { match: /.{1,80}$/, texto: `Campo obligatorio` } };
const email = { nombre: `email`, type: `texto`, validacion: { match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, texto: `Debe contener "@" y ".com"` } };
const observaciones = { nombre: `observaciones`, type: `texto` };
const observacionesColec = { nombre: `observacionesColec`, type: `texto` };
const oficina = { nombre: `oficina`, type: `texto`, observaciones: `Importe en Pesos` };
const oficinaTotal = { nombre: `oficinaTotal`, type: `texto`, observaciones: `Cantidad de oficinas que contiene el fideicomiso` };
const telefono = { nombre: `telefono`, type: `texto` };
const totales = { nombre: `totales`, type: `texto` }
const impuesto = { nombre: `impuesto`, type: `texto` }
const usuario = { nombre: `usuario`, type: `texto` };
const username = { nombre: `username`, type: `texto` };

//////referencia
const letraComprobante = { nombre: `letraComprobante`, type: `texto`, maxCaract: 1, key: [`letraComprobante`], validacion: { texto: `Seleccione una opcion` } };
const subRubroPagos = { nombre: `subRubroPagos`, type: `texto`, Observaciones: `Referencia a los sub rubros pagos creados`, key: [`name`], validacion: { texto: `Seleccione una opcion` } };
const rubroPagos = { nombre: `rubroPagos`, type: `referencia`, Observaciones: `Referencia a los rubros pagos creados`, key: [`nume`, `name`] };
const cliente = { nombre: `cliente`, type: `texto`, key: [`name`], validacion: { texto: `Seleccione una opcion` } };
const ciudad = { nombre: `ciudad`, type: `texto`, key: [`name`], validacion: { texto: `Seleccione una opcion` } };
const proveedor = { nombre: `proveedor`, type: `texto`, Observaciones: `Referencia a los proveedores existentes`, key: [`name`], validacion: { texto: `Seleccione una opcion` } };
const pais = { nombre: `pais`, type: `texto`, referencia: `pais`, key: [`name`], validacion: { texto: `Seleccione una opcion` } };
const provincia = { nombre: `provincia`, type: `texto`, referencia: `provincia`, key: [`name`], validacion: { texto: `Seleccione una opcion` } };
const tipoPago = { nombre: `tipoPago`, type: `texto`, referencia: `tipoPago`, key: [`name`] };
const tipoPagoColeccion = { nombre: `tipoPagoColeccion`, type: `texto`, referencia: `tipoPago`, key: [`name`], validacion: { texto: `Seleccione una opcion` } };
const tipoUnidad = { nombre: `tipoUnidad`, type: `texto`, referencia: `tipoPago`, key: [`name`], validacion: { texto: `Seleccione una opcion` } };
const unidades = { nombre: `unidades`, type: `texto`, referencia: `unidades`, key: [`name`], validacion: { texto: `Seleccione una opcion` } };
const unidadesDestino = { nombre: `unidadesDestino`, type: `texto`, referencia: `unidades`, key: [`name`], validacion: { texto: `Seleccione una opcion` } }
const tipoComprobante = { nombre: `tipoComprobante`, type: `texto`, key: [`letraComprobante`], validacion: { texto: `Seleccione una opcion` } };
const moneda = { nombre: `moneda`, type: `texto`, observaciones: `Referencia a la moneda del comprobante`, key: [`abrev`], validacion: { texto: `Seleccione una opcion` } };
const agrupadorRubrosPago = { nombre: `agrupadorRubrosPago`, type: `texto`, key: [`name`], validacion: { texto: `Seleccione una opcion` } };
const criticidad = { nombre: `criticidad`, type: `texto`, key: [`name`], validacion: { texto: `Seleccione una opcion` } }
const estadoProceso = { nombre: `estadoProceso`, type: `texto`, key: [`name`], validacion: { texto: `Seleccione una opcion` } }
const tarea = { nombre: `tarea`, type: `texto`, key: [`name`] }

///////logico
const acopio = { nombre: `acopio`, type: `logico` };
const logico = { nombre: `logico`, type: `logico` };
const estado = { nombre: `estado`, type: `texto` };
const habilitado = { nombre: `habilitado`, type: `texto` };
/////////// el archivo adjunto, solo para ocultar
const filename = { nombre: `filename`, type: `texto` };
const originalname = { nombre: `originalname`, type: `texto` };
const path = { nombre: `path`, type: `texto` }

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
    //Letras y espacios, pueden llevar acentos.
    //password: /^.{4,12}$/, // 4 a 12 digitos.
    telefono: /^\d{7,20}$/ // 7 a 20 numeros.
}

const textoExpresiones = {
    //usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo


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

const formatoNumeroDni = function (objeto, numeroForm, atributos) {

    const doc = function (e) {

        let numero = parseFloat(e.target.value.replaceAll(".", ""));

        let dni = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0, }).format(numero)

        $(e.target).val(dni)
    }
    if ($(`#formularioIndividual .formulario`).length == 0) {
        $.each(atributos, (indice, value) => {
            $(`#t${numeroForm} input.${value.nombre}`).keyup(doc);
        })


    } else {
        $.each(atributos, (indice, value) => {
            $(`#formularioIndividual input.${value.nombre}`).keyup(doc);
        })
    }
}
const formatoNumero = function (objeto, numeroForm, atributos) {

    const doc = function (e) {

        let num = parseFloat(e.target.value.replaceAll(".", ""));
        let numero = parseFloat(num.replaceAll(",", "."));

        let importe = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2, }).format(numero)

        $(e.target).val(importe)
    }
    if ($(`#formularioIndividual .formulario`).length == 0) {
        $.each(atributos, (indice, value) => {
            $(`#t${numeroForm} input.${value.nombre}`).keyup(doc);
        })


    } else {
        $.each(atributos, (indice, value) => {
            $(`#formularioIndividual input.${value.nombre}`).keyup(doc);
        })
    }
}

const monedaSigno = function (objeto, numeroForm, gatillo, atributos) {
    let father = $(`select.${gatillo.nombre}`).parent().parent()

    const moneda = function (e) {

        let currency = $(e.target).val()

        $.each(atributos, (indice, value) => {
            $(`input.${value.nombre}`, father).addClass(currency)
        })

    }

    if ($(`#formularioIndividual .formulario`).length == 0) {

        $(`#t${numeroForm} input.${gatillo.nombre}`).change(moneda);

    } else {

        $(`#formularioIndividual input.${gatillo.nombre}`).change(moneda);

    }
}

