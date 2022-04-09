
$('.men-prin').click(function (e) {
    $('.men').toggleClass("show");

})
$('.icon-menu').click(function (e) {

    $(`.desplegableAbm`).toggleClass(`oculto`)
    $(`.panelControl`).toggleClass(`oculto`)
    $(`ul.subMenu`).removeClass("show");

    $('#tablas').toggleClass("vistaActive");

    $('#principalesIndicadores').toggleClass("vistaActive");

    $('.logoFondo').addClass("noShow");

})

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
$(`.menuSelectAbm,
.menuFormulario, .menuDobleEntrada`).on(`click`,
    function () {
        $('.principalesIndicadores').addClass("noShow");

    })
$(".menuFormulario").on(`click`,
    function () {
        document.querySelector('.principalesIndicadores').classList.add("noShow");

    });
$(".panel").on(`click`,
    function () {
        document.querySelector('.principalesIndicadores').classList.remove("noShow");
    })
/////////////DESPLEGABLE HOME OPCIONES
$("#fideic h3").on(`click`,
    function () {

        $(`#fideicomisosOpciones`).toggleClass(`show`)

    });
$('.desplegableAbm').on('click', function () {

    $(this).siblings(`ul.subMenu`).toggleClass("show");

})

$(`#viewConf`).click(function () {

    $(`#menu-container .nav-vert p[view="market"],
       #menu-container .nav-vert img[view="market"]`).removeClass(`noneMarket`)

    $(`#menu-container .nav-vert p[view="home"],
       #menu-container .nav-vert img[view="home"]`).addClass(`noneHome`)

    $(`#menu-container .nav-vert p[view="home"] ul.subMenu`).addClass(`noneHome`)

    $(this).addClass(`noneHome`)
    $(`#viewHome`).removeClass(`noneMarket`)

    $('.men').removeClass("show");
})

$(`#viewHome`).click(function () {

    $(`#menu-container .nav-vert p[view="market"],
       #menu-container .nav-vert img[view="market"]`).addClass(`noneMarket`)

    $(`#menu-container .nav-vert p[view="home"],
       #menu-container .nav-vert img[view="home"]`).removeClass(`noneHome`)

    $(`#menu-container .nav-completa p[view="market"] ul.subMenu`).addClass(`noneMarket`)

    $(this).addClass(`noneMarket`)
    $(`#viewConf`).removeClass(`noneHome`)

    $('.men').removeClass("show");
})