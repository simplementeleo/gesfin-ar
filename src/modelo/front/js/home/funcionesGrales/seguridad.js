let permisos = $(`#ocultoUser`).val()
let permisObject = new Object
let limitePermiso = new Array

$.ajax({
  type: "get",
  url: `/grupoSeguridad?grupoF`,
  beforeSend: function () { },
  complete: function () { },
  success: function (response) {

    if (permisos != undefined) {

      let arrayId = permisos.split(",");

      $.each(arrayId, (indice, value) => {

        let registro = response.find(element => element.id == value);

        limitePermiso.push(parseFloat(registro.cantidad))

        $.each(variablesModelo.grupoSeguridad.tablaDobleEntrada.columna, (indice, value) => {
          permisObject[value.nombre] = []

          $.each(registro[value.nombre], (ind, val) => {
            let parent = $(`#${ind}`).parent().parent()
            let granPa = $(parent).parent().parent()

            switch (value.nombre) {
              case "visualizar":

                $(`#${ind}.menuSelectAbm`).attr(`${value.nombre}`, true)
                $(`#${ind}.menuDobleEntrada`).attr(`${value.nombre}`, true)
                $(parent).siblings(`p`).attr(`${value.nombre}`, true)
                $(`img`, granPa).attr(`${value.nombre}`, true)

                permisObject[value.nombre].push(ind)
                break;
              case "crear":

                $(`#${ind}.menuFormulario`).attr(`visualizar`, true)
                $(parent).siblings(`p`).attr(`visualizar`, true)
                $(`img`, granPa).attr(`visualizar`, true)

                permisObject[value.nombre].push(ind)

                break;
              case "editar":
                permisObject[value.nombre].push(ind)

                break;
              case "eliminar":
                permisObject[value.nombre].push(ind)

                break;
            }
          })
        })
      })
    }
  },
  error: function (error) {
    console.log(error);

  },

})

$(`.cargaEntidadesSeg`).on('click ', function (objeto, numeroForm) {

  let navCompleta = $(`.nav-vert p.desplegableAbm`)


  $.each(navCompleta, (indice, value) => {

    let items = $(`p.menuSelectAbm, p.menuDobleEntrada`, $(value).siblings(`ul.subMenu`))

    let grupo = new Object
    let titulos = new Object
    let agrup = ""
    let ind = $(value).html().indexOf(`<`)

    if (ind > 0) {
      agrup = $(value).html().slice(0, ind)
    } else {
      agrup = $(value).html()
    }

    grupo[agrup] = []
    titulos[agrup] = []

    $.each(items, (indice, val) => {

      let id = $(val).attr(`id`)
      let indi = $(val).html().indexOf(`<`)

      if (indi > 0) {
        agrupTit = $(val).html().slice(0, indi)
      } else {
        agrupTit = $(val).html()
      }

      grupo[agrup].push(id)
      titulos[agrup].push(agrupTit)
    })

    variablesModelo.grupoSeguridad.tablaDobleEntrada.fila.push(grupo)
    variablesModelo.grupoSeguridad.tablaDobleEntrada.tituloFila.push(titulos)
  })
})

