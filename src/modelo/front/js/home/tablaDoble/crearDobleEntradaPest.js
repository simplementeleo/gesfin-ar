$('.menuDobleEntrada').on('click ',
    function () {

        let objeto = variablesModelo[this.id] || variablesIniciales[this.id]

        let numerador = "";
        let fidecomisoSelec = $(`#fideic input`).val()

        if (fidecomisoSelec == undefined) {
            fidecomisoSelec = ""
        }

        let pantalla = $(window).height();
        let container = $(`.container`).css("height");

        let heightContainer = container.slice(0, 2);
        let height = pantalla - (heightContainer * 4.3);

        var p = `<a id=p${contador} href="#seccion-${contador}" class="pestana active">${objeto.pest}<div class="close" id="${contador}">+</div></a>`; //definicion de pestaña

        var pestana = $(p);

        let imgs = `<div class="comand" id="bf${contador}">${iMail}${iCalen}${iExpo}${iDelete}${iEdit}${iCrear}${iDoble}${iCruz}${iOk}
         <div><div class="cartelErrorFront noShow">
                <p>Revisar los campos en rojo</p>
            </div>
        </div>
        </div>`;

        var imagenes = $(imgs);

        pestana.appendTo('#tabs_links'); //colgamos la pestaña final
        imagenes.appendTo('#comandera');
        let columnasArray = new Object;

        $.each(objeto.formDoblePest.datos, (indice, value) => {

            $.ajax({
                type: "get",
                async: false,
                url: `/${value.nombre}`,
                success: function (data) {
                    columnasArray[indice] = data;

                },
                error: function (error) {
                    console.log(error);
                }
            })
        })



        $.ajax({
            type: "get",
            url: `/${objeto.accion}`,

            beforeSend: function () { },
            complete: function () { },
            success: function (response) {

                crearTablaDoblePestanaFecha(objeto, contador, height, columnasArray, fidecomisoSelec, response),
                    clickInput(objeto, contador, columnasArray),
                    active(contador),

                    valoresTablaPestana(objeto, contador, columnasArray)

                ocultarTds(objeto, contador)
                contador++
                numerador++

            },
            error: function (error) {
                console.log(error);
            }
        });

        //Funcion de asignar atributo Active asi vemos la tabla de seleccionada
        $('.pestana').on('click',

            function () {

                var i = $(this).attr("id"); //atrapo el id de la pestaña
                var id = i.slice(1); //Le saco la "p" del Id

                $(`#${i}`).addClass('active'); //asigno active a tablas
                $(`#bf${id}`).addClass('active');
                $(`#t${id}`).addClass('active'); //asigno active a pestaña
                $(`#${i}`).siblings().removeClass('active'); //Remuevo active de las pestaña de las que no hice el click
                $(`#bf${id}`).siblings().removeClass('active');
                $(`#t${id}`).siblings().removeClass('active');
                //Remuevo active de las tablas de las que no hice el click

            }
        );

        //Cerrar tabla y asignar atributo active a la tabla de la izquierda excepto si es la primera
        $('.close').on('click',

            function () {

                var id = $(this).attr("id"); //atrapo id de la que estoy cerrando
                var cl = $(this).parents(); //pestaá de la que estoy cerrando
                var cla = cl.prev(); //Atrapo pesatña anterior de la que estoy cerrando
                var clav = cl.next(); //Atrapo pesatña poesterior de la que estoy cerrando

                var clase = cl.attr("class"); //atrapo clase de la pestaña selecconada

                var linksParent = $('.tabs_links'); //Atrapado todas las pestañas
                var links = linksParent.find('a'); //Atrapo los "a" de las pestañas
                var linksIdfirst = links.eq(0).attr("id").slice(1); //Selecciona y limpio el id de la primera pestaña

                //Si la tabla selecciona tiene clase active es diferente a la primeta asigno active a la de izquierda
                if ((clase === "pestana active") && (id != linksIdfirst)) {

                    cla.addClass('active');
                    $(`#bf${id}`).prev().addClass('active');
                    $(`#t${id}`).prev().addClass('active');

                    $(`#${id}`).remove();
                    $(`#p${id}`).remove();
                    $(`#bf${id}`).remove();
                    $(`#t${id}`).remove();



                    //Si la tabla selecciona tiene clase active es igual a la primeta asigno active a la de derecha
                } else if ((clase === "pestana active") && (id == linksIdfirst)) {

                    clav.addClass('active');
                    $(`#bf${id}`).next().addClass('active');
                    $(`#t${id}`).next().addClass('active');

                    $(`#${id}`).remove();
                    $(`#p${id}`).remove();
                    $(`#bf${id}`).remove();
                    $(`#t${id}`).remove();

                    //si no tiene active elimino tabla sin afectar el active 
                } else {

                    $(`#${id}`).remove();
                    $(`#p${id}`).remove();
                    $(`#bf${id}`).remove();
                    $(`#t${id}`).remove();
                }
            }
        );



    })