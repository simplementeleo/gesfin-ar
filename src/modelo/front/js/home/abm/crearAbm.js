$('.menuSelectAbm').on('click ', this.id, function () {

    let objeto = variablesModelo[this.id] || variablesIniciales[this.id]
    let botonEditar = false;
    var memoriaValoreEditados = []
    let editando = false;
    let consultaArray = [];
    let filaSeleccionada = new Object
    let fidecomisoSelec = $(`#fideic input`).val() || "";
    let consulta = ""
    let seleccion = false;
    let eliminarAdjunto = []
    let lengthUnoSelect = new Object
    var m = Math.min.apply(null, limitePermiso)
    let fecha = new Date()
    fecha.setDate(fecha.getDate() - m)

    let numeroInterno = "";
    //Numero del Formulario
    let numeroForm = contador;

    var p = `<a id =p${contador} href="#seccion-${contador}" class="pestana active">${objeto.pest}<div class="close" id="${contador}">+</div></a>`; //definicion de pestaña

    var pestana = $(p);

    let imgs = `<div class="comand" id="bf${contador}">${iMail}${iExpo}${iDeshabilitar}${iDelete}${iEdit}${iCrear}${iDoble}${iCruz}${iOk}${progressBar}
         <div><div class="cartelErrorFront noShow">
                <p>Revisar los campos en rojo</p>
            </div>
        </div>
        ${ayuda}${video}
        </div>`;

    let imagenes = $(imgs);

    pestana.appendTo('#tabs_links'); //colgamos la pestaña final
    imagenes.appendTo('#comandera');

    let menutablaContext = `<div id="menuContextualTitulo">
            <ul>
                <li id="filtroMenu"><img src="/img/iconos/menuContextual/filtro.svg" alt="Filtrar" title="Filtrar" class="filtroMenu">Filtrar</li>
                <li id="quitarFiltroMenu"><img src="/img/iconos/menuContextual/quitarFiltro.svg" alt="Quitar Filtro" title="Quitar Filtro" class="filtroMenu">Quitar Filtro</li>
                <li id="ordenAscendente"><img src="/img/iconos/menuContextual/ordenAscendente.svg" alt="Orden Ascendente" title="Orden Ascendente" class="filtroMenu">Orden Ascendente</li>
                <li id="ordenDescendente"><img src="/img/iconos/menuContextual/ordenDescendente.svg" alt="Orden Descendente" title="Orden Descendente" class="filtroMenu">Orden Descendente</li>
            </ul>
        </div>
    
    <div id="menuContextualCuerpoTabla">
            <ul>
                <li class="menuEditar ${contador}"><img src="/img/abm/edit.svg" alt="Orden Descendente" title="Orden Descendente" class="filtroMenu">Editar</li>
                  <li class="menuCancelar ${contador}"><img src="/img/abm/cruz.svg" alt="Orden Descendente" title="Orden Descendente" class="filtroMenu">Cancelar Edit</li>
                  <li class="menuEliminar ${contador}"><img src="/img/abm/delete.svg" alt="Orden Descendente" title="Orden Descendente" class="filtroMenu">Eliminar</li>
                  <li class="menuCrear ${contador}"><img src="/img/abm/crear.svg" alt="Orden Descendente" title="Orden Descendente" class="filtroMenu">Formulario Individual</li>
            </ul>
            </div>
            <div id="menuContextualInput">
            <ul>
                <li class="menuValidacion ${contador}">Como valido ?</li>
                  
            </ul>
        </div>`;

    let menTabCon = $(menutablaContext);

    menTabCon.appendTo('#menuContextual');

    if (!permisObject.crear.includes(`${objeto.accion}`)) {
        $(`#bf${contador} .imgBarra.crearBoton`).attr(`segAtributo`, `none`)
    }
    if (!permisObject.eliminar.includes(`${objeto.accion}`)) {
        $(`#bf${contador} .imgBarra.deleteBoton`).attr(`segAtributo`, `none`)
    }
    if (!permisObject.editar.includes(`${objeto.accion}`)) {
        $(`#bf${contador} .imgBarra.editBoton`).attr(`segAtributo`, `none`)
    }

    $.getJSON(servidor + `/${objeto.accion}?unid=${fidecomisoSelec}`,
        function (data) {
            consulta = data;

            for (var l = 0; l < objeto.pestanas.totales.length; l++) {


                $.ajax({
                    type: "get",
                    async: false,
                    url: `/${objeto.pestanas.totales[l].nombre}`,
                    success: function (data) {

                        consultaArray.push(data);
                    },
                    error: function (error) {

                        console.log(error);
                    }
                })
            }

            crearTabla(contador, objeto, consulta);
            claseDobleEntrada(numeroForm, objeto);
            formatoCeldas(objeto, numeroForm);
            active(contador);
            ordenarAbm(consulta, numeroForm)
            filtrarAbm(consulta, numeroForm, objeto)
            abrirAdjunto(objeto, numeroForm)
            eliminarDeshabilitar(objeto, numeroForm)

            $.each(objeto.funcionesPropias.inicio, function (indice, value) {

                value(objeto, contador)
            })
            contador++;
            ultNum = consulta.length;

            if (consulta.length > 0) {

                let posicion = consulta.length - 1;

                acumuladoPesos = consulta[posicion].totalImporteArs;
                acumuladoUsd = consulta[posicion].totalImporteUsd;
                ultNum = consulta[posicion].num;

            } else {
                acumuladoPesos = 0;
                acumuladoUsd = 0;
                ultNum = 0;
            }
        });

    $('.pestana').on('click',

        function () {

            var i = $(this).attr("id"); //atrapo el id de la pestaña
            var id = i.slice(1); //Le saco la "p" del Id

            $(`#${i}`).addClass('active'); //asigno active a tablas
            $(`#bf${id}`).addClass('active');
            $(`#t${id}`).addClass('active'); //asigno active a pestaña
            $(`#${i}`).siblings().removeClass('active'); //Remuevo active de las pestaña de las que no hice el click
            $(`#bf${id}`).siblings().removeClass('active');
            $(`#t${id}`).siblings().removeClass('active'); //Remuevo active de las tablas de las que no hice el click
            $(`#de${numeroForm}`).siblings().removeClass('active');
        }
    );
    //Cerrar tabla y asignar atributo active a la tabla de la izquierda excepto si es la primera
    $('.close').on('click',

        function () {

            var id = $(this).attr("id"); //atrapo id de la que estoy cerrando
            var cl = $(this).parents(); //pestaá de la que estoy cerrando
            var cla = cl.prev(); //Atrapo pesatña anterior de la que estoy cerrando
            var clav = cl.next(); //Atrapo pesatña poesterior de la que estoy cerrando
            var clase = cl.attr("class"); //atrapo clase de la pestaña selecconada
            var linksParent = $('.tabs_links'); //Atrapado todas las pestañas
            var links = linksParent.find('a'); //Atrapo los "a" de las pestañas
            var linksIdfirst = $(links[0]).attr("id").slice(1); //Selecciona y limpio el id de la primera pestaña

            //Si la tabla selecciona tiene clase active es diferente a la primeta asigno active a la de izquierda
            if ((clase === "pestana active") && (id != linksIdfirst)) {

                cla.addClass('active');
                $(`#bf${id}`).prev().addClass('active');
                $(`#t${id}`).prev().addClass('active');
                $(`#${id}`).remove();
                $(`#p${id}`).remove();
                $(`#bf${id}`).remove();
                $(`#t${id}`).remove();

                //Si la tabla selecciona tiene clase active es igual a la primeta asigno active a la de derecha
            } else if ((clase === "pestana active") && (id == linksIdfirst)) {

                clav.addClass('active');
                $(`#bf${id}`).next().addClass('active');
                $(`#t${id}`).next().addClass('active');
                $(`#${id}`).remove();
                $(`#p${id}`).remove();
                $(`#bf${id}`).remove();
                $(`#t${id}`).remove();

                //si no tiene active elimino tabla sin afectar el active 
            } else {

                $(`#${id}`).remove();
                $(`#p${id}`).remove();
                $(`#bf${id}`).remove();
                $(`#t${id}`).remove();
            }
            $(`.cartelMovil`).remove()
            $(`.cartelErrorFront`).remove();
        }

    );
    $(`#bf${numeroForm} .crearBoton,
    .menuCrear.${numeroForm}`).click(function (e) {

        if (editando == true) {

            desabilitarRegistroEditando(objeto, memoriaValoreEditados)
        }

        $(`input.inputR.${numeroForm}`).val("");
        $(`input.inputR.${numeroForm}`).removeAttr('style')
        $(`#t${numeroForm} select.select`).val("");
        $(`input.inputR.${numeroForm}`).removeClass("validado");
        $(`input.inputR.${numeroForm}`).attr("validado", false);
        $(`#t${numeroForm} select.select`).removeClass("validado");
        $(`#t${numeroForm} select.select`).attr("validado", false);

        e.preventDefault()

        $.getJSON(servidor + `/${objeto.accion}?unid=${fidecomisoSelec}`,
            function (data) {
                consulta = data;

                crearFormulario(objeto, consultaArray, contador, numeroForm, fidecomisoSelec, consulta);

                if (losInput == true) {
                    $(`#t${numeroForm} td.inputTd`).addClass(`des`)
                    losInput = false;
                }
                botonEditar = false;
                editando = false;
            })
    });
    $(`#bf${numeroForm} .okBoton`).click(function (e) {

        e.preventDefault();
        let valid = [];

        $(`td.inputTd`).children(`.contError`).remove();

        $.each(objeto.validaciones, function (indice, value) {

            $(`#t${numeroForm} td.inputTd.${value.nombre}`).children("p").remove();

            if (editando == false) {

                valid.push($(`#t${numeroForm} td.inputTd .${value.nombre}.requerido`).attr("validado"));
                if ($(`td.inputTd .${value.nombre}.requerido`).attr("validado") == "false") {
                    let ancho = $(`#t${numeroForm} td.inputTd.${value.nombre}`).css(`width`)

                    let p = `<div class="contError" style="max-width: ${ancho}"><p>${value.validacion.texto}</p></div>`;

                    let texto = $(p);

                    texto.appendTo(`#t${numeroForm} td.inputTd.${value.nombre}`);
                }

            } else {

                valid.push($(`#t${numeroForm} td.celda .${value.nombre}.requerido`).attr("validado"));
                valid.push($(`#t${numeroForm} td.celda .select.${value.nombre}.requerido`).attr("validado"));

                if ($(`td.celda .${value.nombre}.${numeroForm}.requerido`).attr("validado") == "false") {
                    let p = `<div class="contError"><p>${textoExpresiones[value.nombre]}</p></div>`;

                    let texto = $(p);

                    texto.appendTo(`#t${numeroForm} tr.sel td.celda.${value.nombre}`);
                }
            }
        })

        if (valid.includes("false")) {

            $(`#bf${numeroForm} .cartelErrorFront p`).html("Revisar los campos en rojo")
            $(`#bf${numeroForm} .cartelErrorFront`).css("display", "block");

        } else {

            if (editando === true) {
                let file = $(`#myFormEdit${objeto.accion}${numeroForm}`)

                ///////////////////////////////////////////////////////////////
                let desencadenateModifTriger = false
                let desencadenanteModif = new Object;
                let fileEnviado = $(`myFormEdit${objeto.accion}${numeroForm}`)

                $.each(objeto.desencadena.desencadenaModif, (indice, value) => {
                    desencadenanteModif[indice] = value
                    desencadenateModifTriger = true
                })
                if (desencadenateModifTriger == true) {

                    desencadenaModif(desencadenanteModif, objeto, numeroForm, editando, fileEnviado)
                }
                ///////////////////////////////////////////////////////////////
                $.each(objeto.desencadena.principal, function (indice, value) {

                    enviarRegistroEditadoDesenc(objeto, numeroForm, value, file)

                })
                $.each(objeto.desencadena.condicionalUnBooleano, function (indice, value) {

                    enviarRegistroEditadoDesenc(objeto, numeroForm, value.destino, file)
                })

                let enviarEditadoReconst = new Object;

                $.when($.each(objeto.atributos.names, (indice, value) => {
                    if (value.type != `coleccionTotal`) {

                        let valor = ""
                        valor = $(`#t${numeroForm} input.edit.${value.nombre}`).val()
                        enviarEditadoReconst[value.nombre] = valor;

                        if (objeto.atributos.modificar.pestanas.includes(value)) {

                            valor = ($(`#t${numeroForm} .select.${value.nombre} option:selected`).val() || $(`#t${numeroForm} input.edit.${value.nombre}`).val()) || $(`#t${numeroForm} tr.sel td.${value.nombre}`).html()
                            enviarEditadoReconst[value.nombre] = valor;

                        }
                    } else {

                        $.each(value.componentes, (ind, val) => {

                            let valorColec = ""
                            valorColec = $(`#t${numeroForm} input.edit.${val.nombre}`).val() || $(`#t${numeroForm} tr.sel td.${val.nombre}`).html()
                            enviarEditadoReconst[val.nombre] = valorColec;

                            if (objeto.atributos.modificar.pestanas.includes(val)) {

                                let valorColec = ($(`#t${numeroForm} .select.${val.nombre} option:selected`).val() || $(`#t${numeroForm} input.edit.${val.nombre}`).val())
                                enviarEditadoReconst[val.nombre] = valorColec;
                            }
                        })

                    }
                })).done(enviarRegistroEditado(numeroForm, objeto, fidecomisoSelec, enviarEditadoReconst, eliminarAdjunto))

                botonEditar = false

                editando = false;
                memoriaValoreEditados = []

            } else if (losInput == true) {

                $.each(objeto.numerador, (ind, val) => {


                    $.each(val, (indice, value) => {

                        let numeradorObjeto = new Object;
                        numeradorObjeto[`name`] = value.name;

                        $.each(value.atributos, (i, v) => {

                            numeradorObjeto[v.nombre] = $(`#t${numeroForm} .select.${v.nombre} option:selected`).val() || $(`#t${numeroForm} .inputR.${v.nombre}`).val();

                        })
                        if (value.filtro == true) {
                            insertarNumerador(numeradorObjeto)
                        } else {

                            insertarNumeradorGlobal(numeradorObjeto)
                        }
                    })
                })

                $.each(objeto.acumulador, function (indice, value) {

                    let acumuladorVar = new Object;

                    if ($(`#t${numeroForm} .inputR.${value.nombre}`).val() == "") {
                        acumuladorVar[value] = $(`#t${numeroForm} .select.${value.nombre} option:selected`).val();
                    } else {
                        acumuladorVar[value] = $(`#t${numeroForm} .inputR.${value.nombre}`).val();
                    }

                    registroAcumulador(indice, acumuladorVar)
                })

                let individual = "false";
                enviarRegistroNuevo(numeroForm, lengthUnoSelect, individual, fidecomisoSelec, objeto, consultaArray);
                botonEditar = false;
                memoriaValoreEditados = []

            } else {

                $(`.cartelErrorFront p`).html("No hay resgistros para enviar")
                $(`#bf${numeroForm} .cartelErrorFront`).css("display", "block");

            }
        }
    })
    $(`#bf${numeroForm} .desHabilitarBoton`).click(function (e) {

        if (editando == true) {
            $(`.cartelErrorFront p`).html("No se puede deshabilitar un registro en edición")
            $(`.cartelErrorFront`).css("display", "block");
        } else {
            e.preventDefault();

            let idRegistro = $(`tr.sel td.id`).html();
            let estadoRegistro = $(`#t${numeroForm} tr.sel td.habilitado`).html();


            if (estadoRegistro == "false") {

                estadoRegistro = true

            } else {
                estadoRegistro = false

            }

            if (idRegistro == null) {
                idRegistro = $(`tr.sel td._id`).html();
            }

            habilitarDesHabilitarRegistro(objeto, numeroForm, idRegistro, estadoRegistro)
            seleccion = true;
        }

        if (seleccion == false) {
            $(`.cartelErrorFront p`).html("Seleccione un elemento a deshabilitar")
            $(`.cartelErrorFront`).css("display", "block");
        } else {
            seleccion = false
        }

    });
    $(`#bf${numeroForm} .deleteBoton,
       .menuEliminar.${numeroForm}`).click(function (e) {

        let fechaDos = ""

        if (objeto.permisolimite != undefined) {
            fechaDos = new Date($(`#t${numeroForm} tr.sel td.${objeto.permisolimite.nombre}`).html())
        }

        if ((fechaDos > fecha) || objeto.permisolimite == undefined) {

            let sel = $(`#t${numeroForm} tr.sel`);
            if (editando == true) {
                $(`.cartelErrorFront p`).html("No se puede eliminar un registro en edición")
                $(`.cartelErrorFront`).css("display", "block");

            } else if ($(sel).hasClass(`desencadenado`)) {
                let desencadenado = $(`tr.sel td.origen`).html()
                $(`.cartelErrorFront`).addClass(`fijo`)
                $(`.cartelErrorFront p`).html(`No se puede eliminar un registro desencadenado,
                                                      eliminar en ${desencadenado}`)
                $(`.cartelErrorFront`).css("display", "block");
            } else {
                e.preventDefault();

                let esForm = false;
                let seleccion = false;
                let pregunta = $(`tr.sel td.${objeto.key.atributo.nombre}`).html();

                let idRegistro = $(`tr.sel td.id`).html();


                if (idRegistro == null) {
                    idRegistro = $(`tr.sel td._id`).html();
                }

                const trs = document.querySelectorAll(`#t${numeroForm} tr`);

                trs.forEach((tr) => {
                    if (tr.classList.contains('sel')) {

                        filaSeleccionada = [];

                        $.each(objeto.atributos.names, (indice, value) => {
                            filaSeleccionada[value.nombre] = $(`#t${numeroForm} tr.sel td.${value.nombre}`).html()
                        })

                        popUpEliminacion(pregunta, numeroForm, idRegistro, objeto, numeroInterno, esForm, fidecomisoSelec)
                        seleccion = true;
                    }
                });

                if (seleccion == false) {
                    $(`.cartelErrorFront p`).html("Seleccione un elemento a eliminar")
                    $(`.cartelErrorFront`).css("display", "block");
                } else {
                    seleccion = false
                }
            }
        } else {
            $(`#bf${numeroForm} .cartelErrorFront p`).html(`No tiene permisos para eliminar registros anteriores a ${moment(fecha).format('DD-MM-YYYY')}`)
            $(`#bf${numeroForm} .cartelErrorFront`).css("display", "block");
        }
    });
    $(`#bf${numeroForm} .editBoton,
       .menuEditar.${numeroForm}`).click(function (e) {

        e.preventDefault();

        let fechaDos = ""

        if (objeto.permisolimite != undefined) {
            fechaDos = new Date($(`#t${numeroForm} tr.sel td.${objeto.permisolimite.nombre}`).html())
        }

        if ((fechaDos > fecha) || objeto.permisolimite == undefined) {

            let resulEdit = editRegistro(objeto, numeroForm, consultaArray, botonEditar, consulta)

            botonEditar = true;
            editando = true;
            filaSeleccionada = resulEdit.filaSeleccionada
            memoriaValoreEditados = resulEdit.memoriaValoreEditados


        } else {
            $(`#bf${numeroForm} .cartelErrorFront p`).html(`No tiene permisos para editar registros anteriores a ${moment(fecha).format('DD-MM-YYYY')}`)
            $(`#bf${numeroForm} .cartelErrorFront`).css("display", "block");
        }
    });
    if (permisObject.editar.includes(`${objeto.accion}`)) {
        $("body").on('dblclick', `#t${numeroForm} td.celda`, function (e) {
            e.preventDefault();

            let sel = $(this).parent();
            sel.addClass(`sel`)

            let fechaDos = ""

            if (objeto.permisolimite != undefined) {
                fechaDos = new Date($(`#t${numeroForm} tr.sel td.${objeto.permisolimite.nombre}`).html())
            }
            if ((fechaDos > fecha) || objeto.permisolimite == undefined) {

                let resulEdit = editRegistro(objeto, numeroForm, consultaArray, botonEditar, consulta)
                botonEditar = true;
                editando = true;
                filaSeleccionada = resulEdit.filaSeleccionada
                memoriaValoreEditados = resulEdit.memoriaValoreEditado

            } else {
                $(`#bf${numeroForm} .cartelErrorFront p`).html(`No tiene permisos para editar registros anteriores a ${moment(fecha).format('DD-MM-YYYY')}`)
                $(`#bf${numeroForm} .cartelErrorFront`).css("display", "block");
            }

        })
    }
    $(`#bf${numeroForm} .cancelBoton,
    .menuCancelar.${numeroForm}`).click(function (e) {

        if (editando == true) {

            desabilitarRegistroEditando(objeto, memoriaValoreEditados)
            botonEditar = false;
            editando = false;

        } else {
            $(`input.inputR.${numeroForm}`).val("");
            $(`select.select`).val("");
            $(`input.inputR.${numeroForm}`).removeClass("validado");
            $(`input.inputR.${numeroForm}`).removeClass("requerido");
            $(`input.inputR.${numeroForm}`).attr("validado", false);
            $(`select.select`).removeClass("validado");
            $(`select.select`).attr("validado", false);
            $(`input.inputR.${numeroForm}`).prop("readOnly", true);
            $(`select.select`).remove();
            $(`#t${numeroForm} .inputTd`).addClass("des");
            $(`input.inputR.${numeroForm}`).css("display", "block");

            $(`#bf${numeroForm} .cartelErrorFront p`).remove()
            $(`#bf${numeroForm} .cartelErrorFront`).css("display", "none");
            $(`#t${numeroForm} td.inputTd div.contError`).remove()

        }
    });
    $(`#bf${numeroForm} .dobleBoton`).click(function (e) {

        e.preventDefault();

        let sel = $(`#t${numeroForm} tr.sel`);

        if (botonEditar == false) {
            if (sel.length > 0) {

                crearTablaDobleEntradaForm(numeroForm, objeto, fidecomisoSelec);
            } else {
                $(`#bf${numeroForm} .cartelErrorFront p`).html("Seleccione un registro")
                $(`#bf${numeroForm} .cartelErrorFront`).css("display", "block");
            }
        } else {
            $(`#bf${numeroForm} .cartelErrorFront p`).html("No se puede abrir tabla doble con un registro en edición")
            $(`#bf${numeroForm} .cartelErrorFront`).css("display", "block");
        }

    });
    $(`#bf${numeroForm} .ayuda`).click(function (e) {

        e.preventDefault();
        crearAyuda(objeto, numeroForm);

    });
    $(`#bf${numeroForm} .video`).click(function () {

        let src = objeto.atributos.videoTutorial;

        $(`#videoTutorialDiv`).addClass(`show`)
        $(`#videoTutorial`).attr("src", src)

    });
    $(`body`).on(`contextmenu`, `#t${numeroForm} .inputR.requerido`, function (e) {

        e.preventDefault();

        const atributo = objeto.atributos.names.find(atr => atr.nombre === this.name)

        $("#menuContextualInput").css({ 'display': 'block', 'left': e.pageX, 'top': e.pageY });

        $(`body`).on(`click`, `.menuValidacion`, function (e) {


            let div = `<div class="cartelMovil" style="left:${e.pageX}px; top:${e.pageY}px">${atributo.validacion.texto}</div>`
            let d = $(div)

            $(`body`).append(div);


        })
        $(`#t${numeroForm}`).click(function () {
            $(`.cartelMovil`).remove()
        })
        $(`#t${numeroForm}`).on(`contextmenu`, function () {
            $(`.cartelMovil`).remove()
        })



    })
    $("body").on('dblclick', `#t${numeroForm} .inputTd.des`, function (e) {

        losInput = true;
        formularioIndAbm = false;
        var usu = $("#oculto").val();
        var cont = $(this).attr("cont");

        $.each(objeto.numerador.global, (indice, value) => {

            consultaNumer(value.name, value.filtro, numeroForm);
        })

        e.stopPropagation();

        $(`td.inputTd p`).remove()


        $(this).removeClass("des");
        $(this).siblings("td").removeClass("des");

        //Valores iniciales de input tras doble click
        $(`.inputR.${cont}`).removeAttr("readonly");
        $(`.inputR.username.${cont}`).val(usu);
        $(`.inputR.destino.${cont}`).attr("name", `origen`);


        let fecha = moment(Date.now()).format('L');
        $(`.inputR.date.${cont}`).val(fecha);

        $.each(objeto.atributos.number, function (indice, value) {

            $(`.inputR.${value.nombre}.${cont}`).prop("type", "number");
        })
        $.each(objeto.atributos.date, function (indice, value) {

            $(`.inputR.${value.nombre}.${cont}`).prop("type", "date");
        })
        $.each(objeto.atributos.soloLectura, function (indice, value) {

            $(`.inputR.${value.nombre}.${cont}`).prop("readonly", "true");
        })
        $.each(objeto.atributos.oculto, function (indice, value) {

            $(`.inputR.${value.nombre}.${cont}`).addClass("oculto");
        })
        $.each(objeto.atributos.signo, function (indice, value) {

            if (indice == `signoPesos`) {
                $.each(value, function (i, v) {

                    $(`#t${cont} td.${value.nombre}`).addClass("signoPesos");
                    $(`#t${cont} th.${value.nombre}`).addClass("signoPesos");
                    $(`#t${cont} td.${value.nombre} input.${value.nombre}`).addClass("signoPesos");
                })
            } else if (indice == `signoUsd`) {

                $.each(value, function (i, v) {

                    $(`#t${cont} td.${value.nombre}`).addClass("signoUsd");
                    $(`#t${cont} th.${value.nombre}`).addClass("signoUsd");
                    $(`#t${cont} td.${value.nombre} input.${value.nombre}`).addClass("signoUsd");
                })
            }
        })
        $.each(objeto.atributos.color, function (indice, value) {

            switch (indice) {
                case `azul`:
                    $.each(value, function (i, v) {
                        $(`.inputR.${v.nombre}.${cont}`).addClass("azul");
                    })
                    break
                case `amarillo`:
                    $.each(value, function (i, v) {
                        $(`.inputR.${v.nombre}.${cont}`).addClass("amarillo");
                    })
                    break
                case `verde`:

                    $.each(value, function (i, v) {
                        $(`.inputR.${v.nombre}.${cont}`).addClass("verde");
                    })
                    break
            }
        })
        //Agregar validacion si lo erequire
        $.each(objeto.validaciones, function (indice, value) {

            $(`.inputR.${value.nombre}.${cont}`).addClass("requerido");
            $(`.inputR.${value.nombre}.${cont}`).attr("validado", "false");
        })
        $.each(objeto.columna, function (indice, value) {

            $(`.inputR.${value.nombre}.${cont}`).addClass("doEntrada");
        })

        $.each(consultaArray, function (indice, value) {

            $(`#inputTd${objeto.pestanas.totales[indice].nombre}${cont}`).children("select");

            if (value.length > 1) {

                $(`.inputR.${objeto.pestanas.totales[indice].nombre}`).removeClass("requerido");
                $(`.inputR.${objeto.pestanas.totales[indice].nombre}`).attr("disabled", "true");
                var s = `<select class="select ${objeto.pestanas.totales[indice].nombre} requerido"  id = "select${objeto.pestanas.totales[indice].nombre}${cont}" name="${objeto.pestanas.totales[indice].nombre}" form="myForm${objeto.accion}${cont}"  validado=false >`;
                s += `<option class="opciones" value=""></option>`;

                for (var i = 0; i < value.length; i++) {

                    if (value[i].habilitado == true) {

                        let show = ""
                        $.each(objeto.pestanas.totales[indice].key, (ind, val) => {

                            show += `${value[i][val]} `
                        })

                        s += `<option class="opciones" value="${value[i].name}">${show.slice(0, -1)}</option>`;
                    }
                }

                s += `</select>`;

                var clase = $(`.inputR.${objeto.pestanas.totales[indice].nombre}.${cont}`);

                var select = $(s);

                clase.css("display", "none");

                select.appendTo(`#inputTd${objeto.pestanas.totales[indice].nombre}${cont}`);

            } else if (value.length == 0) {

                $(`.inputR.${objeto.pestanas.totales[indice].nombre}.${cont}`).val("Cargar valor referencia");
                $(`.inputR.${objeto.pestanas.totales[indice].nombre}.${cont}`).prop("readonly", "true");
                $(`.inputR.${objeto.pestanas.totales[indice].nombre}.${cont}`).prop("disabled", "true");
            } else {
                if (value[0].habilitado == true) {

                    let show = ""
                    $.each(objeto.pestanas.totales[indice].key, (ind, val) => {

                        show += `${value[0][val]} `
                    })

                    lengthUnoSelect[objeto.pestanas.totales[indice].nombre] = show.slice(0, -1)

                    $(`.inputR.${objeto.pestanas.totales[indice].nombre}.${cont}`).val(show);
                    $(`.inputR.${objeto.pestanas.totales[indice].nombre}.${cont}`).prop("readonly", "true");
                    $(`.inputR.${objeto.pestanas.totales[indice].nombre}.${cont}`).attr("validado", "true");
                    $(`.inputR.${objeto.pestanas.totales[indice].nombre}.${cont}`).addClass("validado");
                } else {
                    $(`.inputR.${objeto.pestanas.totales[indice].nombre}.${cont}`).val("No hay valores habilitados");
                    $(`.inputR.${objeto.pestanas.totales[indice].nombre}.${cont}`).prop("readonly", "true");
                    $(`.inputR.${objeto.pestanas.totales[indice].nombre}.${cont}`).prop("disabled", "true");
                }
            }
        });

        validarFormulario(objeto, cont);

        $.each(objeto.atributos.deshabilitado, function (indice, value) {

            $(`.inputR.${value.nombre}.${cont}`).attr(`disabled`, "true");
            $(`#t${cont} .select.${value.nombre}`).attr(`disabled`, "true");

            $(`.inputR.${value.nombre}.${cont}`).removeClass("requerido");
            $(`#t${cont} .select.${value.nombre}`).removeClass("requerido");
        })

        $.each(objeto.funcionesPropias.cargar, function (indice, value) {
            value(objeto, cont)
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
        $.each(objeto.atributos.valoresIniciales.string, function (indice, value) {

            $(`#t${numeroForm} input.${indice}`).val(value)
            $(`#t${numeroForm} input.${indice}`).attr(`validado`, true)
            $(`#t${numeroForm} input.${indice}`).addClass(`validado`)

        })
        $.each(objeto.atributos.valoresIniciales.select, function (indice, value) {

            $(`#t${numeroForm} select.${indice} option[value="${value}"]`).attr(`selected`, true)
            $(`#t${numeroForm} select.${indice}`).attr(`validado`, true)
            $(`#t${numeroForm} select.${indice}`).addClass(`validado`)

        })
        $.each(objeto.atributos.valoresIniciales.funcion, function (indice, value) {

            value(objeto, numeroForm)
        })
        if (editando == true) {

            $.each(objeto.atributos.names, function (indice, v) {
                var valor = $(`tr.sel td.${v.nombre}`).html();
                memoriaValoreEditados.push(valor)
            })

            desabilitarRegistroEditando(objeto, memoriaValoreEditados)

            editando = false;
        }

    });
    $("#tabs_contents").on('click', `#t${numeroForm} td.celda`, function () {

        //e.stopPropagation();

        if (editando == false) {

            let padre = $(this).parent()

            if (event.ctrlKey) {

                padre.toggleClass("sel");
                if (permisObject.editar.includes(`${objeto.accion}`)) {

                    $(`#bf${numeroForm} .imgBarra.crearBoton`).attr(`segAtributo`, `none`)
                }

            } else {
                padre.toggleClass("sel");
                padre.siblings().removeClass("sel");

                if (padre.hasClass("sel")) {

                    $(`#bf${numeroForm} .imgBarra.crearBoton`).removeAttr(`segAtributo`)

                } else {

                    if (!permisObject.crear.includes(`${objeto.accion}`)) {
                        $(`#bf${numeroForm} .imgBarra.crearBoton`).attr(`segAtributo`, `none`)
                    }
                }
            }
        }
    });
    $("#tabs_contents").on('contextmenu', `#t${numeroForm} td.celda`, function () {

        //e.stopPropagation();

        if (editando == false) {

            let padre = $(this).parent()

            if (event.ctrlKey) {
                padre.toggleClass("sel");

            } else {
                padre.toggleClass("sel");
                padre.siblings().removeClass("sel");
            }
        }
    });

})