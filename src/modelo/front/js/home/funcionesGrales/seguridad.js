let permisos = $(`#ocultoUser`).val()

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
        console.log(registro)

        $.each(variablesModelo.grupoSeguridad.tablaDobleEntrada.columna, (indice, value) => {
          console.log(registro[value.nombre])
          $.each(registro[value.nombre], (ind, val) => {

            let parent = $(`#${ind}.menuSelectAbm`).parent().parent()

            $(`#${ind}.menuSelectAbm`).attr(`${value.nombre}`, true)
            $(`#${ind}.menuFormulario`).attr(`${value.nombre}`, true)
            $(parent).siblings(`p`).attr(`${value.nombre}`, true)
            let id = $(parent).siblings(`p`).attr(`id`)
            $(`img.${id}`).attr(`${value.nombre}`, true)

          })
        })
      })
    }
  },
  error: function (error) {
    console.log(error);
  },

})