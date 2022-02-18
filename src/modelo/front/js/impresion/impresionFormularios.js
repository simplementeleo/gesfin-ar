let crearimpresion = function(objeto, numeroForm) {

    let renglones = objeto.formInd.inputRenglones;
    let tabla = $(`#formulario${objeto.accion}${numeroForm}`);
    let formImp = "";
    let titulo = `<div class="tituloImpresion"><h1>${objeto.formInd.impresion.tituloFormulario}</h1></div>`;

    let tit = $(titulo)

    $(`.logoFormImpresion`).before(tit);

    $.each(renglones, (indice, value) => {

        let contenidoRenglon = $(`div.renglon.${indice} div`, tabla)

        formImp += `<div class="renglonImpresion ${indice} ${numeroForm}">`;

        if (value != "compuesto") {

            $.each(contenidoRenglon, (ind, val) => {

                let titulo = $(`h2`, val).html()

                let claseDiv = $(`input`, val).attr(`name`)
                let contenido = $(`input`, val).val();

                if (contenido == "") {
                    contenido = $(`select`, val).val();
                }

                if (contenido == undefined) {
                    contenido = "---";
                }

                formImp += `<div class="impresionAtributo ${claseDiv}">
                       <h2>${titulo}</h2>
                       <p>${contenido}</p></div>`;

            })
        } else {

            let valoresTab = $(`.tableCol.${numeroForm} tr`)
            let valoresTabla = valoresTab.slice(0, valoresTab.length - 1);

            formImp += `<table class="impresion"><tbody>`;
            formImp += `<tr>`;

            $.each(objeto.formInd.impresion.titulosImpresionCompuesto, (indice, value) => {

                formImp += `<th class="${value}">${value}</th>`;
            })
            $.each(valoresTabla, (indice, value) => {

                let tr = $(`td`, value)
                formImp += `<tr>`;

                $.each(tr, (indice, value) => {

                    let valorCelda = $(`input`, value).val()
                    let valorSelect = $(`select option:selected`, value).val()
                    let nameCelda = $(`input`, value).attr(`name`)

                    if ((valorCelda == "") && (valorSelect != undefined)) {

                        formImp += `<td class="${nameCelda}">${valorSelect}</td>`;

                    } else {
                        formImp += `<td class="${nameCelda}">${valorCelda}</td>`;
                    }

                })
                formImp += `</tr>`;
            })

            formImp += `</tr>`;
            formImp += `</tbody></table>`;
        }
        formImp += `</div>`
    })

    let formulImpre = $(formImp);

    formulImpre.appendTo(`#cuerpoImpresion`)

    $.each(objeto.formInd.impresion.ocultoImpresion, (indice, value) => {

        $(`div.impresionAtributo.${value.nombre}`).addClass(`oculto`)
        $(`td.${value.nombre}`).addClass(`oculto`)
        $(`th.${value.nombre}`).addClass(`oculto`)
    })

    $(`td.undefined`).addClass(`oculto`)

}

