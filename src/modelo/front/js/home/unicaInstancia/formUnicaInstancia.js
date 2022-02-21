let crearFormulario = function (objeto, consultaArray, contador, numeroForm, fidecomisoSelec, consulta) {

    let accion = objeto.accion;
    let key = objeto.key;
    let pestanas = objeto.pestanas.totales;
    let valorAbm = new Object;
    let formIndividualPestana = false;
    formularioIndAbm = true;
    let editando = false;
    let confirmarImprimir = false
    let eliminarDesenColc = []
    let eliminarAdjuntos = []
    let lengthUnoSelect = new Object

    formularioIndAbm = true;

    let imgs = `<div class="com" id="com${accion}${numeroForm}">${iMailF}${iExpoF}${iLupa}${iImprimir}${iDeshabilitarF}${iDeleteF}${iEditF}${iCruzF}${iOkimprimirF}${iOkF}
     <div><div class="cartelErrorForm noShow">
                <p>Revisar los campos en rojo</p>
            </div>
        </div>
        </div>
        <div class="closeForm ${numeroForm}">+</div>`;

    let imagenes = $(imgs);

    imagenes.appendTo('#comanderaIndiv');

    let formularioPrimer = "";
    formularioPrimer += `<div id="formulario${accion}${numeroForm}" class="formulario">`;
    formularioPrimer += `<form method="post" action="/${accion}" id="f${accion}${numeroForm}" enctype="multipart/form-data"></form></div>`;

    let formPrim = $(formularioPrimer);

    formPrim.appendTo(`#cabeceraForm`);
    let formulario = "";

    $.each(objeto.atributos.names, (indice, value) => {

        switch (value.type) {
            case `coleccion`:
            case `coleccionTotal`:
                $.each(value.componentes, (ind, val) => {

                    valorAbm[ind] = $(`#t${numeroForm} tr.sel td.${val.nombre}`).html();
                })
                break
            case `logico`:

                valorAbm[value.nombre] = $(`#t${numeroForm} tr.sel td.${value.nombre} input`).val();
                break
            case `adjunto`:
                let adjuntoCompleto = new Object

                adjuntoCompleto[`originalname`] = $(`#t${numeroForm} tr.sel td.${value.nombre}`).html();
                adjuntoCompleto[`path`] = $(`#t${numeroForm} tr.sel td.${value.nombre}`).attr(`src`);
                valorAbm[value.nombre] = adjuntoCompleto

                break
            default:
                valorAbm[value.nombre] = $(`#t${numeroForm} tr.sel td.${value.nombre}`).html();
                break
        }
    })

    let tipoAtributos = tipoAtributoForm(valorAbm, objeto, numeroForm, formIndividualPestana, consulta)

    editarCompuesto = tipoAtributos.valorcoleccion
    formulario += tipoAtributos.form

    formulario += `</div>`;

    let form = $(formulario);

    form.appendTo(`#formulario${accion}${numeroForm}`);

    $(`#formularioIndividual`).css("display", "flex");
    $(`#formularioIndividual2`).css("display", "flex");

    $(`.form.username`).prop("readonly", "true");
    if ($(`#formularioIndividual .form.username`).val() == "") {
        $(`#formularioIndividual .form.username`).val(usu);
    }

    var fecha = moment(Date.now()).format('L');
    $(`.form.date`).prop("readonly", "true");
    $(`.form.date`).val(fecha);

    $(`.form.destino`).val(objeto.pest);
    $(`.form.destino`).attr("name", `origen`);

    //Agregar validacion si lo erequire
    $.each(objeto.validaciones, function (indice, value) {

        $(`.form.${value.nombre}, .formColec.${value.nombre}`).addClass("requerido");
        $(`.form.${value.nombre}, .formColec.${value.nombre}`).attr("validado", "false");
    })
    $.each(objeto.atributos.number, function (indice, value) {

        $(`.form.${value.nombre}.${numeroForm}`).prop("type", "number");
        $(`.formColec.${value.nombre}.${numeroForm}`).prop("type", "number");
    })
    $.each(objeto.atributos.date, function (indice, value) {

        $(`.form.${value.nombre}`).prop("type", "date");
    })
    $.each(objeto.atributos.soloLectura, function (indice, value) {

        $(`.form.${value.nombre}`).prop("readonly", "true");
    })
    $.each(objeto.formInd.soloLectura.compuesto, function (indice, value) {
        $(`.formColec.${value.nombre}`).prop(`readOnly`, true)
    })
    $.each(objeto.formInd.oculto, function (indice, value) {

        $(`.form.${value.nombre}`).addClass("oculto");

        $(`.form.${value.nombre},
           .tablaCompuesto.${numeroForm} th.${value.nombre},
           .tablaCompuesto.${numeroForm} td.${value.nombre}`).addClass("oculto");

        $(`input.formColec.${value.nombre}`).addClass("oculto");

        $(`.fo.${value.nombre}`).addClass("oculto");
    })
    $.each(objeto.atributos.signo, function (indice, value) {

        if (indice == `signoPesos`) {
            $.each(value, function (i, v) {

                $(`.form.${value.nombre}`).addClass("signoPesos");
            })
        } else if (indice == `signoUsd`) {

            $.each(value, function (i, v) {

                $(`.form.${value.nombre}`).addClass("signoUsd");
            })
        }
    })
    $.each(objeto.atributos.color, function (indice, value) {

        switch (indice) {
            case `azul`:
                $.each(value, function (i, v) {
                    $(`#formularioIndividual input.${v.nombre}`).addClass("azul");
                })
                break
            case `amarillo`:
                $.each(value, function (i, v) {
                    $(`#formularioIndividual input.${v.nombre}`).addClass("amarillo");
                })

                let avisoAmarillo = `<div class="cartelAyuda amarillo"><p>Los items pueden tener mas de un valor de este tipo</p></div>`
                let aa = $(avisoAmarillo)
                aa.appendTo(`#bf${numeroForm}`)

                $(`td.amarillo`).click(function () {
                    $(`.cartelAyuda`).fadeToggle(1000);
                })
                break
            case `verde`:
                $.each(value, function (i, v) {
                    $(`#formularioIndividual input.${v.nombre}`).addClass("verde");
                })

                let avisoVerde = `<div class="cartelAyuda verde"><p>Los items forman las filas de la tabla de doble entrada</p></div>`
                let av = $(avisoVerde)
                av.appendTo(`#bf${numeroForm}`)

                $(`td.verde`).click(function () {
                    $(`.cartelAyuda`).fadeToggle(1000);
                })
                break
        }
    })
    $.each(consultaArray, function (indice, value) {
        let editPestana = false

        var selectRemove = $(`#form${pestanas[indice].nombre}`).children("select");
        selectRemove.remove();

        let valor = $(`tr.sel td.${pestanas[indice].nombre}`).html();
        if (valor != undefined) {
            editPestana = true
        }

        if (value.length > 1) {

            $(`.form.${pestanas[indice].nombre}`).removeClass("requerido");
            $(`.form.${pestanas[indice].nombre}`).attr("disabled", "true");
            $(`.formColec.${pestanas[indice].nombre}`).attr("disabled", "true");
            $(`.formColec.${pestanas[indice].nombre}`).removeClass("requerido");

            var s = `<select class="select form ${pestanas[indice].nombre} requerido"  name="${pestanas[indice].nombre}" form="f${accion}${numeroForm}" validado="false">>`;

            s += `<option class="opciones" value=""></option>`;

            for (var i = 0; i < value.length; i++) {

                if ((value[i].habilitado == true) || (valor == value[i].name)) {

                    let show = ""
                    $.each(objeto.pestanas.totales[indice].key, (ind, val) => {

                        show += `${value[i][val]} `
                    })

                    s += `<option class="opciones ${value[i].habilitado}" value="${value[i].name}">${show}</option>`;
                }
            }

            s += `</select>`;

            let clase = $(`.form.${pestanas[indice].nombre}`);
            let claseComp = $(`.formColec.${pestanas[indice].nombre}.${numeroForm}:first`);
            let ordenSelect = clase.attr("tabindex");
            clase.removeAttr("tabindex");

            let select = $(s);
            clase.css("display", "none");
            claseComp.css("display", "none");
            clase.val("")
            select.appendTo(`#form${pestanas[indice].nombre}${numeroForm},
                          .comp.${pestanas[indice].nombre}.${numeroForm}`);
            select.val(valor);

            $(`.formColec.${pestanas[indice].nombre}.${numeroForm}`).addClass("ocult")

            if (select.val() == null) {

                $(`option[value ~="${valor}"]`, select).attr("selected", true);
            }
            select.attr("tabindex", ordenSelect);

            if (editPestana == true) {

                select.attr("disabled", "disabled");
            }

            if (objeto.pestanas.coleccion.includes(pestanas[indice])) {

                let primerFila = $(`#tablaCol${objeto.accion}${numeroForm} tr:nth-child(1n) td.${pestanas[indice].nombre}`)
                if (!(primerFila.hasClass(`comp`))) {


                    select.appendTo(`.vacio.${pestanas[indice].nombre}.${numeroForm}:first`)
                }

                $.each(objeto.atributos.compuesto, (ind, val) => {

                    let tr = $(`#formularioIndividual tr.${val.nombre}`);

                    $.each(tr, (i, v) => {

                        let input = $(`input.${pestanas[indice].nombre}`, v).val()
                        $(`input.${pestanas[indice].nombre}`, v).attr(`disabled`, `disabled`)


                        $(`select.${pestanas[indice].nombre}`, v).val(input)
                        $(`select.${pestanas[indice].nombre}`, v).attr(`disabled`, `disabled`)
                        $(input).val("")
                        $(input).attr("disabled", true)

                    })
                })
            }
            editPestana = false
        } else {
            editPestana = false
            if (value[0].habilitado == true) {

                let show = ""
                $.each(objeto.pestanas.totales[indice].key, (ind, val) => {

                    show += `${value[0][val]}`
                })

                $(`#formularioIndividual .form.${pestanas[indice].nombre}`).addClass("validado");
                $(`#formularioIndividual .form.${pestanas[indice].nombre}`).prop("readonly", "true");
                $(`#formularioIndividual .form.${pestanas[indice].nombre}`).attr("validado", "true");
                $(`#formularioIndividual .form.${pestanas[indice].nombre}`).val(show)
                lengthUnoSelect[pestanas[indice].nombre] = show

            } else {
                $(`#formularioIndividual .form.${pestanas[indice].nombre}`).val("No hay valores habilitados");
                $(`#formularioIndividual .form.${pestanas[indice].nombre}`).prop("readonly", "true");
                $(`#formularioIndividual .form.${pestanas[indice].nombre}`).prop("disabled", "true");
            }

        }
    });
    $(`#formularioIndividual .closeForm.${numeroForm}`).click(function () {

        formularioIndAbm = false;
        $(`#formularioIndividual div.cuadroForm`).removeClass(`desHabilitado`)

        if (editando == true) {
            popUpEliminacionFormIndividual(objeto, numeroForm, fidecomisoSelec)
        } else {

            eliminarFormularioIndividual(objeto, numeroForm, fidecomisoSelec)
        }
    });
    $(`#formularioIndividual .okfBoton,
           #formularioIndividual .okfImprimirBoton`).click(function (e) {


        if (this.title == "Confirmar e imprimir instancia") {
            confirmarImprimir = true
        }

        e.preventDefault();
        let valid = [];

        let numForm = $(`.fo.numFidei p`).html();
        let numFormu = parseFloat(numForm);

        if (isNaN(numFormu)) {
            numFormu = 0
        }
        $.each(objeto.validaciones, function (indice, value) {

            $(`#form${value.nombre}${numeroForm}`).children(`.contError`).remove();

            valid.push($(`#form${value.nombre}${numeroForm} .${value.nombre}.requerido`).attr("validado"));

            if ($(`#form${value.nombre}${numeroForm} .${value.nombre}.requerido`).attr("validado") == "false") {
                let p = `<div class="contError"><p>${value.validaciones.texto}</p></div>`;

                let texto = $(p);

                texto.appendTo(`#form${value.nombre}${numeroForm}`);
            }

            if (!(objeto.atributos.names.includes(value))) {

                let tablaTr = $(`#tablaCol${objeto.accion}${numeroForm} tr`)
                let tablaLimpia = tablaTr.slice(1, tablaTr.length - 1);

                $.each(tablaLimpia, (i, v) => {

                    $(`.${value.nombre}.requerido`, v).siblings(`.contError`).remove();

                    let prove = $(`.${value.nombre}.requerido`, v).attr("validado")

                    if (prove == "false") {
                        let p = `<div class="contError"><p>${value.validacion.texto}</p></div>`;

                        let texto = $(p);

                        let celda = $(`.${value.nombre}.requerido`, v).parent()

                        texto.appendTo(celda);
                    }
                    valid.push(prove)

                })
            }
        })

        let id = $(`#formularioIndividual input.id.${numeroForm}`).val()
        let fileEnviado = $(`myFormEdit${objeto.accion}${numeroForm}`)

        if ((editando == true) && (id != "")) {

            let desencadenanteColecModif = new Object
            let desencadenateColecTriger = false
            $.each(objeto.desencadenaColeccion.desencadenaModif, function (indice, value) {

                desencadenanteColecModif[indice] = value
                desencadenateColecTriger = true
            })

            if (desencadenateColecTriger == true) {

                desencadenaColecModifEdit(desencadenanteColecModif, objeto, numeroForm)
            }

            ///////////////////////////////////////////////////////////

            $.each(objeto.desencadena.condicionalUnBooleano, function (indice, value) {

                if ($(`.form.${value.condicion.nombre}.${numeroForm}`).prop(`checked`)) {

                    enviarRegistroEditadoDesenc(objeto, numeroForm, value.destino)
                }
            })

            $.each(objeto.desencadena.principal, function (indice, value) {

                enviarRegistroEditadoDesenc(objeto, numeroForm, value)
            })
            let desencadenateModifTriger = false
            let desencadenanteModif = new Object;

            $.each(objeto.desencadena.desencadenaModif, (indice, value) => {

                desencadenanteModif[indice] = value
                desencadenateModifTriger = true
            })

            if (desencadenateModifTriger == true) {

                desencadenaModifForm(desencadenanteModif, objeto, numeroForm)
            }

            enviarRegistroEditadoForm(objeto, numeroForm, lengthUnoSelect, eliminarDesenColc, eliminarAdjuntos);
            editando = false
            confirmarImprimir = false

            if (confirmarImprimir == true) {
                imprimirDirecto(objeto, numeroForm),
                    confirmarImprimir = false
            }


        } else {


            let fideicomiso = $(`#formunidades${contador} select option:selected`).val();
            let individual = true;

            $.when($.each(objeto.numerador, (ind, val) => {

                $.each(val, (indice, value) => {

                    let numeradorObjeto = new Object;
                    numeradorObjeto[`name`] = value.name;

                    $.each(value.atributos, (i, v) => {

                        if ($(`#formulario${accion}${numeroForm} .form.${v.nombre}`).val() == "") {
                            numeradorObjeto[v.nombre] = $(`#formulario${accion}${numeroForm}  .select.${v.nombre} option:selected`).val();;
                        } else {
                            numeradorObjeto[v.nombre] = $(`#formulario${accion}${numeroForm} input.form.${v.nombre}`).val();
                        }
                    })

                    insertarNumerador(numeradorObjeto)
                })
            })).done(enviarRegistroNuevoForm(numeroForm, objeto, lengthUnoSelect, false))
        }

        if (confirmarImprimir == true) {
            imprimirDirecto(objeto, numeroForm),
                confirmarImprimir = false
            // }
        }
    });
    $(`#formularioIndividual .editBoton`).click(function () {

        $(`#formularioIndividual input.unidades`).val()

        editFormulario(objeto, numeroForm)

        editando = true;
        console.log(editando)

    });
    $(`#formularioIndividual #formulario${accion}${numeroForm}`).on(`dblclick`, `input.form, select.form`, function (e) {

        if (editando == true) {
            editFormulario(objeto, numeroForm)
            editando = true
        }
    });
    $(`#formularioIndividual .deleteBoton`).click(function () {

        let esForm = true;
        let idRegistro = "";
        let idRegist = $(`#formularioIndividual input.form._id`).val();
        let idRegistr = $(`#formularioIndividual input.form.id`).val();
        let numDes = $(`#formularioIndividual .fo.numFidei P`).html();
        let unidDes = $(`#t${numeroForm} tr.sel td.unidades`).html();
        let unidDesModif = $(`#t${numeroForm} tr.sel td.unidadesDestino`).html();

        let pregunta = $(`tr.sel td.${key.atributo.nombre}`).html();

        if ((idRegist == undefined || idRegist == "")) {
            if (idRegistr == undefined || idRegistr == "") {
                $(`.cartelErrorForm p`).html("No se encuentra registro a eliminar")
                $(`.cartelErrorForm`).css("display", "block")
            } else {
                idRegistro = idRegistr;

                filaSeleccionada = [];

                $.each(objeto.atributos.names, (indice, value) => {

                    filaSeleccionada[value.nombre] = $(`#t${numeroForm} tr.sel td.${value.nombre}`).html()
                })

                $.each(objeto.atributos.number, (indice, value) => {

                    let valor = ($(`#t${numeroForm} tr.sel td.${value.nombre}`).html())

                    let val = valor.replace(`.`, ``)

                    filaSeleccionada[value] = val
                })
                popUpEliminacion(pregunta, numeroForm, idRegistro, objeto, esForm, fidecomisoSelec, filaSeleccionada)
            }

        } else {
            idRegistro = idRegist;
            popUpEliminacion(pregunta, numeroForm, idRegistro, objeto, esForm, numDes, unidDes, unidDesModif, fidecomisoSelec)

        }

    });
    $(`#formularioIndividual .desHabilitarBoton`).click(function (e) {

        e.preventDefault();

        let idRegistro = $(`#formularioIndividual input.id`).val();

        if (idRegistro == null) {
            idRegistro = $(`#formularioIndividual input._id`).val();
        }

        let estadoRegistro = $(`#formularioIndividual input.habilitado`).val();

        if (estadoRegistro == "false") {

            estadoRegistro = true

        } else {
            estadoRegistro = false

        }

        habilitarDesHabilitarRegistro(objeto, numeroForm, idRegistro, estadoRegistro)

    })
    $(`#formularioIndividual .okfLupa`).click(function (e) {
        formularioIndividual(objeto, numeroForm, consulta)
    })
    $(`#formularioIndividual .okfImprimir`).click(function (e) {

        imprimirDirecto(objeto, numeroForm)

    })
    $(`#formularioIndividual .cruzBoton`).click(function () {

        if (editando == true) {
            $(`.cartelErrorForm p`).html("No se puede limpiar campos en edicion")
            $(`.cartelErrorForm`).css("display", "block");
        } else {
            $(`input.form`).val("");
            $(`.select.form`).val("");

            $(`#formnum${contador} p`).text("");

            $(`.form.username`).val(usu);
            let fecha = moment(Date.now()).format('L');
            $(`.form.date`).prop("readonly", "true");
            $(`.form.date`).val(fecha);

            $(`input.form`).attr(`disabled`, false);
            $(`.select.form`).attr(`disabled`, false);
        }
    });
    $(`#formularioIndividual div.tableCol.${numeroForm}`).on(`dblclick`, `td.vacio`, function (e) {

        e.stopPropagation();

        if ($(`#formularioIndividual input.id.${numeroForm}`).attr(`disabled`)) {

            editFormulario(objeto, numeroForm)
            editando = true
        }

        let filaPadre = $(e.target).parent().parent()
        let elemento = this.parentNode.parentNode.parentNode
        let id = elemento.id.slice(2)
        let ord = parseFloat($(e.target).attr(`ord`))

        editarCompuestoFormInd(objeto, numeroForm, id, filaPadre, this, ord)
    })
    $(`#formularioIndividual div.tableCol.${numeroForm}`).on(`dblclick`, $(`tr`).eq(1), function (e) {

        e.stopPropagation();

        if ($(`#formularioIndividual input.id.${numeroForm}`).attr(`disabled`)) {

            editFormulario(objeto, numeroForm)
            editando = true
        }
    })
    $(`#formularioIndividual div.tableCol.${numeroForm}`).on(`dblclick`, `td.comp`, function (e) {

        e.stopPropagation();

        if ($(`#formularioIndividual input.id.${numeroForm}`).attr(`disabled`)) {

            editFormulario(objeto, numeroForm)
            editando = true
        }
    })
    $(`#formularioIndividual div.tableCol.${numeroForm}`).on(`click`, `td.delete`, function (e) {

        e.stopPropagation();

        if ($(`#formularioIndividual input.id.${numeroForm}`).attr(`disabled`)) {
            editFormulario(objeto, numeroForm)
            editando = true
        }

        if (objeto.desencadenaModif != []) {

            let objetoEliminar = deleteCompuesto(objeto, numeroForm, this)
            eliminarDesenColc.push(objetoEliminar.objetoColeccionEliminar)
            eliminarAdjuntos.push(objetoEliminar.adjunto)
        } else {
            deleteCompuesto(objeto, numeroForm, this)
        }

    })
    $(`#formularioIndividual div.fo.adjunto img.eliminarAdj`).click(function () {

        let father = $(this).parent().parent().parent()

        let adjunto = $(`div.src`, father).attr(`src`)

        if (adjunto != "") {
            eliminarAdjuntos.push(adjunto)

        }

        $(`div.src`, father).html(`Sin Adjunto`);
        $(`div.src`, father).attr(`src`, "");
        $(`label`, father).removeClass("validado");
        $(`label`, father).attr("validado", false);
    })
    $(`#formularioIndividual div.fo input.adjunto,
       #formularioIndividual input.adjuntoColeccion`).change(function () {

        let valorAdjunto = $(this).val();
        let father = $(this).parent();
        let adjunto = $(`div.src`, father).attr(`src`)

        if (valorAdjunto == "") {
            $(`div.src`, father).html(`Sin Adjunto`);
            $(`div.src`, father).attr(`src`, "");
            $(`label`, father).removeClass("validado");
            $(`label`, father).attr("validado", false);

        } else {

            $(`div.src`, father).html(valorAdjunto);
            $(`div.src`, father).attr(`src`, "");
            $(`label`, father).addClass("validado");
            $(`label`, father).attr("validado", true);

        }
        eliminarAdjuntos.push(adjunto)
    });

    validarFormulario(objeto, numeroForm);
    activePestana(objeto, numeroForm)
    renglones(objeto, numeroForm)
    formatoCeldas(objeto, contador);
    eliminarDeshabilitar(objeto, numeroForm)
    abrirAdjuntoFormIndividual(objeto, numeroForm)


    $.each(objeto.funcionesPropias.cargar, function (indice, value) {

        objeto.funcionesPropias.cargar[indice](objeto, numeroForm)
    })
    $.each(objeto.funcionesPropias.consultaArr, function (indice, value) {

        value(objeto, numeroForm, consultaArray)
    })
    $.each(objeto.funcionesPropias.cargarDosAtributo, function (indice, value) {

        value[0](objeto, numeroForm, value[1], value[2])
    })
    $.each(objeto.funcionesPropias.cargarTresAtributo, function (indice, value) {

        value[0](objeto, numeroForm, value[1], value[2], value[3])
    })
    $.each(objeto.funcionesPropias.formularioIndiv, function (indice, value) {

        value(objeto, numeroForm, consultaArray)
    })

    if (valorAbm[objeto.validaciones[0].name] == undefined) {


        $.each(objeto.numerador.global, (indice, value) => {

            consultaNumer(value.name, value.filtro, numeroForm);
        })
    }
    if ($(`#formularioIndividual input.id`).val() == "" || $(`#formularioIndividual input._id`).val() == "") {

        $.each(objeto.atributos.valoresIniciales.string, function (indice, value) {

            $(`#formularioIndividual input.${indice}`).val(value)
            $(`#formularioIndividual input.${indice}`).attr(`validado`, true)
            $(`#formularioIndividual input.${indice}`).addClass(`validado`)

        })
        $.each(objeto.atributos.valoresIniciales.select, function (indice, value) {

            $(`#formularioIndividual select.${indice} option[value="${value}"]`).attr(`selected`, true)
            $(`#formularioIndividual select.${indice}`).attr(`validado`, true)
            $(`#formularioIndividual select.${indice}`).addClass(`validado`)

        })
        $.each(objeto.atributos.valoresIniciales.funcion, function (indice, value) {

            value(objeto, numeroForm)
        })
    }
}
/////////////////////////////////////
let crearFormularioPestana = function (objeto, numeroInterno, contador, fidecomisoSelec) {

    let consultaArray = [];
    let accion = objeto.accion;
    let pestanas = objeto.pestanas;
    let validaciones = objeto.validaciones;
    let pest = objeto.pest;
    let orden = 0;
    formIndividualPestana = true;
    let confirmarImprimir = false
    let lengthUnoSelect = new Object

    let formularioPrimer = "";
    formularioPrimer += `<div class="tabs_contents_item active formularioPestana" id="t${contador}">`;
    formularioPrimer += `<form method="POST" action="/${accion}" id="f${accion}${contador}"></form>`;

    let formPrim = $(formularioPrimer);

    formPrim.appendTo(`#tabs_contents`);
    let formulario = "";

    let valorAbm = "";

    let tipoAtributos = tipoAtributoForm(valorAbm, objeto, contador, numeroInterno, formIndividualPestana)

    formulario += tipoAtributos.form

    formulario += `</div>`;

    let form = $(formulario);

    form.appendTo(`#t${contador}`);

    $(`.form.username`).val(usu);

    var fecha = moment(Date.now()).format('L');
    $(`.form.date.${contador}`).val(fecha);

    $(`.form.destino.${contador}`).val(pest);
    $(`.form.destino.${contador}`).attr("name", `origen`);

    $.each(objeto.formInd.number, function (indice, value) {

        $(`.form.${value.nombre}.${contador}`).prop("type", "number");
    })
    $.each(objeto.atributos.date, function (indice, value) {

        $(`.form.${value.nombre}.${contador}`).prop("type", "date");
    })
    $.each(objeto.atributos.soloLectura, function (indice, value) {

        $(`.form.${value.nombre}`).prop("readonly", "true");
    })
    $.each(objeto.formInd.soloLectura.compuesto, function (indice, value) {
        $(`.formColec.${value.nombre}`).prop(`readOnly`, true)
    })
    $.each(objeto.formInd.oculto, function (indice, value) {

        $(`.form.${value.nombre},
             th.${value.nombre},
             .tablaCompuesto.${contador} td.${value.nombre}`).addClass("oculto");

        $(`.fo.${value.nombre}`).addClass("oculto");
    })
    $.each(validaciones, function (indice, value) {

        $(`.form.${value.nombre}.${contador},
           .formColec.${value.nombre}.${contador}:first`).addClass("requerido");
        $(`.form.${value.nombre}.${contador},
            .formColec.${value.nombre}.${contador}:first`).attr("validado", "false");
    })
    $.each(pestanas.totales, function (indice, value) {

        $.ajax({
            type: "get",
            async: false,
            url: `/${value.nombre}`,
            success: function (data) {

                let valor = objeto.atributos.valoresIniciales.select[pestanas.totales[indice].nombre];

                if (data.length > 1) {

                    $(`#t${contador} .form.${pestanas.totales[indice].nombre}`).removeClass("requerido");
                    $(`#t${contador} .form.${pestanas.totales[indice].nombre}`).attr("disabled");
                    $(`#t${contador} .formColec.${pestanas.totales[indice].nombre}`).attr("disabled", "true");
                    $(`#t${contador} .formColec.${pestanas.totales[indice].nombre}`).removeClass("requerido");

                    let s = `<select class="select form ${pestanas.totales[indice].nombre} requerido"  id = "select${pestanas.totales[indice].nombre}" name="${pestanas.totales[indice].nombre}" form="f${accion}${contador}" validado="false" >`;

                    s += `<option class="opciones" value=""></option>`;

                    for (var i = 0; i < data.length; i++) {

                        if (data[i].habilitado == true) {

                            let show = ""
                            $.each(objeto.pestanas.totales[indice].key, (ind, val) => {

                                show += `${data[i][val]} `
                            })

                            s += `<option class="opciones" value="${data[i].name}">${show}</option>`;
                        }
                    }

                    s += `</select>`;

                    let clase = $(`.form.${pestanas.totales[indice].nombre}.${contador},
                                   .formColec.${pestanas.totales[indice].nombre}.${contador}:first`);
                    let ordenSelect = clase.attr("tabindex");
                    clase.removeAttr("tabindex");

                    let select = $(s);

                    clase.css("display", "none");
                    clase.prop("disabled", true);

                    select.appendTo(`#form${pestanas.totales[indice].nombre}${contador},
                                    .vacio.${pestanas.totales[indice].nombre}.${contador}:first`);

                    select.appendTo(`#f${pestanas.totales[indice].nombre}${contador},
                                     .vacio.${pestanas.totales[indice].nombre}.${contador}:first`);

                    select.val(valor);

                    if (valor != undefined) {

                        $(`#t${contador} select.${pestanas.totales[indice].nombre}`).attr(`validado`, true)
                        $(`#t${contador} select.${pestanas.totales[indice].nombre}`).addClass(`validado`)
                    }
                    select.attr("tabindex", ordenSelect)

                } else {

                    if (data[0].habilitado == true) {
                        let show = ""
                        $.each(objeto.pestanas.totales[indice].key, (ind, val) => {

                            show += `${data[0][val]}`;
                        })

                        $(`#t${contador} .form.${pestanas.cabecera[indice].nombre}`).removeClass("requerido");
                        $(`#t${contador} .form.${pestanas.cabecera[indice].nombre}`).prop("readOnly", true);
                        $(`#t${contador} .${pestanas.cabecera[indice].nombre}`).val(show);

                        lengthUnoSelect[pestanas.cabecera[indice].nombre] = show

                    }
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    });
    $(`.closeForm`).click(function () {

        $(`#formulario${accion}`).remove();
        $(`#com${accion}`).remove();

        $(`#formularioIndividual`).css("display", "none");

    });
    $(`#bf${contador} .okfBoton,
      #bf${contador} .okfImprimirBoton`).click(function (e) {

        if (this.title == "Confirmar e imprimir instancia") {
            confirmarImprimir = true
        }

        e.preventDefault();
        let valid = [];

        $.each(validaciones, function (indice, value) {


            $(`#form${value.nombre}${contador}`).children(`.contError`).remove();

            valid.push($(`#t${contador} #form${value.nombre}${contador} .${value.nombre}.requerido`).attr("validado"));

            if ($(`#tablas #form${value.nombre}${contador} .${value.nombre}.requerido`).attr("validado") == "false") {
                let p = `<div class="contError"><p>${value.validacion.texto}</p></div>`;
                let texto = $(p);

                texto.appendTo(`#form${value.nombre}${contador}`);
            }
            if (!(objeto.atributos.names.includes(value))) {
                let tablaTr = $(`#tablaCol${objeto.accion}${contador} tr`)

                let tablaLimpia = tablaTr.slice(1, tablaTr.length - 1);
                $.each(tablaLimpia, (i, v) => {

                    $(`.${value.nombre}.requerido`, v).siblings(`.contError`).remove();

                    let prove = $(`.${value.nombre}.requerido`, v).attr("validado")

                    if (prove == "false") {
                        let p = `<div class="contError"><p>${value.validacion.texto}</p></div>`;

                        let texto = $(p);

                        let celda = $(`.${value.nombre}.requerido`, v).parent()

                        texto.appendTo(celda);
                    }
                    valid.push(prove)
                })
            }
        })
        if ($(`.form.unidades.${contador} input.${objeto.key.nombre}`).attr(`keyRep`) == `true`) {

            let valueRepetido = $(`#formunidades${contador} input.${objeto.key.atributo}`).val()

            $(`.cartelErrorFront p`).html(`Ya existe un registro con ${objeto.key.nombre} ${valueRepetido}`)
            $(`.cartelErrorFront`).css("display", "block");
            confirmarImprimir = false

        } else if (valid.includes("false")) {

            $(`.cartelErrorFront p`).html("Revisar los campos en rojo")
            $(`.cartelErrorFront`).css("display", "block");
            confirmarImprimir = false
        } else {

            let fideicomiso = $(`#formunidades${contador} select option:selected`).val();
            let individual = true;

            $.when($.each(objeto.numerador, (ind, val) => {

                $.each(val, (indice, value) => {

                    let numeradorObjeto = new Object;
                    numeradorObjeto[`name`] = value.name;

                    $.each(value.atributos, (i, v) => {

                        if ($(`#t${contador} .form.${v.nombre}`).val() == "") {
                            numeradorObjeto[v.nombre] = $(`#t${contador} .select.${v.nombre} option:selected`).val();;
                        } else {
                            numeradorObjeto[v.nombre] = $(`#t${contador} .form.${v.nombre}`).val();
                        }
                    })

                    insertarNumerador(numeradorObjeto)
                })
            })).done(enviarRegistroNuevoForm(contador, objeto, lengthUnoSelect, true))
            if (confirmarImprimir == true) {

                imprimirDirectoFormInd(objeto, contador),
                    confirmarImprimir = false
            }
        }
    });
    $(`#t${contador} div.tableCol`).on(`dblclick`, `td.vacio`, function (e) {

        e.stopPropagation();

        let filaPadre = $(e.target).parent().parent()
        let elemento = this.parentNode.parentNode.parentNode
        let id = elemento.id.slice(2)
        let ord = parseFloat($(e.target).attr(`ord`))

        editarCompuestoFormInd(objeto, contador, id, filaPadre, this, ord)


    })
    $(`#bf${contador} .deleteBoton`).click(function () {

        let esForm = true;
        let idRegistro = "";
        let idRegist = $(`#formularioIndividual input.form._id`).val();
        let idRegistr = $(`#formularioIndividual input.form.id`).val();
        let numDes = $(`#formularioIndividual .fo.numFidei P`).html();
        let unidDes = $(`#t${numeroForm} tr.sel td.unidades`).html();
        let unidDesModif = $(`#t${numeroForm} tr.sel td.unidadesDestino`).html();

        let pregunta = $(`tr.sel td.${key.atributo.nombre}`).html();

        if ((idRegist == undefined || idRegist == "")) {
            if (idRegistr == undefined || idRegistr == "") {
                $(`.cartelErrorForm p`).html("No se encuentra registro a eliminar")
                $(`.cartelErrorForm`).css("display", "block")
            } else {
                idRegistro = idRegistr;

                filaSeleccionada = [];

                $.each(objeto.atributos.names, (indice, value) => {

                    filaSeleccionada[value.nombre] = $(`#t${numeroForm} tr.sel td.${value.nombre}`).html()
                })

                $.each(objeto.atributos.number, (indice, value) => {

                    let valor = ($(`#t${numeroForm} tr.sel td.${value.nombre}`).html())

                    let val = valor.replace(`.`, ``)

                    filaSeleccionada[value] = val
                })
                popUpEliminacion(pregunta, numeroForm, idRegistro, objeto, esForm, fidecomisoSelec, filaSeleccionada)
            }

        } else {
            idRegistro = idRegist;
            popUpEliminacion(pregunta, numeroForm, idRegistro, objeto, esForm, numDes, unidDes, unidDesModif, fidecomisoSelec)
        }

    });
    $(`#bf${contador} .cruzBoton`).click(function (e) {


    });
    $(`#t${contador} div.tableCol`).on(`click`, `td.delete`, function (e) {

        e.stopPropagation();
        if ($(`#t${contador} input.id.${contador}`).attr(`disabled`)) {
            editFormulario(objeto, contador)
            editando = true
        }
        deleteCompuesto(objeto, contador, this)
    })

    validarFormulario(objeto, contador)
    activePestana(objeto, contador)
    renglones(objeto, contador)
    formatoCeldas(objeto, contador);


    $.each(objeto.funcionesPropias.cargar, function (indice, value) {

        objeto.funcionesPropias.cargar[indice](objeto, contador)
    })
    $.each(objeto.funcionesPropias.cargarDosAtributo, function (indice, value) {

        value[0](objeto, contador, value[1], value[2])
    })
    $.each(objeto.funcionesPropias.cargarTresAtributo, function (indice, value) {

        value[0](objeto, contador, value[1], value[2], value[3])
    })
    $.each(objeto.funcionesPropias.formularioIndiv, function (indice, value) {

        value(objeto, contador, consultaArray)
    })
    $.each(objeto.numerador.global, (indice, value) => {

        consultaNumer(value.name, value.filtro, contador);
    })
    $.each(objeto.atributos.valoresIniciales.string, function (indice, value) {

        $(`#t${contador} input.${indice}`).val(value)
        $(`#t${contador} input.${indice}`).attr(`validado`, true)
        $(`#t${contador} input.${indice}`).addClass(`validado`)
    })
    $.each(objeto.atributos.valoresIniciales.select, function (indice, value) {

        $(`#t${contador} select.${indice}`).addClass(`validado`)
        $(`#t${contador} select.${indice} option[value="${value}"]`).attr(`selected`, true)
        $(`#t${contador} select.${indice}`).attr(`validado`, true)
    })
    $.each(objeto.atributos.valoresIniciales.funcion, function (indice, value) {

        value(objeto, contador)
    })

}
const enviarRegistroNuevoForm = function (numeroForm, objeto, lengthUnoSelect, pestanaIndividual) {

    let accion = objeto.accion
    let pest = objeto.pest;
    let fidecomisoSelec = "";
    let pestanaInd = pestanaIndividual
    let prePost = ($(`#tablaCol${accion}${numeroForm} tr:nth-child(1n) input.post`).val() == "prePost")
    $(`#tablaCol${objeto.accion}${numeroForm} input.post`).val(`post`)
    let file = new FormData($(`#f${accion}${numeroForm}`)[0]);
    let fileEnviar = $(`#f${accion}${numeroForm}`);
    let enviarRegistroNuevo = $(`#f${accion}${numeroForm}`).serializeArray();
    let enviarRegistroTabla = $(`#tablaCol${accion}${numeroForm} tr`);
    let indiceAcopio = objeto.atributos.names.indexOf(acopio)
    let indiceAdjunto = objeto.atributos.names.indexOf(adjunto)

    let desencadenateTriger = false
    let desencadenateModifTriger = false
    let desencadenateColecTriger = false


    if (objeto.atributos.names.includes(acopio) && (!$(`#formularioIndividual input.acopio.${numeroForm}`).prop(`checked`))) {

        enviarRegistroNuevo.splice(indiceAcopio, 0, { name: `acopio`, value: false })
    }

    if (objeto.atributos.names.includes(adjunto)) {
        enviarRegistroNuevo.splice(indiceAdjunto, 0, { name: `adjunto`, value: adjuntoFile })
    }
    let dessencadenanteForm = []
    let desencadenanteModif = new Object;
    let desencadenanteColecModif = new Object;

    $.each(objeto.desencadena.condicionalUnBooleano, function (indice, value) {

        if ($(`.form.${value.condicion.nombre}.${numeroForm}`).prop(`checked`)) {

            dessencadenanteForm.push(value.destino)
            desencadenateTriger = true
        }
    })
    $.each(objeto.desencadena.principal, function (indice, value) {

        dessencadenanteForm.push(value)
        desencadenateTriger = true
    })
    $.each(objeto.desencadena.desencadenaModif, (indice, value) => {

        desencadenanteModif[indice] = value
        desencadenateModifTriger = true
    })
    $.each(objeto.desencadenaColeccion.desencadenaModif, function (indice, value) {

        desencadenanteColecModif[indice] = value
        desencadenateColecTriger = true
    })

    let barraCargar = ""
    $.ajax({
        type: "POST",
        url: `/${accion}`,
        data: file,
        contentType: false,
        processData: false, // tell jQuery not to process the data
        beforeSend: function (data) {

            $(`#bf${numeroForm} .botonesPest .imgB.okfBoton`).css(`display`, `none`)
            $(`#bf${numeroForm} .botonesPest .progressBar`).css(`display`, `flex`)
            $(`#bf${numeroForm} .botonesPest .imgB`).css(`cursor`, `wait`)

            barraCargar = setInterval(progressBarFun, 80, numeroForm)

        },
        complete: function (data) { },
        success: function (response) {

            if (response.posteo != undefined) {

                if (desencadenateTriger == true) {

                    desencadenanteForm(dessencadenanteForm, objeto, numeroForm, file, response.posteo._id)
                }
                if (desencadenateModifTriger == true) {

                    desencadenaModif(desencadenanteModif, objeto, id, false, fileEnviar, response.posteo._id)
                }
                if ((desencadenateColecTriger == true) && (prePost == true)) {

                    desencadenaColecModifNew(desencadenanteColecModif, objeto, id, enviarRegistroNuevo, enviarRegistroTabla, response.posteo._id)
                }
                if (objeto.formInd.compuesto == false) {

                    if (pestanaInd != true) {

                        agregarRegistro(numeroForm, lengthUnoSelect, objeto, fidecomisoSelec, enviarRegistroNuevo, response.posteo)
                    }
                }

                $(`.contError`).remove();

                let numeroFormN = $(`#formnum${numeroForm} p`).text();
                let numeroFormNu = parseFloat(numeroFormN);

                $(`#t${numeroForm} .form.num, #formularioIndividual .form.num`).val(parseFloat($(`input.form.num.${numeroForm}`).val()) + 1);

                $(`#formnum${numeroForm} p`).empty();

                $(`.cartelErrorForm p`).html(response.mensaje);
                $(`.cartelErrorForm`).css("display", "block");

                $(`#t${numeroForm} input.form, #t${numeroForm} input.formColec,
               #formularioIndividual input.form.${numeroForm}, #formularioIndividual input.formColec.${numeroForm}`).val("");
                $(`#t${numeroForm} .select.form,
               #formularioIndividual .select.form`).val("");
                $(`#t${numeroForm} textarea`).val("");

                $(`#t${numeroForm} input.form, #t${numeroForm} input.formColec, #formularioIndividual input.form, #formularioIndividual input.formColec,
              #t${numeroForm} select.form, #formularioIndividual select.form,
              #t${numeroForm} label.adjunto, #formularioIndividual label.adjunto`).removeClass("validado");

                $(`.select.form,#t${numeroForm} label.adjunto,
               #formularioIndividual label.adjunto`).attr("validado", false);

                $(objeto.validaciones, (indice, value) => {

                    $(`#t${numeroForm} input.form.${value.nombre},
                   #t${numeroForm} input.formColec.${value.nombre}`).attr("validado", false);

                    $(`#forlmularioIndividual input.form.${value.nombre},
                   #forlmularioIndividual input.formColec.${value.nombre}`).attr("validado", false);
                })

                $(`#t${numeroForm} label.adjunto,
               #formularioIndividual label.adjunto.${numeroForm}`).html("Adjunto")
               $(`#t${numeroForm} div.adjunto div.descripcionAdjunto,
               #t${numeroForm} div.adjunto div.src,
                #formularioIndividual div.adjunto.${numeroForm} div.descripcionAdjunto,
                #formularioIndividual div.adjunto.${numeroForm} div.src`).html("Sin Adjunto")
                $(`#t${numeroForm} input[type=checkbox],
               #formularioIndividual input[type=checkbox].${numeroForm}`).prop(`checked`, null)

                if (pestanaIndividual == true) {

                    $.each(lengthUnoSelect, (indice, value) => {
                        $(`#t${numeroForm} input.form.${indice}`).val(value);
                        $(`#t${numeroForm} input.form.${indice}`).prop(`readOnly`, true)
                        $(`#t${numeroForm} input.form.${indice}`).removeClass(`requerido`);
                        $(`#t${numeroForm} input.form.${indice}`).removeAttr(`validado`);
                    })
                } else {

                    $.each(lengthUnoSelect, (indice, value) => {

                        $(`#formularioIndividual input.form.${indice}`).val(value);
                        $(`#formularioIndividual input.form.${indice}`).prop(`readOnly`, true)
                        $(`#formularioIndividual input.form.${indice}`).removeClass(`requerido`);
                        $(`#formularioIndividual input.form.${indice}`).removeAttr(`validado`);

                    })
                }

                $(`#t${numeroForm} .form.username, #formularioIndividual .form.username`).prop("readonly", "true");
                $(`#t${numeroForm} .form.username, #formularioIndividual .form.username`).val(usu);

                var fecha = moment(Date.now()).format('L');
                $(`#t${numeroForm} .form.date, #formularioIndividual .form.date`).prop("readonly", "true");
                $(`#t${numeroForm} .form.date, #formularioIndividual .form.date`).val(fecha);

                $(`.form.destino`).val(pest);

                fechaInicialHoy(objeto, numeroForm)

                let tables = $(`#tablaCol${objeto.accion}${numeroForm} table`)

                $.each(tables, (indice, value) => {

                    let tabla = $(`tr`, value).slice(2)
                    let tablaComp = tabla.slice(0, -1)
                    tablaComp.remove()
                })

                $.each(objeto.numerador.global, (indice, value) => {

                    consultaNumer(value.name, value.filtro, numeroForm);
                })
                $.each(objeto.formInd.oculto, function (indice, value) {

                    $(`#t${numeroForm} .fo.${value.nombre}`).addClass("oculto");
                    $(`#formularioIndividual .fo.${value.nombre}`).addClass("oculto");
                })

                $(`#bf${numeroForm} .botonesPest .imgB.okfBoton`).css(`display`, `flex`)
                $(`#bf${numeroForm} .botonesPest .progressBar`).css(`display`, `none`)
                $(`#bf${numeroForm} .botonesPest .imgB`).css(`cursor`, `pointer`)
                clearInterval(barraCargar);

                $.each(objeto.atributos.valoresIniciales.string, function (indice, value) {

                    console.log(value)
                    $(`#formularioIndividual input.${indice},
                   #t${numeroForm} input.${indice}`).val(value)
                    $(`#formularioIndividual input.${indice},
                   #t${numeroForm} input.${indice}`).attr(`validado`, true)
                    $(`#formularioIndividual input.${indice},
                   #t${numeroForm} input.${indice}`).addClass(`validado`)
                })
                $.each(objeto.atributos.valoresIniciales.select, function (indice, value) {

                    $(`#t${numeroForm} select.${indice},
                   #formularioIndividual select.${indice}`).val(value)
                    $(`#t${numeroForm} select.${indice},
                   #formularioIndividual select.${indice}`).attr(`validado`, true)
                    $(`#t${numeroForm} select.${indice},
                   #formularioIndividual select.${indice}`).addClass(`validado`)

                })
                $.each(objeto.atributos.valoresIniciales.funcion, function (indice, value) {

                    value(objeto, contador)
                })
            } else {

                let key = Object.keys(response.keyValue)

                if ($(`#t${numeroForm}`).hasClass(`formularioPestana`)) {

                    $(`#bf${numeroForm} .cartelErrorForm p`).html(`El ${key[0]} ${response.keyValue[key[0]]} ya fue registrado`)
                    $(`#bf${numeroForm} .cartelErrorForm`).css("display", "block");

                    $(`#t${id} div.fo.${key[0]} input`).css(`background-color`, `rgb(199, 94, 94)`)
                    $(`#bf${id} .cartelErrorFront`).fadeOut(8000)

                    $(`#t${id} div.fo.${key[0]} input`).on(`focus`, function () {
                        $(this).css(`background-color`, `rgb(235, 233, 236)`)
                    })

                } else {

                    $(`#formularioIndividual .cartelErrorForm p`).html(`El ${key[0]} ${response.keyValue[key[0]]} ya fue registrado`)
                    $(`#formularioIndividual .cartelErrorForm`).css("display", "block");

                    $(`#t${id} div.fo.${key[0]} input`).css(`background-color`, `rgb(199, 94, 94)`)
                    $(`#bf${id} .cartelErrorFront`).fadeOut(8000)

                    $(`#t${id} div.fo.${key[0]} input`).on(`focus`, function () {
                        $(this).css(`background-color`, `rgb(235, 233, 236)`)
                    })


                }

            }
        },
        error: function (error) {
            console.log(error);

        }
    })

}
const enviarRegistroEditadoForm = (objeto, numeroForm, lengthUnoSelect, eliminarDesenColc, eliminarAdjuntos) => {

    let accion = objeto.accion;
    let pest = objeto.pest;
    let registroEditadoIndividual = $(`#f${accion}${numeroForm}`).serializeArray();

    $(`#tablaCol${objeto.accion}${numeroForm} input.post`).val(`post`)

    let file = new FormData($(`#f${accion}${numeroForm}`)[0]);
    let registroEditadoIndividualEviar = new Object;

    $.each(registroEditadoIndividual, (ind, val) => {

        registroEditadoIndividualEviar[val.name] = val.value
    })

    let barraCargar = ""


    $.ajax({
        type: "put",
        url: `/${accion}`,
        data: file,
        contentType: false,
        processData: false, // tell jQuery not to process the data
        beforeSend: function () {

            $(`#bf${numeroForm} .botonesPest .imgB.okfBoton`).css(`display`, `none`)
            $(`#bf${numeroForm} .botonesPest .progressBar`).css(`display`, `flex`)
            $(`#bf${numeroForm} .botonesPest .imgB`).css(`cursor`, `wait`)
            barraCargar = setInterval(progressBarFun, 80, numeroForm)
        },
        complete: function () {

        },
        success: function (response) {

            if (response.posteo != undefined) {

                $.each(eliminarDesenColc, (indice, v) => {
                    $.each(objeto.desencadenaColeccion.desencadenaModif, (indice, value) => {
                        $.each(value, (ind, val) => {

                            eliminarRegistroDesencadenadoColec(ind, v);
                        });
                    });
                })

                let fidecomisoSelec = ""

                if (objeto.formInd.compuesto == false) {
                    agregarRegistroEditado(numeroForm, objeto, fidecomisoSelec, registroEditadoIndividualEviar)
                }

                editando = false;

                $(`.cartelErrorForm p`).html(response);
                $(`.cartelErrorForm`).css("display", "block");

                $(`input.form`).val("");
                $(`input.formColec`).val("");
                $(`.select.form`).val("");

                $(`#formularioIndividual input.form, #formularioIndividual .select.form`).removeClass("validado");
                $(`#formularioIndividual .select.form`).attr("validado", false);

                $.each(objeto.validaciones, (indice, value) => {

                    $(`#formularioIndividual .input.${value.nombre}`).attr("validado", false);
                })

                $(`.form.username`).val(usu);
                $(`.form.destino`).val(pest);

                var fecha = moment(Date.now()).format('L');
                $(`.form.date`).prop("readonly", "true");
                $(`.form.date`).val(fecha);

                $(`#formnum${numeroForm} p`).text();
                $(`#formnum${numeroForm} p`).text("");
                $(`#formulario${objeto.accion}${numeroForm} label`).html("Adjunto");
                $(`#formulario${objeto.accion}${numeroForm} label`).attr("validado", false);
                $(`#formulario${objeto.accion}${numeroForm} label`).removeClass("validado");
                $(`#formulario${objeto.accion}${numeroForm} label`).removeClass("disabled");
                $(`.form.num`).val();

                $.each(lengthUnoSelect, (indice, value) => {
                    $(`#formularioIndividual input.form.${indice}`).val(value);
                    $(`#formularioIndividual input.form.${indice}`).prop(`readOnly`, true)
                    $(`#formularioIndividual input.form.${indice}`).removeClass(`requerido`);
                    $(`#formularioIndividual input.form.${indice}`).removeAttr(`validado`);
                })

                $.each(objeto.numerador.global, (indice, value) => {

                    consultaNumer(value.name, value.filtro, numeroForm);
                })

                $.each(objeto.atributos.valoresIniciales.string, function (indice, value) {

                    $(`#formularioIndividual input.${indice}`).val(value)
                    $(`#formularioIndividual input.${indice}`).attr(`validado`, true)
                    $(`#formularioIndividual input.${indice}`).addClass(`validado`)
                })

                $.each(objeto.atributos.valoresIniciales.select, function (indice, value) {

                    $(`#formularioIndividual select.${indice}`).attr(`validado`, true)
                    $(`#formularioIndividual select.${indice}`).addClass(`validado`)
                    $(`#formularioIndividual select.select.form.${indice}`).val(`Pesos`)
                    $(`#formularioIndividual select.${indice} option[value="${value}"]`).attr(`selected`, true)
                    $(`#formularioIndividual select.${indice}`).val(value)

                })

                $.each(objeto.atributos.valoresIniciales.funcion, function (indice, value) {

                    value(objeto, contador)
                })

                let tables = $(`#tablaCol${objeto.accion}${numeroForm} table`)

                $.each(tables, (indice, value) => {

                    let tabla = $(`tr`, value).slice(2)
                    let tablaComp = tabla.slice(0, -1)
                    tablaComp.remove()
                })


                ////////////// ultimo corrijo mouse e icono
                $(`#bf${numeroForm} .botonesPest .imgB`).css(`cursor`, `pointer`)
                clearInterval(barraCargar);
            } else {
                let key = Object.keys(response.keyValue)

                $(`#formularioIndividual .cartelErrorForm p`).html(`El ${key[0]} ${response.keyValue[key[0]]} ya fue registrado`)
                $(`#formularioIndividual .cartelErrorForm`).css("display", "block");

                $(`#t${id} div.fo.${key[0]} input`).css(`background-color`, `rgb(199, 94, 94)`)
                $(`#bf${id} .cartelErrorFront`).fadeOut(8000)

                $(`#t${id} div.fo.${key[0]} input`).on(`focus`, function () {
                    $(this).css(`background-color`, `rgb(235, 233, 236)`)
                })



            }
        },
        error: function (error) {
            console.log(error);
        }
    });

}
const tipoAtributoForm = function (valor, objeto, numeroForm, formIndividualPestana, consulta) {

    let colec = ""
    let orden = 0;
    let ord = 0;
    let form = "";
    let titulos = objeto.formInd.titulos
    let accion = objeto.accion
    let ordenFormu = objeto.formInd.ordenFormu
    let titulosCompuesto = objeto.formInd.titulosCompuesto;
    let comp = objeto.formInd.compuesto;
    let valorcoleccion = new Object;
    let orderCompuesto = "";
    let pestColec = "";
    let p = ""
    let col = ""

    if (comp == true) {
        let compuesto = `<div class="compuesto ${numeroForm}" id="compuesto${accion}${numeroForm}">
        <div id="cabeceraCol${accion}${numeroForm}" class="cabeceraCol ${numeroForm}"></div>
        <div id="tablaCol${accion}${numeroForm}"class="tableCol ${numeroForm}" ></div>
        </div>`

        let compuestoEsquel = $(compuesto);

        if (formIndividualPestana == true) {
            compuestoEsquel.appendTo(`#t${numeroForm}`);
        } else {
            compuestoEsquel.appendTo(`#formulario${accion}${numeroForm}`);

        }
    }

    $.each(objeto.formInd.inputRenglones, (indice, value) => {
        form += `<div class="renglon ${indice}" reg=${value}></div>`
    })

    $.each(objeto.atributos.names, function (indice, value) {


        switch (value.type) {
            case "numerador":
            case "num":

                form += `<div id="form${value.nombre}${numeroForm}" class="fo ${value.nombre}" style="order:${ordenFormu[orden]}">

                <h2>${titulos[indice]}</h2>`;

                if (valor[value.nombre] != undefined) {

                    form += `<p>${valor[value.nombre]}</p>

                     <input class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" value="${valor[value.nombre]}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}"/></div>`;
                } else {

                    form += `<p></p>
                     <input class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" value="" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}"/>
                     </div>`;
                }
                orden++;

                break;
            case `texto`:

                form += `<div id="form${value.nombre}${numeroForm}" class="fo ${value.nombre}" style="order:${ordenFormu[orden]}" >

        <h2>${titulos[indice]}</h2>`;

                if ((valor[value.nombre] !== undefined)) {

                    form += `<input class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" value="${valor[value.nombre]}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}" disabled="disabled" />
        </div>`;

                } else {
                    form += `<input class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}"/>
        </div>`;
                }
                orden++;

                break;
            case `textarea`:

                form += `<div id="form${value.nombre}${numeroForm}" class="fo ${value.nombre}" style="order:${ordenFormu[orden]}" >

        <h2>${titulos[indice]}</h2>`;

                if ((valor[value.nombre] !== undefined)) {

                    form += `<textarea rows="5" cols="20" class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}" disabled="disabled">${valor[value.nombre]}</textarea>
        </div>`;

                } else {
                    form += `<textarea rows="5" cols="20" class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}"/></textarea>
        </div>`;
                }
                orden++;

                break;
            case `fecha`:

                form += `<div id="form${value.nombre}${numeroForm}" class="fo ${value.nombre}" style="order:${ordenFormu[orden]}" >

        <h2>${titulos[indice]}</h2>`;

                if ((valor[value.nombre] !== undefined)) {

                    var ano = valor[value.nombre].slice(6);
                    var mes = valor[value.nombre].slice(3, 5);
                    var dia = valor[value.nombre].slice(0, 2);

                    form += `<input class="form ${value.nombre} ${numeroForm}" type=date name="${value.nombre}" value=${ano}-${mes}-${dia} form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}" disabled="disabled" />
        </div>`;

                } else {
                    form += `<input class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}"/>
        </div>`;
                }
                orden++;


                break;
            case `importe`:

                form += `<div id="form${value.nombre}${numeroForm}" class="fo ${value.nombre}" style="order:${ordenFormu[orden]}" >

        <h2>${titulos[indice]}</h2>`;

                if ((valor[value.nombre] !== undefined)) {
                    let importe = ""
                    let impo = valor[value.nombre].replace(".", "")
                    if (impo.includes(`,`)) {
                        importe = impo.replace(",", ".")
                    } else {
                        importe = impo
                    }

                    form += `<input class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" value="${parseFloat(importe)}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}" disabled="disabled" />
        </div>`;

                } else {
                    form += `<input class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}"/>
        </div>`;
                }
                orden++;

                break;
            case `coleccionTotal`:
            case `coleccionAdjuntos`:
                ordenTitulos = ""
                colec = ""
                valorcoleccion[value.nombre] = {}

                orderCompuesto = titulos.indexOf(value.titulos);

                $(`#compuesto${accion}${numeroForm}`).css(`order`, orderCompuesto)

                p = `<a "#seccion-${orden}" class="pestana colect" id="pe${orden}">${value.titulos}</a>`;

                pestColec = $(p);

                pestColec.appendTo(`#cabeceraCol${accion}${numeroForm}`);

                colec += `<table class="tablaCompuesto ${numeroForm} ${value.nombre}" id="pc${orden}">`;

                colec += `<tr>`;

                $.each(titulosCompuesto[value.nombre], function (ind, val) {


                    colec += `<th class="tituloTablasIndividual ${val}">${val}</th>`;
                })
                colec += `</tr>`;

                if (valor.id != undefined) {

                    $.each(consulta, function (ind, val) {

                        if ((valor.id == val.id)) {

                            if (val[value.nombre][objeto.atributos.compuesto[value.nombre].key] != "") {
                                $.each(val[value.nombre][objeto.atributos.compuesto[value.nombre].key], (x, y) => { //////// voy a buscar la key del atributo compuesto para ver la longitud de la coleccion

                                    ord = x
                                    colec += `<tr class="${value.nombre} ${x}" comp=${value.nombre} q="${x}">`;

                                    $.each(value.componentes, function (i, v) {

                                        let originalname = ""
                                        let path = ""
                                        let filename = ""

                                        if (consulta[ind][value.nombre][i][x] != undefined) {
                                            valorColec = consulta[ind][value.nombre][i][x]
                                        } else {
                                            valorColec = consulta[ind][value.nombre][i]
                                        }

                                        if (consulta[ind][value.nombre][i][x] == null) {
                                            valorColec = ""
                                        }
                                        valorcoleccion[value.nombre][v.nombre] = valorColec;

                                        colec += `<td class="comp ${value.nombre} ${v.nombre} ${numeroForm}">`;

                                        if ((v.nombre == "adjunto") || (v.nombre == "adjuntoColeccion") || (v.nombre == "adjuntos")) {

                                            if ((consulta[ind][value.nombre][i].originalnameColec[x] == undefined) || (consulta[ind][value.nombre][i].originalnameColec[x] == "")) {

                                                colec += `<div src="" class="formColec src"><div class="descripcionAdjunto">Sin Adjunto</div></div>`

                                            } else {

                                                originalname = consulta[ind][value.nombre][i].originalnameColec[x];
                                                path = `/uploads/${consulta[ind][value.nombre][i].filenameColec[x]}`;
                                                filename = consulta[ind][value.nombre][i].filenameColec[x];

                                                let extensionArchivo = getFileExtension(path);
                                                switch (extensionArchivo) {
                                                    case `pdf`:
                                                    case `png`:
                                                    case `jpg`:
                                                    case `jpeg`:
                                                    case `svg`:

                                                        colec += `<div class="formColec src" src="${path}">${originalname}</div>`
                                                        break;
                                                    case `xlsx`:
                                                    case `xls`:
                                                    case `docx`:
                                                    case `doc`:

                                                        colec += `<div class="formColec src"><a href="${path}">${originalname}</a></div>`;
                                                        break;
                                                }
                                            }

                                            colec += `<label for="${v.nombre}num${numeroForm}ord${x}" class="formColec ${i} ${numeroForm} ${x} disabled">Adjunto</label>`
                                            colec += `<input type=file class="formColec ${i} ${numeroForm}${x}" id="${v.nombre}num${numeroForm}ord${x}" name="${i}" disabled="disabled" ord="${ord}" form="f${accion}${numeroForm}" validado="true"/>`;
                                            colec += `<input class="formColec filenameColec ${i} ${numeroForm}${x}" id="${v.nombre}filename" name="filenameColec" ord="${ord}" form="f${accion}${numeroForm}" value="${filename}" validado="true"/>`;
                                            colec += `<input class="formColec originalnameColec ${i} ${numeroForm}${x}" id="${v.nombre}originalname" name="originalnameColec" ord="${ord}" form="f${accion}${numeroForm}" value="${originalname}" validado="true"/>`;
                                            colec += `<input class="formColec ${i} postAdj ${numeroForm}${x}" id="${v.nombre}post" name="post" value="put" ord="${ord}" form="f${accion}${numeroForm}" validado="true"/>`;

                                        } else if (v.type == "fecha") {

                                            let fecha = moment(valorColec).format("YYYY-MM-DD");

                                            colec += `<input class="formColec ${i} ${numeroForm} ord${ord}" name="${i}" type="date" value="${fecha}" form="f${accion}${numeroForm}" ord="${ord}" disabled="disabled"/></td>`;

                                        } else {

                                            colec += `<input class="formColec ${i} ${numeroForm} ord${ord}" name="${i}" value="${valorColec}" form="f${accion}${numeroForm}" ord="${ord}" disabled="disabled"/></td>`
                                        }

                                    })
                                    colec += `<td class=delete ord=${ord}><img src="/img/remove.png" "class="deleteIcon" ord=${ord}></td></tr>`

                                })
                            } else {

                                colec += `<tr class="${value.nombre} 0">`;

                                $.each(value.componentes, function (i, v) {

                                    let valorColec = ""

                                    colec += `<td class="comp first ${value.nombre} ${v.nombre} ${numeroForm}">`;

                                    if ((v.nombre == "adjunto") || (v.nombre == "adjuntoColeccion")) {

                                        valorColec = "Adjunto"
                                        colec += `<div src="" class="formColec src"><div class="descripcionAdjunto">Sin Adjunto</div></div>`
                                        colec += `<label for="${v.nombre}num${numeroForm}ord0" class="formColec ${i} ${numeroForm} 0 disabled">Adjunto</label>`
                                        colec += `<input type=file class="formColec ${i} ${numeroForm}0" id="${v.nombre}num${numeroForm}ord0" name="${i}" disabled="disabled" ord=0 form="f${accion}${numeroForm}" validado="true"/>`;
                                        colec += `<input class="formColec ${i} postAdj ${numeroForm}0" id="${v.nombre}post" name="post" ord=0 form="f${accion}${numeroForm}" validado="true"/>`;

                                    } else if (v.type == "fecha") {


                                        colec += `<input class="formColec ${i} ${numeroForm} ord0" name="${i}" type="date" value="${fecha}" form="f${accion}${numeroForm}" ord=0 disabled="disabled"/></td>`;
                                    } else {

                                        colec += `<input class="formColec ${i} ${numeroForm} ord0" name="${i}" value="${valorColec}" form="f${accion}${numeroForm}" ord=0 disabled="disabled"/></td>`
                                    }

                                })
                                colec += `<td class=delete ord=${ord}><img src="/img/remove.png" "class="deleteIcon" ord=${ord}></td></tr>`

                            }

                        }
                    })
                } else {

                    colec += `<tr>`;
                    $.each(value.componentes, function (ind, val) {
                        colec += `<td class="vacio ${val.nombre} ${numeroForm}">`;

                        if ((val.nombre == "adjunto") || (val.nombre == "adjuntoColeccion")) {
                            colec += `<div src="" class="formColec src" src=""><div class="descripcionAdjunto">Sin Adjunto</div></div>`
                            colec += `<label for="${val.nombre}num${numeroForm}ord${ord}" class="formColec ${ind} ${numeroForm}">Adjunto</label>`;
                            colec += `<input type=file class="formColec ${ind} ${numeroForm} ord${ord}" id="${val.nombre}num${numeroForm}ord${ord}" name="${ind}" ord="${ord}" form="f${accion}${numeroForm}" validado="true"/>`;
                            colec += `<input class="formColec ${ind} postAdj ${numeroForm} ord${ord}" id="${val.nombre}post" name="postt" ord=${ord} form="f${accion}${numeroForm}" validado="true"/>`;

                        } else if (val.type == "fecha") {
                            colec += `<input class="formColec ${value.nombre} ${ind} ${numeroForm} ord${ord}" colec="${value.nombre}" name="${ind}" form="f${accion}${numeroForm}" ord="${ord}" type="date"/></td>`
                        } else {

                            colec += `<input class="formColec ${value.nombre} ${ind} ${numeroForm} ord${ord}" colec="${value.nombre}" name="${ind}" form="f${accion}${numeroForm}" ord="${ord}"/></td>`
                        }
                    })
                    colec += `<td class="delete" ord=${ord}><img src="/img/remove.png" "class="deleteIcon" ord=${ord}></td>`;
                    colec += `</tr>`;
                }

                $.each(value.componentes, function (ind, val) {
                    colec += `<td class="vacio ${val.nombre} ${numeroForm}">`;

                    if ((val.nombre == "adjunto") || (val.nombre == "adjuntoColeccion") || (val.nombre == "adjuntos")) {

                        colec += `<div class="formColec src" src=""><div class="descripcionAdjunto">Sin Adjunto</div></div>`
                        colec += `<label for="${val.nombre}ord${ord + 1}num${numeroForm}" class="formColec ${ind} ${numeroForm} disabled">Adjunto</label>`
                        colec += `<input type=file class="formColec ${ind} ${numeroForm} ord${ord + 1}" id="${val.nombre}ord${ord + 1}num${numeroForm}" name="${ind}" ord="${ord + 1}" disabled="disabled" form="f${accion}${numeroForm}" validado="true"/>`;
                        colec += `<input class="formColec ${ind} ${numeroForm} postAdj ord${ord + 1}" id="${val.nombre}post" name="post" ord=0 form="f${accion}${numeroForm}" validado="true"/>`;

                    } else if (val.type == "fecha") {
                        colec += `<input class="formColec ${value.nombre} ${ind} ${numeroForm} ord${ord + 1}" colec="${value.nombre}" name="${ind}" form="f${accion}${numeroForm}" ord="${ord + 1}" type="date" readonly="true" disabled="disabled" /></td>`
                    } else {

                        colec += `<input class="formColec ${value.nombre} ${ind} ${numeroForm} ord${ord + 1}" colec="${value.nombre}" name="${ind}" form="f${accion}${numeroForm}" ord="${ord + 1}" readonly="true" disabled="disabled"/></td>`
                    }
                })
                colec += `</tr>`;

                colec += `</table>`;

                col = $(colec);

                col.appendTo(`#tablaCol${accion}${numeroForm}`);

                orden++;
                ordenTitulos++
                break;
            case "logico":

                form += `<div id="form${value.nombre}${numeroForm}" class="fo ${value.nombre}" style="order:${ordenFormu[orden]}" >
        <h2>${titulos[indice]}</h2>`;

                if (valor[value.nombre] == `true`) {

                    form += `<input type="checkbox" class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" form="f${accion}${numeroForm}" value=${valor[value.nombre]} checked tabindex="${ordenFormu[orden]}" disabled="disabled"/>
        </div>`;

                } else {

                    form += `<input type="checkbox" class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}"/>
        </div>`;
                }
                orden++;

                break
            case "adjunto":
                if ((valor[value.nombre] !== undefined && valor[value.nombre].path !== undefined && valor[value.nombre].path !== "")) {

                    form += `<div id="form${value.nombre}${numeroForm}" class="fo ${value.nombre}" style="order:${ordenFormu[orden]}">`;
                    form += `<h2>${titulos[indice]}</h2>`;

                    if (valor[value.nombre].path != "") {
                        let extensionArchivo = "";

                        if (Array.isArray(valor[value.nombre].path)) {
                            extensionArchivo = getFileExtension(valor[value.nombre].path[0]);
                        } else {
                            extensionArchivo = getFileExtension(valor[value.nombre].path);
                        }

                        switch (extensionArchivo) {
                            case `pdf`:
                            case `png`:
                            case `jpg`:
                            case `jpeg`:
                            case `svg`:
                                form += `<div class="src" src="${valor[value.nombre].path}">${valor[value.nombre].originalname}</div>`;
                                break;
                            case `xlsx`:
                            case `xls`:
                            case `docx`:
                            case `doc`:
                                form += `<div><a href="${valor[value.nombre].path}">${valor[value.nombre].originalname}</a></div>`;
                                break;
                        }
                    }

                    form += `<div class="botonesAdj"><label for="${value.nombre}${numeroForm}" class="form ${value.nombre} ${numeroForm} disabled" tabindex="${ordenFormu[orden]}">Adjunto</label><div><img class="eliminarAdj"src="/img/iconos/principal/eliminarAdj.png" title="Eliminar adjunto"></div></div>`
                    form += `<input type=file class="form ${value.nombre} ${numeroForm}" id="${value.nombre}${numeroForm}" name="${value.type}" disabled="disabled" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}" validado="true"/>

                                </div>`;
                } else {

                    form += `<div id="form${value.nombre}${numeroForm}" class="fo ${value.nombre}" style="order:${ordenFormu[orden]}" >`;
                    form += `<h2>${titulos[indice]}</h2>`;
                    form += `<div class="src" src=""><div class="descripcionAdjunto">Sin adjunto</div></div>`;
                    form += `<div class="botonesAdj"><label for="${value.nombre}${numeroForm}" class="form ${value.nombre} ${numeroForm}" tabindex="${ordenFormu[orden]}">Adjunto</label><div><img class="eliminarAdj"src="/img/iconos/principal/eliminarAdj.png" title="Eliminar adjunto"></div></div>`
                    form += `<input type=file class="form ${value.nombre} ${numeroForm}" id="${value.nombre}${numeroForm}" name="${value.type}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}"/>

                            </div>`;
                }
                orden++;
                break
            case `password`:

                form += `<div id="form${value.nombre}${numeroForm}" class="fo ${value.nombre}" style="order:${ordenFormu[orden]}" >

        <h2>${titulos[indice]}</h2>`;

                if ((valor[value.nombre] !== undefined)) {

                    form += `<input type="password" class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" value="${valor[value.nombre]}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}" disabled="disabled" />
                    <img class="ojoPassword tachado" src="/img/abm/ojoTachado.png">
        </div>`;

                } else {
                    form += `<input type="password" class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}"/>
                              <img class="ojoPassword tachado" src="/img/abm/ojoTachado.png">
        </div>`;
                }
                orden++;

                break;
            default:
                form += `<div id="form${value.nombre}${numeroForm}" class="fo ${value.nombre}" style="order:${ordenFormu[orden]}" >
        <h2>${titulos[indice]}</h2>`;

                if ((valor[value.nombre] !== undefined)) {

                    form += `<input class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" value="${valor[value.nombre]}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}" disabled="disabled"/>
        </div>`;

                } else {
                    form += `<input class="form ${value.nombre} ${numeroForm}" name="${value.nombre}" form="f${accion}${numeroForm}" tabindex="${ordenFormu[orden]}"/>
        </div>`;
                }
                orden++;

                break;
        }
    })

    return {
        form,
        valorcoleccion
    }
}
const editFormulario = function (objeto, numeroForm) {

    $(`#formularioIndividual input.form.${numeroForm},
       #formularioIndividual #tablaCol${objeto.accion}${numeroForm} input`).attr(`disabled`, false)

    $(`#formularioIndividual input.form.${numeroForm},
       #formularioIndividual #tablaCol${objeto.accion}${numeroForm} select,
       #formularioIndividual #tablaCol${objeto.accion}${numeroForm} input`).prop("readOnly", true);

    $.each(objeto.formInd.modificar.names, (indice, value) => {

        $(`#formularioIndividual input.form.${value.nombre}.${numeroForm},
          #formularioIndividual #tablaCol${objeto.accion}${numeroForm} input,
          #formularioIndividual #tablaCol${objeto.accion}${numeroForm} select,
          #formularioIndividual #form${value.nnombre}${numeroForm} select.form`).removeAttr(`readonly`);
    })

    let pestanas = $(`#tablaCol${objeto.accion}${numeroForm} table`)
    $.each(pestanas, (indice, value) => {
        $(`tr:last input.formColec`, value).attr(`disabled`, `disabled`)
    })

    $.each(objeto.formInd.modificar.soloLectura, (indice, value) => {

        $(`#formularioIndividual input.form.${value.nombre}.${numeroForm},
           #formularioIndividual #tablaCol${objeto.accion}${numeroForm} input.${value.nombre},
           #formularioIndividual #form${value.nnombre}${numeroForm} select.form`).prop("readOnly", true)
    })

    $.each(objeto.formInd.modificar.compuesto, (indice, value) => {

        $(`#tablaCol${objeto.accion}${numeroForm} td.comp input.formColec.${value.nombre},
        #tablaCol${objeto.accion}${numeroForm} td.comp select.form.${value.nombre}`).removeAttr(`readonly`);

        $(`#tablaCol${objeto.accion}${numeroForm} td.comp input.formColec.${value.nombre},
        #tablaCol${objeto.accion}${numeroForm} td.comp select.form.${value.nombre}`).attr(`disabled`, false);

        let primeraFilacompuesto = $(`#tablaCol${objeto.accion}${numeroForm} tr`).eq(1)

        $(`input.formColec.${value.nombre}, select.form.${value.nombre}`, primeraFilacompuesto).removeAttr(`readonly`);
        $(`input.formColec.${value.nombre}, select.form.${value.nombre}`, primeraFilacompuesto).attr(`disabled`, false);
    })

    $.each(objeto.formInd.modificar.pestanas, (indice, value) => {

        $(`#formularioIndividual #tablaCol${objeto.accion}${numeroForm} select.${value.nombre},
          #formularioIndividual #formulario${objeto.accion}${numeroForm} select.form.${value.nombre}`).removeAttr(`disabled`);

        $(`#formularioIndividual #tablaCol${objeto.accion}${numeroForm} input.formColec.${value.nombre},
          #formularioIndividual #formulario${objeto.accion}${numeroForm} input.form.${value.nombre}`).attr(`disabled`, `disabled`)
    })


    $(`#formularioIndividual label.form.${numeroForm}`).removeAttr(`readonly`)
    $(`#formularioIndividual td.comp label.formColec.${numeroForm}`).removeAttr(`disabled`)
    $(`#formularioIndividual td.comp label.formColec.${numeroForm}`).removeClass(`disabled`)

    $.each(objeto.validaciones, function (indice, value) {


        $(`#formularioIndividual .form.${value.nombre},
           #formularioIndividual .comp .formColec.${value.nombre}`).addClass("requerido");

        $(`#formularioIndividual .form.${value.nombre},
           #formularioIndividual .comp .formColec.${value.nombre}`).addClass("validado");


        $(`#formularioIndividual .form.${value.nombre},
            #formularioIndividual .comp .formColec.${value.nombre}`).attr("validado", "true");

        $(`#formularioIndividual .comp.first .formColec.${value.nombre},
            #formularioIndividual .comp.first .form.${value.nombre}`).attr("validado", "false");
        $(`#formularioIndividual .comp.first .formColec.${value.nombre},
            #formularioIndividual .comp.first .form.${value.nombre}`).removeClass("validado");
    })

    /* $.each(objeto.key.atributo, function (indice, value) {
 
         $(`input.form.${value.nombre}`).removeAttr("disabled");
         $(`select.${value.nombre}`).attr("disabled", "true");
         $(`input.form.${value.nombre}`).val($(`select.unidades`).val());
 
 
     })*/
    $.each(objeto.pestanas.totales, function (indice, value) {
        console.log(value)

        if (!(objeto.formInd.modificar.pestanas.includes(value))) {

            console.log(0)
            $(`#formularioIndividual input.form.${value.nombre}`).css("display", "flex");
            $(`#formularioIndividual input.form.${value.nombre}`).val($(`#formularioIndividual select.form.${value.nombre}`).val());
            $(`#formularioIndividual select.form.${value.nombre}`).attr("disabled", "true");
            $(`#formularioIndividual select.form.${value.nombre}`).addClass("oculto");

        } else if ($(`#formularioIndividual .${value.nombre} select`).val() == undefined) {


            $(`#formularioIndividual input.form.${value.nombre}`).removeAttr("disabled");
            $(`#formularioIndividual input.formColec.${value.nombre}`).removeAttr("disabled");
            $(`#formularioIndividual input.form.${value.nombre}`).prop("readOnly", true);
            $(`#formularioIndividual input.formColec.${value.nombre}`).prop("readOnly", true);
            $(`#formularioIndividual tr:last input.formColec.${value.nombre}`).attr("disabled", "disabled");
        } else {

            $(`#formularioIndividual input.form.${value.nombre}`).attr("disabled", "disabled");
            $(`#formularioIndividual input.formColec.${value.nombre}`).attr("disabled", "disabled");
            $(`#formularioIndividual select.form.${value.nombre}`).attr("validado", true);
            $(`#formularioIndividual select.formColec.${value.nombre}`).attr("validado", true);
            $(`#formularioIndividual select.form.${value.nombre}`).addClass("validado");
            $(`#formularioIndividual select.formColec.${value.nombre}`).addClass("validado");
        }
    })

    $.each(objeto.funcionesPropias.cargarDosAtributo, function (indice, value) {

        value[0](objeto, numeroForm, value[1], value[2])
    })

    if ($(`select.form.moneda`).val() == "Pesos") {

        $(`input.form.tc,s
           input.form.importeUsd`).prop(`readonly`, `true`);
    } else {
        $(`input.form.importeArs`).prop(`readonly`, `true`);
        $(`input.form.importeUsd,
            input.form.tc`).on("keyup", function () {

            $(`input.form.importeArs`).val($(`input.form.importeUsd`).val() * $(`input.form.tc`).val())
        })
    }
    $(`#formularioIndividual .form.username`).val(usu);
    deshabitarValidarColec(objeto, numeroForm)

}
const editarCompuestoFormInd = function (objeto, numeroForm, id, filaPadre, self, ordInput) {
    let father = $(self).parent()

    let compuesto = objeto.atributos.compuesto

    let ord = parseFloat(ordInput)
    $(`#formulario${objeto.accion}${numeroForm} tr:nth-child(1n) input.position`).val(0)
    $(`input.position`, filaPadre).val(ord)

    $.each(compuesto, (indice, value) => {

        let tr = $(`div.tableCol.${numeroForm} tr`)

        $.each(tr, (indic, vall) => {

            $.each(objeto.pestanas.coleccion, (ind, val) => {

                let valor = $(`tr.${value.nombre}.${indic} td.${value.nombre} .formColec.${val.nombre}`).val()

                //    $(`tr.${value.nombre}.${indic} td.${value.nombre} .select.form.${val.nombre}`).val(valor)
                $(`tr.${value.nombre}.${indic} td.${value.nombre} .select.form.${val.nombre}`).attr(`disabled`, true)
                $(`tr.${value.nombre}.${indic} td.vacio .select.form.${val.nombre}`).val("")
                $(`tr.${value.nombre}.${indic} td.vacio .select.form.${val.nombre}`).attr(`disabled`, true)
            })
        })
    })

    ///////////////////
    editFormularioColect(objeto, numeroForm)

    let coleccion = $(`input`, self).attr("colec")

    if (coleccion == undefined) {
        coleccion = $(`#tablaCol${objeto.accion}${numeroForm} tr.0`).attr(`comp`)
    }

    $(`.tableCol.${numeroForm} #pc${id} td.vacio`).addClass(`editando`);
    $(`.tableCol.${numeroForm} #pc${id} td.editando`).removeClass(`vacio`);
    $(`input`, father).removeAttr(`readonly`);
    $(`.tableCol.${numeroForm} #pc${id} tr:last-child input`).attr(`disabled`, false);

    $.each(objeto.pestanas.coleccion, function (indice, value) {

        $.getJSON(servidor + `/${value.nombre}`,
            function (data) {

                if (data.length > 1) {

                    $(`.formColec.${objeto.pestanas.coleccion[indice].nombre}`).removeClass("requerido");
                    $(`.formColec.${objeto.pestanas.coleccion[indice].nombre}`).attr("disabled");


                    let s = `<select class="select form ${objeto.pestanas.coleccion[indice].nombre} requerido"  name="${objeto.pestanas.coleccion[indice].nombre}" form="f${objeto.accion}${numeroForm}" validado="false">`;
                    s += `<option class="opciones" value=""></option>`;

                    $.each(data, (subInd, subVal) => {

                        if (data[subInd].habilitado == true) {

                            let show = ""

                            $.each(objeto.pestanas.coleccion[indice].key, (ind, val) => {

                                show += `${subVal[val]} `
                            })

                            s += `<option class="opciones" value="${subVal.name}">${show}</option>`;
                        }
                    })

                    s += `</select>`;
                    // let ord = $(`td.editando.${objeto.pestanas.coleccion[indice].nombre}.${numeroForm} input`).attr(`ord`)

                    var clase = $(`.formColec.${objeto.pestanas.coleccion[indice].nombre}`);
                    let ordenSelect = clase.attr("tabindex");
                    clase.removeAttr("tabindex");

                    let select = $(s);

                    clase.prop("disabled", true);

                    $(`input.formColec.${objeto.pestanas.coleccion[indice].nombre}.${numeroForm}.ord${ord}`).addClass("oculto")
                    $(`input.formColec.${objeto.pestanas.coleccion[indice].nombre}.${numeroForm}.${ord}`).attr("disabled", true)

                    select.appendTo(`td.editando.${objeto.pestanas.coleccion[indice].nombre}:last`)

                    $(`td.editando.${objeto.pestanas.coleccion[indice].nombre}.${numeroForm}`).removeClass(`editando`);

                } else {

                    if (data[0].habilitado == true) {

                        let show = ""
                        $.each(objeto.pestanas.coleccion[indice].key, (ind, val) => {

                            show += `${data[0][val]}`;
                        })

                        $(`.formColec.${objeto.pestanas.coleccion[indice].nombre}`).removeClass("requerido");
                        $(`.formColec.${objeto.pestanas.coleccion[indice].nombre}`).prop("readOnly", true);
                        $(`.${indice}`).val(show);
                    }
                }

            });
    });

    $(`td.editando.${numeroForm}`).addClass("comp");
    $(`td.editando.${numeroForm}`).addClass(coleccion);
    //$(`td.vacio .formColec`).removeClass("oculto")

    let se = `<td class=delete ord=${ord}><img src="/img/remove.png" "class="deleteIcon" ord=${ord}></td>`
    let signoEliminar = $(se)
    signoEliminar.appendTo(`.tableCol.${numeroForm} #pc${id} tr:last-child`) ////////////////////////////////////////////////////////////////////////////////

    let valorCompuesto = compuesto[coleccion];

    let colec = `<tr class="creado">`;

    $.each(valorCompuesto.componentes, function (indice, value) {

        colec += `<td class="vacio ${value.nombre} ${numeroForm}">`;

        if (value.nombre == `adjunto`) {

            colec += `<label for="${value.nombre}num${numeroForm}ord${ord + 1}" class="formColec ${indice} ${numeroForm} ${ord + 1} disabled">Adjunto</label>`
            colec += `<input type=file class="formColec ${indice} ${numeroForm} ord${ord + 1} oculto" id="${value.nombre}num${numeroForm}ord${ord + 1}" name="${indice}" disabled="disabled" form="f${objeto.accion}${numeroForm}" ord="${ord + 1}"/>`;
            colec += `<input type=file class="formColec ${indice} ${numeroForm} ord${ord + 1} oculto" id="postord${ord + 1}" name="post" disabled="disabled" form="f${objeto.accion}${numeroForm}" value="post" ord="${ord + 1}"/>`;
        } else if (value.type == `fecha`) {

            colec += `<input class="formColec ${valorCompuesto.nombre} ${indice} ${numeroForm} ord${ord + 1}" colec="${valorCompuesto.nombre}" name="${indice}" form="f${objeto.accion}${numeroForm}" ord=${ord + 1} type="date" readonly="true" disabled="disabled"/></td>`

        } else {
            colec += `<input class="formColec ${valorCompuesto.nombre} ${indice} ${numeroForm} ord${ord + 1}" colec="${valorCompuesto.nombre}" name="${indice}" form="f${objeto.accion}${numeroForm}" ord=${ord + 1} readonly="true" disabled="disabled"/></td>`
        }

    })

    colec += `</tr>`;

    let col = $(colec);

    col.appendTo(`.tablaCompuesto.${valorCompuesto.nombre}.${numeroForm}`);

    $.each(objeto.funcionesPropias.coleccionFormIndividual, function (indice, value) {

        value(objeto, numeroForm, self)
    })

    $.each(objeto.formInd.oculto, function (indice, value) {

        $(`.tablaCompuesto.${numeroForm} td.${value.nombre}`).addClass(`oculto`)
    })

    $.each(objeto.formInd.soloLectura.compuesto, function (indice, value) {
        $(`.formColec.${value.nombre}`).prop(`readOnly`, true)
    })

    $.each(objeto.validaciones, function (indice, value) {

        $(`input.${value.nombre}`, filaPadre).removeClass(`validado`)
        $(`input.${value.nombre}`, filaPadre).attr(`validado`, false)
    })
}
const deleteCompuesto = function (objeto, numeroForm, self) {

    let objetoColeccionEliminar = new Object

    let tablaLength = $(`#tablaCol${objeto.accion}${numeroForm} tr`).length

    let filaEliminar = $(self).parent()

    if (($(`input.formColec.post`, filaEliminar).val() != "") && (objeto.desencadenaModif != [])) {

        objetoColeccionEliminar[`id`] = $(`#formid${numeroForm} input.id`).val()
        objetoColeccionEliminar[`idColec`] = $(`input.formColec.idColec`, filaEliminar).val()
        objetoColeccionEliminar[`destinoColec`] = $(`input.formColec.destinoColec`, filaEliminar).val()
    }

    let moneda = $(`#formmoneda${numeroForm} select.moneda`).val()
    let monedaPesos = true

    if (moneda == "Dolar") {
        monedaPesos = false
    }
    let adjunto = ""
    $.each($(`td`, filaEliminar), (indice, value) => {

        if ($(value).hasClass(`adjunto`)) {

            adjunto = $(`div.src`, value).attr(`src`)

        }
    })
    console.log(adjunto)
    if (tablaLength > 3) {

        filaEliminar.remove()

    } else {
        $(`input, select`, filaEliminar).val("")


        if (objeto.formInd.compuestoObligatorio == false) {

            $.each(objeto.validaciones, (indice, value) => {
                $(`input.${value.nombre}, select.${value.nombre}`, filaEliminar).removeClass("requerido")
                $(`input.${value.nombre}, select.${value.nombre}`, filaEliminar).attr("validado", false)
            })

        } else {

            $.each(objeto.validaciones, (indice, value) => {

                $(`input.${value.nombre}, select.${value.nombre}`, filaEliminar).removeClass("validado")
                $(`input.${value.nombre}, select.${value.nombre}`, filaEliminar).attr("validado", false)
            })

        }
        filaEliminar.removeClass(`rojoEliminar`)
    }

    if (objeto.atributos.importe != undefined) {
        calcularcotizacionYTotales(objeto, numeroForm, self, monedaPesos)
    }
    let deleteObj = new Object
    deleteObj.adjunto = adjunto
    deleteObj.objetoColeccionEliminar = objetoColeccionEliminar

    return deleteObj

}
const editFormularioColect = function (objeto, numeroForm) {


    $(`.tablaCompuesto.${numeroForm} input.formColec,
       .tablaCompuesto.${numeroForm} select.form`).attr(`disabled`, false);

    $(`.tablaCompuesto.${numeroForm} label.formColec`).removeAttr(`disabled`)
    $(`.tablaCompuesto.${numeroForm} label.formColec`).removeClass(`disabled`)

    $.each(objeto.validaciones, function (indice, value) {

        $(`.tablaCompuesto.${numeroForm} .formColec.${value.nombre}`).addClass("requerido");

    })

    $.each(objeto.pestanas.totales, function (indice, value) {

        $(`.tablaCompuesto.${numeroForm} input.formColec.${value.nombre}`).attr("disabled", "true");

    })

    if ($(`.tablaCompuesto.${numeroForm} select.form.moneda`).val() == "Pesos") {

        $(`.tablaCompuesto.${numeroForm} input.form.tc,
           .tablaCompuesto.${numeroForm} input.form.importeUsd`).prop(`readonly`, `true`);
    } else {
        $(`.tablaCompuesto.${numeroForm} input.form.importeArs`).prop(`readonly`, `true`);
        $(`.tablaCompuesto.${numeroForm} input.form.importeUsd,
           .tablaCompuesto.${numeroForm} input.form.tc`).on("keyup", function () {
            $(`.tablaCompuesto.${numeroForm} input.form.importeArs`).val($(`input.form.importeUsd`).val() * $(`.tablaCompuesto.${numeroForm} input.form.tc`).val())
        })
    }

}
const desencadenanteForm = function (desencadena, objeto, id, fileData, idDesen) {

    let file = ""

    file = fileData;

    if (fileData != undefined) {

        file.set(`idDesen`, idDesen);

    } else {
        file[desencadena] = new FormData($(`#f${objeto.accion}${id}`)[0]);
    }
    console.log(desencadena)
    $.each(desencadena, (ind, val) => {
        $.ajax({
            type: "POST",
            url: `/${val}`,
            data: fileData,
            contentType: false,
            processData: false, // tell jQuery not to process the data
            success: function (response) { },
            error: function (error) {
                /*
                 * Se ejecuta si la peticón ha sido erronea
                 * */
                console.log(error);
            }
        })
    })
}
const activePestana = function (objeto, numeroForm) {

    let accion = objeto.accion;

    $(`#cabeceraCol${accion}${numeroForm} .pestana.colect`).first().addClass(`active`)
    $(`#tablaCol${accion}${numeroForm} .tablaCompuesto`).first().addClass(`active`)

    $(`#cabeceraCol${accion}${numeroForm} .pestana.colect`).on('click',

        function () {

            var i = $(this).attr("id"); //atrapo el id de la pestaña
            var id = i.slice(2); //Le saco la "p" del Id

            $(`#cabeceraCol${accion}${numeroForm} #pe${id}`).addClass(`active`)
            $(`#cabeceraCol${accion}${numeroForm} #pe${id}`).siblings().removeClass('active')
            $(`#tablaCol${accion}${numeroForm} #pc${id}`).addClass(`active`)
            $(`#tablaCol${accion}${numeroForm} #pc${id}`).siblings().removeClass('active')

        }
    );
}
const desencadenaModifForm = function (valor, objeto, numeroForm) {

    let fileEnviado = $(`#f${objeto.accion}${numeroForm}`);

    $.each(valor.signoNumero, (indice, sigNume) => {
        let atributoDesen = `signoNumero`;
        let file = new FormData(fileEnviado[0]);
        file.set(`desen`, atributoDesen);

        $.each(sigNume, (ind, val) => {
            file.set(val.nombre, -parseFloat(file.get(val.nombre) || 0));
        });

        $.ajax({
            type: "put",
            url: `/${indice}Des`,
            data: file,
            contentType: false,
            processData: false, // tell jQuery not to process the data
            success: function (response) { },
            error: function (error) {
                console.log(error);
            },
        });
    });

    $.each(valor.atributo, (indice, valor) => {
        let atributoDesen = `atributo`;
        let file = new FormData(fileEnviado[0]);
        file.set(`desen`, atributoDesen);

        $.each(valor.atributoOrigen, (ind, val) => {
            let valorOrigen = file.get(val.nombre);

            file.set(valor.atributoEnDestino[ind].nombre, valorOrigen);
        });

        $.ajax({
            type: "PUT",
            url: `/${indice}Des`,
            data: file,
            contentType: false,
            processData: false, // tell jQuery not to process the data
            success: function (response) { },
            error: function (error) {
                console.log(error);
            },
        });
    });

    $.each(valor.signoNumeroAtyributo, (indice, valor) => {
        let atributoDesen = `signoNumeroAtyributo`;
        let file = new FormData(fileEnviado[0]);
        file.set(`desen`, atributoDesen);

        $.each(valor.numero, (ind, val) => {
            file.set(val.nombre, -parseFloat(file.get(val.nombre) || 0));
        });

        $.each(valor.atributoOrigen, (ind, val) => {
            let valorOrigen = file.get(val.nombre);

            file.set(valor.atributoEnDestino[ind].nombre, valorOrigen);
        });

        $.ajax({
            type: "PUT",
            url: `/${indice}Des`,
            data: file,
            contentType: false,
            processData: false, // tell jQuery not to process the data
            success: function (response) { },
            error: function (error) {
                console.log(error);
            },
        });
    });

}
const renglones = function (objeto, numeroForm) {

    if (formularioIndAbm == false) {

        let div = $(`#t${numeroForm} div.fo`);
        let cabecera = $(`#t${numeroForm} div.cabeceraCol`);
        let compuesto = $(`#t${numeroForm} div.tableCol`);
        let renglon = 0;
        let contieneRenglon = 0

        div.sort((a, b) => {


            let valor1 = a.style.order
            let valor2 = b.style.order


            if (parseFloat(valor1 || 0) < parseFloat(valor2 || 0)) {

                return -1;
            }
            if (parseFloat(valor1 || 0) > parseFloat(valor2 || 0)) {

                return 1;
            }
            return 0;
        });

        $.each(div, (indice, value) => {

            if (objeto.formInd.inputRenglones[renglon] > contieneRenglon) {

                $(`#t${numeroForm} div.renglon.${renglon}`).append(value)
                contieneRenglon++

            } else {
                renglon++

                if (isNaN(objeto.formInd.inputRenglones[renglon])) {

                    contieneRenglon = 0

                    $(`#t${numeroForm} div.renglon.${renglon}`).addClass(objeto.formInd.inputRenglones[renglon])
                    $(`#t${numeroForm} div.renglon.${renglon}`).append(cabecera)
                    $(`#t${numeroForm} div.renglon.${renglon}`).append(compuesto)

                    renglon++
                    contieneRenglon = 1
                    $(`#t${numeroForm} div.renglon.${renglon}`).append(value)

                } else {

                    contieneRenglon = 1
                    $(`#t${numeroForm} div.renglon.${renglon}`).append(value)

                }
            }
        })
    } else {

        let div = $(`#formularioIndividual div.fo`);
        let cabecera = $(`#formularioIndividual div.cabeceraCol.${numeroForm}`);
        let compuesto = $(`#formularioIndividual div.tableCol.${numeroForm}`);
        let renglon = 0;
        let contieneRenglon = 0


        div.sort((a, b) => {


            let valor1 = a.style.order
            let valor2 = b.style.order


            if (parseFloat(valor1 || 0) < parseFloat(valor2 || 0)) {

                return -1;
            }
            if (parseFloat(valor1 || 0) > parseFloat(valor2 || 0)) {

                return 1;
            }
            return 0;
        });

        $.each(div, (indice, value) => {

            if (objeto.formInd.inputRenglones[renglon] > contieneRenglon) {

                $(`#formularioIndividual div.renglon.${renglon}`).append(value)
                contieneRenglon++

            } else {
                renglon++

                if (isNaN(objeto.formInd.inputRenglones[renglon])) {

                    contieneRenglon = 0

                    $(`#formularioIndividual div.renglon.${renglon}`).addClass(objeto.formInd.inputRenglones[renglon])
                    $(`#formularioIndividual div.renglon.${renglon}`).append(cabecera)
                    $(`#formularioIndividual div.renglon.${renglon}`).append(compuesto)

                    renglon++
                    contieneRenglon = 1
                    $(`#formularioIndividual div.renglon.${renglon}`).append(value)

                } else {

                    contieneRenglon = 1
                    $(`#formularioIndividual div.renglon.${renglon}`).append(value)

                }
            }
        })
    }

}
const eliminarFormularioIndividual = function (objeto, numeroForm, fidecomisoSelec) {

    let accion = objeto.accion

    formularioIndAbm = false;

    $(`#formulario${accion}${numeroForm}`).remove();

    $(`#com${accion}${numeroForm}`).remove();

    $(`#formularioIndividual`).css("display", "none");

    $(`.closeForm.${numeroForm}`).remove()

    $(`#t${numeroForm} tbody input`).val(``)
    $(`#t${numeroForm} tbody input`).removeAttr(`disabled`)
    $(`#t${numeroForm} tbody input`).prop("readOnly", true);
    $(`#t${numeroForm} tbody input`).val(``)
    $(`#t${numeroForm} tbody input`).html(``)
    $(`#t${numeroForm} tbody select.select`).remove();

    $.each(objeto.pestanas, (indice, value) => {
        $(`#t${numeroForm} tbody input.${value.nombre}`).css(`display`, `flex`)

    })

    if (objeto.formInd.compuesto == true) {
        $(`.tabs_contents_item.active`).remove()
        reCrearTabla(numeroForm, objeto, fidecomisoSelec)
    }
}
const popUpEliminacionFormIndividual = function (objeto, numeroForm, fidecomisoSelec) {

    let eliminacion = `<div class="cartelEliminar ${numeroForm}"><h1> ¿ Desea cerrar formulario y descartar cambios ?</h1>`;

    eliminacion += `<div class="respuestas">
    <div class="si${numeroForm}">SI</div> <div class="no${numeroForm}">NO</div>

    </div>
    </div>`;

    let el = $(eliminacion);

    el.appendTo(`#tablas`);

    $(`#tablas .no${numeroForm}`).on('click', function () {

        $(`.cartelEliminar.${numeroForm}`).remove();

        return false;

    });

    $(`#tablas .si${numeroForm}`).on('click', function () {
        $(`.cartelEliminar.${numeroForm}`).remove();

        eliminarFormularioIndividual(objeto, numeroForm, fidecomisoSelec)

        return true;
    })
}
const desencadenaColecModifNew = function (valor, objeto, numeroForm, fileEnviado, enviarRegistroTabla, idDesen) {

    let fileEnviadoObjeto = new Object
    $.each(fileEnviado, (indice, val) => {

        fileEnviadoObjeto[val.name] = val.value
    })

    let limpioData = enviarRegistroTabla.slice(1, enviarRegistroTabla.length - 1);

    $.each(limpioData, (indice, value) => {
        let fileEnviar = new Object
        let enviarR = $(`td`, value)

        $.each(enviarR, (ind, val) => {

            if ($(`input`, val).attr(`disabled`) == `disabled`) {

                fileEnviar[$(`select`, val).attr(`name`)] = $(`select`, val).val();

            } else {
                fileEnviar[$(`input`, val).attr(`name`)] = $(`input`, val).val();
            }
        })

        $.each(valor.atributo, (indice, value) => {

            let atributoDesen = `atributo`;
            fileEnviar[`desen`] = atributoDesen
            fileEnviar[`idDesen`] = idDesen

            $.each(value.atributoOrigen.cabecera, (ind, val) => {

                let valorOrigen = fileEnviadoObjeto[val.nombre]
                fileEnviar[value.atributoEnDestino.cabecera[ind].nombre] = valorOrigen
            })
            $.each(value.atributoOrigen.colec, (ind, val) => {

                let valorOrigen = fileEnviar[val.nombre]

                fileEnviar[value.atributoEnDestino.colec[ind].nombre] = valorOrigen
            });

            $.ajax({
                type: "post",
                url: `/${indice}`,
                data: fileEnviar,
                success: function (response) { },
                error: function (error) {
                    console.log(error);
                },
            });
        });

        $.each(valor.signoNumeroAtyributo, (indice, value) => {

            let atributoDesen = `signoNumeroAtyributo`;
            fileEnviar[`desen`] = atributoDesen
            fileEnviar[`idDesen`] = idDesen

            $.each(value.atributos.atributoOrigen.cabecera, (ind, val) => {

                let valorOrigen = fileEnviadoObjeto[val.nombre]

                fileEnviar[value.atributos.atributoEnDestino.cabecera[ind].nombre] = valorOrigen
            })
            $.each(value.atributos.atributoOrigen.colec, (ind, val) => {
                let valorOrigen = fileEnviar[val.nombre]

                fileEnviar[value.atributos.atributoEnDestino.colec[ind].nombre] = valorOrigen
            });

            $.each(value.numero, (ind, val) => {
                fileEnviar[val.nombre] = -parseFloat(fileEnviar[val.nombre] || 0)
            });


            $.ajax({
                type: "post",
                url: `/${indice}`,
                data: fileEnviar,
                success: function (response) { },
                error: function (error) {
                    console.log(error);
                },
            });
        });

        /* $.each(valor.signoNumero, (indice, sigNume) => {
              let atributoDesen = `signoNumero`;
              let file = new FormData(fileEnviado[0]);
              file.set(`desen`, atributoDesen);

              $.each(sigNume, (ind, val) => {
                  file.set(val.nombre, -parseFloat(file.get(val.nombre) || 0));
              });

              $.ajax({
                  type: "put",
                  url: `/${indice}Des`,
                  data: file,
                  contentType: false,
                  processData: false, // tell jQuery not to process the data
                  success: function(response) {},
                  error: function(error) {
                      console.log(error);
                  },
              });
          });*/

    })

}
const eliminarRegistroDesencadenadoColec = function (value, objetoEliminar) {
    console.log(value)
    console.log(objetoEliminar)

    $.ajax({
        type: "delete",
        url: `/${value}Colec`,
        data: objetoEliminar,
        success: function (response) { },
        error: function (error) {
            console.log(error);
        },
    });

}
const desencadenaColecModifEdit = function (valor, objeto, numeroForm) {

    let enviarRegistroTabla = $(`#tablaCol${objeto.accion}${numeroForm} tr`)
    let fileEnviado = $(`#f${objeto.accion}${numeroForm}`).serializeArray();

    let fileEnviadoObjeto = new Object
    $.each(fileEnviado, (indice, val) => {

        fileEnviadoObjeto[val.name] = val.value
    })

    let limpioData = enviarRegistroTabla.slice(1, enviarRegistroTabla.length - 1);

    $.each(limpioData, (indice, value) => {

        let fileEnviar = new Object
        let enviar = ""
        let urlEnviar = ""
        let enviarR = $(`td`, value)


        if (($(`input.post`, enviarR).val() == "") || ($(`input.post`, enviarR).val() == "put") || ($(`input.post`, enviarR).val() == "prePost")) {

            if (($(`input.post`, enviarR).val() == "") || ($(`input.post`, enviarR).val() == "prePost")) {
                enviar = `post`
                urlEnviar = ""
            } else if ($(`input.post`, enviarR).val() == `put`) {
                enviar = `put`
                urlEnviar = `DesColec`
            }

            $.each(enviarR, (ind, val) => {

                if ($(`input`, val).attr(`disabled`) == `disabled`) {

                    fileEnviar[$(`select`, val).attr(`name`)] = $(`select`, val).val();

                } else {
                    fileEnviar[$(`input`, val).attr(`name`)] = $(`input`, val).val();
                }
            })

            $.each(valor.atributo, (indice, value) => {

                let atributoDesen = `atributo`;
                fileEnviar[`desen`] = atributoDesen

                fileEnviar[`idDesen`] = fileEnviadoObjeto.id

                $.each(value.atributoOrigen.cabecera, (ind, val) => {

                    let valorOrigen = fileEnviadoObjeto[val.nombre]
                    fileEnviar[value.atributoEnDestino.cabecera[ind].nombre] = valorOrigen
                })
                $.each(value.atributoOrigen.colec, (ind, val) => {

                    let valorOrigen = fileEnviar[val.nombre]

                    fileEnviar[value.atributoEnDestino.colec[ind].nombre] = valorOrigen
                });

                $.ajax({
                    type: enviar,
                    url: `/${indice}${urlEnviar}`,
                    data: fileEnviar,
                    success: function (response) { },
                    error: function (error) {
                        console.log(error);
                    },
                });
            });

            $.each(valor.signoNumeroAtyributo, (indice, value) => {

                let atributoDesen = `signoNumeroAtyributo`;
                fileEnviar[`desen`] = atributoDesen

                fileEnviar[`idDesen`] = fileEnviadoObjeto.id

                $.each(value.atributos.atributoOrigen.cabecera, (ind, val) => {

                    let valorOrigen = fileEnviadoObjeto[val.nombre]

                    fileEnviar[value.atributos.atributoEnDestino.cabecera[ind].nombre] = valorOrigen
                })
                $.each(value.atributos.atributoOrigen.colec, (ind, val) => {
                    let valorOrigen = fileEnviar[val.nombre]

                    fileEnviar[value.atributos.atributoEnDestino.colec[ind].nombre] = valorOrigen
                });

                $.each(value.numero, (ind, val) => {
                    fileEnviar[val.nombre] = -parseFloat(fileEnviar[val.nombre] || 0)
                });

                $.ajax({
                    type: enviar,
                    url: `/${indice}${urlEnviar}`,
                    data: fileEnviar,
                    success: function (response) { },
                    error: function (error) {
                        console.log(error);
                    },
                });
            });
        }
    })
}
const deshabitarValidarColec = function (objeto, numeroForm) {

    let key = $(`#tablaCol${objeto.accion}${numeroForm} tr`).eq(1)
    let td = $(`td`, key)

    $(`input,select`, key).remove(`requerido`)

    if (key.attr(`comp`) == undefined) {

        $(`input, select`, key).removeClass(`requerido`)

        const comprobarLengt = function () {

            let contadorIdColec = $(`#formulario${objeto.accion}${numeroForm} input.contadorId`).val()

            $(`select`, key).addClass(`requerido`)
            $(`input.post`, key).val(`prePost`)
            $(`td input.idColec`, key).val(parseFloat(contadorIdColec) + 1)
            $(`td input.destinoColec`, key).val(`Devolucion Prestamo`)
            $(`#formulario${objeto.accion}${numeroForm} input.contadorId`).val(parseFloat(contadorIdColec) + 1)

            let validaciones = objeto.validaciones;

            $.each(validaciones, (indice, value) => {

                if (!($(`input.${value.nombre}`, key).attr(`disabled`) == `disabled`)) {
                    $(`input.${value.nombre}`, key).addClass(`requerido`)
                }
            })
        }
        $(key).on(`change`, `select`, comprobarLengt)
        $(key).on(`change`, `input`, comprobarLengt)
    }
}
const actualizarPost = function (e) {

    let parent = $(this).parent().parent()

    if ($(`input.post`, parent).val() == `post`) {


        $(`input.post`, parent).val(`put`)
    }
}
const postPutColeccionInicial = function (objeto, numeroForm) {

    let fila = $(`#tablaCol${objeto.accion}${numeroForm} tr`)
    $(fila).on(`change`, `input, select`, actualizarPost)

}
const postPutColeccionInicialAdd = function (objeto, numeroForm) {

    let fila = $(`#tablaCol${objeto.accion}${numeroForm} tr:last`)
    $(fila).on(`change`, `input, select`, actualizarPost)

}
const idColeccionInicial = function (objeto, numeroForm) {

    let key = $(`#tablaCol${objeto.accion}${numeroForm} tr`).eq(1)
    let contadorIdColec = $(`#formulario${objeto.accion}${numeroForm} input.contadorId`).val()

    if (key.attr(`comp`) == undefined) {
        $(`td input.idColec`, key).val(0)
        $(`td input.destinoColec`, key).val(`Devolucion Prestamo`)
        $(`#formulario${objeto.accion}${numeroForm} input.contadorId`).val(parseFloat(contadorIdColec) + 1)
    }
}
const idColeccion = function (objeto, numeroForm, self) {

    let contadorIdColec = $(`#formulario${objeto.accion}${numeroForm} input.contadorId`).val()
    let father = $(self).parent()

    let primerId = $(`#tablaCol${objeto.accion}${numeroForm} tr:nth-child(1n) td.idColec input`).val()
    let first = $(`#tablaCol${objeto.accion}${numeroForm} tr`).eq(1);
    let second = $(`#tablaCol${objeto.accion}${numeroForm} tr`).eq(2)

    if (primerId == "") {

        $(`td.idColec input`, second).val(parseFloat(contadorIdColec) + 1)
        $(`td input.destinoColec`, father).val(`Devolucion Prestamo`)
        $(`#formulario${objeto.accion}${numeroForm} input.contadorId`).val(parseFloat(contadorIdColec) + 1)

    } else {

        $(`input.idColec`, father).val(parseFloat(contadorIdColec) + 1)
        $(`td input.destinoColec`, father).val(`Devolucion Prestamo`)
        $(`#formulario${objeto.accion}${numeroForm} input.contadorId`).val(parseFloat(contadorIdColec) + 1)
    }
}
const adjuntoColeccionFuncInicial = function (objeto, numeroForm) {

    let key = $(`#tablaCol${objeto.accion}${numeroForm} tr`);

    let tablasIniciales = key.slice(1, key.length - 1);

    const nombreAdjunto = function (e) {

        let valorAdjunto = $(this).val();

        if (valorAdjunto == "") {

            $(this).siblings(`div.src`).html("");
            $(this).siblings(`label`).removeClass("validado");
            $(this).siblings(`label`).attr("validado", false);

        } else {
            $(this).siblings(`div.src`).html(valorAdjunto);

            $(this).siblings(`input.postAdj`).val(`post`);
            $(this).siblings(`label`).addClass("validado");
            $(this).siblings(`input.originalnameColec`).attr("disabled", "disabled");
            $(this).siblings(`input.filenameColec`).attr("disabled", "disabled");

            $(this).siblings(`label`).attr("validado", true);
        }
    }

    $.each(tablasIniciales, (indice, value) => {

        $(`input.adjuntoColeccion`, value).change(nombreAdjunto)
    })


}
const adjuntoColeccionFunc = function (objeto, numeroForm, self) {

    let father = $(self).parent()

    const nombreAdjunto = function (e) {

        let valorAdjunto = $(this).val();
        console.log(valorAdjunto)

        if (valorAdjunto == "") {

            $(this).siblings(`div.src`).html("");
            $(this).siblings(`label`).removeClass("validado");
            $(this).siblings(`label`).attr("validado", false);
        } else {

            $(this).siblings(`div.src`).html(valorAdjunto);
            $(this).siblings(`input.postAdj`).val(`post`);
            $(this).siblings(`label`).addClass("validado");
            $(this).siblings(`input.originalnameColec`).attr("disabled", "disabled");
            $(this).siblings(`input.filenameColec`).attr("disabled", "disabled");
            $(this).siblings(`label`).attr("validado", true);
        }
    }

    $(`input.adjuntoColeccion`, father).change(nombreAdjunto)

}
const abrirAdjuntoFormIndividual = function (objeto, numeroForm) {

    const vistaPrevia = function (e) {

        let src = $(e.target).attr(`src`);
        if (src != undefined) {
            $(`#vistaPrevia`).attr("src", src);
            $(`#canvas_container`).css("display", `flex`);
        }
    };

    $.each(objeto.atributos.vistaPrevia, (indice, value) => {

        $(`#formularioIndividual div.fo.${value.nombre} div.src`).click(vistaPrevia);
        $(`#formularioIndividual  td.${value.nombre} div.formColec.src`).click(vistaPrevia);
        $(`#formularioIndividual div.fo.${value.nombre} div.src`).addClass(`vistaPrevia`);
        $(`#formularioIndividual  td.${value.nombre} div.formColec.src`).addClass(`vistaPrevia`);
    });
};
const insertarNumerador = function (numerador) {
    $.ajax({
        type: "POST",
        url: `/numeradores`,
        data: numerador,
        success: function (response) { },
        error: function (error) {
            console.log(error);
        },
    });
};
