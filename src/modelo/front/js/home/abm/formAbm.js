/////////////////Crear tabla que va insertadada en el abm, esta función se llama desde craerABM 
let crearTabla = function (contador, objeto, consulta) {
    let pantalla = $(window).height();
    let container = $(`.container`).css("height");

    let heightContainer = container.slice(0, 2);
    let height = pantalla - heightContainer * 4.3;

    var tabla = "";

    tabla += `<table class="tabs_contents_item active ${contador}" id="t${contador}">`;
    tabla += `<form method="POST" action="/${objeto.accion}" id="myForm${objeto.accion}${contador}" enctype="multipart/form-data"></form>`;

    for (let i = -1; i <= consulta.length; i++) {
        // definicion de cabecera de la tabla
        if (i < 0) {
            let filtro = [];
            $.each(objeto.atributos.names, function (indice, value) {
                if (value.type == `coleccion` || value.type == `coleccionTotal`) {
                    $.each(value.componentes, function (indice, value) {
                        filtro.push(indice);
                    });
                } else {
                    filtro.push(value.nombre);
                }
            });
            tabla += `<tr>`;
            $.each(objeto.atributos.titulos, function (indice, value) {
                tabla += `<th class="tituloTablas ${filtro[indice]}" filtro="${filtro[indice]
                    }">${[value]}</th>`;
            });
            tabla += `</tr>`;
            $.each(objeto.atributos.titulos, function (indice, value) {
                tabla += `<td class="filtro oculto ${filtro[indice]}" filtro="${filtro[indice]}" numeroFila="${indice}">
                          <div class="filtroClass"><input class="busqueda"><p class="closeFiltro">+</p></div></td>`;
            });

            tabla += `</tr>`;
        } else if (i > -1 && i < consulta.length) {
            tabla += `<tr class="fila ${i}">`;

            //definicion de fomato de cada celda

            tabla += tipoAtributo(consulta[i], objeto);
        } else {
            //Creaciòn de campos input
            $.each(objeto.atributos.names, function (indice, value) {
                switch (value.type) {
                    case "coleccion":
                        $.each(value.componentes, function (ind, val) {
                            tabla += `<td class="inputTd des ${ind}" id="inputTd${val.nombre}${contador}" cont=${contador}>
                             <input class="inputR ${val.nombre} ${contador}" id="in${ind}${contador}" readonly name="${ind}" form="myForm${objeto.accion}${contador}"></td>`;
                        });

                        break;
                    case "coleccionTotal":
                        $.each(value.componentes, function (ind, val) {
                            tabla += `<td class="inputTd des ${ind}" id="inputTd${val.nombre}${contador}" cont=${contador}>
                 <input class="inputR ${ind} ${contador}" id="in${ind}${contador}" readonly name="${ind}" form="myForm${objeto.accion}${contador}"></td>`;
                        });

                        break;
                    case "logico":
                        tabla += `<td class="inputTd ${value.nombre}">
                            <input type="checkbox" class="inputR ${value.nombre} ${contador}" id="in${value.nombre}${contador}" readonly ${value.nombre}" name="${value.nombre}" form="myForm${objeto.accion}${contador}" readony></td>`;
                        break;
                    case "password":
                        tabla += `<td class="inputTd ${value.nombre}">
                                <input type="password" class="inputR ${value.nombre} ${contador}" id="in${value.nombre}${contador}" readonly ${value.nombre}" name="${value.nombre}" form="myForm${objeto.accion}${contador}" readony><img class="ojoPassword tachado" src="/img/abm/ojoTachado.png"></td>`;
                        break;
                    case "adjunto":
                        tabla += `<td class="inputTd des ${value.nombre}" id="inputTd${value.nombre}${contador}" cont=${contador}>
                        <label for="in${value.nombre}${contador}" class="inputR ${value.nombre} ${contador}">Adjunto</label>
                         <input type="file" class="inputR ${value.nombre} ${contador}" id="in${value.nombre}${contador}" readonly name="${value.nombre}" form="myForm${objeto.accion}${contador}">
                        </td>`;
                        break;
                    default:
                        tabla += `<td class="inputTd des ${value.nombre}" id="inputTd${value.nombre}${contador}" cont=${contador} >
                          <input class="inputR ${value.nombre} ${contador}" id="in${value.nombre}${contador}" readonly name="${value.nombre}" form="myForm${objeto.accion}${contador}" maxlength="${value.maxCaract}"></td>`;
                }
            });
        }

        tabla += "</tr>";
    }
    tabla += `</table>`;
    tt = $(tabla);
    tt.appendTo(`#tabs_contents`);

    $(`#in${objeto.atributos.names[0].nombre}${contador}`).focus();
};
let reCrearTabla = function (id, objeto, fidecomisoSelec) {
    let consulta = "";

    $.ajax({
        type: "GET",
        url: `/${objeto.accion}?unid=${fidecomisoSelec}`,
        success: function (data) {
            consulta = data;

            let pantalla = $(window).height();
            let container = $(`.container`).css("height");

            let heightContainer = container.slice(0, 2);
            let height = pantalla - heightContainer * 4.3;

            var tabla = "";

            tabla += `<table class="tabs_contents_item active" id="t${id}" style = "max-height: ${height}px">`;
            tabla += `<form method="POST" action="/${objeto.accion}" id="myForm${objeto.accion}${id}"></form>`;

            for (var i = -1; i <= consulta.length; i++) {
                // definicion de cabecera de la tabla
                if (i < 0) {
                    $.each(objeto.atributos.titulos, function (indice, value) {
                        tabla += `<th class="tituloTablas ${[value]}">${[value]}</th>`;
                    });
                } else if (i > -1 && i < consulta.length) {
                    tabla += `<tr class="fila ${i}">`;
                    //definicion de fomato de cada celda
                    tabla += tipoAtributo(consulta[i], objeto);
                } else {

                    //Creaciòn de campos input
                    $.each(objeto.atributos.names, function (indice, value) {
                        switch (value.type) {
                            case "coleccion":
                                $.each(value.componentes, function (ind, val) {
                                    tabla += `<td class="inputTd des ${ind}" id="inputTd${val.nombre}${contador}" cont=${contador}>
                                         <input class="inputR ${val.nombre} ${contador}" id="in${ind}${contador}" readonly name="${ind}" form="myForm${objeto.accion}${contador}"></td>`;
                                });

                                break;
                            case "coleccionTotal":
                                $.each(value.componentes, function (ind, val) {
                                    tabla += `<td class="inputTd des ${ind}" id="inputTd${val.nombre}${contador}" cont=${contador}>
                                       <input class="inputR ${ind} ${contador}" id="in${ind}${contador}" readonly name="${ind}" form="myForm${objeto.accion}${contador}"></td>`;
                                });

                                break;
                            case "logico":
                                tabla += `<td class="celda ${value.nombre}">
                            <input type="checkbox" class="inputR ${value.nombre} ${contador}" id="in${value.nombre}${contador}" readonly ${value.nombre}" name="${value.nombre}" form="myForm${objeto.accion}${contador}" readony></td>`;
                                break;
                            case "adjunto":
                                tabla += `<td class="inputTd des ${value.nombre}" id="inputTd${value.nombre}${contador}" cont=${contador}>
                                    <label for="in${value.nombre}${contador}" class="inputR ${value.nombre} ${contador}">Adjunto</label>
                                    <input type="file" class="inputR ${value.nombre} ${contador}" id="in${value.nombre}${contador}" readonly name="${value.nombre}" form="myForm${objeto.accion}${contador}">
                                    </td>`;
                                break;
                            default:
                                tabla += `<td class="inputTd des ${value.nombre}" id="inputTd${value.nombre}${contador}" cont=${contador} >
                                      <input class="inputR ${value.nombre} ${contador}" id="in${value.nombre}${contador}" readonly name="${value.nombre}" form="myForm${objeto.accion}${contador}" maxlength="${value.maxCaract}"></td>`;
                        }
                    });
                }
                tabla += "</tr>";
            }

            tabla += `</table>`;
            tt = $(tabla);
            tt.appendTo(`#tabs_contents`);



            $(`#in${objeto.atributos.names[0].nombre}${contador}`).focus()

            formatoCeldas(objeto, id);
            validarFormulario(objeto, id)

            $.each(objeto.funcionesPropias.cargar, function (indice, value) {

                value(objeto, id)
            })

            $.each(objeto.funcionesPropias.consultaArr, function (indice, value) {

                value(objeto, id, consultaArray)
            })
            $.each(objeto.funcionesPropias.cargarDosAtributo, function (indice, value) {

                value[0](objeto, id, value[1], value[2])
            })
            $.each(objeto.funcionesPropias.cargarTresAtributo, function (indice, value) {

                value[0](objeto, id, value[1], value[2], value[3])
            })

            ultNum++;
            losInput = false;

            if (objeto.tablaDobleEntrada != false) {
                claseDobleEntrada(id, objeto);
            }

            if (consulta.length > 0) {
                let posicion = consulta.length - 1;

                acumuladoPesos = consulta[posicion].totalImporteArs;
                acumuladoUsd = consulta[posicion].totalImporteUsd;
                ultNum = consulta[posicion].num;
            } else {
                acumuladoPesos = 0;
                acumuladoUsd = 0;
                ultNum = 1;
            }
        },
    });
};
//////Agregar, eliminar, editar registros, son los registro enviados pero agregados en el front end/////////////////////////
let agregarRegistro = function (id, lengthUnoSelect, objeto, fidecomisoSelec, enviarRegistroNuevo, posteo) {

    let input = $(`#t${id} tbody > tr:last`);
    let numeroFila = $(`#t${id} tbody > tr.fila`).length;
    let nuevaFila = "";
    nuevaFila += `<tr class="fila ${numeroFila}">`;

    $.each(enviarRegistroNuevo, (ind, val) => {
        console.log(val)
        switch (val.name) {
            case `date`:
                var ano = val.value.slice(6);
                var dia = val.value.slice(3, 5);
                var mes = val.value.slice(0, 2);
                nuevaFila += `<td class="celda ${val.name}">${dia}/${mes}/${ano}</td>`;
                break;
            case `fecha`:
                var ano = val.value.slice(0, 4);
                var mes = val.value.slice(5, 7);
                var dia = val.value.slice(8, 10);
                nuevaFila += `<td class="celda ${val.name}">${dia}/${mes}/${ano}</td>`;
                break;
            case `vencimiento`:
                var ano = val.value.slice(0, 4);
                var mes = val.value.slice(5, 7);
                var dia = val.value.slice(8, 10);
                nuevaFila += `<td class="celda ${val.name}">${dia}/${mes}/${ano}</td>`;
                break;
            case `numero`:
            case "importe":
                let number = parseFloat(val.value || 0);
                let numero = new Intl.NumberFormat(["ban", "id"]).format(number);
                nuevaFila += `<td class="celda ${val.name}">${numero}</td>`;
                break;
            case "adjunto":
                nuevaFila += `<td class="celda ${val.name} vistaPrevia" src="${posteo.path}">${posteo.originalname}</td>`;
                break;
            case "password":
                nuevaFila += `<td class="celda ${val.name}">******</td>`;
                break;
            case "logico":
                nuevaFila += `<td class="celda ${val.name}">`;
                if (val.value == `on`) {
                    nuevaFila += `<input type=checkbox class"${val.name}" name="${val.name}"  checked disabled="disabled"/></td>`;
                } else {
                    nuevaFila += `<input type=checkbox class"${val.name}" name="${val.name}" disabled="disabled"/></td>`;
                }

                break;
            case "id":
            case "_id":
                nuevaFila += `<td class="celda ${val.name}">${posteo._id}</td>`;
                break;
            default:
                nuevaFila += `<td class="celda ${val.name}">${val.value}</td>`;
                break;
        }
    });
    nuevaFila += `</tr>`;
    let newFile = $(nuevaFila);

    $(`#t${id} tbody`).append(newFile);
    $(`#t${id} tbody`).append(input);

    $.each(objeto.atributos.oculto, (indice, value) => {
        $(`#t${id} tr.fila.${numeroFila} td.${value.nombre}`).addClass("oculto");
    });

    $.each(objeto.atributos.color, function (indice, value) {
        switch (indice) {
            case `azul`:
                $.each(value, function (i, v) {
                    $(`#t${id} tbody tr.fila.${numeroFila} td.${v.nombre}`).addClass(
                        "azul"
                    );
                });
                break;
            case `amarillo`:
                $.each(value, function (i, v) {
                    $(`#t${id} tbody tr.fila.${numeroFila} td.${v.nombre}`).addClass(
                        "amarillo"
                    );
                });
                break;
            case `verde`:
                $.each(value, function (i, v) {
                    $(`#t${id} tbody tr.fila.${numeroFila} td.${v.nombre}`).addClass(
                        "verde"
                    );
                });
                break;
        }
    });

    if (objeto.funcionesPropias.consultaArr) {
        consultaPest = [];
        for (var l = 0; l < objeto.pestanas.totales.length; l++) {
            $.ajax({
                type: "get",
                async: false,
                url: `/${objeto.pestanas.totales[l]}`,

                success: function (data) {

                    consultaPest.push(data);

                },
                error: function (error) {
                    console.log(error);
                },
            });
        }

        $.each(objeto.funcionesPropias.consultaArr, function (indice, value) {
            value(objeto, id, consultaPest);
        });
    }

    let usuario = $(`#t${id} tbody input.username`).val();
    let fecha = moment(Date.now()).format("L");

    $(`#t${id} tbody input`).val(``);
    $(`#t${id} tbody input`).removeClass(`validado`);
    $(`#t${id} tbody select.select`).val("");
    $(`#t${id} tbody select.select,
       #t${id} tbody label.adjunto`).removeClass(`validado`);
    $(`#t${id} tbody select.select,
      #t${id} tbody label.adjunto`).attr(`validado`, false);

    $(`#t${id} tbody input.username`).val(usuario);
    $(`#t${id} tbody input.date`).val(fecha);
    $(`#t${id} tbody input.origen`).val(objeto.pest);
    $(`#t${id} tbody label.adjunto`).text(`Adjunto`);

    $.each(objeto.validaciones, (indice, value) => {

        $(`#t${id} tbody input.${value.nombre}`).attr(`validado`, false)
    })
    $.each(lengthUnoSelect, (indice, value) => {
        $(`#t${id} input.${indice}`).val(value);
        $(`#t${id} input.${indice}`).prop(`readOnly`, true)
        $(`#t${id} input.${indice}`).addClass(`validado`);
        $(`#t${id} input.${indice}`).attr(`validado`, true);
    })
    $.each(objeto.atributos.valoresIniciales.string, function (indice, value) {
        $(`#t${id} input.${indice}`).val(value);
        $(`#t${id} input.${indice}`).attr(`validado`, true)
        $(`#t${id} input.${indice}`).addClass(`validado`)
    });
    $.each(objeto.atributos.valoresIniciales.select, function (indice, value) {

        $(`#t${id} select.${indice}`).val(value)
        $(`#t${id} select.${indice} option[value="${value}"]`).attr(`selected`, true)
        $(`#t${id} select.${indice}`).attr(`validado`, true)
        $(`#t${id} select.${indice}`).addClass(`validado`)

    })
    $.each(objeto.atributos.valoresIniciales.funcion, function (indice, value) {
        value(objeto, id);
    });

    let vistaPdf = "";

    $.each(objeto.atributos.vistaPrevia, (indice, value) => {
        vistaPdf = $(`#t${id} tr.fila:last td.celda.${value.nombre}`);

        $(`#t${id} td.celda.${value.nombre}`).addClass(`vistaPrevia`);
    });

    const vistaPrevia = function (e) {
        let src = $(e.target).attr(`src`);
        if (src != undefined) {
            $(`#vistaPrevia`).attr("src", src);
            $(`#canvas_container`).css("display", `flex`);
        }
    };

    $(`#t${id} td.idDesen,
       #t${id} td.filename,
       #t${id} td.originalname,
       #t${id} td.path`).addClass(`oculto`)

    $(vistaPdf).click(vistaPrevia);
};

