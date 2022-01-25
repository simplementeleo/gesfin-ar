const calculartotalesCabecera = function (value, numeroForm, accion, target) {

    let total = 0;
    let totalForm = 0
    let fila = $(target).parent().parent()

    $.each(value.digitosPositivos, (ind, value) => {

        let digitosPositivosColec = $(`#t${numeroForm} input.${value.nombre}`)
        let digitosPositivosForm = $(`#formulario${accion}${numeroForm} input.${value.nombre}`)

        $.each(digitosPositivosColec, (ind, val) => {
            total += parseFloat($(val).val() || 0);
        })

        $.each(digitosPositivosForm, (ind, val) => {
            totalForm += parseFloat($(val).val() || 0);
        })
    })

    $.each(value.digitosNegativos, (ind, value) => {

        let digitosNegativosColec = $(`#t${numeroForm} input.${value.nombre}`)
        let digitosNegativosForm = $(`#formulario${accion}${numeroForm} input.${value.nombre}`)

        $.each(digitosNegativosColec, (ind, val) => {
            total -= parseFloat($(val).val() || 0);
        })

        $.each(digitosNegativosForm, (ind, val) => {
            totalForm -= parseFloat($(val).val() || 0);
        })
    })

    $(`#t${numeroForm} .renglon input.${value.total[0].nombre}`).val(parseFloat(total || 0))
    $(`input.${value.total[0].nombre}`, fila).val(parseFloat(total || 0))
    $(`#formulario${accion}${numeroForm} input.${value.total[0].nombre}`).val(parseFloat(totalForm || 0))
};

const calculartotalesColeccion = function (value, e) {

    let fila = $(e.target).parent().parent();
    let totalimporteSuma = 0;

    $.each(value.digitosPositivos, (ind, val) => {

        let importe = $(`input.${val.nombre}`, fila).val();
        totalimporteSuma += (parseFloat(importe) || 0) * parseFloat($(`input.cantidad`, fila).val() || 1);

    })

    $.each(value.digitosNegativos, (ind, val) => {

        let importe = $(`input.${val.nombre}`, fila).val();
        totalimporteSuma -= (parseFloat(importe) || 0) * parseFloat($(`input.cantidad`, fila).val() || 1);

    })

    $(`input.${value.total[0].nombre}`, fila).val(totalimporteSuma);
};

