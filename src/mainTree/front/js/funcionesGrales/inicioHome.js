let obtenerTc = function () {
    let fechaHasta = $(`#fechaTextoHasta`).val()

    $.ajax({
        type: "GET",
        url: `/tipoCambioHoy?fechaHasta=${fechaHasta}`,
        beforeSend: function (data) { },
        complete: function (data) { },
        success: function (response) {

            if (response.length > 0) {
                let fechTc = new Date(response[0].fecha.replace(/-/g, '\/').replace(/T.+/, ''));

                let fechaTc = moment(fechTc).format('DD/MM/YYYY');

                $(`#fechaTipoCambio`).html(fechaTc);

                let ratioTc = response[0].tipoCambio;
                $(`#TipoCambioRatio`).html(ratioTc);
                $(`#TipoCambioRatio`).addClass(`modif`);

                tc = ratioTc;

                let ratioTcDos = response[0].tipoCambioAlternativo;
                $(`#TipoCambioRatioDos`).html(ratioTcDos);
                $(`#TipoCambioRatioDos`).addClass(`modif`);
            }

            setTimeout(function () {
                $(`#TipoCambioRatioDos,#TipoCambioRatio `).removeClass(`modif`)
            }, 3000);
        },
        error: function (error) {
            console.log(error);
        }
    })
}
let obtenerIcc = function () {

    let fechaHasta = $(`#fechaTextoHasta`).val()

    $.ajax({
        type: "GET",
        url: `/iccHoy?fechaHasta=${fechaHasta}`,
        beforeSend: function (data) { },
        complete: function (data) { },
        success: function (response) {

            if (response.length > 0) {
                let fechTc = response[0].fecha;
                let fechaTc = moment(fechTc).format('DD/MM/YYYY');
                $(`#fechaIcc`).html(fechaTc);

                let ratioTc = response[0].tipoCambio;
                $(`#IccRatio`).html(ratioTc);
                $(`#IccRatio`).addClass(`modif`);
            }

            setTimeout(function () {
                $(`#IccRatio`).removeClass(`modif`)
            }, 3000);

        },
        error: function (error) {
            console.log(error);
        }
    })
}
const insertarFecha = function () {

    let fecha = moment(Date.now()).format('YYYY-MM-DD');
    let fechaMes = moment(Date.now()).subtract(30, 'days').format('YYYY-MM-DD');

    $(`#fechaTextoMes`).val(fechaMes);
    $(`#fechaTextoHoy`).val(fecha);
}
const obtenerSaldo = function (value) {
    let fechaHasta = $(`#fechaTextoHasta`).val()
    let unidad = $(`#fideic input`).val()

    $.ajax({
        type: "GET",
        url: `/${value}Saldo?unidad=${unidad}&fechaHasta=${fechaHasta}`,
        success: function (response) {

            $(`#cajaBancosHome`).children().remove();
            let totalPesos = 0;
            let totalDolar = 0;

            $.each(response, function (value, indice) {
                let ars = new Intl.NumberFormat(["ban", "id"]).format(indice.totalArs);
                let usd = new Intl.NumberFormat(["ban", "id"]).format(indice.totalUsd);
                let signoArs = Math.sign(ars);
                let signoUsd = Math.sign(usd);

                tabla = `<tr>
            <th class="thDer cuerpo">${indice._id[0]}</th>
            <td class="arsHome modif signo${signoArs}">${ars}</td>
            <td class="usdHome modif signo${signoUsd}">${usd}</td></tr>;`

                totalPesos += parseFloat(indice.totalArs);
                totalDolar += parseFloat(indice.totalUsd)

                t = $(tabla);

                t.appendTo(`#cajaBancosHome`);

            })

            let totalArs = new Intl.NumberFormat(["ban", "id"]).format(totalPesos);
            let totalUsd = new Intl.NumberFormat(["ban", "id"]).format(totalDolar);
            let signoTotalArs = Math.sign(totalArs);
            let signoTotalUsd = Math.sign(totalUsd);

            tabla = `<tr>
              <th class="thDer total">Total</th>
              <th class="arsHome signo${signoTotalArs} total">${totalArs}</th>
              <th class="usdHome signo${signoTotalUsd} total">${totalUsd}</th></tr>;`

            t = $(tabla);

            t.appendTo(`#cajaBancosHome`);

            let fechaHastaTool = moment(fechaHasta).format(`DD-MM`)
            $(`#fechaHastView`).html(`Caja y Bancos al ${fechaHastaTool}`)

            setTimeout(function () {
                $(`#cajaBancosHome td`).removeClass(`modif`)
            }, 3000);


        },
        error: function (error) {
            console.log(error);
        }
    })
}
const pagoCobroPorRubro = function (objeto) {

    let unidad = $(`#fideic input`).val()
    let fechaDesde = $(`#fechaTextoDe`).val()
    let fechaHasta = $(`#fechaTextoHasta`).val()

    $.ajax({
        type: "GET",
        url: `/${objeto.accion}Rubro?unidad=${unidad}&fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`,
        success: function (response) {

            let totalPesos = 0;
            let totalDolar = 0;

            $(`#${objeto.accion}Home`).children().remove();

            $.each(response, function (value, indice) {

                let cuerpo = indice._id.name || indice._id;

                let ars = new Intl.NumberFormat(["ban", "id"]).format(indice.totalArs);
                let usd = new Intl.NumberFormat(["ban", "id"]).format(indice.totalUsd);
                let signoArs = Math.sign(ars);
                let signoUsd = Math.sign(usd);


                tabla = `<tr>
              <th class="thDer cuerpo">${cuerpo}</th>
              <td class="arsHome modif signo${signoArs}">${ars}</td>
              <td class="usdHome modif signo${signoUsd}">${usd}</td></tr>;`

                totalPesos += parseFloat(indice.totalArs);
                totalDolar += parseFloat(indice.totalUsd)

                t = $(tabla);
                t.appendTo(`#${objeto.accion}Home`);

            })

            let totalArs = new Intl.NumberFormat(["ban", "id"]).format(totalPesos);
            let totalUsd = new Intl.NumberFormat(["ban", "id"]).format(totalDolar);
            let signoTotalArs = Math.sign(totalArs);
            let signoTotalUsd = Math.sign(totalUsd);

            tabla = `<tr>
              <th class="thDer total">Total</th>
              <th class="arsHome signo${signoTotalArs} total">${totalArs}</th>
              <th class="usdHome signo${signoTotalUsd} total">${totalUsd}</th></tr>;`

            t = $(tabla);

            t.appendTo(`#${objeto.accion}Home`);

            let fechaHastaTool = moment(fechaHasta).format(`DD-MM`)
            let fechaDesdeTool = moment(fechaDesde).format(`DD-MM`)


            setTimeout(function () {
                $(`#${objeto.accion}Home td`).removeClass(`modif`)
            }, 3000);

        },
        error: function (error) {
            console.log(error);
        }
    })
}
const prestamosPendiente = function (accion) {
    let unidad = $(`#fideic input`).val()

    $.ajax({
        type: "GET",
        url: `/${accion}?unid=${unidad}`,
        success: function (response) {

            $(`#${accion}Home`).children().remove();

            $.each(response, function (indice, value) {
                if (value.saldo > 0) {

                    let claseMon = "";

                    let fecha = moment(value.fecha).format('L');

                    if (value.moneda == "Pesos") {
                        claseMon = "arsHome";

                    } else {
                        claseMon = "usdHome";
                    }
                    let montoTotal = new Intl.NumberFormat(["ban", "id"]).format(value.importeTotal);
                    let saldo = new Intl.NumberFormat(["ban", "id"]).format(value.saldo);


                    tabla = `<tr>
              <th class="thDer cuerpo">${value.name}</th>
              <td>${fecha}</td>
              <td>${value.unidades}</td>
              <td>${value.unidadesDestino}</td>
              <td>${value.moneda}</td>
              <td class="${claseMon}">${montoTotal}</td>
              <td class="${claseMon}">${saldo}</td></tr>;`

                    t = $(tabla);
                    t.appendTo(`#${accion}Home`);
                }

            })


        },
        error: function (error) {
            console.log(error);
        }
    })
}

obtenerTc();
obtenerIcc();
insertarFecha();
obtenerSaldo(`movimientoFinanciero`);
pagoCobroPorRubro(variablesIniciales.pagosRealizados)
pagoCobroPorRubro(variablesIniciales.cobrosRecibidos)
prestamosPendiente(`prestamosFideicomisos`)
let fechaHastaToolinicio = moment(Date.now()).format(`DD-MM`)
$(`#fechaHastView`).html(`Caja y Bancos al ${fechaHastaToolinicio}`)

$(`#fechaTextoHasta`).change(function () {

    obtenerSaldo(`movimientoFinanciero`);
    obtenerTc()
    obtenerIcc()
    pagoCobroPorRubro(variablesIniciales.pagosRealizados)
    pagoCobroPorRubro(variablesIniciales.cobrosRecibidos)

})
$(`#fechaTextoDe`).change(function () {

    pagoCobroPorRubro(variablesIniciales.pagosRealizados)
    pagoCobroPorRubro(variablesIniciales.cobrosRecibidos)
})