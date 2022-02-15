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


//////Importe
const importevalidacion = /[\d.,]{1,30}$/
const importe = { nombre: `importe`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeArs = { nombre: `importeArs`, type: `importe`, observaciones: `Importe en Pesos`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeUsd = { nombre: `importeUsd`, type: `importe`, observaciones: `Importe en Dolares`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
//
const importeDos = { nombre: `importeDos`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeDosArs = { nombre: `importeDosArs`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeDosUsd = { nombre: `importeDosUsd`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
//
const importeDesencadenado = { nombre: `importeDesencadenado`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeDesencadenadoArs = { nombre: `importeDesencadenadoArs`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const importeDesencadenadoUsd = { nombre: `importeDesencadenadoUsd`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
//
const impuestoUno = { nombre: `impuestoUno`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const impuestoUnoArs = { nombre: `impuestoUnoArs`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const impuestoUnoUsd = { nombre: `impuestoUnoUsd`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
//
const impuestoDos = { nombre: `impuestoDos`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const impuestoDosArs = { nombre: `impuestoDosArs`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };
const impuestoDosUsd = { nombre: `impuestoDosUsd`, type: `importe`, validacion: { match: importevalidacion, texto: `Importe Obligatorio` } };

/////atributos de complemento y orden
const _id = { nombre: `_id`, type: `texto` };
const contadorId = { nombre: `contadorId`, type: `texto` };//contador que genera las colecciones que desencadenan, es atributo de cabecera
const desen = { nombre: `desen`, type: `texto` };// cuando desencadena de un elemento, indica el tipo de descandenante, a fin de distinguir si tiene dos o mas desencadenante, ejemplo signo numero
const destino = { nombre: `destino`, type: `texto` };// igual que orgien pero el que origina indica donde desencadena
const destinoColec = { nombre: `destinoColec`, type: `texto` }; //igual que orgien pero el que origina indica donde desencadena pero en coleccion
const id = { nombre: `id`, type: `texto` };
const idColec = { nombre: `idColec`, type: `texto` };//Cuando un elemento se crea desencadenado desde una collecion, este id en el destino el mismo id de coleccion que lo creo en origen
const idDesen = { nombre: `idDesen`, type: `texto` };//Cuando un elemento se crea desencadenado, este id en el destino el mismo id que lo creo en origen
const orden = { nombre: `orden`, type: `numero`, maxCaract: 4 };//orden en atributos de selec
const origen = { nombre: `origen`, type: `texto` };//Representa el orgine de la las operaciones desencadenadas
const position = { nombre: `position`, type: `text` };//Ver si se usa ?????????????????????????????????????
const post = { nombre: `post`, type: `texto` }; //Indica cuando los adjunto se cargaron en el front end o viene de base datos en coleccion de adjuntos  
/////tc
const tipoCAmbioValidacoin = /\d{1,4}[\s.,]\d{0,5}$/
const tipoCambio = { nombre: `tipoCambio`, type: `tipoCambio`, validacion: { match: tipoCAmbioValidacoin, texto: `Campo obligatorio numero` } };
const tipoCambioAlternativo = { nombre: `tipoCambioAlternativo`, type: `tipoCambio`, validacion: { match: tipoCAmbioValidacoin, texto: `Campo obligatorio numero` } };
/////// Cantidad
const cantidadValidacion = /^\d{1,10}$/
const cantidad = { nombre: `cantidad`, type: `numero`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
const cantidadDos = { nombre: `cantidadDos`, type: `numero`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
const cantidadTres = { nombre: `cantidadTres`, type: `numero`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
const num = { nombre: `num`, type: `numerador`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
const tiempoConsumido = { nombre: `tiempoConsumido`, type: `numero`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
const tiempoEstimado = { nombre: `tiempoEstimado`, type: `numero`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
const tiempoRemanente = { nombre: `tiempoRemanente`, type: `numero`, validacion: { match: cantidadValidacion, texto: `Campo obligatorio número entero` } };
/////// Porcentage
const porcentage = { nombre: `porcentage`, type: `porcentage` };//Se usa en proyectado ver 
////// adjunto
const adjunto = { nombre: `adjunto`, type: `adjunto`, validacion: { match: /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, texto: `Campo oblogatorio` } };
const adjuntoColeccion = { nombre: `adjuntoColeccion`, type: `adjunto`, validacion: { match: /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, texto: `Campo oblogatorio` } };
/////Fechas
const fechaValidacion = /^[a-zA-Z0-9\_\-]{4,16}$/
const date = { nombre: `date`, type: `date`, validacion: { match: fechaValidacion, texto: `Campo Obligatorio` } };
const fecha = { nombre: `fecha`, type: `fecha`, validacion: { match: fechaValidacion, texto: `Campo Obligatorio` } };
const fechaDos = { nombre: `fechaDos`, type: `fecha`, validacion: { match: fechaValidacion, texto: `Campo Obligatorio` } };
const fechaTres = { nombre: `fechaTres`, type: `fecha`, validacion: { match: fechaValidacion, texto: `Campo Obligatorio` } };
////atributos texto completo
const textoCompletoValidacion = /.{1,3000}/
const observacionesCompleto = { nombre: `observacionesCompleto`, type: `textarea`, validacion: { match: fechaValidacion, texto: `Campo Obligatorio` } };
const descripcionCompleto = { nombre: `descripcionCompleto`, type: `textarea`, validacion: { match: fechaValidacion, texto: `Campo Obligatorio` } };
//////atriutos textos
//email
const email = { nombre: `email`, type: `texto`, validacion: { match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, texto: `Debe contener "@" y ".com"` } };
//Primera letra mayuscula
const validacionMayuscula = /^[A-Za-zñ]+[a-zA-Z\sñ]*[a-zA-Zñ]*$/
const nombre = { nombre: `name`, type: `texto`, validacion: { match: validacionMayuscula, texto: `La primera letra de cada palabra debe ser mayuscula` } };
const apellido = { nombre: `surname`, type: `texto`, validacion: { match: validacionMayuscula, texto: `La primera letra de cada palabra debe ser mayuscula` } };
//Maximo largo 2 caracteres solo letras mayuscula
const letra = { nombre: `letra`, type: `texto`, observaciones: `Texto de un caracter`, validacion: { match: /[A-Z]{1,2}$/, texto: `Una letra Mayuscula es obligatoria` } };
//Maximo largo 5 caracteres
const abrev = { nombre: `abrev`, type: `texto`, observaciones: `Abrevietura de tres letras maximo 5 caracteres`, validacion: { match: /.{3,5}$/, texto: `Debe contener entre 3 caracteres` } };
//Password
const validarPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}[^'\s]$/
const password = { nombre: `password`, type: `password`, validacion: { match: validarPassword, texto: `Debe contener 6 a 15 caractere, al menos una mayuscula, un numero y un caracter complejo ` } };
//Solo valida que completa 
const validacionTextoStandar = /.{1,500}$/
const descripcion = { nombre: `descripcion`, type: `texto`, validacion: { match: validacionTextoStandar, texto: `Campo obligatorio` } };
const direccion = { nombre: `direccion`, type: `texto`, validacion: { match: validacionTextoStandar, texto: `Campo obligatorio` } };
const documento = { nombre: `documento`, type: `texto`, validacion: { match: validacionTextoStandar, texto: `Campo obligatorio` } };
const observaciones = { nombre: `observaciones`, type: `texto`, validacion: { match: validacionTextoStandar, texto: `Campo obligatorio` } };
const observacionesColec = { nombre: `observacionesColec`, type: `texto`, validacion: { match: validacionTextoStandar, texto: `Campo obligatorio` } };
const telefono = { nombre: `telefono`, type: `texto`, validacion: { match: validacionTextoStandar, texto: `Debe contener entre 3 caracteres` } };
const username = { nombre: `username`, type: `texto`, validacion: { match: validacionTextoStandar, texto: `Campo obligatorio` } };
const usuario = { nombre: `usuario`, type: `texto`, validacion: { match: validacionTextoStandar, texto: `Campo obligatorio` } };
//////referencia
const letraComprobante = { nombre: `letraComprobante`, type: `texto`, key: [`letraComprobante`], validacion: { texto: `Seleccione una opcion` } };
const rubro = { nombre: `rubro`, type: `referencia`, observaciones: `Referencia a concepto del pago`, maxCaract: 100, key: [`name`] };
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
        otrosImpuestos: impuestoUno,
        otrosImpuestosArs: impuestoUnoArs,
        otrosImpuestosUsd: impuestoUnoUsd,
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
        iva: impuestoUno,
        ivaArs: impuestoUnoArs,
        ivaUsd: impuestoUnoUsd,
        otrosImpuestos: impuestoDos,
        otrosImpuestosArs: impuestoDosArs,
        otrosImpuestosUsd: impuestoDosUsd,
        total: importe,
        totalArs: importeArs,
        totalUsd: importeUsd
    }
}



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
$(`body`).on(`mouseover`, `.contError`, function (e) {

    let div = `<div class="cartelMovil" style="left:${e.pageX}px; top:${e.pageY}px">${$(`p`, $(this)).html()}</div>`
    let d = $(div)

    $(`body`).append(div);
})
$(`body`).on(`mouseout`, `.contError`, function (e) {

    $(`body .cartelMovil`).remove()

})

$(`body`).on(`click`, `img.ojoPassword`, function (e) {

    let target = e.target
    let parent = $(e.target).parent()

    if ($(target).hasClass(`tachado`)) {
        $(target).attr(`src`, `/img/abm/ojo.png`)
        $(target).removeClass(`tachado`)

        $(`input.password, #password`, parent).attr(`type`, `text`)
    } else {

        $(e.target).addClass(`tachado`)
        $(e.target).attr(`src`, `/img/abm/ojoTachado.png`)
        $(`input.password, #password`, parent).attr(`type`, `password`)
    }

})

$(document).click(function (e) {
    if (e.button == 0) {
        $(`#menuContextualTitulo,
           #menuContextualCuerpoTabla,
           #menuContextualInput`).css("display", "none");
        /////////////este cierre la venta emergente del pdf////////

        // $(`.cartelErrorFront`).remove();
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
        $(`.cartelMovil`).remove();
        $(`.cartelErrorFront`).remove();
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
const primeraLetraMayuscula = function (objeto, numeroForm, atributos) {
    let match = /\s[^'\s]/
    const mayuscula = function (e) {

        let mayus = ""

        if (match.test(e.target.value)) {

            let words = e.target.value.split(" ")
            let may = ""

            $.each(words, (indice, value) => {

                may += value[0].toUpperCase() + value.slice(1) + " "
            })
            mayus = may.slice(0, -1)

        } else {
            mayus = e.target.value[0].toUpperCase() + e.target.value.slice(1)
        }

        $(e.target).val(mayus)
    }

    if ($(`#formularioIndividual .formulario`).length == 0) {
        $.each(atributos, (indice, value) => {
            $(`#t${numeroForm} input.${value.nombre}`).change(mayuscula);
        })

    } else {
        $.each(atributos, (indice, value) => {
            $(`#formularioIndividual input.${value.nombre}`).change(mayuscula);
        })
    }
}







