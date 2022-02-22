$('.container').on('click',

    function() {

        $('.cartelError').fadeOut(3000)
    }
);

$('.menu-container').on('click',

    function() {

        $('.cartelErrorFront').fadeOut(5000);
        //$('.cartelErrorForm').fadeOut(3000);
    }

);

$('.menu-container .tabs_contents').on('click',

    function() {

        $('.cartelErrorFront').fadeOut(3000);
        //$('.cartelErrorForm').fadeOut(3000);
    });

$(`#formularioIndividual`).on('click',


    function() {
        $('.cartelErrorFront').fadeOut(3000);
        $('.cartelErrorForm').fadeOut(3000);
    });

$(`#formularioIndividual .primeraLinea`).click(function(event) {
    event.stopPropagation()
});
/////////Borrar cartel error formulario individual
$('.menu-container .tabs_contents').on('click',

    function() {

        $('.cartelErrorForm').fadeOut(3000);
        //$('.cartelErrorForm').fadeOut(3000);
    });