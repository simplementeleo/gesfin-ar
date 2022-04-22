const crearTablaDobleEntradaForm = function (numeroForm, objeto, fidecomisoSelec) {


    let consulta = ""
    let fidei = ""
    let accion = objeto.accion;
    let filaContador = 0;
    let id = $(`#t${numeroForm} tr.sel td._id`).html() || $(`#t${numeroForm} tr.sel td.id`).html()
    let usuario = $("#oculto").val();
    let pantalla = $(window).height();
    let container = $(`.container`).css("height");
    let heightContainer = container.slice(0, 2);
    let height = pantalla - (heightContainer * 4.3);
    let filasMongo = ""
    let tabla = ""
    let user = ""
    let fila = []
    let columna = [];


    var imgs = `<div class="com" id="com${accion}${numeroForm}">${iMailF}${iCalenF}${iExpoF}${iDeleteF}${iEditF}${undoF}${iCruzF}${iSaveF}
     <div><div class="cartelErrorForm noShow">
                <p>Revisar los campos en rojo</p>
            </div>
        </div>
        </div>
        <div class="closeForm ${numeroForm}">+</div>`;

    var imagenes = $(imgs);

    imagenes.appendTo('#comanderaIndiv');

    let nomT = $(`#t${numeroForm} tr.sel td.name`).html();
    let dirT = ""

    let encabazado = `<div class="titulos ${numeroForm}"><h2>${nomT}</h2>
                       <h3>${dirT}</h3></div>`;

    let e = $(encabazado);

    e.appendTo(`#cabeceraForm`);


    tabla += `<table class="tablaDoble active ${numeroForm}" id="de${numeroForm}" style = "max-height: ${height}px">`;
    tabla += `<form method="PUT" action="/${accion}Doble" id="dobleEntrada${accion}${numeroForm}"></form>`;
    tabla += `<tr><th class="tituloTablas vacio"></th>`;


    $.getJSON(servidor + `/${objeto.accion}?unid=${fidecomisoSelec}`,
        function (data) {
            let resp = ""

            let sel = $(`#t${numeroForm} tr.sel`);
            consulta = data;
            fidei = consulta.find(element => element.id == $(`td.id`, sel).html());

            resp = crearTablaDoble(numeroForm, objeto, fidei, height, usuario, filasMongo, id, filaContador);

            tabla += resp.tabla
            user += resp.user
            fila = resp.fila
            columna = resp.columna

            let tabl = $(tabla);
            let usern = $(user);

            tabl.appendTo(`#cabeceraForm`);
            usern.appendTo(`#cabeceraForm`);

            $.each(objeto.tablaDobleEntrada.funcionesFilaCol, (indice, value) => {
                value(numeroForm, objeto, fila, columna)
            })
            $.each(columna, (indice, value) => {

                chequeTodo(value)

                $.each(fila, (ind, val) => {

                    let indi = (Object.keys(val)[0]).indexOf(` `)

                    let subFiltro = ""

                    if (indi > 0) {

                        let subFilt = (Object.keys(val)[0]).split(` `)
                        subFiltro = subFilt[0]
                    } else {
                        subFiltro = (Object.keys(val)[0])
                    }
                    chequefiltrar(value, subFiltro)
                })
            })

        })

    $(`#cabeceraForm #de${numeroForm} input.dobleEntrada.totales`).remove();

    $(`#formularioIndividual`).css("display", "flex");
    $(`#formularioIndividual2`).css("display", "flex");

    let fecha = moment(Date.now()).format('L');
    $(`.d.date.${numeroForm}`).val(fecha);

    $(`#formularioIndividual .closeForm.${numeroForm}`).click(function () {

        editando = false;


        $(`.tablaDoble.active.${numeroForm}`).remove()
        $(`.audit.${numeroForm}`).remove();
        $(`.titulos.${numeroForm}`).remove();
        $(`#formulario${accion}${numeroForm}`).remove();
        $(`#com${accion}${numeroForm}`).remove();
        $(`#formularioIndividual`).css("display", "none");
        $(`.closeForm.${numeroForm}`).remove()
        $(`#t${numeroForm}`).remove()

        reCrearTabla(numeroForm, objeto, fidecomisoSelec)
    });
    $(`#formularioIndividual .save`).click(function (e) {

        e.preventDefault();

        enviarFormularioDoble(objeto, numeroForm);
    });
    $(`#formularioIndividual .deleteBoton`).click(function () {

        eliminarRegistroFormularioDoble(objeto, numeroForm)
    });
    $(`#formularioIndividual .cruzBoton`).click(function () {

        if (editando == true) {

            $(`.audit.${numeroForm}`).remove();
            $(`#de${numeroForm}`).remove();

            $.when(crearTablaDoble(numeroForm, objeto, height, usuario, id, filaContador)).done(
                valoresDobleEntrada(consulta, columna, id),
                totalesFilas(numeroForm, objeto)
            )
            let fecha = moment(Date.now()).format('L');
            $(`.d.date.${numeroForm}`).val(fecha);
            editando = false
        } else {
            $(`input.form`).val("");
            $(`.select.form`).val("");

            $(`.form.username`).val(usu);
            let fecha = moment(Date.now()).format('L');
            $(`.form.date`).prop("readonly", "true");
            $(`.form.date`).val(fecha);

            $(`input.form`).attr(`disabled`, false);
            $(`.select.form`).attr(`disabled`, false);
        }
    });
    $(`#formularioIndividual .undo`).click(function () {

        volverValoresGrabados(objeto, numeroForm, fidei)

    });
    $(`#formularioIndividual`).on(`click`, `input.filtroTodo.checkbox`, function (e) {

        let attr = $(this).attr(`filtro`)

        if ($(this).is(":checked")) {

            $(`#de${numeroForm} td.${attr} input[type="checkbox"]`).prop('checked', true)
            $(`#de${numeroForm} th.${attr} input[type="checkbox"]`).prop('checked', true)
            $(`#de${numeroForm} td.${attr} input.valor`).removeAttr(`disabled`)
            $(`#de${numeroForm} td.${attr} input.valor`).val("checked")
            $(`#de${numeroForm} input.tablaDobleNada.${attr}`).attr(`disabled`, true)
        } else {

            $(`#de${numeroForm} td.${attr} input[type="checkbox"]`).prop('checked', false)
            $(`#de${numeroForm} th.${attr} input[type="checkbox"]`).prop('checked', false)
            $(`#de${numeroForm} td.${attr} input.valor`).val("")
            $(`#de${numeroForm} td.${attr} input.valor`).attr(`disabled`, true)
            $(`#de${numeroForm} input.tablaDobleNada.${attr}`).attr(`disabled`, false)

        }
    })
    $(`#formularioIndividual`).on(`click`, `input.agrupador`, function (e) {

        let indi = $(this).attr(`subfiltro`).indexOf(` `)
        let subFiltro = ""
        if (indi > 0) {
            let subFilt = $(this).attr(`subfiltro`).split(` `)
            subFiltro = subFilt[0]
        } else {
            subFiltro = $(this).attr(`subfiltro`)
        }
        let filtro = $(this).attr(`filtro`)

        if ($(this).is(":checked")) {

            $(`#de${numeroForm} input.${filtro}[subfiltro~=${subFiltro}]`).prop('checked', true)
            $(`#de${numeroForm} td.${filtro}[filtro~=${subFiltro}] input.valor`).removeAttr(`disabled`)
            $(`#de${numeroForm} td.${filtro}[filtro~=${subFiltro}] input.valor`).val('checked')
        } else {
            $(`#de${numeroForm} input.${filtro}[subfiltro~=${subFiltro}]`).prop('checked', false)
            $(`#de${numeroForm} td.${filtro}[filtro~=${subFiltro}] input.valor`).val('')
            $(`#de${numeroForm} td.${filtro}[filtro~=${subFiltro}] input.valor`).attr(`disabled`, true)
            $(`#de${numeroForm} th.${filtro} input.filtroTodo[type = "checkbox"]`).prop('checked', false)
        }

        chequeTodo(filtro)
        chequefiltrar(filtro, subFiltro)
    })
    $(`#formularioIndividual`).on(`click`, `input.tablaDobleN[type="checkbox"]`, function (e) {

        let indi = $(this).attr(`subFiltro`).indexOf(` `)
        let subFiltro = ""

        if (indi > 0) {
            let subFilt = $(this).attr(`subFiltro`).split(` `)
            subFiltro = subFilt[0]
        } else {
            subFiltro = $(this).attr(`subFiltro`)
        }

        let father = $(this).parent()

        let attr = $(this).attr(`filtro`)

        if ($(this).is(":checked")) {

            $(`input.valor`, father).removeAttr(`disabled`)
            $(`input.valor`, father).val(`checked`)

        } else {

            $(`input.valor`, father).val("")
            $(`input.valor`, father).attr(`disabled`, true)
            $(`#de${numeroForm} th.${attr} input.filtroTodo[type = "checkbox"]`).prop('checked', false)
            $(`#de${numeroForm} input.${subFiltro}.agrupador[filtro~=${attr}]`).prop('checked', false)

        }

        chequeTodo(attr)
        chequefiltrar(attr, subFiltro)
    })
    $(`#formularioIndividual`).on(`click`, `th.agrupador`, function (e) {

        let indi = $(this).attr(`filtro`).indexOf(` `)
        let filtro = ""
        if (indi > 0) {
            let filt = $(this).attr(`filtro`).split(` `)
            filtro = filt[0]
        } else {
            filtro = $(this).attr(`filtro`)
        }

        let parent = $(this).parent()
        $(`#de${numeroForm} td[filtro~="${filtro}"],
                        #de${numeroForm} th.filaNombre[filtro~=${filtro}]`).toggleClass(`oculto`)

        parent.toggleClass(`acordeon`)

    })
    let chequeTodo = function (filtro) {

        let input = $(`#de${numeroForm} input.tablaDobleN.${filtro}`)
        let checked = []
        $.each(input, (indice, value) => {

            checked.push($(value).is(":checked"))
        })

        if (!checked.includes(false)) {

            $(`#de${numeroForm} th.${filtro} input.filtroTodo[type = "checkbox"]`).prop('checked', true)
            $(`#de${numeroForm} input.agrupador[filtro~=${filtro}]`).prop('checked', true)
            $(`#de${numeroForm} input.tablaDobleNada.${filtro}`).attr(`disabled`, true)

        }
    }
    let chequefiltrar = function (filtro, subFiltro) {

        let input = $(`#de${numeroForm} td[filtro~=${subFiltro}] input.tablaDobleN.${filtro}`)
        let checked = []

        $.each(input, (indice, value) => {

            checked.push($(value).is(":checked"))
        })

        if (!checked.includes(false)) {

            $(`#de${numeroForm} th.${subFiltro}.${filtro} input.agrupador`).prop('checked', true)

        }
    }


}
const crearTablaDoble = function (numeroForm, objeto, fidei, height, usuario, filasMongo, id) {

    let accion = objeto.accion;
    let fila = [];
    let tituloFila = [];
    let columna = [];
    let titulosColumna = [];
    let inputType = objeto.tablaDobleEntrada.inputType
    let totalesColumna = new Object
    let totalesFila = new Object
    let total = 0
    let tabla = "";//creo table por afuera del switch de la tabla, porque los diferentes case los toma como el mismo ambiente
    let user = ""; //creo usuario por afuera del switch de la tabla, porque los diferentes case los toma como el mismo ambiente    
    let hoy = new Date(Date.now());
    let mesActual = ""
    let ano = ""
    let mesesTablaDoble = [`Ene`, `Feb`, `Mar`, `Abr`, `May`, `Jun`, `Jul`, `Ago`, `Sep`, `Oct`, `Nov`, `Dic`];

    let cabeceraRegular = function (titulosColumna) {
        let cabecera = ""

        $.each(titulosColumna, function (indice, value) {

            // definicion de cabecera de la tabla
            cabecera += `<th class="tituloTablas ${[value]}">${[value]}</th>`;
        })
        cabecera += `<tr>`;

        return cabecera

    }
    let cabecerTotalizador = function (titulosColumna) {
        let cabecera = ""

        $.each(titulosColumna, function (indice, value) {

            // definicion de cabecera de la tabla
            cabecera += `<th class="tituloTablasSuperior ${[indice]}">${[indice]}</th>`;

            cabecera += `</tr>`;
            cabecera += `<tr>`;
            $.each(value, (ind, val) => {
                cabecera += `<th class="tituloTablas ${[val]}">${[val]}</th>`;
            })
        })
        cabecera += `<tr>`;

        return cabecera

    }

    /////////////////////tipo de fila
    switch (objeto.tablaDobleEntrada.filaType) {
        case `baseInterna`://Esta opción se usa cuando las filas esta determinadas por la accion principal de la entidad
            $.each(objeto.tablaDobleEntrada.fila, (indice, value) => {

                $.each(fidei[indice][value], (ind, val) => {
                    totalesFila[val] = 0
                    fila.push(val)
                    tituloFila.push(val)
                })
            })
            break;
        case `fija`:// Esta opcion cuando esta predeterminada en la fila 
            $.each(objeto.tablaDobleEntrada.fila, (indice, value) => {
                fila.push(value)
                tituloFila.push(value)
            })
            break;
        case `agrupado`:// igual que el anterior pero eta agrupado 
            fila = objeto.tablaDobleEntrada.fila
            tituloFila = objeto.tablaDobleEntrada.tituloFila
            break;
        case `baseExterna`:
            fila = filasMongo

            break;
    }
    /////////////////////tipo de Columna
    switch (objeto.tablaDobleEntrada.columnaType) {
        case `fija`:
            let col = objeto.tablaDobleEntrada.columna

            $.each(col, (indice, value) => {
                columna.push(value.nombre)
                totalesColumna[value.nombre] = 0
            })
            tabla += cabeceraRegular(objeto.tablaDobleEntrada.titulosColumna)
            break;
        case `mes`:
            let cantidadDeAnos = 0
            let anosMeses = new Object
            mesActual = (hoy.getMonth());
            ano = hoy.getFullYear()

            let mesesAño = mesesTablaDoble.slice(0, (mesActual + 1))
            let mesesPrevious = mesesTablaDoble.slice(mesesAño.length)

            anosMeses[ano] = mesesAño
            ano--

            for (let x = 0; x < cantidadDeAnos; x++) {
                anosMeses[ano] = mesesTablaDoble
                ano--
            }
            anosMeses[ano] = mesesPrevious
            columna = anosMeses

            tabla += cabecerTotalizador(columna)

            break;
    }

    $.each(titulosColumna, function (indice, value) {

        // definicion de cabecera de la tabla
        tabla += `<th class="tituloTablas ${[value]}">${[value]}</th>`;
    })
    tabla += `<tr>`;

    switch (objeto.tablaDobleEntrada.type) {
        case `regularConTotales`:
            $.each(fila, (ind, val) => {
                tabla += `<tr>
                <th class ="filaNombre ${val}">${tituloFila[ind]}<input class="doEn ${val}" name="nombreCol" form="dobleEntrada${accion}${numeroForm}" value="${val}" display="none">
                <input class="doEn ${val} fila" name="fila" form="dobleEntrada${accion}${numeroForm}" display="none"></th>`;

                for (let t = 0; t < columna.length; t++) {

                    let valueCampo = fidei[columna[t]][val[0]] || fidei[columna[t]][val] || ""

                    totalesColumna[columna[t]] += (parseFloat(valueCampo) || 0)
                    totalesFila[val] += (parseFloat(valueCampo) || 0)
                    total += (parseFloat(valueCampo) || 0)

                    tabla += `<td class="de ${val} ${columna[t]}"><input type="${inputType}" value="${valueCampo}" form="dobleEntrada${accion}${numeroForm}" class="tablaDobleN ${columna[t]}" name="${columna[t]} ${val}"></input></td>`;
                }

                tabla += `<td class="de ${val} totales"><input type"${inputType}" value="${totalesFila[val]}" form="dobleEntrada${accion}${numeroForm}" class="tablaDobleN totales" name="totales ${val}"></input></td>`;
                tabla += `</tr>`

            })

            tabla += `<tr><th class = "filaNombre Total"> Total:</th> `;

            for (let t = 0; t < columna.length; t++) {

                tabla += `<td class = "det total ${columna[t]}">${totalesColumna[columna[t]]}</td>`;
            }
            tabla += `<td class = "det total totales">${total}</td>`;
            tabla += `</tr>`;


            tabla += "</tr>";

            user = `<div class="audit ${numeroForm}"><input class="d username" name="username" form="dobleEntrada${accion}${numeroForm}" value="${usuario}" readonly="true">
                             <input class="d id" name="id" form="dobleEntrada${accion}${numeroForm}" value="${id}" readonly="true">
                             <input class="d date ${numeroForm}" name="date" form="dobleEntrada${accion}${numeroForm}" value="${moment(fidei.date).format("L")}" readonly="true"></div>`;

            break;
        case `regularSinTotales`:

            $.each(fila, (ind, val) => {
                tabla += `<tr>
                <th class ="filaNombre ${val}">${tituloFila[ind]}<input class="doEn ${val}" name="nombreCol" form="dobleEntrada${accion}${numeroForm}" value="${val}" display="none">
                <input class="doEn ${val} fila" name="fila" form="dobleEntrada${accion}${numeroForm}" display="none"></th>`;
                for (let t = 0; t < columna.length; t++) {

                    tabla += `<td class="de ${val} ${columna[t]}"><input type="${inputType}" value="" form="dobleEntrada${accion}${numeroForm}" class="tablaDobleN ${columna[t]}" name="${columna[t]} ${val}"></input></td>`;

                }
                tabla += `</tr>`;
            })


            user = `<div class="audit ${numeroForm}"><input class="d username" name="username" form="dobleEntrada${accion}${numeroForm}" value="${usuario}" readonly="true">
                             <input class="d id" name="id" form="dobleEntrada${accion}${numeroForm}" value="${id}" readonly="true">
                             <input class="d date ${numeroForm}" name="date" form="dobleEntrada${accion}${numeroForm}" value="${moment(fidei.date).format("L")}" readonly="true"></div>`;

            break;
        case `agrupar`:
            tabla += `<th class="tituloTablas filtro">Seleccionar todo</th>`;

            $.each(columna, function (indice, value) {

                // definicion de cabecera de la tabla
                tabla += `<th class="tituloTablas ${value}">
                <input type="${inputType}" class="filtroTodo ${inputType}" filtro="${value}"></input>
                <input type="text" class="tablaDobleNada ocultoSiempre  ${value}" value="" name="${value}" form="dobleEntrada${accion}${numeroForm}" disabled="disabled"></input>
                </th>`;

            })
            tabla += `</tr>`;

            $.each(fila, function (indice, v) {
                let agrupador = Object.keys(v)

                tabla += `<tr>`
                tabla += `<th class="tituloTablas filtro agrupador ${agrupador}" filtro="${agrupador}">${agrupador}</th>`;

                $.each(columna, (ind, val) => {

                    tabla += `<th class="tituloTablas ${val} ${agrupador}">
                    <input type="${inputType}" class="agrupador ${agrupador[0]}" filtro="${val}" subFiltro="${agrupador[0]}"></input>
                     
                    </th>`;
                })

                tabla += `</tr>`
                $.each(v[agrupador], (ind, val) => {

                    tabla += `<tr>
                    <th class ="filaNombre ${val}" filtro="${agrupador}">${tituloFila[indice][agrupador][ind]}`;

                    for (let t = 0; t < columna.length; t++) {

                        let valueCampo = fidei[columna[t]][val] || ""
                        let disabled = fidei[columna[t]][val] || `disabled="disabled"`

                        tabla += `<td class="de ${val} ${columna[t]}" filtro="${agrupador}">
                        <input type="${inputType}"  class="tablaDobleN ${columna[t]}" ${valueCampo} filtro="${columna[t]}" subFiltro="${agrupador[0]}"></input>
                        <input type="text" class="tablaDoble valor ${columna[t]}" value="${valueCampo}" name="${columna[t]} ${val}" form="dobleEntrada${accion}${numeroForm}" ${disabled} display="none"></input></td>`;

                    }
                    tabla += `</tr>`;

                })
            })

            user = `<div class="audit ${numeroForm}"><input class="d username" name="username" form="dobleEntrada${accion}${numeroForm}" value="${usuario}" readonly="true">
                       <input class="d id" name="id" form="dobleEntrada${accion}${numeroForm}" value="${id}" readonly="true">
                       <input class="d date ${numeroForm}" name="date" form="dobleEntrada${accion}${numeroForm}" value="${moment(fidei.date).format("L")}" readonly="true"></div>`;

            break;

    }
    return {
        tabla,
        user,
        fila,
        columna
    }
}
const crearTablaDoblePestanaFecha = function (objeto, numeroForm, height, columnasArray, fidecomisoSelec, consulta) {

    let accion = objeto.accion;
    let hoy = new Date(Date.now());
    let mesActual = hoy.getMonth();
    let ano = hoy.getFullYear()
    let anoCort = parseFloat(ano.toString().slice(2, 4));
    let tabla = "";
    let total = "";
    let mesesDefault = 12
    if (fidecomisoSelec == "todos") {
        fidecomisoSelec = ""
    }

    tabla += `<table class= "tablaDoble active ${numeroForm}" id = "t${numeroForm}" style = "max-height: ${height}px"> `;

    tabla += `<form method = "PUT" action = "/${accion}Doble" id = "dobleEntrada${accion}${numeroForm}" ></form> `;
    tabla += `<tr> `

    $.each(objeto.formDoblePest.titulos, (indice, value) => {
        tabla += `< th class= titulosDoble ${value}">${value}</th>`
    })

    let y = 0;
    for (let x = 0; x < mesesDefault; x++) {

        tabla += `<th class=titulosDoble fecha>${meses[mesActual + y]} ${anoCort}</th>`;

        if (mesActual + 1 + y == 12) {
            anoCort++
            y -= 12
        }
        y++

    }

    tabla += `</tr>`;

    // console.log(columnasArray)
    $.each(columnasArray.agrupador, (indice, value) => {

        let claseName = value.name.replace(/ /g, "")

        tabla += `<tr class="agrupador ${claseName}"><th>${value.name}</th>`;

        $.each(objeto.formDoblePest.names, (indice, value) => {

            tabla += `<th class="celdaTab agrupador ${value.nombre}"></th>`
        })

        let a = 0;
        anoCort = parseFloat(ano.toString().slice(2, 4));
        for (let x = 0; x < mesesDefault; x++) {

            tabla += `<th class="celdaTab agrupador ${meses[mesActual + a]} ${anoCort}" ></th>`;

            if (mesActual + 1 + a == 12) {
                anoCort++
                a -= 12
            }
            a++
        }
        tabla += `</tr>`;

        $.each(columnasArray.columna, (ind, val) => {

            if (val.agrupadorRubrosPago == value.name) {

                let show = ""
                $.each(objeto.formDoblePest.datos.columna.key, (i, v) => {

                    show += `${val[v]} - `
                })

                let found = consulta.find(element => element.identificador == val._id);


                let claseName = val.agrupadorRubrosPago[0].replace(/ /g, "")

                if (found == undefined) {


                    tabla += `<tr><td class="columnaPrincipal">${show}
                <input class="inputCeldaTabla indentificador ocultoSiempre" name="identificador" form="dobleEntrada${objeto.accion}${numeroForm}" value="${val._id}" disabled>
                <input class="inputCeldaTabla ocultoSiempre" name="unidades" form="dobleEntrada${objeto.accion}${numeroForm}" value="${fidecomisoSelec}" disabled>
                <input class="inputCeldaTabla id ocultoSiempre" name="id" form="dobleEntrada${objeto.accion}${numeroForm}" value="" disabled></td>`;

                    $.each(objeto.formDoblePest.names, (indice, value) => {

                        tabla += `<td class ="celdaTab fijo ${value.nombre} ${claseName}"><p></p>
                     <input type="number" class="inputCeldaTabla oculto" name="${value.nombre}" form="dobleEntrada${objeto.accion}${numeroForm}" value="" disabled></td>`;

                    })

                    let b = 0;
                    anoCort = parseFloat(ano.toString().slice(2, 4));
                    for (let x = 0; x < mesesDefault; x++) {

                        tabla += `<td class="${claseName} celdaTab mes ${meses[mesActual + b]} ${anoCort}"><p></p>
                    
                    <input type="number" class="inputCeldaTabla oculto" name="meses" form="dobleEntrada${objeto.accion}${numeroForm}" disabled></td>`;

                        if (mesActual + 1 + b == 12) {
                            anoCort++
                            b -= 12
                        }
                        b++
                    }

                } else {

                    tabla += `<tr><td class="columnaPrincipal">${show}
                               <input class="inputCeldaTabla indentificador ocultoSiempre" name="identificador" form="dobleEntrada${objeto.accion}${numeroForm}" value="${val._id}" disabled>
                               <input class="inputCeldaTabla ocultoSiempre" name="unidades" form="dobleEntrada${objeto.accion}${numeroForm}" value="${fidecomisoSelec}" disabled>
                               <input class="inputCeldaTabla id ocultoSiempre" name="id" form="dobleEntrada${objeto.accion}${numeroForm}" value="${found.id}" disabled></td>`;

                    $.each(objeto.formDoblePest.names, (indice, value) => {

                        let numero = new Intl.NumberFormat("de-DE").format(found[value.nombre])

                        if (numero == 0) {

                            numero = ""

                        }

                        tabla += `<td class = "celdaTab fijo ${value.nombre} ${claseName} "><p>${numero}</p>
                                      <input type="number" class="inputCeldaTabla oculto" name="${value.nombre}" form="dobleEntrada${objeto.accion}${numeroForm}" value="${found[value.nombre]}" disabled></td>`;

                    })
                    let b = 0
                    anoCort = parseFloat(ano.toString().slice(2, 4));
                    for (let x = 0; x < mesesDefault; x++) {

                        let numero = new Intl.NumberFormat("de-DE").format(found.meses[x])

                        if (numero == 0) {

                            numero = ""
                        }

                        tabla += `<td class="${claseName} celdaTab mes ${meses[mesActual + b]} ${anoCort}"><p>${found.meses[x]}</p>
                                    
                                    <input type="number" class="inputCeldaTabla oculto" name="meses" form="dobleEntrada${objeto.accion}${numeroForm}" value="${found.meses[x]}" disabled></td>`;

                        if (mesActual + 1 + b == 12) {
                            anoCort++
                            b -= 12
                        }
                        b++
                    }
                }
                tabla += `</tr>`;
            }
        })
    })

    total += `<tr class="total"><td class="columnaPrincipal total">Total
<input class="inputCeldaTabla ocultoSiempre" name="totalColumna" form="dobleEntrada${objeto.accion}${numeroForm}" value="" disabled></td>`;

    $.each(objeto.formDoblePest.names, (indice, value) => {
        total += ` <td class ="celdaTab total ${value.nombre}">
    <input type="number" class="inputCeldaTabla ocultoSiempre" name="total${value.nombre}" form="dobleEntrada${objeto.accion}${numeroForm}" disabled></td>`;
    })
    anoCort = parseFloat(ano.toString().slice(2, 4));
    let c = 0;
    for (let x = 0; x < mesesDefault; x++) {

        total += `<td class="celdaTab total ${meses[mesActual + c]} ${anoCort}">
    
   
    <input type="number" class="inputCeldaTabla total ocultoSiempre" name="totalmeses" form="dobleEntrada${objeto.accion}${numeroForm}" disabled></td>`;

        if (mesActual + 1 + c == 12) {
            anoCort++
            c -= 12
        }
        c++
    }

    tabla += total;
    tabla += `</table>`

    let tabl = $(tabla);

    tabl.appendTo(`#tabs_contents`);

    $.each(objeto.atributos.ocultoSiempre, (indice, value) => {
        $(`#t${numeroForm} td.${value.nombre} input`).addClass(`ocultoSiempre`)
    })

    $.each(objeto.formDoblePest.valorCalculado, (indice, value) => {

        $(`#t${numeroForm} td.${value.nombre}`).html("")
        $(`#t${numeroForm} td.${value.nombre} input`).remove()
    })

    let registrosTabla = $(`#t${numeroForm} tbody tr input.id`).val();

}
const enviarFormularioDoble = function (objeto, numeroForm) {

    let accion = objeto.accion;

    $.ajax({
        type: "put",
        url: `/${accion}Doble`,
        data: $(`#dobleEntrada${accion}${numeroForm}`).serialize(),

        beforeSend: function () { },
        complete: function () { },
        success: function (response) {

            $(`.cartelErrorForm p`).html(response);
            $(`.cartelErrorForm`).css("display", "block");

            $(`.audit.${numeroForm}`).val(usu);

            let fecha = moment(Date.now()).format('L');
            $(`.d.date.${numeroForm}`).val(fecha);

        },
        error: function (error) {
            console.log(error);
        }
    });
}
const eliminarRegistroFormularioDoble = function (objeto, numeroForm) {

    let accion = objeto.accion;
    let fila = objeto.tablaDobleEntrada.fila;
    let columna = objeto.tablaDobleEntrada.columna;


    $.ajax({
        type: "put",
        url: `/${accion}DobleEliminar`,
        data: $(`#dobleEntrada${accion}${numeroForm}`).serialize(),
        beforeSend: function () { },
        complete: function () { },
        success: function (response) {

            $(`#de${numeroForm} input`).val("")

            let fecha = moment(Date.now()).format('L');
            $(`.d.date.${numeroForm}`).val(fecha);
            $(`.cartelErrorForm p`).html(response);
            $(`.cartelErrorForm`).css("display", "block");
        },
        error: function (error) {
            console.log(error);
        }
    });
}
const claseDobleEntrada = function (numeroForm, objeto) {

    $.each(objeto.tablaDobleEntrada.columna, function (indice, value) {

        $(`#t${numeroForm} .celda.${value.nombre}`).addClass(`doEntrada`);

    })

    if (objeto.tablaDobleEntrada.abm == true) {

        $(`#bf${numeroForm} .dobleBoton`).addClass("show");
    }
}
const totalesDobleEn = function (numeroForm, objeto, fila, columna) {

    columna.pop()

    const totalesFilasInput = function () {

        let total = 0
        $.each(columna, function (indice, value) {
            let valorTotal = 0;
            for (let f = 0; f < fila.length; f++) {


                const tds = $(`#de${numeroForm} td.${fila[f]}.${value} input`)

                const calcularTol = function (td) {

                    let valorCelda = parseInt($(td).val());
                    if (!isNaN(valorCelda)) {
                        valorTotal += valorCelda;
                        total += (parseFloat(valorCelda) || 0)
                    }
                }

                $.each(tds, function (indice, value) {

                    calcularTol(value)
                });

                $(`td.total.${value}`).html(valorTotal);


            }
        })
        $(`td.total.totales`).html(total);
    }
    const totalesColInput = function () {

        $.each(fila, function (indice, value) {
            let valorTotalCol = 0;

            const tds = $(`#de${numeroForm} td.${value} input`)


            const calcularTolCol = function (td) {
                let valorCeldaCol = parseInt($($(`#de${numeroForm} td.${value}.${td} input`)).val());

                if (!isNaN(valorCeldaCol)) {
                    valorTotalCol += valorCeldaCol;
                }
            }

            $.each(columna, function (indice, value) {
                calcularTolCol(value)
            });

            $(`td.totales.${value} input`).val(valorTotalCol);
        })

    }

    $(`#de${numeroForm} input.tablaDobleN`).keyup(totalesFilasInput)
    $(`#de${numeroForm} input.tablaDobleN`).keyup(totalesColInput)

}
const clickInput = function (objeto, numeroForm, consulta) {
    let inputActive = false
    let ultimoClick = "";

    $("#tabs_contents").on('click', `#t${numeroForm} td`, function () {

        //e.stopPropagation();

        let padre = $(this).parent()
        let siblings = $(this).parent().siblings()


        if (inputActive == true && (!padre.hasClass(`sel`))) {

            if ($(`input.id`, ultimoClick).val() == "") {

                $.ajax({
                    type: "post",
                    url: `/${objeto.accion}`,
                    data: $(`#dobleEntrada${objeto.accion}${numeroForm}`).serialize(),
                    beforeSend: function () { },
                    complete: function () { },
                    success: function (response) {

                    },
                    error: function (error) {
                        console.log(error);
                    }
                });

            } else {

                $.ajax({
                    type: "put",
                    url: `/${objeto.accion}`,
                    data: $(`#dobleEntrada${objeto.accion}${numeroForm}`).serialize(),
                    beforeSend: function () { },
                    complete: function () { },
                    success: function (response) {

                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }

            let selec = $(ultimoClick).children()

            $.each(selec, (indice, value) => {
                let valorCelda = $(`input`, value).val()

                if (valorCelda != "") {
                    $(`p`, value).html(new Intl.NumberFormat("de-DE").format(valorCelda))
                }


            })

            valoresTablaPestana(objeto, numeroForm, consulta)

        }



        inputActive = true
        ultimoClick = $(this).parent()


        padre.addClass("sel");
        $(`p`, padre).html("")
        $(`input`, padre).removeClass(`oculto`)
        $(`input`, padre).attr("disabled", false);
        padre.siblings().removeClass("sel");
        $(`input`, siblings).addClass("oculto");
        $(`input`, siblings).attr("disabled", true);

    });

}
const valoresTablaPestana = function (objeto, numeroForm, consulta) {

    let total = new Object;
    let totalAgrupador = new Object;
    let totalMes = new Object;
    let totalAgrupadorMes = new Object;
    let mesesDefault = 12


    let hoy = new Date(Date.now());
    let mesActual = hoy.getMonth();
    let ano = hoy.getFullYear()

    let tds = ""
    let tdsMes = ""

    $.each(objeto.formDoblePest.names, (ind, val) => {


        tds = $(`#t${numeroForm} td.celdaTab.${val.nombre}`);
        total[val.nombre] = 0;


        $.each(consulta.agrupador, (indice, value) => {

            let className = value.name.replace(/ /g, "")
            totalAgrupador[className] = 0

            tds = $(`#t${numeroForm} td.celdaTab.${val.nombre}.${className} input`);


            $.each(tds, (i, v) => {

                if ($(v).val() != "") {

                    $(v).siblings(`p`).addClass(`conValorPesos`)
                    let valor = parseFloat($(v).val() || 0)

                    totalAgrupador[className] += parseFloat(valor || 0);
                    total[val.nombre] += parseFloat(valor || 0);
                }


            })

            $(`#t${numeroForm} tr.${className} th.${val.nombre}`).html(new Intl.NumberFormat("de-DE").format(totalAgrupador[className]))
            $(`#t${numeroForm} tr.${className} th.porcentage`).html("")
        })

        $(`td.total.${val.nombre}`).html(new Intl.NumberFormat("de-DE").format(total[val.nombre]));
        $(`td.total.porcentage`).html("");

    })

    let b = 0;
    anoCort = parseFloat(ano.toString().slice(2, 4));

    for (let x = 0; x < mesesDefault; x++) {
        totalMes[meses[mesActual + b]] = new Object;
        totalAgrupadorMes[meses[mesActual + b]] = new Object;
        totalMes[meses[mesActual + b]][anoCort] = 0
        totalAgrupadorMes[meses[mesActual + b]][anoCort] = 0

        $.each(consulta.agrupador, (indice, value) => {

            let className = value.name.replace(/ /g, "")

            let tdsMes = $(`#t${numeroForm} td.${className}.celdaTab.mes.${meses[mesActual + b]}.${anoCort} input`);

            $.each(tdsMes, (ind, val) => {


                if ($(val).val() != "") {

                    $(val).siblings(`p`).addClass(`conValorPesos`)



                    let valor = parseFloat($(val).val() || 0)

                    totalMes[meses[mesActual + b]][anoCort] += parseFloat(valor || 0);
                    totalAgrupadorMes[meses[mesActual + b]][anoCort] += parseFloat(valor || 0);
                }


            })

            $(`#t${numeroForm} tr.${className} th.${meses[mesActual + b]}.${anoCort}`).html(new Intl.NumberFormat("de-DE").format(totalAgrupadorMes[meses[mesActual + b]][anoCort]))

        })
        $(`#t${numeroForm} td.total.${meses[mesActual + b]}.${anoCort}`).html(new Intl.NumberFormat("de-DE").format(totalMes[meses[mesActual + b]][anoCort]))


        if (mesActual + 1 + b == 12) {
            anoCort++
            b -= 12
        }
        b++
    }

    let porcentage = $(`#t${numeroForm} td.fijo.porcentage`)

    $.each(porcentage, (indice, value) => {
        let elementoPrevio = ($(value).prev())

        let valor = $(`p`, elementoPrevio).html()

        if (valor != "") {

            let v = valor.replace(".", "");
            let vn = v.replace(",", ".");

            let porcentage = (parseFloat(vn || 0) / parseFloat(total.previsto || 0) * 100).toFixed(0)

            $(value).html(porcentage)
            $(value).addClass("conValor")

        }

    })
    let porcentageTh = $(`#t${numeroForm} th.porcentage`)

    $.each(porcentageTh, (indice, value) => {


        let elementoPrevio = ($(value).prev())

        let valor = $(elementoPrevio).html()


        if (valor != "") {

            let v = valor.replace(".", "");
            let vn = v.replace(",", ".");
            let porcentage = (parseFloat(vn || 0) / parseFloat(total.previsto || 0) * 100).toFixed(0)


            $(value).html(porcentage)
        }
    })


}
const volverValoresGrabados = function (objeto, numeroForm, fidei) {

    let fila = [];
    let tituloFila = [];
    let columna = [];

    /////////////////////tipo de fila
    switch (objeto.tablaDobleEntrada.filaType) {
        case `baseInterna`:

            $.each(objeto.tablaDobleEntrada.fila, (indice, value) => {
                $.each(fidei[indice][value], (ind, val) => {

                    fila.push(val)
                    tituloFila.push(val)
                })
            })

            break;
    }
    /////////////////////tipo de Columna
    switch (objeto.tablaDobleEntrada.columnaType) {
        case `fija`:

            $.each(objeto.tablaDobleEntrada.columna, (indice, value) => {
                columna.push(value.nombre)
            })
            titulosColumna = objeto.tablaDobleEntrada.titulosColumna

            break;
    }
    let tabla = "";

    $.each(fila, (indice, value) => {

        $.each(columna, (ind, val) => {

            console.log(fidei[val][value][0])

            let valueCampo = fidei[val][value[0]] || fidei[val][value][0] || ""
            $(`#de${numeroForm} input[name="${val} ${value}"]`).val(valueCampo)
            $(`#de${numeroForm} input[name="${val} ${value[0]}"]`).val(valueCampo)
        })
    })

    $(`#de${numeroForm} input.username`).val(fidei.username)
    $(`#de${numeroForm} input.username`).val(fidei.date)

}
const ocultarTds = function (objeto, numeroForm) {

    let filtroRapido = "";

    filtroRapido += `<div id=filtroRapido class=${objeto.atributos.filtroRapido.referencia.nombre}>`;

    $.each(objeto.atributos.filtroRapido.filtros, (indie, value) => {

        filtroRapido += `<div class="opcionFiltroRapido ${value}">${value}</div>`;
    })
    filtroRapido += `</div>`;

    let filRapido = $(filtroRapido);

    filRapido.appendTo(`#bf${numeroForm}`)

    $(`#bf${numeroForm} .opcionFiltroRapido.Completo`).addClass(`botonActivo`)

    $(`#bf${numeroForm} .opcionFiltroRapido`).click(function () {

        $(this).addClass(`botonActivo`)
        $(this).siblings().removeClass(`botonActivo`)

        let registros = $(`#t${numeroForm} tbody > tr td`);

        let valBus = $(this).html()

        if (valBus == `Reducido`) {
            $.each(registros, (indice, value) => {
                $(value).addClass(`oculto`)
            })
            $(`#t${numeroForm} td.total`).removeClass(`oculto`)
        } else {
            $.each(registros, (indice, value) => {
                $(value).removeClass(`oculto`)
            })
        }
    })

}
