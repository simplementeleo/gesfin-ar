
document.querySelector('.men-prin').addEventListener('click',
function() {
    document.querySelector('.men').classList.toggle("show");
}
)

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
document.querySelector('.icon-menu').addEventListener('click',
function() {
    document.querySelector('.nav-completa').classList.toggle("show2");
    //
    document.querySelector('#tablas').classList.toggle("vistaActive");
    //
    document.querySelector('#principalesIndicadores').classList.toggle("vistaActive");

    document.querySelector('.logoFondo').classList.add("noShow");
 })

$(`.menuSelectAbm,
.menuFormulario, .menuDobleEntrada`).on(`click`,
function() {
    document.querySelector('.principalesIndicadores').classList.add("noShow");
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