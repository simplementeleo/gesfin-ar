
$('.men-prin').click(function (e) {
    $('.men').toggleClass("show");
})

$('.menuMarket').click(function (e) {

    $('.nav-completa').toggleClass("show");
    $('#tablas').toggleClass("vistaActive");
})

$(`body`).click(function() {

$('.men').removeClass("show");

})

$('.men-prin').click(function(event) {
event.stopPropagation();
});

$('.men').click(function(event) {
event.stopPropagation();
});

//Desplegable Menu
$('.icon-menu, .menuMarket').on('click',function() {
    $('.nav-completa').toggleClass("show2");
    //
    $('#tablas').toggleClass("vistaActive");
    //
    $('#principalesIndicadores').toggleClass("vistaActive");

    $('.logoFondo').addClass("noShow");
 })

$(`.menuSelectAbm,
.menuFormulario, .menuDobleEntrada`).on(`click`,
function() {
    $('.principalesIndicadores').addClass("noShow");
    //document.querySelector('#tablas').classList.add("tablaActive");

})

$(".menuFormulario").on(`click`,
function() {
    document.querySelector('.principalesIndicadores').classList.add("noShow");
    //document.querySelector('#tablas').classList.add("tablaActive");

});

$(".panel").on(`click`,
    function() {
        document.querySelector('.principalesIndicadores').classList.remove("noShow");
    })
/////////////DESPLEGABLE HOME OPCIONES
$("#fideic h3").on(`click`,
function() {

    $(`#fideicomisosOpciones`).toggleClass(`show`)

});

$('.desplegableAbm').on('click', function () {
    
    let imgBajar = $(this).attr(`img`)

    $(this).siblings(`ul.subMenu`).toggleClass("show");

    if($($(this).siblings(`ul.subMenu`)).hasClass(`show`)){
     let longItem = $(`li`,$(this).siblings(`ul.subMenu`)).length

     let margin = parseFloat(1.5 * parseFloat(longItem))+ parseFloat(1.5) 
    
     $(`.nav-vert li img.${imgBajar}`).css(`margin-top`, `${margin}em`);
    }else{
        $(`.nav-vert li img.${imgBajar}`).css(`margin-top`, `1em`);
    }
})