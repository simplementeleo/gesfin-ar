document.querySelector('.men-prin').addEventListener('click',
    function (e) {
        e.stopPropagation();
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
        document.querySelector('#tablas').classList.toggle("vistaActive");

    }
)

//Desplegable Sub Menu variables

$('.cobr').on('click',
    function () {

        document.querySelector('.subMenuCob').classList.toggle("show");
        document.querySelector('.nav-vert li img.pagMarket').classList.toggle("show");
    }
);

//Desplegable Sub Menu Pagos
$('.pags').on('click',
    function () {

        document.querySelector('.subMenuPag').classList.toggle("show");
        document.querySelector('.nav-vert li img.finMarket').classList.toggle("show");
    }
);
//Desplegable Financiero
$('.fina').on('click',
    function () {

        document.querySelector('.subMenuFin').classList.toggle("show");
        document.querySelector('.nav-vert li img.conf').classList.toggle("show");
    }
);


//Desplegable Sub Geografico
$('.dir').on('click',
    function () {

        document.querySelector('.subMenuDir').classList.toggle("show");
        document.querySelector('.nav-vert li img.taMp').classList.toggle("show");
    }
)
///////////////////DESPELEGABLE FIDEICOMISOS
$(".obras").on(`click`,
    function () {
        document.querySelector('.subMenuFidei').classList.toggle("show");
        document.querySelector('.nav-vert li img.cobra').classList.toggle("show");


    });
$("input").on('click', function () {
    console.log("habilitado");
    $(".inputR").attr("disabled", false);


});