const calcularcotizacionYTotales = (objeto, numeroForm, e, monedaCompPesos) => {

    let accion = objeto.accion
    let importe = objeto.atributos.importe;
    let target = $(e.target)
    let ord = target.attr("ord")

    $.each(objeto.atributos.importe.totalizadorColeccion, (indice, value) => {
        calculartotalesColeccion(value, e)
    })

    $.each(objeto.atributos.importe.totalizadorCabecera, (indice, value) => {

        calculartotalesCabecera(value, numeroForm, accion, target)
    })

    if (monedaCompPesos == false) {

        let tc = $(`#formulario${objeto.accion}${numeroForm} input.tipoCambio`).val()

        $.each(importe.importeBase, (indice, value) => {

            if (ord != undefined && !(objeto.atributos.names.includes(value))) {

                $(`#formulario${objeto.accion}${numeroForm} .${importe.importeUsd[indice].nombre}.${numeroForm}.ord${ord}`).val((parseFloat($(`#formulario${objeto.accion}${numeroForm} .${value.nombre}.${numeroForm}.ord${ord}`).val()) || 0).toFixed(2));

                $(`#t${numeroForm} .${importe.importeUsd[indice].nombre}.${numeroForm}.ord${ord}`).val((parseFloat($(`.${value.nombre}.${numeroForm}.ord${ord}`).val()) || 0).toFixed(2));
                $(`#t${numeroForm} .form.${importe.importeUsd[indice].nombre}.${numeroForm}`).val((parseFloat($(`.form.${value.nombre}.${numeroForm}`).val()) || 0).toFixed(2));

                $(`#formulario${objeto.accion}${numeroForm} .form.${importe.importePesos[indice].nombre}.${numeroForm}.ord${ord}`).val("");
                $(`#t${numeroForm} .${importe.importePesos[indice].nombre}.${numeroForm}.ord${ord}`).val("");
                $(`#t${numeroForm} .form.${importe.importePesos[indice].nombre}.${numeroForm}`).val("");


            } else if (ord == undefined && !(objeto.atributos.names.includes(value))) {
                let trs = $(`#formulario${objeto.accion}${numeroForm} tr`)
                tr = trs.slice(0, -1)
                $.each(tr, (ind, val) => {

                    $.each(importe.importeBase, (indice, value) => {

                        $(`input.${importe.importeUsd[indice].nombre}.${numeroForm}`, val).val((parseFloat($(`input.${value.nombre}.${numeroForm}`, val).val()) || 0).toFixed(2));

                        $(`input.${importe.importePesos[indice].nombre}.${numeroForm}`, val).val("");

                    })
                })

            } else {

                $(`#formulario${objeto.accion}${numeroForm} input.${importe.importeUsd[indice].nombre}.${numeroForm}`).val((parseFloat($(`#formulario${objeto.accion}${numeroForm} .${value.nombre}.${numeroForm}`).val()) || 0).toFixed(2))
                $(`#t${numeroForm} .${importe.importeUsd[indice].nombre}.${numeroForm}`).val((parseFloat($(`.${value.nombre}.${numeroForm}`).val()) || 0).toFixed(2));

                $(`#formulario${objeto.accion}${numeroForm} input.${importe.importePesos[indice].nombre}.${numeroForm}`).val("")
                $(`#t${numeroForm} .${importe.importePesos[indice].nombre}.${numeroForm}`).val("")

            }
        })



    } else if (monedaCompPesos == true) {

        $.each(importe.importeBase, (indice, value) => {

            if (ord != undefined && !(objeto.atributos.names.includes(value))) {

                $(`#formulario${objeto.accion}${numeroForm} .${importe.importePesos[indice].nombre}.${numeroForm}.ord${ord}`).val((parseFloat($(`#formulario${objeto.accion}${numeroForm} .${value.nombre}.${numeroForm}.ord${ord}`).val()) || 0));

                $(`#t${numeroForm} .${importe.importePesos[indice].nombre}.${numeroForm}.ord${ord}`).val((parseFloat($(`.${value.nombre}.${numeroForm}.ord${ord}`).val()) || 0));
                $(`#t${numeroForm} .form.${importe.importePesos[indice].nombre}.${numeroForm}`).val((parseFloat($(`.form.${value.nombre}.${numeroForm}`).val()) || 0));

                $(`#formulario${objeto.accion}${numeroForm} .${importe.importeUsd[indice].nombre}.${numeroForm}.ord${ord}`).val("");
                $(`#t${numeroForm} .${importe.importeUsd[indice].nombre}.${numeroForm}.ord${ord}`).val("");
                $(`#t${numeroForm} .form.${importe.importeUsd[indice].nombre}.${numeroForm}`).val("");

            } else if (ord == undefined && !(objeto.atributos.names.includes(value))) {

                let trs = $(`#formulario${objeto.accion}${numeroForm} tr`)
                tr = trs.slice(0, -1)
                $.each(tr, (ind, val) => {

                    $.each(importe.importeBase, (indice, value) => {

                        $(`input.${importe.importePesos[indice].nombre}.${numeroForm}`, val).val((parseFloat($(`input.${value.nombre}.${numeroForm}`, val).val()) || 0));
                        $(`input.${importe.importeUsd[indice].nombre}.${numeroForm}`, val).val("");
                    })
                })

            } else {

                $(`#formulario${objeto.accion}${numeroForm} .${importe.importePesos[indice].nombre}.${numeroForm}`).val((parseFloat($(`#formulario${objeto.accion}${numeroForm} .${value.nombre}.${numeroForm}`).val()) || 0));
                $(`#t${numeroForm} .${importe.importePesos[indice].nombre}.${numeroForm}`).val((parseFloat($(`#t${numeroForm} .${value.nombre}.${numeroForm}`).val()) || 0));

                $(`#formulario${objeto.accion}${numeroForm} .${importe.importeUsd[indice].nombre}.${numeroForm}`).val("");
                $(`#t${numeroForm} .${importe.importeUsd[indice].nombre}.${numeroForm}`).val("");

            }
        })
    }
}

