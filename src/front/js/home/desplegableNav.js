//Desplegable usuario

document.querySelector('.men-prin').addEventListener('click',
    function () {
        document.querySelector('.men').classList.toggle("show");
    }
)

$(`body`).click(function () {

    $('.men').removeClass("show");

})

$('.men-prin').click(function (event) {
    event.stopPropagation();
});

$('.men').click(function (event) {
    event.stopPropagation();
});



//Desplegable Menu
document.querySelector('.icon-menu').addEventListener('click',
    function () {
        document.querySelector('.nav-completa').classList.toggle("show2");
        //
        document.querySelector('#tablas').classList.toggle("vistaActive");
        //
        document.querySelector('#principalesIndicadores').classList.toggle("vistaActive");

        document.querySelector('.logoFondo').classList.add("noShow");

    }
)



//Desplegable Sub Menu pagos

$('.pagg').on('click',
    function () {

        document.querySelector('.subMenuPag').classList.toggle("show");
        document.querySelector('.nav-vert li img.comp').classList.toggle("show");
    }
)
//Desplegable Sub Menu cobros
$('.cobb').on('click',
    function () {

        document.querySelector('.subMenuCob').classList.toggle("show");
        document.querySelector('.nav-vert li img.pag').classList.toggle("show");
    }
)

//Operaciones financieras
$('.ch').on('click',
    function () {

        document.querySelector('.subMenuOperFin').classList.toggle("show");
        document.querySelector('.nav-vert li img.prRb').classList.toggle("show");
    }
)

//Desplegable Sub Menu computo
$('.co').on('click',
    function () {

        document.querySelector('.subMenuComputo').classList.toggle("show");
        document.querySelector('.nav-vert li img.computo').classList.toggle("show");
    }
)

$(`.menuSelectAbm,
 .menuFormulario, .menuDobleEntrada`).on(`click`,
    function () {
        document.querySelector('.principalesIndicadores').classList.add("noShow");
        //document.querySelector('#tablas').classList.add("tablaActive");

    }

)

$(".menuFormulario").on(`click`,
    function () {
        document.querySelector('.principalesIndicadores').classList.add("noShow");
        //document.querySelector('#tablas').classList.add("tablaActive");

    });

$(".panel").on(`click`,
    function () {
        document.querySelector('.principalesIndicadores').classList.remove("noShow");
    })
///////////////////DESPELEGABLE OPERACIONES FINANCIERAS
$(".pr").on(`click`,
    function () {
        document.querySelector('.subMenuIndice').classList.toggle("show");
        document.querySelector('.nav-vert li img.panel').classList.toggle("show");
    });

$(".compraMenu").on(`click`,
    function () {
        document.querySelector('.subMenuCompras').classList.toggle("show");
        document.querySelector('.nav-vert li img.chLib').classList.toggle("show");
    });

/////////////DESPLEGABLE HOME OPCIONES
$("#fideic h3").on(`click`,
    function () {

        $(`#fideicomisosOpciones`).toggleClass(`show`)

    });