let crearAyuda = function (objeto, numeroForm) {

    $(`#ayuda`).addClass("show")

    let imgs = `<div class="closeForm ${numeroForm}">+</div>`;

    let imagenes = $(imgs);
    imagenes.appendTo('#comanderaIndivAyuda');

    let titulo = `<div class="tituloAyuda"><h1>Informacion Adicional ${objeto.pest}</h1></div>`;

    let tit = $(titulo)

    $(`.logoAyuda`).before(tit);

    let introduccion = `<div class="ayudasItems"><h2>Descripción</h2><p>${objeto.ayuda.introduccion}</p></div>`;
    let modificar = `<div class="ayudasItems"><h2>Modificar</h2><p>${objeto.ayuda.modificar}</p></div>`;
    let entidades = "";
    entidades += `<div class="ayudasItems"><h2>Se Utiliza en:</h2><p>Entidades que hacen referencia a ${objeto.accion}:</p>
                 <ul>`;

    $.each(objeto.ayuda.entidades, (indice, value) => {
        entidades += `<li>${value}</li>`;
    })

    entidades += `</ul></div>`;
    let desencadena = "";

    if (objeto.ayuda.desencadena != "") {
        desencadena += `<div class="ayudasItems"><h2>Genera registro en: </h2><p>Entidades donde desencadena ${objeto.accion}:</p>
                 <ul>`;
        $.each(objeto.ayuda.desencadena, (indice, value) => {
            desencadena += `<li>${value}</li>`;
        })
        desencadena += `</ul></div>`;
    }

    let eliminar = "";

    eliminar += `<div class="ayudasItems"><h2>Eliminar o Deshabilitar</h2>`;

    if (objeto.ayuda.eliminar == true) {
        eliminar += `<p>Las intancias pueden eliminarse, las cuales no son recuperables</p></div>`;
    } else {
        eliminar += `<p>Las intancias no pueden eliminarse, ya que son referenciadas en otras entidades, ejemplo ${objeto.ayuda.entidades[0]}</p></div>`;
    }

    if (objeto.ayuda.deshabilitar == true) {
        eliminar += `<div class="ayudasItems"><p>Las intancias pueden deshabilitarse, esto no produce efecto alguno en el almacenamiento de la información, pero cuando otra entidad quiera hacer referencias, no aparecera el registro deshabilitado.</p></div>`;
    }

    let introd = $(introduccion);
    let mod = $(modificar);
    let entid = $(entidades);
    let desen = $(desencadena);
    let elim = $(eliminar);

    introd.appendTo(`#cuerpoAyuda`)
    mod.appendTo(`#cuerpoAyuda`)
    elim.appendTo(`#cuerpoAyuda`)

    if (objeto.ayuda.entidades != "") {
        entid.appendTo(`#cuerpoAyuda`)
    }
    if (desencadena != "") {
        desen.appendTo(`#cuerpoAyuda`)
    }

    let height = $("#documentoAyuda").height();

    $('#ayuda').height(height + 100);

    $('#ayuda .closeForm').on('click',

        function () {

            $(`#ayuda #com${objeto.accion}${numeroForm}`).remove();
            $(`#ayuda`).removeClass("show");
            $(`#ayuda .closeForm`).remove()
            $(`#ayuda .tituloAyuda`).remove()
            $(`#cuerpoAyuda div`).remove(``)
        }
    );

}