///////////////FUNCIONES TRIGER
const totalesBaseYMoneda = function (objeto, numeroForm, editando) {
    let accion = objeto.accion;
    let monedaCompPesos = true;

    const calcularcotizacionClick = function (e) {
        calcularcotizacionYTotales(objeto, numeroForm, e, monedaCompPesos)

    }

    const validarSelectMoneda = (e) => {

        validarCampoSelect(e.target, e.target.value);
    }

    const validarCampoSelect = (sel, value) => {

        if (value == "Dolar") {

            $(`#t${numeroForm} .tipoCambio.${numeroForm},
               #formularioIndividual .tipoCambio.${numeroForm}`).val(tc);

            $(`#t${numeroForm} .tipoCambio,
               #formularioIndividual .tipoCambio.${numeroForm}`).removeAttr("readonly");
            $(`#t${numeroForm} .tipoCambio,
               #formularioIndividual .tipoCambio.${numeroForm}`).addClass("validado");
            $(`#t${numeroForm} .tipoCambio,
               #formularioIndividual .tipoCambio.${numeroForm}`).attr("validado", "true");

            monedaCompPesos = false;

        } else if (value == "Pesos") {


            $(`#t${numeroForm} .tipoCambio.${numeroForm},
               #formularioIndividual .tipoCambio.${numeroForm}`).val("");
            $(`#t${numeroForm} .tipoCambio,
               #formularioIndividual .tipoCambio.${numeroForm}`).prop("readonly", "true");
            $(`#t${numeroForm} .tipoCambio,
               #formularioIndividual .tipoCambio.${numeroForm}`).attr("validado", "true");
            $(`#t${numeroForm} .tipoCambio,
               #formularioIndividual .tipoCambio.${numeroForm}`).addClass("validado");

            monedaCompPesos = true;
        }
    }

    //////////////Select Moneda Triger 
    $(`#t${numeroForm}`).on(`change`, `select.moneda`, validarSelectMoneda)
    $(`#formulario${accion}${numeroForm}`).on(`change`, `select.moneda`, validarSelectMoneda)
    $(`#t${numeroForm}`).on(`change`, `select.moneda`, calcularcotizacionClick)
    $(`#formulario${accion}${numeroForm}`).on(`change`, `select.moneda`, calcularcotizacionClick)
    //////////////input tc Triger 
    $(`#formulario${accion}${numeroForm}`).on(`keyup`, `input.tipoCambio`, calcularcotizacionClick);
    $(`#t${numeroForm}`).on(`keyup`, `input.tipoCambio`, calcularcotizacionClick)

    $.each(objeto.atributos.importe.importeBase, (indice, value) => {
        $(`#formulario${accion}${numeroForm}`).on(`keyup`, `input.${value.nombre}`, calcularcotizacionClick);
        $(`#t${numeroForm}`).on(`keyup`, `input.${value.nombre}`, calcularcotizacionClick)
    })
    $.each(objeto.atributos.importe.cantidad, (indice, value) => {
        $(`#formulario${accion}${numeroForm}`).on(`keyup`, `input.${value.nombre}`, calcularcotizacionClick);
        $(`#t${numeroForm}`).on(`keyup`, `input.${value.nombre}`, calcularcotizacionClick)
    })

}
