let permisos = $(`#ocultoUser`).val()


$.ajax({
  type: "get",
  url: `/grupoSeguridad`,
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

        $.each(registro.entidades, (indice, value) => {

          if (value == "checked") {

            let array = indice.split(",");

            switch (array[1]) {

              case `visualizar`:

                visualizar.push(array[0])
                break;
              case `editar`:
                editar.push(array[0])
                break;
              case `eliminar`:
                eliminar.push(array[0])
                break;
              case `limite`:
                limite.push(array[0])
                break;
            }

          }
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

