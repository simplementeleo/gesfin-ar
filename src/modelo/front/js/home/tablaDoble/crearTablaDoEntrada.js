const crearTablaDobleEntradaForm = function(numeroForm, objeto, fidecomisoSelec) {

    let consulta = ""

    let accion = objeto.accion;
    let columna = objeto.tablaDobleEntrada.columna;
    let tituloFila = objeto.tablaDobleEntrada.tituloFila;

    let filaContador = 0;
    let id = $(`#t${numeroForm} tr.sel td._id`).html();
    let usuario = $("#oculto").val();

    let pantalla = $(window).height();
    let container = $(`.container`).css("height");

    let heightContainer = container.slice(0, 2);
    let height = pantalla - (heightContainer * 4.3);

    var imgs = `<div class="com" id="com${accion}${numeroForm}">${iMailF}${iCalenF}${iExpoF}${iDeleteF}${iEditF}${iCruzF}${iOkF}
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
    //let dirT = $(`#t${numeroForm} tr.sel td.direccion`).html();

    let encabazado = `<div class="titulos ${numeroForm}"><h2>${nomT}</h2>
                       <h3>${dirT}</h3></div>`;

    let e = $(encabazado);


    e.appendTo(`#cabeceraForm`);

    switch (objeto.tablaDobleEntrada.type) {
        case`regular`:
        crearTablaDoble(numeroForm, objeto, height, usuario, id, filaContador)
        break;
        case `check`:
            crearTablaDobleInput(numeroForm, objeto, height, usuario, id, filaContador)
        break;

    }
    
    $(`#cabeceraForm #de${numeroForm} input.dobleEntrada.totales`).remove();

    $(`#formularioIndividual`).css("display", "flex");
    $(`#formularioIndividual2`).css("display", "flex");

    let fecha = moment(Date.now()).format('L');
    $(`.d.date.${numeroForm}`).val(fecha);

    //  totalesDobleEntrada(nomeDobleEn, numeroForm, columna);
    //let entro = 0
    $.getJSON(servidor + `/${objeto.accion}?unid=${fidecomisoSelec}`,
        function(data) {

            consulta = data;
            valoresDobleEntrada(consulta, columna, id)
            totalesFilas(numeroForm, objeto);

        })

    $(`#formularioIndividual .closeForm.${numeroForm}`).click(function() {

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
    $(`#formularioIndividual .okfBoton`).click(function(e) {

        e.preventDefault();

        enviarFormularioDoble(consulta, objeto, numeroForm, id, fidecomisoSelec, height, usuario, filaContador);
    });
    $(`#formularioIndividual .editBoton`).click(function() {

        editando = true;

        editarDobleEntrada(objeto, numeroForm);
    });
    $(`#formularioIndividual .deleteBoton`).click(function() {

        eliminarRegistroFormularioDoble(objeto, numeroForm, height, usuario, id, tituloColumna, filaContador)
    });
    $(`#formularioIndividual .cruzBoton`).click(function() {

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
}