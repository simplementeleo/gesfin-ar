const enviarFormularioDoble = function (consulta, objeto, numeroForm, id, fidecomisoSelec, height, usuario, filaContador) {

    let accion = objeto.accion;
    let columna = objeto.tablaDobleEntrada.columna;

    $.ajax({
        type: "put",
        url: `/${accion}Doble`,
        data: $(`#dobleEntrada${accion}${numeroForm}`).serialize(),

        beforeSend: function () {
            $(`.audit.${numeroForm}`).remove();
            $(`#de${numeroForm}`).remove();
        },
        complete: function () { },
        success: function (response) {
         
            $(`.cartelErrorForm p`).html(response);
            $(`.cartelErrorForm`).css("display", "block");

            let fecha = moment(Date.now()).format('L');
            $(`.d.date.${numeroForm}`).val(fecha);

        },
        error: function (error) {
            console.log(error);
        }
    });

    $.ajax({
        type: "GET",
        url: `/${accion}`,
        success: function (data) {

            switch (objeto.tablaDobleEntrada.type) {
                case`regular`:
                crearTablaDoble(numeroForm, objeto, height, usuario, id, filaContador)
                break;
                case `check`:   
                    crearTablaDobleInput(numeroForm, objeto, height, usuario, id, filaContador)
                break;
        
            }

            valoresDobleEntrada(data, columna, id);
            totalesFilas(numeroForm, objeto)

        },
        error: function (error) {
            console.log(error);
        }
    });

}
const eliminarRegistroFormularioDoble = function (objeto, numeroForm, height, usuario, id, filaContador) {

    let accion = objeto.accion;
    let fila = objeto.tablaDobleEntrada.fila;
    let tituloFila = objeto.tablaDobleEntrada.tituloFila;
    let columna = objeto.tablaDobleEntrada.columna;
    let tituloColumna = objeto.tablaDobleEntrada.tituloColumna;

    $.ajax({
        type: "put",
        url: `/${accion}DobleEliminar`,
        data: $(`#dobleEntrada${accion}${numeroForm}`).serialize(),
        beforeSend: function () {
            $(`.audit.${numeroForm}`).remove();
            $(`#de${numeroForm}`).remove();
        },
        complete: function () { },
        success: function (response) {
            crearTablaDoble(numeroForm, accion, height, columna, titulosDobleEn, nomeDobleEn, usuario, id, tituloColumna, filaContador)

            let fecha = moment(Date.now()).format('L');
            $(`.d.date.${numeroForm}`).val(fecha);

            $(`.cartelErrorForm p`).html(response);
            $(`.cartelErrorForm`).css("display", "block");
        },
        error: function (error) {
            console.log(error);
        }
    });

    $.ajax({
        type: "GET",
        url: `/${accion}`,
        success: function (data) {

            valoresDobleEntrada(data, columna, id);
            totalesFilas(numeroForm, fila)

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

    if (objeto.tablaDobleEntrada.abm == true ) {

        $(`#bf${numeroForm} .dobleBoton`).addClass("show");
    }
}
const editarDobleEntrada = function (objeto, numeroForm) {

    let accion = objeto.accion;
    let columna = objeto.tablaDobleEntrada.columna;
    let nameDobleEn = objeto.tablaDobleEntrada.nameDobleEn;
    let nameSinTot = nameDobleEn.slice(0, nameDobleEn.length - 1);

    $.when($.each(columna, function (indice, value) {

        let fila = parseInt($(`#t${numeroForm} tr.sel td.${value.nombre}`).html());
        let clas = value.nombre;

        for (let m = 1; m <= fila; m++) {

            $.each(nameSinTot, function (indice, valueS) {

                let clasSeg = valueS.nombre;

                let valor = parseInt($(`#de${numeroForm} td.de.${clas}.${m}.${clasSeg}`).html());

                var inp = "";

                if (isNaN(valor)) {


                    inp += `<input class="dobleEntrada ${clas} ${clasSeg}" name="${clasSeg}" form="dobleEntrada${accion}${numeroForm}" ></input>`;

                } else {

                    inp += `<input class="dobleEntrada ${clas} ${clasSeg}" name="${clasSeg}" form="dobleEntrada${accion}${numeroForm}"value=${valor}></input>`;
                }

                let input = $(inp);
                $(`#de${numeroForm} td.de.${clas}.${m}.${clasSeg}`).html("");

                input.appendTo(`td.de.${clas}.${m}.${clasSeg}`);

            })
        }

    })).then(
        totalesDobleEn(numeroForm, objeto)
    )

    $(`#cabeceraForm #de${numeroForm} input.dobleEntrada`).addClass(`show`);

}
const calcularTotalCol = function () {
    let numFil = 0;

    $.each(columna, function (indice, value) {

        let fila = parseInt($(`#t${numeroForm} tr.sel td.${value}`).html());

        for (let x = 0; x < fila; x++) {
            let xfila = x + 1;

            let inputTabla = $(`#cabeceraForm #de${numeroForm} input.${value}.${numFil}`);
            numFil++;

            let total = 0;

            $.each(inputTabla, function (indice, value) {

                let valor = parseInt($(value).val());


                if (!isNaN(valor)) {
                    total += valor;
                }
            });

            $(`.${value}.${xfila}.totales`).html(total);
        }
    })
}
const totalesFilas = function (numeroForm, objeto) {

    let columna = objeto.tablaDobleEntrada.columna;

    $.each(columna, function (indice, value) {

        let fila = parseInt($(`#t${numeroForm} tr.sel td.${value.nombre}`).html());

        for (let f = 1; f <= fila; f++) {
            let valorTotal = 0;

            const tds = $(`#de${numeroForm} td.${value.nombre}.${f}`)

            const calcularTol = function (td) {
                let valorCelda = parseInt($(td).html());
                if (!isNaN(valorCelda)) {
                    valorTotal += valorCelda;
                }
            }

            $.each(tds, function (indice, value) {

                calcularTol(value)

            });

            $(`td.${value.nombre}.${f}.totales`).html(valorTotal);
        }
    })

}
const totalesDobleEn = function (numeroForm, objeto) {

    let columna = objeto.tablaDobleEntrada.columna;
    let nameDobleEn = objeto.tablaDobleEntrada.nameDobleEn;

    const inputsDoble = document.querySelectorAll(`#de${numeroForm} input.dobleEntrada`);

    inputsDoble.forEach((input) => {

        const totalesFilasInput = function () {

            $.each(columna, function (indice, value) {

                let fila = parseInt($(`#t${numeroForm} tr.sel td.${value.nombre}`).html());

                for (let f = 1; f <= fila; f++) {
                    let valorTotal = 0;

                    const tds = $(`#de${numeroForm} td.${value.nombre}.${f} input`)

                    const calcularTol = function (td) {
                        let valorCelda = parseInt($(td).val());
                        if (!isNaN(valorCelda)) {
                            valorTotal += valorCelda;
                        }
                    }

                    $.each(tds, function (indice, value) {

                        calcularTol(value)

                    });

                    $(`td.${value.nombre}.${f}.totales`).html(valorTotal);
                }
            })

        }
        const totalesColInput = function () {

            $.each(nameDobleEn, function (indice, value) {
                let valorTotalCol = 0;

                const tds = $(`#de${numeroForm} td.${value.nombre} input`)



                const calcularTolCol = function (td) {
                    let valorCeldaCol = parseInt($(td).val());

                    if (!isNaN(valorCeldaCol)) {
                        valorTotalCol += valorCeldaCol;
                    }
                }

                $.each(tds, function (indice, value) {

                    calcularTolCol(value)
                });
                $(`td.det.total.${value.nombre}`).html(valorTotalCol);
            })

        }

        input.addEventListener('keyup', totalesFilasInput);
        input.addEventListener('keyup', totalesColInput);

    });
}
const crearTablaDoble = function (numeroForm, objeto, height, usuario, id, filaContador) {

    let accion = objeto.accion;
    let fila = objeto.tablaDobleEntrada.fila;
    let tituloFila = objeto.tablaDobleEntrada.tituloFila;
    let columna = objeto.tablaDobleEntrada.columna;
    let tituloColumna = objeto.tablaDobleEntrada.tituloColumna;

    let tabla = "";

    tabla += `<table class="tablaDoble active ${numeroForm}" id="de${numeroForm}" style = "max-height: ${height}px">`;
    tabla += `<form method="PUT" action="/${accion}Doble" id="dobleEntrada${accion}${numeroForm}"></form>`;

    for (var i = -1; i <= columna.length; i++) {
        // definicion de cabecera de la tabla
        if (i < 0) {
            tabla += `<th class="tituloTablas vacio"></th>`;

            $.each(tituloFila, function (indice, value) {

                tabla += `<th class="tituloTablas ${[value]}">${[value]}</th>`;
            });

        } else if ((i > -1) && (i < fila.length)) {

            let fila = parseInt($(`#t${numeroForm} tr.sel td.${fila[i].nombre}`).html());

            for (let x = 0; x < fila; x++) {
                let nombreFil;

                switch (x) {
                    case 0:
                        nombreFil = "I";
                        break;
                    case 1:
                        nombreFil = "II";
                        break;
                    case 2:
                        nombreFil = "III";
                        break;
                    case 3:
                        nombreFil = "VI";
                        break;
                    case 4:
                        nombreFil = "V";
                        break;
                    case 5:
                        nombreFil = "VI";
                        break;
                    case 6:
                        nombreFil = "VI";
                        break;
                    default:
                        nombreFil = x + 1;
                        break;
                }

                tabla += `<tr>
                <th class ="filaNombre ${fila[i].nombre} ${x + 1}">${titulofila[i]} ${nombreFil}<input class="doEn ${fila[i]}" name="nombreCol" form="dobleEntrada${accion}${numeroForm}" value="${fila[i].nombre}" fila="${filaContador}" display="none">
                <input class="doEn ${fila[i].nombre} fila" name="fila" form="dobleEntrada${accion}${numeroForm}" value="${x + 1}" fila="${filaContador}" display="none"></th>`;

                for (let t = 0; t < columna.length; t++) {

                    tabla += `<td class = "de ${fila[i].nombre} ${x + 1} ${columna[t].nombre}"></td>`;
                }
                tabla += `</tr>`;
                filaContador++
            }
        } else if (i == fila.length) {

            tabla += `<tr><th class = "filaNombre Total"> Total:</th> `;

            for (let t = 0; t < columna.length; t++) {
                tabla += `<td class = "det total ${columna[t].nombre}"></td>`;
            }
            tabla += `</tr>`;

        }
        tabla += "</tr>";
    }

    let user = `<div class="audit ${numeroForm}"><input class="d username" name="username" form="dobleEntrada${accion}${numeroForm}" value="${usuario}" readonly="true">
                     <input class="d id" name="id" form="dobleEntrada${accion}${numeroForm}" value="${id}" readonly="true">
                     <input class="d date ${numeroForm}" name="date" form="dobleEntrada${accion}${numeroForm}" value="" readonly="true"></div>`;

    let tabl = $(tabla);
    let usern = $(user);

    tabl.appendTo(`#cabeceraForm`);
    usern.appendTo(`#cabeceraForm`);

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

    tabla += `<table class="tablaDoble active ${numeroForm}" id="t${numeroForm}" style = "max-height: ${height}px">`;

    tabla += `<form method="PUT" action="/${accion}Doble" id="dobleEntrada${accion}${numeroForm}"></form>`;
    tabla += `<tr>`


    $.each(objeto.formDoblePest.titulos, (indice, value) => {
        tabla += `<th class=titulosDoble ${value}">${value}</th>`

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
const crearTablaDobleInput = function (numeroForm, objeto, height, usuario, idd, filaContador, consulta) {
  
    let consult = function esCereza(consu) {
        return consu._id == idd || consu.id == idd
    }

    let entidades = new Object 

    let registro = consulta.find(consult);
    $.each(registro.entidades, (indice,value)=>{
            
       let texti = indice.split(",");
       
       entidades[texti[0] + texti[1]] = value
    })
 
    let accion = objeto.accion;
    let columna = objeto.tablaDobleEntrada.columna;
    let tituloFila = objeto.tablaDobleEntrada.tituloFila;
    let fila = objeto.tablaDobleEntrada.fila;
    let tituloColumna = objeto.tablaDobleEntrada.titulosColumna;

    let tabla = "";

    tabla += `<table class="tablaDoble active ${numeroForm}" id="de${numeroForm}" style = "max-height: ${height}px">`;
    tabla += `<form method="PUT" action="/${accion}Doble" id="dobleEntrada${accion}${numeroForm}"></form>`;
   //Creo las filas de 1 con todos los titulos de las columnas
   tabla += `<tr>`; 
   tabla += `<th class="tituloTablas vacio"></th>`;
    $.each(tituloColumna, function (indice, value) {

        tabla += `<th class="tituloTablas ${[value]}">${[value]}</th>`;
    });
    tabla += `</tr>`;
    tabla += `<tr>`; 
    tabla += `<td class="filtroTodo titulo">Todo</td>`;
     $.each(tituloColumna, function (indice, value) {
 
         tabla += `<td class="filtroTodo ${[value]}">
         <input type="checkbox" class="tablaDoble filtroTodo check ${columna[indice]}" filtro="${columna[indice]}"></input>`;
       
     });
     tabla += `</tr>`;
    
    //Empiezo valores de la columnas y filas
    $.each(fila, (ind, val)=>{
         tabla += `<tr>`;

         tabla += `<th class ="filaNombre ${val}">${tituloFila[ind]}</th>`;

         $.each(columna, function (indice, value) {

            tabla += `<td class="${[value]}">
            <input type="checkbox" class="tablaDoble check" filtro="${columna[indice]}" ${entidades[val + value]}></input>
            <input class="tablaDoble valor" name="${val} ${value}" form="dobleEntrada${accion}${numeroForm}" value="${entidades[val + value]}" style="display:none"></input>  
            </td>`;
        });
        
         tabla += `</tr>`; 
    })
    
    let user = `<div class="audit ${numeroForm}"><input class="d username" name="username" form="dobleEntrada${accion}${numeroForm}" value="${usuario}" readonly="true">
    <input class="d id" name="id" form="dobleEntrada${accion}${numeroForm}" value="${idd}" readonly="true">
    <input class="d date ${numeroForm}" name="date" form="dobleEntrada${accion}${numeroForm}" value="" readonly="true"></div>`;

    let tabl = $(tabla);
    let usern = $(user);
    tabl.appendTo(`#cabeceraForm`);
    usern.appendTo(`#cabeceraForm`);

    $(`input.filtroTodo.check`).click(function(){
     
        let attr = $(this).attr(`filtro`)
    
        if($(this).is(":checked")){
         
            $(`td.${attr} input.check`).attr("checked", true)
            $(`td.${attr} input.valor`).val("checked")
        }else{
          
            $(`td.${attr} input.check`).removeAttr("checked", true)
            $(`td.${attr} input.valor`).val(false)
        }
    })
    
    $(`input.check`).click(function(){
        
        let father = $(this).parent().parent()
        let attr = $(this).attr(`filtro`)

        if($(this).is(":checked")){
      
            $(`td.${attr} input.valor`, father).val(`checked`)
        }else{
          
            $(`td.${attr} input.valor`, father).val(`checked`)
        }
    })
}
const valoresDobleEntrada = function (consulta, nomeDobleEn, id) {
    
   $.each(consulta, function (indice, value) {
  

        if (id == value._id || id == value.id ) {
         
            for (let x = 0; x < fila.length; x++) {

                let totalCol = 0;

                if ((value[fila[x].nombre] != null) && (value[fila[x].nombre] != undefined) && (value[fila[x].nombre] != "")) {

                    for (let y = 0; y < value[fila[x].nombre].length; y++) {

                        $(`td.de.${value[fila[x].nombre][y][0].nombreCol}.${value[fila[x].nombre][y][1].fila}.${fila[x].nombre}`).html(value[fila[x].nombre][y][2].cantidad);

                        if (!isNaN(parseInt((value[fila[x].nombre][y][2].cantidad)))) {

                            totalCol += parseInt((value[fila[x].nombre][y][2].cantidad))
                        }
                    }
                }
                $(`td.det.total.${fila[x].nombre}`).html(totalCol)

            }
        }
    })
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
$(`.cargaEntidadesSeg`).on('click ',  function(objeto,numeroForm) {

    $.each( variablesModelo, (indice,value)=>{
        variablesModelo.grupoSeguridad.tablaDobleEntrada.fila.push(indice)
        variablesModelo.grupoSeguridad.tablaDobleEntrada.tituloFila.push(value.pest)
        
      })
    
    $.each( variablesIniciales, (indice,value)=>{
        variablesModelo.grupoSeguridad.tablaDobleEntrada.fila.push(indice)
        variablesModelo.grupoSeguridad.tablaDobleEntrada.tituloFila.push(value.pest)
      })

    })