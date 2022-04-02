let permisos = $(`#ocultoUser`).val()

$.ajax({
  type: "get",
  url: `/grupoSeguridad?grupoF`,
  beforeSend: function () { },
  complete: function () { },
  success: function (response) {

    if (permisos != undefined) {
      let arrayId = permisos.split(",");
      let visualizar = []
      let editar = []
      let eliminar = []
      let limite = []

      $.each(arrayId, (indice, value) => {

        let registro = response.find(element => element.id == value);

        $.each(variablesModelo.grupoSeguridad.tablaDobleEntrada.columna, (indice, value) => {

          $.each(registro[value.nombre], (ind, val) => {
           
            let parent = $(`#${ind}.menuFormulario`).parent().parent()

            console.log(ind)
            console.log(value.nombre)
           
            $(`#${ind}.menuSelectAbm`).attr(`${value.nombre}`, true)
            $(`#${ind}.menuFormulario`).attr(`${value.nombre}`, true)
            $(parent).siblings(`p`).attr(`${value.nombre}`, true)
            let id = $(parent).siblings(`p`).attr(`id`)
            $(`img.${id}`).attr(`${value.nombre}`, true)

          })
        })
      })


      let visualLimpio = visualizar.filter((item, index) => {
        return visualizar.indexOf(item) === index;
      })

      $.each(visualLimpio, (indice, value) => {
        $(`.nav-completa p#${value}`).removeClass(`noneDisplay`)
        $(`.nav-completa p#${value}`).parents().parents().siblings(`p`).removeClass(`noneDisplay`)
        let id = $(`.nav-completa p#${value}`).parents().parents().siblings(`p`).attr(`id`)
        $(`img.${id}`).removeClass(`noneDisplay`)
      })

    }
  },
  error: function (error) {
    console.log(error);
  },

})