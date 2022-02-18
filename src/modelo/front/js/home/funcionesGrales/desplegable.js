$('.men-prin').click(function (e) {
    $('.men').toggleClass("show");
})

$('.menuMarket').click(function (e) {

    $('.nav-completa').toggleClass("show");
    $('#tablas').toggleClass("vistaActive");
})

$('.desplegable').click(function () {
    let img = $(this).attr(`img`)
    let menu = $(this).attr(`menu`)

    $(`.nav-vert li img.${img}`).toggleClass(`show`)
    $(`ul.${menu}`).toggleClass(`show`)
})