let agregarRegistroEditado = function (id, objeto, fidecomisoSelec, enviarRegistroNuevo) {
    let input = $(`#t${id} tbody > tr:last`);

    let filaSeleccionada = $(`#t${id} tbody > tr.sel`);
    let numeroFila = $(`#t${id} tbody > tr.fila`).index(filaSeleccionada);

    let nuevaFila = "";
    nuevaFila += `<tr class="fila ${numeroFila} sel">`;

    $.each(objeto.atributos.names, (ind, val) => {
        switch (val.type) {
            case `date`:
            case `fecha`:
                let date = moment(enviarRegistroNuevo[val.nombre]).format("DD/MM/YYYY");
                nuevaFila += `<td class="celda ${val.nombre}">${date}</td>`;
                break;
            case `numero`:
            case "importe":
                let numero = new Intl.NumberFormat(["ban", "id"]).format(
                    enviarRegistroNuevo[val.nombre]
                );
                nuevaFila += `<td class="celda ${val.nombre}">${numero}</td>`;
                break;
            case "coleccionTotal":
                $.each(val.componentes, (indice, value) => {
                    switch (value.type) {
                        case `date`:
                        case `fecha`:
                            let date = moment(enviarRegistroNuevo[value.nombre]).format(
                                "DD/MM/YYYY"
                            );
                            nuevaFila += `<td class="celda ${val.nombre} ${value.nombre}">${date}</td>`;
                            break;
                        case `numero`:
                        case "importe":
                            let numero = new Intl.NumberFormat(["ban", "id"]).format(
                                enviarRegistroNuevo[value.nombre]
                            );
                            nuevaFila += `<td class="celda ${val.nombre} ${value.nombre}">${numero}</td>`;
                            break;
                        default:
                            nuevaFila += `<td class="celda ${val.nombre} ${value.nombre}">${enviarRegistroNuevo[value.nombre]
                                }</td>`;
                            break;
                    }
                });
                break;
            default:
                nuevaFila += `<td class="celda ${val.nombre}">${enviarRegistroNuevo[val.nombre]
                    }</td>`;
                break;
        }
    });

    nuevaFila += `</tr>`;
    let newFile = $(nuevaFila);

    filaSeleccionada.remove();

    if ($(`#t${id} tbody tr.fila.${numeroFila - 1}`).length == 0) {
        $(`#t${id} tbody tr:nth-child(2)`).after(newFile);
        $(`#t${id} tbody`).append(input);
    } else {
        $(`#t${id} tbody tr.fila.${numeroFila - 1}`).after(newFile);
    }

    $(`#t${id} tbody`).append(input);

    $.each(objeto.atributos.oculto, (indice, value) => {
        $(`#t${id} tbody tr.fila.${numeroFila} td.celda.${value.nombre}`).addClass("oculto");
    });
};
let eliminarRegistroTabla = function (id, objeto, fidecomisoSelec) {
    let filaSeleccionada = $(`#t${id} tbody > tr.sel`);

    filaSeleccionada.remove();
};
let editarRegistro = function (objeto, consultaArray, numeroForm, consulta) {
    let accion = objeto.accion;
    let names = objeto.atributos.modificar.names;
    let validaciones = objeto.validaciones;
    let pest = objeto.pest;
    let soloLectura = objeto.atributos.modificar.soloLectura;
    let number = objeto.atributos.number;
    let date = objeto.atributos.date;
    let eliminarAdjuntos = []

    let formu = "";
    formu += `<form method="PUT" action="/${accion}" id="myFormEdit${accion}${numeroForm}"></form>`;

    let formulario = $(formu);

    formulario.appendTo(`.tabs_contents_item.active`);

    $.each(names, function (indice, value) {
        let valor = "";
        let inp = "";
        let input = "";

        if (value.type == "coleccion") {
            $.each(value.componentes, (ind, val) => {
                valor = $(`tr.sel td.celda.${value.nombre}.${val.nombre}`).html();

                $(`tr.sel td.celda.${value.nombre}.${val.nombre}`).empty();

                inp = `<input class="edit ${value.nombre} ${val.nombre} ${numeroForm}" name="${val.nombre}" form="myFormEdit${accion}${numeroForm}"></input>`;

                input = $(inp);

                input.appendTo(`tr.sel td.celda.${value.nombre}.${val.nombre}`);

                switch (val.nombre) {
                    case "fecha":
                    case "fecha2":
                        $(`.edit.${value.nombre}.fecha.${numeroForm}`).prop("type", "date");
                        var ano = valor.slice(6);
                        var mes = valor.slice(3, 5);
                        var dia = valor.slice(0, 2);

                        $(`.edit.fecha`).val(`${ano}-${mes}-${dia}`);
                        break;
                    case "date":
                        var date = moment(Date.now()).format("L");
                        $(`.edit.date`).val(date);
                        break;
                    case "importeUsd":
                    case "tc":
                    case "importeArs":
                    case "importe":
                        let v = valor.replace(".", "");
                        let vn = v.replace(",", ".");
                        let valorNumerico = parseFloat(vn).toFixed(2);
                        //$(`.edit.${value}`).prop("type", "number");
                        $(`.edit.${value.nombre}`).val(valorNumerico);
                        break;
                    default:
                        $(`.edit.${value.nombre}.${val.nombre}.${numeroForm}`).val(valor);

                        break;
                }
            });
        } else {
            valor = $(`tr.sel td.celda.${value.nombre}`).html();
            $(`tr.sel td.celda.${value.nombre}`).empty();

            inp = `<input class="edit ${value.nombre} ${numeroForm}" name="${value.nombre}" form="myFormEdit${accion}${numeroForm}"></input>`;

            input = $(inp);

            input.appendTo(`tr.sel td.celda.${value.nombre}`);

            switch (value.nombre) {
                case "fecha":
                case "fecha2":
                    $(`.edit.fecha`).prop("type", "date");
                    var ano = valor.slice(6);
                    var mes = valor.slice(3, 5);
                    var dia = valor.slice(0, 2);

                    $(`.edit.fecha`).val(`${ano}-${mes}-${dia}`);
                    break;
                case "date":
                    var date = moment(Date.now()).format("L");
                    $(`.edit.date`).val(date);
                    break;
                case "importeUsd":
                case "tc":
                case "importeArs":
                case `importe`:
                case `importeTotal`:
                    let v = valor.replace(".", "");
                    let vn = v.replace(",", ".");
                    let valorNumerico = parseFloat(vn).toFixed(2);
                    $(`.edit.${value.nombre}`).val(valorNumerico);
                    break;
                case `password`:
                    let imgPassword = `<img class="ojoPassword tachado" src="/img/abm/ojoTachado.png">`;

                    $(imgPassword).appendTo($(`tr.sel td.celda.${value.nombre}`));
                    $(`#t${numeroForm} .edit.${value.nombre}`).val("******");
                    $(`#t${numeroForm} .edit.${value.nombre}`).attr(`type`, `password`);
                    break;
                case `logico`:

                    $(`#t${numeroForm} .edit.${value.nombre}`).attr(`type`, `checkbox`);
                    console.log(valor)

                    break;
                case `adjunto`:

                    let srcEdit = $(`#t${numeroForm} tr.sel td.celda.adjunto`).attr(`src`)
                    $(`.edit.${value.nombre}`).attr(`id`, `inadjuntoEdit${numeroForm}`);
                    $(`.edit.${value.nombre}`).val($(`#t${numeroForm} tr.sel td.celda.adjunto`).attr(`src`));
                    let label = `<div class="botonesAdj"><label for="in${value.nombre}Edit${numeroForm}" class="${value.nombre}">${valor}</label><div><img class="eliminarAdj"src="/img/iconos/principal/eliminarAdj.png" title="Eliminar adjunto"></div></div>`;

                    $(`#t${numeroForm} tr.sel td.celda.adjunto`).append(label);
                    $(`#t${numeroForm} tr.sel td.celda.adjunto`).removeAttr(`src`);
                    $(`#t${numeroForm} tr.sel td.celda.adjunto`).removeClass(`vistaPrevia`);
                    $(`.edit.${value.nombre}`).attr(`type`, `file`);

                    $(`#t${numeroForm} tr.sel td.celda.adjunto img`).click(function () {
                        let father = $(this).parent().parent().parent()


                        if (srcEdit != "") {
                            eliminarAdjuntos.push(srcEdit)
                        }

                        $(`label`, father).html(`Adjunto`);
                        //  $(`div.src`, father).attr(`src`, "");
                        $(`label`, father).removeClass("validado");
                        $(`label`, father).attr("validado", false);

                    })
                    break;
                case "username":
                    $(`.edit.${value.nombre}.${numeroForm}`).val(usu);

                    break;
                default:
                    $(`.edit.${value.nombre}.${numeroForm}`).val(valor);
                    break;
            }
        }

        $.each(validaciones, function (indice, value) {
            $(`.edit.${value.nombre}.${numeroForm}`).addClass("requerido");
            $(`.edit.${value.nombre}.${numeroForm}`).addClass("validado");
            $(`.edit.${value.nombre}.${numeroForm}`).attr("validado", "true");
        });
    });

    $.each(number, function (indice, value) {
        $(`.edit.${value.nombre}.${numeroForm}`).prop("type", "number");
    });

    $(`.edit.destino.${numeroForm}`).val(pest);
    $(`.edit.destino.${numeroForm}`).attr("name", `origen`);

    if (names.includes(`moneda`)) {
        if ($(`.edit.moneda.${numeroForm}`).val() == "Pesos") {
            $(`.edit.importeUsd.${numeroForm}`).prop("readonly", "true");
            $(`.edit.tc.${numeroForm}`).prop("readonly", "true");
        } else {
            $(`.edit.importeArs.${numeroForm}`).prop("readonly", "true");
        }
    }

    $(`.inputR.importeArs.${numeroForm},
           .inputR.importeusd.${numeroForm},
           .inputR.tc.${numeroForm}`).prop("disabled", "true");

    $.each(consultaArray, function (indice, value) {

        if (objeto.atributos.modificar.pestanas.includes(objeto.pestanas.totales[indice])
        ) {
            if (value.length > 1) {
                $(`.edit.${objeto.pestanas.totales[indice].nombre}.${numeroForm}`).attr(
                    "disabled",
                    "true"
                );

                var s = `<select class="select ${objeto.pestanas.totales[indice].nombre} ${numeroForm} requerido validado"  id="select${objeto.pestanas.totales[indice].nombre}${numeroForm}" name="${objeto.pestanas.totales[indice].nombre}" form="myFormEdit${accion}${numeroForm}" validado=true >`;
                s += `<option class="opciones" value=""></option>`;

                let clase = $(`input.edit.${objeto.pestanas.totales[indice].nombre}`);
                let valorSelect = clase.val();

                for (var i = 0; i < value.length; i++) {
                    if (value[i].habilitado == true || value[i].name == valorSelect) {
                        let show = "";
                        $.each(objeto.pestanas.totales[indice].key, (ind, val) => {
                            show += `${value[i][val]}`;
                        });

                        s += `<option class="opciones ${value[i].habilitado}" value="${value[i].name}">${show}</option>`;
                    }
                }
                s += `</select>`;

                let select = $(s);

                clase.css("display", "none");
                clase.val("");

                select.appendTo(
                    `tr.sel td.celda.${objeto.pestanas.totales[indice].nombre}`
                );

                select.val(valorSelect);
            } else {
                $(`.edit.${objeto.pestanas.totales[indice].nombre}.${numeroForm}`).val(
                    value
                );

                if (value[0].habilitado == true) {

                    let show = ""
                    $.each(objeto.pestanas.totales[indice].key, (ind, val) => {

                        show += `${value[0][val]}`
                    })

                    $(`.edit.${objeto.pestanas.totales[indice].nombre}.${numeroForm}`).val(show);
                    $(`.edit.${objeto.pestanas.totales[indice].nombre}.${numeroForm}`).prop("readonly", "true");
                    $(`.edit.${objeto.pestanas.totales[indice].nombre}.${numeroForm}`).attr("validado", "true");
                    $(`.edit.${objeto.pestanas.totales[indice].nombre}.${numeroForm}`).addClass("validado");
                } else {
                    $(`.edit.${objeto.pestanas.totales[indice].nombre}.${numeroForm}`).val("No hay valores habilitados");
                    $(`.edit.${objeto.pestanas.totales[indice].nombre}.${numeroForm}`).prop("readonly", "true");
                    $(`.edit.${objeto.pestanas.totales[indice].nombre}.${numeroForm}`).prop("disabled", "true");
                }
            }
        }
    });

    validarFormulario(objeto, numeroForm);
    formatoCeldas(objeto, numeroForm);

    $.each(objeto.funcionesPropias.cargar, function (indice, value) {
        value(objeto, numeroForm);
    });
    $.each(objeto.funcionesPropias.cargarDosAtributo, function (indice, value) {
        value[0](objeto, numeroForm, value[1], value[2]);
    });

    $.each(soloLectura, function (indice, value) {
        $(`.edit.${value.nombre}.${numeroForm}`).prop("readonly", "true");
        $(`select.${value.nombre}.${numeroForm}`).attr("disabled", "true");
    });

    return eliminarAdjuntos

};
let desabilitarRegistroEditando = function (objeto, memoriaValoreEditados) {
    let names = objeto.atributos.names;

    $.each(names, function (indice, value) {
        let valor = memoriaValoreEditados[indice];

        if (valor == "") {
            valor = $(`tr.sel select.${value.nombre}`).val();
        }

        $(`tr.sel input.${value.nombre}`).remove();
        $(`tr.sel select.${value.nombre}`).remove();

        if (value == "fecha") {
            var fecha = moment(valor).format("DD/MM/YYYY");

            $(`tr.sel td.celda.${value.nombre}`).html(fecha);
        } else {
            $(`tr.sel td.celda.${value.nombre}`).html(valor);
        }
    });
};
////////////   ENVIAR INFORMACION POR PRIMERA VEZ    //////////////
let enviarRegistroNuevo = function (id, lengthUnoSelect, individual, fidecomisoSelec, objeto) {

    let registroEnviado = $(`#myForm${objeto.accion}${id}`).serializeArray();
    let indiceAcopio = objeto.atributos.names.indexOf(acopio);
    let indiceAdjunto = objeto.atributos.names.indexOf(adjunto);
    let adjuntoFile = $(`#t${id} label.adjunto`).html();
    let desencadenateTriger = false;
    let desencadenateModifTriger = false;

    if (objeto.atributos.names.includes(acopio) && !$(`#t${id} input.acopio`).prop(`checked`)) {
        registroEnviado.splice(indiceAcopio, 0, {
            name: `acopio`,
            value: false,
        });
    }

    if (objeto.atributos.names.includes(adjunto)) {
        registroEnviado.splice(indiceAdjunto, 0, {
            name: `adjunto`,
            value: adjuntoFile,
        });
    }

    let file = new FormData($(`#myForm${objeto.accion}${id}`)[0]);
    let fileEvniar = $(`#myForm${objeto.accion}${id}`);

    let inputs = $(`.tabs_contents_item input.inputR, .tabs_contents_item input.form`);
    let barraCargar = "";

    let dessencadenanteForm = [];
    let desencadenanteModif = new Object();

    $.each(objeto.desencadena.condicionalUnBooleano, function (indice, value) {
        if ($(`#t${id} .inputR.${value.condicion.nombre}`).prop(`checked`)) {
            dessencadenanteForm.push(value.destino);
            desencadenateTriger = true;
        }
    });
    $.each(objeto.desencadena.principal, function (indice, value) {
        dessencadenanteForm.push(value);
        desencadenateTriger = true;
    });
    $.each(objeto.desencadena.desencadenaModif, (indice, value) => {
        desencadenanteModif[indice] = value;
        desencadenateModifTriger = true;
    });
    if (inputs.length > 0) {
        $.ajax({
            type: "POST",
            url: `/${objeto.accion}`,
            data: file,
            contentType: false,
            processData: false, // tell jQuery not to process the data
            beforeSend: function () {
                $(`#bf${id} .botonesForm .imgB.okfBoton`).css(`display`, `none`);
                $(`#bf${id} .botonesForm .progressBar`).css(`display`, `flex`);
                $(`#bf${id} .botonesForm .imgB`).css(`cursor`, `wait`);
                barraCargar = setInterval(progressBarFun, 80, id);
            },
            complete: function (data) { },
            success: function (response) {

                if (response.posteo != undefined) {

                    registroEnviado.push({ name: `idDesen`, value: response.posteo._id });
                    registroEnviado.push({ name: `filename`, value: response.posteo.filename }, { name: `originalname`, value: response.posteo.originalname }, { name: `path`, value: response.posteo.path });

                    if (desencadenateTriger == true) {
                        desencadenante(dessencadenanteForm, objeto, id, file, response.posteo._id);
                    }

                    if (desencadenateModifTriger == true) {
                        desencadenaModif(desencadenanteModif, objeto, id, false, fileEvniar, response.posteo._id);
                    }

                    agregarRegistro(id, lengthUnoSelect, objeto, fidecomisoSelec, registroEnviado, response.posteo);

                    $.each(objeto.numerador.global, (indice, value) => {
                        consultaNumer(value.name, value.filtro, id);
                    });

                    if (individual == "false") {
                        $(`#bf${id} .cartelErrorFront p`).html(response.mensaje);
                        $(`#bf${id} .cartelErrorFront`).css("display", "block");
                    } else {
                        $(`#formnumFidei${id} p`).html(0);
                    }

                    $(`#bf${id} .botonesForm .imgB.okfBoton`).css(`display`, `flex`);
                    $(`#bf${id} .botonesForm .progressBar`).css(`display`, `none`);
                    $(`#bf${id} .botonesForm .imgB`).css(`cursor`, `pointer`);
                    clearInterval(barraCargar);
                } else {

                    let key = Object.keys(response.keyValue)

                    $(`#bf${id} .cartelErrorFront p`).html(`El ${key[0]} ${response.keyValue[key[0]]} ya fue registrado`)
                    $(`#bf${id} .cartelErrorFront`).css("display", "block");
                    $(`#bf${id} .cartelErrorFront`).fadeOut(8000)

                    $(`#t${id} input.inputR.${key[0]}`).css(`background-color`, `rgb(199, 94, 94)`)

                    $(`#t${id} input.inputR.${key[0]}`).on(`focus`, function () {
                        $(this).css(`background-color`, `rgb(235, 233, 236)`)
                    })

                }
            },
            error: function (error) {
                /*
                 * Se ejecuta si la peticón ha sido erronea
                 * */

                console.log(error);
            },
        });
    }
};
const desencadenante = function (desencadena, objeto, numeroForm, fileData, id) {

    let file = fileData;
    file.set(`idDesen`, id);
    console.log(file)

    if (formularioIndAbm == false) {

        $.each(desencadena, (ind, val) => {
            $.ajax({
                type: "POST",
                url: `/${val}`,
                data: file,
                contentType: false,
                processData: false, // tell jQuery not to process the data
                success: function (response) {
                    return response.posteo;
                },
                error: function (error) {
                    /*
                     * Se ejecuta si la peticón ha sido erronea
                     * */
                    console.log(error);
                },
            });
        });
    } else {
        console.log(2)
        $.each(desencadena, (ind, val) => {

            $.ajax({
                type: "POST",
                url: `/${val}`,
                data: file,
                contentType: false,
                processData: false, // tell jQuery not to process the data
                success: function (response) { },
                error: function (error) {
                    /*
                     * Se ejecuta si la peticón ha sido erronea
                     * */
                    console.log(error);
                },
            });
        });
    }
};
////////////ENVIAR UPDATE//////////////
let enviarRegistroEditado = (id, objeto, fidecomisoSelec, enviarEditadoReconst, eliminarAdjunto) => {

    let inputs = $(`.tabs_contents_item input.edit`);

    let file = new FormData($(`#myFormEdit${objeto.accion}${id}`)[0]);

    let barraCargar = "";

    if (inputs.length > 0) {
        $.ajax({
            type: "put",
            url: `/${objeto.accion}`,
            data: file,
            contentType: false,
            processData: false, // tell jQuery not to process the data
            beforeSend: function () {
                $(`#bf${id} .botonesForm .imgB.okfBoton`).css(`display`, `none`);
                $(`#bf${id} .botonesForm .progressBar`).css(`display`, `flex`);
                $(`#bf${id} .botonesForm .imgB`).css(`cursor`, `wait`);
                barraCargar = setInterval(progressBarFun, 80, id);
            },
            complete: function () { },
            success: function (response) {

                if (response.posteo != undefined) {

                    agregarRegistroEditado(id, objeto, fidecomisoSelec, enviarEditadoReconst);

                    $(`#bf${id} .cartelErrorFront p`).html(response);
                    $(`#bf${id} .cartelErrorFront`).css("display", "block");

                    $(`#bf${id} .botonesForm .imgB.okfBoton`).css(`display`, `flex`);
                    $(`#bf${id} .botonesForm .progressBar`).css(`display`, `none`);
                    $(`#bf${id} .botonesForm .imgB`).css(`cursor`, `pointer`);


                    $.each(eliminarAdjunto, (inidce, value) => {
                        eliminarAdjunto(value)

                    })

                    clearInterval(barraCargar)
                } else {

                    let key = Object.keys(response.keyValue)

                    $(`#bf${id} .cartelErrorFront p`).html(`El ${key[0]} ${response.keyValue[key[0]]} ya fue registrado`)
                    $(`#bf${id} .cartelErrorFront`).css("display", "block");
                    $(`#bf${id} .cartelErrorFront`).fadeOut(8000)

                    $(`#t${id} input.inputR.${key[0]}`).css(`background-color`, `rgb(199, 94, 94)`)

                    $(`#t${id} input.inputR.${key[0]}`).on(`focus`, function () {
                        $(this).css(`background-color`, `rgb(235, 233, 236)`)
                    })

                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
};
let enviarRegistroEditadoDesenc = (objeto, numeroForm, value, file) => {


    if (formularioIndAbm == true) {

        let fileForm = new FormData($(`#f${objeto.accion}${numeroForm}`)[0]);
        $.ajax({
            type: "put",
            url: `/${value}Des`,
            data: fileForm,
            contentType: false,
            processData: false, // tell jQuery not to process the data
            beforeSend: function () { },
            complete: function () { },
            success: function () { },
            error: function (error) {
                console.log(error);
            },
        });
    } else {
        let fileAbm = new FormData(file[0]);
        $.ajax({
            type: "put",
            url: `/${value}Des`,
            data: fileAbm,
            contentType: false,
            processData: false, // tell jQuery not to process the data
            beforeSend: function () { },
            complete: function () { },
            success: function () { },
            error: function (error) {
                console.log(error);
            },
        });
    }
};
/////////////////////////////////////////////////////////////////////////////////////////////////
function active(contador) {
    $(`#p${contador}`).siblings().removeClass("active");
    $(`#bf${contador}`).siblings().removeClass("active");
    $(`#bf${contador}`).addClass("active");
    $(`#t${contador}`).siblings().removeClass("active");
}
/////////////////VALIDACION FORMULARIOS/////////////////////////////////////////////////
const validarFormulario = function (objeto, numeroForm) {

    let accion = objeto.accion;

    const validarCampo = (match, e) => {

        if (match.test(e.target.value)) {

            $(e.target).addClass("validado");
            $(e.target).attr("validado", true);

        } else {

            if (!$(e.target).is("[readonly]")) {
                $(e.target).removeClass("validado");
                $(e.target).attr("validado", false);
            }
        }

    };

    const validarCampoSelect = (e) => {
        let sel = e.target;
        let value = e.target.value;

        if (value.length > 0) {
            $(sel).addClass("validado");
            $(sel).attr("validado", true);
        } else {
            $(sel).removeClass("validado");
            $(sel).attr("validado", false);

        }
    };

    if ($(`#formulario${accion}${numeroForm}`).length > 0) {


        $.each(objeto.validaciones, (indice, value) => {


            $(`#formulario${accion}${numeroForm}`).on(`keyup`, `input.${value.nombre}`, function (e) {
                validarCampo(value.validacion.match, e)
            });
            $(`#formulario${accion}${numeroForm}`).on(`change`, `select`, validarCampoSelect);

        })
    } else {

        $.each(objeto.validaciones, (indice, value) => {

            $(`#t${numeroForm}`).on(`keyup`, `input.${value.nombre}`, function (e) {
                validarCampo(value.validacion.match, e)
            });
            $(`#t${numeroForm}`).on(`change`, `select`, validarCampoSelect);
        })
    }
};
/////////////////Eliminar Registro Definitivo/////////////////////////////////////////////////
let popUpEliminacion = function (pregunta, numeroForm, idRegistro, objeto, esForm, fidecomisoSelec, filaEliminar) {

    let eliminacion = `<div class="cartelEliminar ${numeroForm}"><h1> ¿ Desea eliminar ${pregunta} ?</h1>`;

    eliminacion += `<div class="respuestas">
    <div class="si${numeroForm}">SI</div> <div class="no${numeroForm}">NO</div>

    </div>
    </div>`;

    let el = $(eliminacion);

    el.appendTo(`#tablas`);

    $(`#tablas .no${numeroForm}`).on("click", function () {
        $(`.cartelEliminar.${numeroForm}`).remove();

        return false;
    });

    $(`#tablas .si${numeroForm}`).on("click", function () {
        $(`.cartelEliminar.${numeroForm}`).remove();

        eliminarRegistro(idRegistro, numeroForm, objeto, pregunta, fidecomisoSelec);

        $.each(objeto.desencadena.principal, function (indice, value) {
            eliminarRegistroDesencadenado(value, idRegistro);
        });

        $.each(objeto.desencadena.condicionalUnBooleano, function (indice, value) {
            eliminarRegistroDesencadenado(value.destino, idRegistro);
        });

        $.each(objeto.desencadena.desencadenaModif, (indice, value) => {
            $.each(value, (ind, val) => {
                eliminarRegistroDesencadenado(ind, idRegistro);
            });
        });

        if (esForm == true) {
            $(`#bf${numeroForm} .cartelErrorForm p`).html(`${pregunta} se ha eliminado`);
            $(`#bf${numeroForm} .cartelErrorForm`).css("display", "block");
        } else {
            $(`#bf${numeroForm} .cartelErrorFront p`).html(`${pregunta} se ha eliminado`);
            $(`#bf${numeroForm} .cartelErrorFront`).css("display", "block");
        }
        return true;
    });
};
let eliminarRegistro = function (idRegistro, id, objeto, pregunta, fidecomisoSelec) {
    $.ajax({
        type: "delete",
        url: `/${objeto.accion}`,
        data: `id=${idRegistro}`,
        beforeSend: function () { },
        complete: function () { },
        success: function (data) {

            console.log()
            eliminarRegistroTabla(id, objeto, fidecomisoSelec, idRegistro);

            $(`#formularioIndividual input.form,
               #formularioIndividual input.formColec,
               #formularioIndividual .select.form`).val("");

            $(`#formularioIndividual label.form`).html(`Adjunto`)

            $(`#formnum${id} p`).text("");

            $(`.form.username.${idRegistro}`).val(usu);
            var fecha = moment(Date.now()).format("L");

            $(`.form.date.${id}`).prop("readonly", "true");
            $(`.form.date.${id}`).val(fecha);

            $(`input.form.${id},
              #formularioIndividual input.formColec.${id},
               label.form.${id},
               #formularioIndividual .select.form`).attr(`disabled`, false);

            $(`input.form.${id},
               label.form.${id},
               #formularioIndividual .select.form`).removeClass(`disabled`);

            $.each(objeto.pestanas.totales, (indice, value) => {

                $(`#formularioIndividual input.${value.nombre}.${id}`).attr(`disabled`, `disabled`);
            })


            let tabla = $(`#tablaCol${objeto.accion}${id} tr`).slice(2)

            let tablaComp = tabla.slice(0, -1)

            tablaComp.remove()

            $(`#tablaCol${objeto.accion}${id} tr:last input`).attr(`disabled`, `disabled`)


            $.each(objeto.atributos.valoresIniciales.string, function (indice, value) {

                $(`#formularioIndividual input.${indice}`).val(value)
                $(`#formularioIndividual input.${indice}`).attr(`validado`, true)
                $(`#formularioIndividual input.${indice}`).addClass(`validado`)
            })
            $.each(objeto.atributos.valoresIniciales.select, function (indice, value) {

                $(`#formularioIndividual select.${indice}`).val(value)
                $(`#formularioIndividual select.${indice}`).attr(`validado`, true)
                $(`#formularioIndividual select.${indice}`).addClass(`validado`)

            })
            $.each(objeto.atributos.valoresIniciales.funcion, function (indice, value) {

                value(objeto, contador)
            })
        },
        error: function (error) {
            console.log(error);
        },
    });
};
let eliminarRegistroDesencadenado = function (value, idRegistro) {
    $.ajax({
        type: "delete",
        url: `/${value}Des`,
        data: { idDesen: idRegistro },
        beforeSend: function () { },
        complete: function () { },
        success: function () { },
        error: function (error) {
            console.log(error);
        },
    });
};
///////////////////////////////
/*let consultaNumeradorDesencadentante = function (accion) {
    $.ajax({
        type: "GET",
        url: `/${accion}Num`,
        beforeSend: function () { },
        complete: function () { },
        success: function (response) {
            let num = response[0].num + 1;
        },
        error: function (error) {   
            console.log(error);
        },
    });
};*/
const numeroconFiltro = function (objeto, numeroForm) {
    let accion = objeto.accion;

    const insertarNumero = function (e) {
        let father = $(this).parent().parent();
        let unidades = $(`#formularioIndividual select.${objeto.numerador.funcion[0].atributoFiltro.name}`).val() || $(`#t${numeroForm} select.${objeto.numerador.funcion[0].atributoFiltro.name}`).val()

        consultaNumer(objeto.numerador.funcion[0].name, objeto.numerador.funcion[0].filtro, numeroForm, unidades, father);
    };

    $(`#formulario${accion}${numeroForm} select.${objeto.numerador.funcion[0].atributoFiltro.name}, 
       #t${numeroForm} select.${objeto.numerador.funcion[0].atributoFiltro.name}`).change(insertarNumero)

};
const desencadenaModif = function (valor, objeto, numeroForm, editando, registroEnviado, idDesen) {

    if (editando == false) {

        $.each(valor.atributo, (indice, valor) => {
            let atributoDesen = `atributo`;
            let file = new FormData(registroEnviado[0]);
            file.set(`idDesen`, idDesen);
            file.set(`desen`, atributoDesen);

            $.each(valor.atributoOrigen, (ind, val) => {
                let valorOrigen = file.get(val.nombre);

                file.set(valor.atributoEnDestino[ind].nombre, valorOrigen);
            });

            $.ajax({
                type: "POST",
                url: `/${indice}`,
                data: file,
                contentType: false,
                processData: false, // tell jQuery not to process the data
                success: function (response) { },
                error: function (error) {
                    console.log(error);
                },
            });
        });

        $.each(valor.signoNumero, (indice, sigNume) => {
            let atributoDesen = `signoNumero`;
            let file = new FormData(registroEnviado[0]);
            file.set(`idDesen`, idDesen);
            file.set(`desen`, atributoDesen);

            $.each(sigNume, (ind, val) => {
                file.set(val.nombre, -parseFloat(file.get(val.nombre) || 0));
            });

            $.ajax({
                type: "POST",
                url: `/${indice}`,
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
            let file = new FormData(registroEnviado[0]);
            file.set(`idDesen`, idDesen);
            file.set(`desen`, atributoDesen);

            $.each(valor.numero, (ind, val) => {
                file.set(val.nombre, -parseFloat(file.get(val.nombre) || 0));
            });

            $.each(valor.atributoOrigen, (ind, val) => {
                let valorOrigen = file.get(val.nombre);

                file.set(valor.atributoEnDestino[ind].nombre, valorOrigen);
            });

            $.ajax({
                type: "POST",
                url: `/${indice}`,
                data: file,
                contentType: false,
                processData: false, // tell jQuery not to process the data
                success: function (response) { },
                error: function (error) {
                    console.log(error);
                },
            });
        });
    } else {

        let fileEnviado = $(`#myFormEdit${objeto.accion}${numeroForm}`);
        console.log(fileEnviado == [])

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
};
const actualizaDesecandenanteEditado = function (
    destino,
    objeto,
    filaSeleccionada,
    infoEnviar
) {
    let informacionEnviar = infoEnviar;

    $.each(objeto.atributos.number, (inidce, value) => {
        let nume = filaSeleccionada[value.nombre].replace(".", "");
        let numero = nume.replace(",", ".");

        informacionEnviar[value.nombre] =
            parseFloat(infoEnviar[value.nombre]) - numero;
    });

    $.ajax({
        type: "PUT",
        url: `/${destino}Modif  `,
        data: informacionEnviar,
        success: function (response) { },
        error: function (error) {
            console.log(error);
        },
    });
};
const actualizaDesecandenante = function (numeroForm, destino, accion) {
    $.ajax({
        type: "PUT",
        url: `/${destino}Act  `,
        data: $(`#myForm${accion}${numeroForm}`).serialize(),
        success: function (response) { },
        error: function (error) {
            console.log(error);
        },
    });
};
const consultaNumer = function (name, filtro, id, unidades, father) {
    if (filtro == false) {
        $.ajax({
            type: "GET",
            url: `/numeradores?name=${name}`,
            success: function (response) {
                if (response.length > 0) {
                    $(`#t${id} input.num`).val(response[0].num + 1);
                    $(`#formnum${id} input.form.num`).val(response[0].num + 1);
                    $(`#formnum${id} p`).html(response[0].num + 1);
                } else {
                    $(`#t${id} input.num`).val(1);
                    $(`#formnum${id} input.form.num`).val(1);
                    $(`#formnum${id} p`).html(1);
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    } else {
        let fidei = "";
        fidei = unidades || $(`#t${id} select.unidades option:selected`).val();

        $.ajax({
            type: "GET",
            url: `/numeradoresFiltro?name=${name}&unid=${fidei}`,
            success: function (response) {
                if (response.length > 0) {
                    if (father == undefined) {
                        $(`#t${id} input.num`).val(response[0].num + 1);
                    } else {
                        $(`input.num`, father).val(response[0].num + 1);
                    }

                    $(`#formnum${id} input.form.num`).val(response[0].num + 1);
                    $(`#formnum${id} p`).html(response[0].num + 1);
                } else {
                    $(`#t${id} input.num`).val(1);
                    $(`#formnum${id} input.form.num`).val(1);
                    $(`#formnum${id} p`).html(1);
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
}
const formatoCeldas = function (objeto, cont) {

    $.each(objeto.atributos.oculto, function (indice, value) {
        $(`#t${cont} td.${value.nombre}`).addClass("oculto");
        $(`#t${cont} th.${value.nombre}`).addClass("oculto");
        $(`#t${cont} td.${value.nombre} input.${value.nombre}`).addClass("oculto");
    });

    $.each(objeto.atributos.color, function (indice, value) {
        switch (indice) {
            case `azul`:
                $.each(value, function (i, v) {
                    $(`#t${cont} td.${v.nombre}`).addClass("azul");
                });
                break;
            case `amarillo`:
                $.each(value, function (i, v) {
                    $(`#t${cont} td.${v.nombre}`).addClass("amarillo");
                });

                let avisoAmarillo = `<div class="cartelAyuda amarillo"><p>Los items pueden tener mas de un valor de este tipo</p></div>`;
                let aa = $(avisoAmarillo);
                aa.appendTo(`#bf${cont}`);

                $(`td.celda.amarillo`).click(function () {
                    $(`#bf${cont} .cartelAyuda`).fadeToggle(1000);
                });
                break;
            case `verde`:
                $.each(value, function (i, v) {
                    $(`#t${cont} td.${v.nombre}`).addClass("verde");
                });

                let avisoVerde = `<div class="cartelAyuda verde"><p>Puede haber mas items</p></div>`;
                let av = $(avisoVerde);
                av.appendTo(`#bf${cont}`);

                $(`td.celda.verde`).click(function () {
                    $(`#bf${cont} .cartelAyuda`).fadeToggle(1000);
                });
                break;
        }
    });

    $.each(objeto.atributos.configAbm.with, (indice, value) => {
        $.each(value, (ind, val) => {
            $(`#t${cont} .${val.nombre}`).addClass(indice);
            $(`#formularioIndividual .${val.nombre}`).addClass(indice);
            $(`.tablaCompuesto.${cont} .form.${val.nombre}`).addClass(indice);
        });
    });
    $.each(objeto.atributos.desencadenado, (indice, value) => {
        let registros = $(`#t${cont} tbody > tr.fila`);

        $.each(registros, (ind, vall) => {
            if ($(`td.${value.nombre}`, vall).html() != "") {
                $(vall).addClass(`desencadenado`);
            }
        });
    });
    $.each(objeto.atributos.configAbm.formatoFunc, (indice, value) => {

        value[0](objeto, cont, value[1])

    });

};
const tipoAtributo = function (consulta, objeto) {

    let celdas = "";
    $.each(objeto.atributos.names, function (indice, value) {

        switch (value.type) {
            case "importe":
            case "numero":
                let numero = new Intl.NumberFormat(["ban", "id"]).format(
                    consulta[value.nombre]
                );
                celdas += `<td class="celda ${value.nombre}"> ${numero}</td>`;
                break;
            case "tipoCambio":
                if (consulta[value.nombre] == undefined) {
                    celdas += `<td class="celda ${value.nombre}"></td>`;
                } else {
                    let tc = new Intl.NumberFormat(["ban", "id"]).format(
                        consulta[value.nombre]
                    );
                    celdas += `<td class="celda ${value.nombre}"> ${tc}</td>`;
                }
                break;
            case `texto`:
            case `textoCompleto`:
                celdas += `<td class="celda ${value.nombre}">${consulta[value.nombre]
                    }</td>`;
                break;
            case `password`:
                celdas += `<td class="celda ${value.nombre}">******</td>`;
                break;
            case `adjunto`:

                if (consulta[value.nombre].path != "") {
                    let extensionArchivo = "";

                    if (Array.isArray(consulta[value.nombre].path)) {
                        extensionArchivo = getFileExtension(consulta[value.nombre].path[0]);
                    } else {
                        extensionArchivo = getFileExtension(consulta[value.nombre].path);
                    }

                    switch (extensionArchivo) {
                        case `pdf`:
                        case `png`:
                        case `jpg`:
                        case `jpeg`:
                        case `svg`:
                            celdas += `<td class="celda ${value.nombre}" src="${consulta[value.nombre].path}">${consulta[value.nombre].originalname}</td>`;
                            break;
                        case `xlsx`:
                        case `rtf`:
                        case `xls`:
                        case `docx`:
                        case `doc`:
                            celdas += `<td class="celda ${value.nombre}"><a href="${consulta[value.nombre].path}">${consulta[value.nombre].originalname}</a></td>`;
                            break;
                    }
                } else {
                    celdas += `<td class="celda ${value.nombre}" src="">Sin Adjunto</td>`;
                }


                break;
            case `date`:
                var date = moment(consulta[value.nombre]).format("DD/MM/YYYY");
                celdas += `<td class="celda ${value.nombre}">${date}</td>`;
                break;
            case `numerador`:
                celdas += `<td class="celda ${value.nombre}">${consulta[value.nombre]
                    }</td>`;
                break;
            case "coleccionTotal":
                $.each(value.componentes, function (ind, val) {
                    let valorColec = [];

                    if (consulta[value.nombre][ind] != undefined) {
                        valorColec = consulta[value.nombre][ind][0];

                    } else {
                        valorColec = "";
                    }


                    switch (val.type) {
                        case `numero`:
                        case "importe":
                            let numero = new Intl.NumberFormat(["ban", "id"]).format(
                                valorColec
                            );

                            celdas += `<td class="celda colec ${value.nombre} ${ind}">${numero}</td>`;
                            break;
                        case "referencia":
                        case `texto`:
                            celdas += `<td class="celda ${value.nombre} ${ind}">${valorColec}</td>`;
                            break;
                    }
                });
                break;
            case `logico`:

                if (consulta[value.nombre] == "on") {

                    celdas += `<td class="celda ${value.nombre}">
                    <input  type="checkbox" name="${value.nombre}" checked disabled="disabled">
                    </td>`;
                } else {
                    celdas += `<td class="celda ${value.nombre
                        }"><input type="checkbox" name="${value.nombre}" disabled="disabled"></td>`;
                }

                break;
            case `fecha`:
                if (consulta[value.nombre] == null) {
                    celdas += `<td class="celda ${value.nombre}"></td>`;
                } else {
                    let fecha = moment(consulta[value.nombre])
                        .add(1, "days")
                        .format("DD/MM/YYYY");
                    celdas += `<td class="celda ${value.nombre}">${fecha}</td>`;
                    break;
                }
        }
    });

    return celdas;
};
const verdepenOnAtributo = function (objeto, numeroForm, gatillo, atributo, atributoDos) {
    let check = $(`#t${numeroForm} input.form.${gatillo.nombre},
                    #t${numeroForm} input.inputR.${gatillo.nombre},
                    #formularioIndividual input.form.${gatillo.nombre}`);

    const ocultarMostrar = function () {
        if (formularioIndAbm == false) {
            if (
                $(`#t${numeroForm} input.form.${gatillo.nombre},
                   #t${numeroForm} input.fo.${gatillo.nombre},
                   #t${numeroForm} input.inputR.${gatillo.nombre}`).prop(`checked`)
            ) {
                $(`#t${numeroForm} input.form.${atributo.nombre},
                   #t${numeroForm} .fo.${atributo.nombre}`).removeClass(`oculto`);

                $(`#t${numeroForm} input.form.${atributo.nombre},
                   #t${numeroForm} .fo.${atributo.nombre},
                   #t${numeroForm} .inputR.${atributo.nombre}`).removeAttr("readonly");

                $(`#t${numeroForm} input.form.${atributoDos.nombre},
                   #t${numeroForm} .fo.${atributoDos.nombre},
                   #t${numeroForm} .inputR.${atributoDos.nombre}`).val(`Abierto`);
            } else {
                $(`#t${numeroForm} input.form.${atributo.nombre},
                   #t${numeroForm} .fo.${atributo.nombre}`).addClass(`oculto`);

                $(`#t${numeroForm} input.form.${atributo.nombre},
                   #t${numeroForm} .fo.${atributo.nombre},
                   #t${numeroForm} .inputR.${atributo.nombre}`).prop(
                    `readOnly`,
                    true
                );

                $(`#t${numeroForm} input.form.${atributo.nombre},
                   #t${numeroForm} .fo.${atributo.nombre},
                   #t${numeroForm} .inputR.${atributo.nombre}`).val("");

                $(`#t${numeroForm} input.form.${atributoDos.nombre},
                   #t${numeroForm} .fo.${atributoDos.nombre},
                   #t${numeroForm} .inputR.${atributoDos.nombre}`).val("");
            }
        } else {
            if (
                $(
                    `#formularioIndividual input.form.${gatillo.nombre}.${numeroForm}`
                ).prop(`checked`)
            ) {
                $(`#formularioIndividual .fo.${atributo.nombre},
                   #formularioIndividual input.form.${atributo.nombre}.${numeroForm}`).removeClass(
                    `oculto`
                );

                $(`#formularioIndividual .fo.${atributo.nombre},
                   #formularioIndividual input.form.${atributo.nombre}.${numeroForm}`).removeAttr(
                    "readonly"
                );

                $(
                    `#formularioIndividual input.form.${atributoDos.nombre}.${numeroForm}`
                ).val(`Abierto`);
            } else {
                $(`#formularioIndividual .fo.${atributo.nombre},
                   #formularioIndividual input.form.${atributo.nombre}.${numeroForm}`).addClass(
                    `oculto`
                );

                $(`#formularioIndividual .fo.${atributo.nombre},
                   #formularioIndividual input.form.${atributo.nombre}.${numeroForm}`).prop(
                    `readOnly`,
                    true
                );

                $(`#formularioIndividual .fo.${atributo.nombre},
                   #formularioIndividual input.form.${atributo.nombre}.${numeroForm}`).val(
                    ""
                );

                $(
                    `#formularioIndividual input.form.${atributoDos.nombre}.${numeroForm}`
                ).val("");
            }
        }
    };

    check.click(ocultarMostrar);
};
const ordenarAbm = function (consulta, numeroForm) {
    $(`#ordenAscendente`).click(function () {
        let registros = $(`#t${numeroForm} tbody > tr.fila`);
        let input = $(`#t${numeroForm} tbody > tr:last`);

        registros.sort((a, b) => {
            let valor1 = $(a)
                .children(`td.${objetivoClickMenuContextual}`)
                .html()
                .toLowerCase();
            let valor2 = $(b)
                .children(`td.${objetivoClickMenuContextual}`)
                .html()
                .toLowerCase();

            if (valor1 < valor2) {
                return -1;
            }
            if (valor1 > valor2) {
                return 1;
            }
            return 0;
        });

        $.each(registros, (indice, value) => {
            $(`#t${numeroForm} tbody`).append(value);
        });
        $(`#t${numeroForm} tbody`).append(input);
    });

    $(`#ordenDescendente`).click(function () {
        let registros = $(`#t${numeroForm} tbody > tr.fila`);
        let input = $(`#t${numeroForm} tbody > tr:last`);

        registros.sort((a, b) => {
            let valor1 = $(a)
                .children(`td.${objetivoClickMenuContextual}`)
                .html()
                .toLowerCase();
            let valor2 = $(b)
                .children(`td.${objetivoClickMenuContextual}`)
                .html()
                .toLowerCase();

            if (valor1 < valor2) {
                return 1;
            }
            if (valor1 > valor2) {
                return -1;
            }
            return 0;
        });

        $.each(registros, (indice, value) => {
            $(`#t${numeroForm} tbody`).append(value);
        });
        $(`#t${numeroForm} tbody`).append(input);
    });
};
const filtrarAbm = function (consulta, numeroForm, objeto) {
    $(`#filtroMenu`).click(function () {
        $(`#t${numeroForm} .filtro`).removeClass(`oculto`);

        $.each(objeto.atributos.oculto, (indice, value) => {
            $(`#t${numeroForm} td.${value.nombre}.filtro`).addClass(`oculto`);
        });

        const filtoTabla = function (e) {
            let valorBuscado = $(e.target).val().toLowerCase();
            let primerCaracter = valorBuscado.slice(0, 1);
            let filtrado = $(e.target).parent().parent().attr(`filtro`);
            let tipoFiltrado = "default";

            let registros = $(`#t${numeroForm} tbody > tr.fila`);
            let input = $(`#t${numeroForm} tbody > tr:last`);

            if (primerCaracter == ">") {
                $.each(objeto.atributos.date, (indice, value) => {
                    if (value.nombre == filtrado) {
                        tipoFiltrado = "fecha";
                    }
                });

                $.each(objeto.atributos.number, (indice, value) => {
                    if (value.nombre == filtrado) {
                        tipoFiltrado = "numero";
                    }
                });

                if (valorBuscado.includes("<")) {
                    let indice = valorBuscado.indexOf("<");

                    switch (tipoFiltrado) {
                        case `fecha`:
                            let mayorQueFecha = Date.parse(valorBuscado.slice(1, indice));
                            let menorQueFecha = Date.parse(valorBuscado.slice(indice + 1));

                            $.each(registros, (indice, value) => {
                                let valorFilaFecha = Date.parse(
                                    $(value).children(`td.${filtrado}`).html().toLowerCase()
                                );

                                if (
                                    valorFilaFecha > mayorQueFecha &&
                                    valorFilaFecha < menorQueFecha
                                ) {
                                    $(value).removeClass(`oculto${filtrado}`);
                                } else {
                                    $(value).addClass(`oculto${filtrado}`);
                                }
                            });
                            break;
                        case `numero`:
                            let mayorQueNumero = parseFloat(valorBuscado.slice(1, indice));
                            let menorQueNumero = parseFloat(valorBuscado.slice(indice + 1));

                            $.each(registros, (indice, value) => {
                                let valorFilaNumero = parseFloat(
                                    $(value)
                                        .children(`td.${filtrado}`)
                                        .html()
                                        .toLowerCase()
                                        .replace(".", "")
                                        .replace(",", ".")
                                );

                                if (
                                    valorFilaNumero > mayorQueNumero &&
                                    valorFilaNumero < menorQueNumero
                                ) {
                                    $(value).removeClass(`oculto${filtrado}`);
                                } else {
                                    $(value).addClass(`oculto${filtrado}`);
                                }
                            });
                            break;
                        default:
                            let mayorQue = parseFloat(valorBuscado.slice(1, indice));
                            let menorQue = parseFloat(valorBuscado.slice(indice + 1));

                            $.each(registros, (indice, value) => {
                                let valorFila = parseFloat(
                                    $(value).children(`td.${filtrado}`).html().toLowerCase()
                                );

                                if (valorFila > mayorQue && valorFila < menorQue) {
                                    $(value).removeClass(`oculto${filtrado}`);
                                } else {
                                    $(value).addClass(`oculto${filtrado}`);
                                }
                            });
                    }
                } else {
                    switch (tipoFiltrado) {
                        case `fecha`:
                            let valorBuscadoMenorFecha = Date.parse(valorBuscado.slice(1));

                            $.each(registros, (indice, value) => {
                                let valorFilaFecha = Date.parse(
                                    $(value).children(`td.${filtrado}`).html().toLowerCase()
                                );

                                if (valorFilaFecha > valorBuscadoMenorFecha) {
                                    $(value).removeClass(`oculto${filtrado}`);
                                } else {
                                    $(value).addClass(`oculto${filtrado}`);
                                }
                            });
                            break;
                        case `numero`:
                            let valorBuscadoMenorNumero = parseFloat(valorBuscado.slice(1));

                            $.each(registros, (indice, value) => {
                                let valorFilaNumero = parseFloat(
                                    $(value)
                                        .children(`td.${filtrado}`)
                                        .html()
                                        .toLowerCase()
                                        .replace(".", "")
                                        .replace(",", ".")
                                );

                                if (valorFilaNumero > valorBuscadoMenorNumero) {
                                    $(value).removeClass(`oculto${filtrado}`);
                                } else {
                                    $(value).addClass(`oculto${filtrado}`);
                                }
                            });

                            break;
                        default:
                            let valorBuscadoMenor = parseFloat(valorBuscado.slice(1));

                            $.each(registros, (indice, value) => {
                                let valorFila = parseFloat(
                                    $(value).children(`td.${filtrado}`).html().toLowerCase()
                                );

                                if (valorFila > valorBuscadoMenor) {
                                    $(value).removeClass(`oculto${filtrado}`);
                                } else {
                                    $(value).addClass(`oculto${filtrado}`);
                                }
                            });
                    }
                }
            } else if (primerCaracter == "<") {
                $.each(objeto.atributos.date, (indice, value) => {
                    if (value.nombre == filtrado) {
                        tipoFiltrado = "fecha";
                    }
                });

                $.each(objeto.atributos.number, (indice, value) => {
                    if (value.nombre == filtrado) {
                        tipoFiltrado = "numero";
                    }
                });

                if (valorBuscado.includes(">")) {
                    let indice = valorBuscado.indexOf(">");

                    switch (tipoFiltrado) {
                        case `fecha`:
                            let mayorQueFecha = Date.parse(valorBuscado.slice(1, indice));
                            let menorQueFecha = Date.parse(valorBuscado.slice(indice + 1));

                            $.each(registros, (indice, value) => {
                                let valorFilaFecha = Date.parse(
                                    $(value).children(`td.${filtrado}`).html().toLowerCase()
                                );

                                if (
                                    valorFilaFecha < mayorQueFecha &&
                                    valorFilaFecha > menorQueFecha
                                ) {
                                    $(value).removeClass(`oculto${filtrado}`);
                                } else {
                                    $(value).addClass(`oculto${filtrado}`);
                                }
                            });
                            break;
                        case `numero`:
                            let mayorQueNumero = parseFloat(valorBuscado.slice(1, indice));
                            let menorQueNumero = parseFloat(valorBuscado.slice(indice + 1));

                            $.each(registros, (indice, value) => {
                                let valorFilaNumero = parseFloat(
                                    $(value)
                                        .children(`td.${filtrado}`)
                                        .html()
                                        .toLowerCase()
                                        .replace(".", "")
                                        .replace(",", ".")
                                );

                                if (
                                    valorFilaNumero < mayorQueNumero &&
                                    valorFilaNumero > menorQueNumero
                                ) {
                                    $(value).removeClass(`oculto${filtrado}`);
                                } else {
                                    $(value).addClass(`oculto${filtrado}`);
                                }
                            });
                            break;
                        default:
                            let mayorQue = parseFloat(valorBuscado.slice(1, indice));
                            let menorQue = parseFloat(valorBuscado.slice(indice + 1));

                            $.each(registros, (indice, value) => {
                                let valorFila = parseFloat(
                                    $(value).children(`td.${filtrado}`).html().toLowerCase()
                                );

                                if (valorFila < mayorQue && valorFila > menorQue) {
                                    $(value).removeClass(`oculto${filtrado}`);
                                } else {
                                    $(value).addClass(`oculto${filtrado}`);
                                }
                            });
                    }
                } else {
                    switch (tipoFiltrado) {
                        case `fecha`:
                            let valorBuscadoMenorFecha = Date.parse(valorBuscado.slice(1));

                            $.each(registros, (indice, value) => {
                                let valorFilaFecha = Date.parse(
                                    $(value).children(`td.${filtrado}`).html().toLowerCase()
                                );

                                if (valorFilaFecha < valorBuscadoMenorFecha) {
                                    $(value).removeClass(`oculto${filtrado}`);
                                } else {
                                    $(value).addClass(`oculto${filtrado}`);
                                }
                            });
                            break;
                        case `numero`:
                            let valorBuscadoMenorNumero = parseFloat(valorBuscado.slice(1));

                            $.each(registros, (indice, value) => {
                                let valorFilaNumero = parseFloat(
                                    $(value)
                                        .children(`td.${filtrado}`)
                                        .html()
                                        .toLowerCase()
                                        .replace(".", "")
                                        .replace(",", ".")
                                );

                                if (valorFilaNumero < valorBuscadoMenorNumero) {
                                    $(value).removeClass(`oculto${filtrado}`);
                                } else {
                                    $(value).addClass(`oculto${filtrado}`);
                                }
                            });

                            break;
                        default:
                            let valorBuscadoMenor = parseFloat(valorBuscado.slice(1));

                            $.each(registros, (indice, value) => {
                                let valorFila = parseFloat(
                                    $(value).children(`td.${filtrado}`).html().toLowerCase()
                                );

                                if (valorFila < valorBuscadoMenor) {
                                    $(value).removeClass(`oculto${filtrado}`);
                                } else {
                                    $(value).addClass(`oculto${filtrado}`);
                                }
                            });
                    }
                }
            } else {
                $.each(registros, (indice, value) => {
                    let valorFila = $(value)
                        .children(`td.${filtrado}`)
                        .html()
                        .toLowerCase();

                    if (valorFila.includes(valorBuscado)) {
                        $(value).removeClass(`oculto${filtrado}`);
                    } else {
                        $(value).addClass(`oculto${filtrado}`);
                    }
                });
            }
        };
        $(`.busqueda`).keyup(filtoTabla);
    });

    $(`#quitarFiltroMenu, .closeFiltro`).click(function () {
        let registrosQuitar = $(`#t${numeroForm} tbody > tr.fila`);
        let titulosTablas = $(`#t${numeroForm} tbody tr:first`).children();

        $.each(titulosTablas, (indice, value) => {
            let valueFiltro = $(value).attr(`filtro`);

            $(registrosQuitar).removeClass(`oculto${valueFiltro}`);
        });

        $(`#t${numeroForm} .filtro`).addClass(`oculto`);
        $(`#t${numeroForm} input.busqueda`).val("");
    });
};
const nombreBotonAdjunto = function (objeto, numeroForm) {

    let fila = $(`#tablaCol${objeto.accion}${numeroForm} tr`)

    $(fila).on(`change`, `input, select`, actualizarPost)

    $(`#t${numeroForm} td   input.adjunto`).change(function () {
        let father = $(this).parent();

        let valorAdjunto = $(this).val();

        if (valorAdjunto == "") {
            $(`label.adjunto`, father).html("Adjunto");

            $(`label.adjunto, input.adjunto`, father).removeClass("validado");
            $(`label.adjunto, input.adjunto`, father).attr("validado", false);
        } else {
            $(`label.adjunto`, father).html(valorAdjunto);
            $(`label.adjunto, input.adjunto`, father).addClass("validado");
            $(`label.adjunto, input.adjunto`, father).attr("validado", true);

        }
    });

    $(`#formularioIndividual div.fo input.adjunto,
       #t${numeroForm} div.fo input.adjunto,
       #formularioIndividual div.fo input.adjuntoColeccion`).change(function () {

        let valorAdjunto = $(this).val();

        if (valorAdjunto == "") {
            $(this).siblings(`div.src`).html(`Sin Adjunto`);
            $(this).siblings(`label`).removeClass("validado");
            $(this).siblings(`label`).attr("validado", false);
        } else {
           
            let father = $(this).parent().parent()
            $(`div.src`, father).html(valorAdjunto);
            $(`label`, father).addClass("validado");
            $(`label`, father).attr("validado", true);
            $(`input.originalnameColec`, father).attr("disabled", "disabled");
            $(`input.filenameColec`, father).attr("disabled", "disabled");
        }
    });


};
const abrirAdjunto = function (objeto, numeroForm) {

    const vistaPrevia = function (e) {

        let src = $(e.target).attr(`src`);

        if (src != undefined && (!$(e.target).hasClass(`eliminarAdj`))) {
            $(`#vistaPrevia`).attr("src", src);
            $(`#canvas_container`).css("display", `flex`);
        }
    };

    $.each(objeto.atributos.vistaPrevia, (indice, value) => {


        $(`#t${numeroForm} td.celda.${value.nombre}`).addClass(`vistaPrevia`);
        $(`#t${numeroForm} td.celda.${value.nombre}.vistaPrevia`).click(vistaPrevia);
    });
};
//////////////funcion solo de acopio
const filtroRapido = function (objeto, numeroForm) {
    let filtroRapido = "";

    filtroRapido += `<div id=filtroRapido class=${objeto.atributos.filtroRapido.referencia.nombre}>`;

    $.each(objeto.atributos.filtroRapido.filtros, (indie, value) => {
        filtroRapido += `<div class="opcionFiltroRapido ${value}">${objeto.atributos.filtroRapido.titulos[indie]}</div>`;
    });

    filtroRapido += `</div>`;

    let filRapido = $(filtroRapido);

    $(`#bf${numeroForm} .progressBar`).after(filRapido);

    $(`#bf${numeroForm} .opcionFiltroRapido.Todos`).addClass(`botonActivo`);

    $(`#bf${numeroForm} .opcionFiltroRapido`).click(function () {
        $(this).addClass(`botonActivo`);
        $(this).siblings().removeClass(`botonActivo`);

        let registros = $(`#t${numeroForm} tbody > tr.fila`);

        let valBus = $(this).html();
        let filtrado = objeto.atributos.filtroRapido.referencia.nombre;
        let valorBuscado = valBus.slice(0, -1);

        if (valorBuscado == `Todo`) {
            valorBuscado = "";
        }

        if (valorBuscado == objeto.atributos.filtroRapido.titulos[0].slice(0, -1)) {
            valorBuscado = objeto.atributos.filtroRapido.filtros[0];
        }

        if (valorBuscado == objeto.atributos.filtroRapido.titulos[1].slice(0, -1)) {
            valorBuscado = objeto.atributos.filtroRapido.filtros[1];
        }

        $.each(registros, (indice, value) => {
            let valorFila = $(value).children(`td.${filtrado}`).html();

            if (valorFila.includes(valorBuscado)) {
                $(value).removeClass(`oculto${filtrado}`);
            } else {
                $(value).addClass(`oculto${filtrado}`);
            }
        });
    });
};
//////////////funcion solo de registro de Factura
const fechaInicialHoy = function (objeto, numeroForm) {
    let fecha = moment(Date.now()).format("YYYY-MM-DD");

    $(`#t${numeroForm} input.fecha`).val(fecha);
    $(`#t${numeroForm} input.fecha`).addClass(`validado`);
    $(`#t${numeroForm} input.fecha`).attr(`validado`, true);

    $(`#formularioIndividual input.fecha`).val(fecha);
    $(`#formularioIndividual input.fecha`).addClass(`validado`);
    $(`#formularioIndividual input.fecha`).attr(`validado`, true);
};
const eliminarDeshabilitar = function (objeto, numeroForm) {
    if (objeto.atributos.eliminar == false) {
        $(`#bf${numeroForm} .deleteBoton`).addClass(`oculto`);
        $(`#formularioIndividual .deleteBoton`).addClass(`oculto`);
    }
    if (objeto.atributos.deshabilitar == false) {
        $(`#bf${numeroForm} .desHabilitarBoton`).addClass(`oculto`);
        $(`#formularioIndividual .desHabilitarBoton`).addClass(`oculto`);
    } else {
        if (formularioIndAbm == false) {
            let tdHabilitado = $(`#t${numeroForm} td.habilitado`);

            $.each(tdHabilitado, (indice, value) => {
                let td = $(value).html();
                if (td == "false") {
                    $(value).parent().addClass(`desHabilitado`);
                }
            });
        } else {
            $(`#formularioIndividual div.cuadroForm`).removeClass(`desHabilitado`);
            let hab = $(`#formularioIndividual input.habilitado`).val();

            if (hab == "false") {
                $(`#formularioIndividual div.cuadroForm`).addClass(`desHabilitado`);
            }
        }
    }
};
const habilitarDesHabilitarRegistro = function (
    objeto,
    numeroForm,
    idRegistro,
    estadoRegistro
) {
    let registroaCambiar = {
        id: idRegistro,
        habilitado: estadoRegistro,
    };

    $.ajax({
        type: "delete",
        url: `/${objeto.accion}`,
        data: registroaCambiar,
        beforeSend: function () { },
        complete: function () { },
        success: function () {
            if (estadoRegistro == false) {
                $(`#t${numeroForm} tr.sel td.habilitado`).html("false");
                $(`#formularioIndividual input.habilitado`).val(false);
            } else {
                $(`#t${numeroForm} tr.sel td.habilitado`).html("true");
                $(`#formularioIndividual input.habilitado`).val(true);
            }

            $(`#t${numeroForm} tr.sel`).toggleClass(`desHabilitado`);
            $(`#formularioIndividual div.cuadroForm`).toggleClass(`desHabilitado`);
        },
        error: function (error) {
            console.log(error);
        },
    });
};
const lecturaUnoUOtro = function (objeto, numeroForm, atrUno, atrDos) {

    let inputLength = function () {

        let father = $(this).parent().parent()
        console.log(father)
        let atributoUno = $(`input.${atrUno.nombre}`, father)
        let atributoDos = $(`input.${atrDos.nombre}`, father)

        if ($(atributoUno).val().length > 0) {

            $(atributoDos).prop("readOnly", true);
            $(atributoDos).removeClass("requerido");
            $(atributoDos).val("");

        } else {
            atributoDos.removeAttr("readOnly");
            $(atributoDos).addClass("requerido");
            $(atributoDos).addClass("prueba");
        }

        if ($(atributoDos).val().length > 0) {
            atributoUno.prop("readOnly", true);
            atributoUno.removeClass("requerido");
            atributoUno.val("");
        } else {
            atributoUno.removeAttr("readOnly");
            atributoUno.addClass("requerido");
        }
    }

    let checkLengt = function () {

        console.log($(`#t${numeroForm} input.edit.${atrUno.nombre}`))
        if ($(`#formularioIndividual .formulario`).length == 0 && $(`table.tabs_contents_item.${numeroForm}`).length > 0 && $(`#t${numeroForm} input.edit.${atrUno.nombre}`).length > 0) {

            if ($(`#t${numeroForm} input.edit.${atrUno.nombre}`).val().length > 0) {

                $(`#t${numeroForm} input.edit.${atrDos.nombre}`).prop("readOnly", true)
                $(`#t${numeroForm} input.edit.${atrDos.nombre}`).removeClass("requerido")
            }

            if ($(`#t${numeroForm} input.edit.${atrDos.nombre}`).val().length > 0) {

                $(`#t${numeroForm} input.edit.${atrUno.nombre}`).prop("readOnly", true)
                $(`#t${numeroForm} input.edit.${atrUno.nombre}`).removeClass("requerido")
            }

        } else if ($(`#formularioIndividual .formulario`).length > 0) {

            if ($(`#formularioIndividual input.${atrUno.nombre}`).val().length > 0) {

                $(`#formularioIndividual input.${atrDos.nombre}`).prop("readOnly", true)
                $(`#formularioIndividual input.${atrDos.nombre}`).removeClass("requerido")
            }
            if ($(`#formularioIndividual input.${atrDos.nombre}`).val().length > 0) {

                $(`#formularioIndividual input.${atrUno.nombre}`).prop("readOnly", true)
                $(`#formularioIndividual input.${atrUno.nombre}`).removeClass("requerido")
            }
        }
    }

    if ($(`#formularioIndividual .formulario`).length == 0) {
        $(`#t${numeroForm} input.${atrUno.nombre},
           #t${numeroForm} input.${atrDos.nombre}`).change(inputLength);
    } else {
        $(`#formularioIndividual input.${atrUno.nombre},
           #formularioIndividual input.${atrDos.nombre}`).change(inputLength);
    }

    checkLengt()

};
const lecturaLengthBooleano = function (objeto, numeroForm, logico, atrDos) {

    let lecturaCondicionalBooleano = function () {

        let father = $(this).parent().parent();
        let atributo = $(this).attr(`name`)

        if ($(`input.${atributo}`, father).is(`:checked`)) {

            let atributoObjetivo = $(`select.${atrDos.nombre}`, father)

            if (atributoObjetivo == undefined) {
                $(`input.${atrDos.nombre}`, father).prop(`readonly`, true)
            } else {
                $(`select.${atrDos.nombre}`, father).attr(`disabled`, true)
                $(`select.${atrDos.nombre}`, father).removeClass(`requerido`)
            }

            $(father).removeClass(`sel`)
        } else {

            $(`input.${atrDos.nombre}`, father).removeAttr(`readonly`)
            $(`select.${atrDos.nombre}`, father).removeAttr(`disabled`)
            $(`select.${atrDos.nombre}`, father).addClass(`requerido`)

            $(father).removeClass(`sel`)
        }
    }

    if ($(`#formularioIndividual .formulario`).length == 0) {
        $(`#t${numeroForm} input.${logico.nombre}`).change(lecturaCondicionalBooleano);
    } else {
        $(`#formularioIndividual input.${logico.nombre}`).change(lecturaCondicionalBooleano);
    }
}