let crearimpresionFormIndi = function(objeto, numeroForm) {

    let renglones = objeto.formInd.inputRenglones;
    let tabla = $(`#t${numeroForm}`);
    let formImp = "";
    let titulo = `<div class="tituloImpresion"><h1>${objeto.formInd.impresion.tituloFormulario}</h1></div>`;

    let tit = $(titulo)

    $(`.logoFormImpresion`).before(tit);

    $.each(renglones, (indice, value) => {


        let contenidoRenglon = $(`div.renglon.${indice} div`, tabla)

        formImp += `<div class="renglonImpresion ${indice} ${numeroForm}">`;

        if (value != "compuesto") {

            $.each(contenidoRenglon, (ind, val) => {

                let titulo = $(`h2`, val).html()

                let claseDiv = $(`input`, val).attr(`name`)
                let contenido = $(`input`, val).val();

                if (contenido == "") {
                    contenido = $(`select`, val).val();
                }

                if (contenido == undefined) {
                    contenido = "---";
                }

                formImp += `<div class="impresionAtributo ${claseDiv}">
                       <h2>${titulo}</h2>
                       <p>${contenido}</p></div>`;

            })
        } else {

            let valoresTab = $(`.tableCol.${numeroForm} tr`)
            let valoresTabla = valoresTab.slice(0, valoresTab.length - 1);

            formImp += `<table class="impresion"><tbody>`;
            formImp += `<tr>`;

            $.each(objeto.formInd.impresion.titulosImpresionCompuesto, (indice, value) => {

                formImp += `<th class="${value}">${value}</th>`;

            })
            $.each(valoresTabla, (indice, value) => {


                let tr = $(`td`, value)
                formImp += `<tr>`;

                $.each(tr, (indice, value) => {
                    console.log(value)

                    let valorCelda = $(`input`, value).val()
                    let valorSelect = $(`select option:selected`, value).val()
                    let nameCelda = $(`input`, value).attr(`name`)

                    if ((valorCelda == "") && (valorSelect != undefined)) {

                        formImp += `<td class="${nameCelda}">${valorSelect}</td>`;

                    } else {
                        formImp += `<td class="${nameCelda}">${valorCelda}</td>`;
                    }

                })
                formImp += `</tr>`;
            })

            formImp += `</tr>`;
            formImp += `</tbody></table>`;
        }

        formImp += `</div>`

    })

    let formulImpre = $(formImp);

    formulImpre.appendTo(`#cuerpoImpresion`)

    $.each(objeto.formInd.impresion.ocultoImpresion, (indice, value) => {

        $(`div.impresionAtributo.${value.nombre}`).addClass(`oculto`)
        $(`td.${value.nombre}`).addClass(`oculto`)
        $(`th.${value.nombre}`).addClass(`oculto`)
    })

    $(`td.undefined`).addClass(`oculto`)

}

let formularioIndividual = function(objeto, numeroForm) {

    let imgs = `<div class="com" id="com${objeto.accion}${numeroForm}">${iMailF}${iExpoF}${iImprimir}  <div><div class="cartelErrorForm noShow">
                <p>Revisar los campos en rojo</p>
            </div>
        </div>
        </div>
        <div class="closeForm ${numeroForm}">+</div>`;

    let imagenes = $(imgs);
    imagenes.appendTo('#comanderaIndivImpresion');

    crearimpresion(objeto, numeroForm)

    $(`#impresionFormulario`).addClass("show")

    $('#impresionFormulario .closeForm').on('click',

        function() {

            $(`#impresionFormulario #com${objeto.accion}${numeroForm}`).remove();
            $(`#impresionFormulario`).removeClass("show");
            $(`#impresionFormulario div.tituloImpresion`).remove()
            $(`#impresionFormulario .closeForm.${numeroForm}`).remove()
            $(`#cuerpoImpresion div`).remove(``)
        }
    );

    $(`#documentoImpresion .okfImprimir`).click(function(e) {
        printJS({
            printable: 'impresionFinal',
            type: 'html',
            css: [`/css/home/formularioAbms.css`, `/css/form/impresionForm.css`],
            scanStyles: false,
            maxWidth: 800,
        })
    })
}

let imprimirDirecto = function(objeto, numeroForm) {

    $.when(crearimpresion(objeto, numeroForm)

        )
        .done(
            printJS({
                printable: 'impresionFinal',
                type: 'html',
                css: [`/css/home/formularioAbms.css`, `/css/form/impresionForm.css`],
                scanStyles: false,
                maxWidth: 800,
            })
        )
    $(`#cuerpoImpresion div`).remove(``)
    $(`#impresionFormulario div.tituloImpresion`).remove()
    $(`#impresionFormulario #com${objeto.accion}${numeroForm}`).remove();
}

let imprimirDirectoFormInd = function(objeto, numeroForm) {

    $.when(crearimpresionFormIndi(objeto, numeroForm)

        )
        .done(
            printJS({
                printable: 'impresionFinal',
                type: 'html',
                css: [`/css/home/formularioAbms.css`, `/css/form/impresionForm.css`],
                scanStyles: false,
                maxWidth: 800,
            })
        )
    $(`#cuerpoImpresion div`).remove(``)
    $(`#impresionFormulario div.tituloImpresion`).remove()
    $(`#impresionFormulario #com${objeto.accion}${numeroForm}`).remove();
}