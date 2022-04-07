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
            let parent = $(`#${ind}.menuSelectAbm`).parent().parent()
            let id = $(parent).siblings(`p`).attr(`id`)

            switch (value.nombre) {
              case "visualizar":

                $(`#${ind}.menuSelectAbm`).attr(`${value.nombre}`, true)
                $(parent).siblings(`p`).attr(`${value.nombre}`, true)
                $(`img.${id}`).attr(`${value.nombre}`, true)

                permisObject[value.nombre].push(ind)
                break;
              case "crear":

                $(`#${ind}.menuFormulario`).attr(`visualizar`, true)
                $(parent).siblings(`p`).attr(`visualizar`, true)
                $(`img.${id}`).attr(`visualizar`, true)

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

Math.min(limitePermiso)