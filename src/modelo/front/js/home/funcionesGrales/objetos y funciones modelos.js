let variablesModelo = {
    users: {
        atributos: {
            names: [id, nombre, apellido, email, logico, usuario, password, username, date, habilitado],
            titulos: [`id`, 'Nombre', `Apellido`, `Email`, `Empleado`, `Username`, `Contraseña`, 'Auditoria', 'Usuario'],
            soloLectura: [date, username],
            oculto: [id, habilitado],
            importe: {
                totalizador: [],
                importeBase: [],
                importePesos: [],
                importeUsd: [],
            },
            compuesto: [],
            signo: [],
            color: [],
            number: [],
            date: [],
            filtroRapido: {
                referencia: habilitado,
                filtros: [`true`, `false`, `Todos`],
                titulos: [`Habilitado`, `DesHab`, `Todos`]
            },
            valoresIniciales: {
                funcion: [],
                string: {
                    habilitado: true
                },
                select: []
            },
            configAbm: {
                with: {
                    cuatroCinco: [],
                    cinco: [],
                    siete: [],
                    diez: [],
                    quince: [],
                },
                formatoFunc: {
                    primeraLetraMayuscula: [primeraLetraMayuscula, [nombre, apellido]],

                }
            },
            modificar: {
                names: [id, nombre, apellido, email, logico, usuario, password, username, date, habilitado],
                pestanas: [],
                soloLectura: [date, username],
            },
            eliminar: false,
            deshabilitar: true
        },
        formInd: {
            compuesto: false,
            titulos: [`id`, 'Nombre', `Apellido`, `Email`, `Empleado`, `Usuario`, `Contraseña`, 'Auditoria', 'Usuario'],
            titulosCompuesto: [],
            oculto: [_id, habilitado],
            ordenFormu: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            inputRenglones: [4, 4, 4, 4, 6],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [id, nombre, apellido, email, logico, usuario, password, username, date, habilitado],
                pestanas: [],
                soloLectura: [date, username],
            },
            impresion: {
                tituloFormulario: `Usuarios`,
                ocultoImpresion: [_id, id, habilitado],
                titulosImpresionCompuesto: [],
            }
        },
        funcionesPropias: {
            inicio: {
                filtroRapido: filtroRapido
            },
        },
        acumulador: [],
        numerador: [],
        validaciones: [nombre, apellido, email, usuario, password],
        pest: `Usuarios`,
        accion: `users`,
        pestanas: {
            cabecera: [],
            coleccion: [],
            totales: [],
        },
        tablaDobleEntrada: false,
        desencadena: false,
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran los usuarios que utiliza In-inversiones.`,
            modificar: modficarTodo,
            entidades: [],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    cliente: {
        atributos: {
            names: [id, num, nombre, documento, telefono, email, direccion, ciudad, observaciones, username, date, habilitado],
            titulos: [`id`, 'Numero', 'Nombre ', `DNI/CUIT`, `Telefono`, `Email`, `Dirección`, `Ciudad`, `Observaciones`, 'Usuario', 'Auditoria'],
            soloLectura: [id, num, username, date],
            oculto: [id, habilitado],
            compuesto: [], //form unica instancia 865 y 1028
            signo: [],
            color: [],
            number: [],
            date: [],
            filtroRapido: {
                referencia: habilitado,
                filtros: [`true`, `false`, `Todos`],
                titulos: [`Habilitado`, `DesHab`, `Todos`]
            },
            valoresIniciales: {
                funcion: [],
                string: {
                    habilitado: true
                },
            },
            configAbm: {
                with: {
                    cuatroCinco: [],
                    cinco: [num],
                    siete: [documento, telefono, email, username, date],
                    diez: [nombre, ciudad],
                    quince: [direccion, observaciones],
                },
                formatoFunc: {
                    formatoNumeroDni: [formatoNumeroDni, [documento]],

                }
            },
            modificar: {
                names: [id, num, nombre, documento, telefono, email, direccion, ciudad, tipoPago, observaciones, username, date],
                pestanas: [ciudad],
                soloLectura: [id, num, username, date],
            },
            eliminar: false,
            deshabilitar: true,
            ayuda: {
                introduccion: `En esta entidad se registran los clientes que utiliza In-inversiones.`,
                modificar: modficarTodo,
                entidades: [`Cobros recibidos`, `Proyecciones Cash Flow`],
                desencadena: [],
                eliminar: false,
                deshabilitar: true,
                FiltroRapido: `Habitalitado/deshabilitado`
            }
        },
        formInd: {
            compuesto: true, //form unica instancia 865
            titulos: [`id`, 'Numero', 'Nombre ', `DNI/CUIT`, `Telefono`, `Email`, `Dirección`, `Ciudad`, `Observaciones`, 'Usuario', 'Auditoria'],
            titulosCompuesto: [],
            soloLectura: [],
            oculto: [id, num, habilitado],
            ordenFormu: [0, 3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25],
            inputRenglones: [4, 4, 2, 6],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [id, num, nombre, documento, telefono, email, direccion, ciudad, observaciones, username, date],
                pestanas: [ciudad],
                soloLectura: [id, username, date],
            },
            impresion: {
                tituloFormulario: `Cliente`,
                oculto: [id, num],
                titulosImpresionCompuesto: []
            }
        },
        funcionesPropias: {
            formularioIndiv: [],
            cargar: [],
            coleccionFormIndividual: [],
            inicio: {
                filtroRapido: filtroRapido
            },
        },
        acumulador: [],
        numerador: {
            global: {
                0: {
                    name: `cliente`,
                    atributos: [num, username],
                    filtro: false
                },
            },
        },
        validaciones: [nombre, documento, telefono, email, direccion, ciudad],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Clientes`,
        accion: `cliente`,
        pestanas: {
            cabecera: [ciudad],
            coleccion: [],
            totales: [ciudad],
        },
        tablaDobleEntrada: false,
        desencadena: false,
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran los clientes que utiliza In-inversiones.`,
            modificar: modficarTodo,
            entidades: [`Cobros recibidos`, `Proyecciones Cash Flow`],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    estadoProceso: {
        atributos: {
            names: [_id, orden, nombre, date, username, habilitado],
            titulos: [`_id`, 'Orden', 'Nombre', 'Auditoria', 'Usuario'],
            soloLectura: [date, username],
            oculto: [_id, habilitado],
            importe: {
                totalizador: [],
                importeBase: [],
                importePesos: [],
                importeUsd: [],
            },
            compuesto: [],
            signo: [],
            color: [],
            number: [],
            date: [],
            filtroRapido: {
                referencia: habilitado,
                filtros: [`true`, `false`, `Todos`],
                titulos: [`Habilitado`, `DesHab`, `Todos`]
            },
            valoresIniciales: {
                funcion: [],
                string: {
                    habilitado: true
                },
            },
            configAbm: {
                with: {
                    cuatroCinco: [],
                    cinco: [orden],
                    siete: [username, date],
                    diez: [nombre],
                    quince: [],
                }
            },
            modificar: {
                names: [_id, orden, nombre, date, username],
                pestanas: [],
                soloLectura: [date, username]
            },
            eliminar: false,
            deshabilitar: true,
            videoTutorial: "/videosTutoriales/market/pais.mp4 "
        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, 'Orden', 'Nombre', 'Auditoria', 'Usuario'],
            titulosCompuesto: [],
            oculto: [_id, habilitado],
            ordenFormu: [0, 1, 2, 3, 4, 5, 6, 7],
            inputRenglones: [5, 5],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [_id, orden, nombre, date, username],
                pestanas: [],
                soloLectura: [date, username]
            },
            impresion: {
                tituloFormulario: `Estado procesos`,
                ocultoImpresion: [_id, id, habilitado],
                titulosImpresionCompuesto: [],
            }
        },
        funcionesPropias: {
            inicio: {
                filtroRapido: filtroRapido
            },
        },
        numerador: [],
        acumulador: [],
        validaciones: [nombre],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Estado procesos`,
        accion: `estadoProceso`,
        pestanas: {
            cabecera: [],
            coleccion: [],
            totales: []
        },
        tablaDobleEntrada: false,
        desencadena: false,
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran los paises necesarios para la aplicación, ya sea para registrar una direccion de un proveedor o un cliente etc.`,
            modificar: modficarTodo,
            entidades: [`Provincia`, `Ciudad`],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    criticidad: {
        atributos: {
            names: [_id, orden, nombre, date, username, habilitado],
            titulos: [`_id`, 'Orden', 'Nombre', 'Auditoria', 'Usuario'],
            soloLectura: [date, username],
            oculto: [_id, habilitado],
            importe: {
                totalizador: [],
                importeBase: [],
                importePesos: [],
                importeUsd: [],
            },
            compuesto: [],
            signo: [],
            color: [],
            number: [],
            date: [],
            filtroRapido: {
                referencia: habilitado,
                filtros: [`true`, `false`, `Todos`],
                titulos: [`Habilitado`, `DesHab`, `Todos`]
            },
            valoresIniciales: {
                funcion: [],
                string: {
                    habilitado: true
                },
            },
            configAbm: {
                with: {
                    cuatroCinco: [],
                    cinco: [orden],
                    siete: [username, date],
                    diez: [nombre],
                    quince: [],
                }
            },
            modificar: {
                names: [_id, orden, nombre, date, username],
                pestanas: [],
                soloLectura: [date, username]
            },
            eliminar: false,
            deshabilitar: true,
            videoTutorial: ""
        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, 'Orden', 'Nombre', 'Auditoria', 'Usuario'],
            titulosCompuesto: [],
            oculto: [_id, habilitado],
            ordenFormu: [0, 1, 2, 3, 4, 5, 6, 7],
            inputRenglones: [5, 5],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [_id, orden, nombre, date, username],
                pestanas: [],
                soloLectura: [date, username]
            },
            impresion: {
                tituloFormulario: `Criticidad procesos`,
                ocultoImpresion: [_id, id, habilitado],
                titulosImpresionCompuesto: [],
            }
        },
        funcionesPropias: {
            inicio: {
                filtroRapido: filtroRapido
            },
        },
        numerador: [],
        acumulador: [],
        validaciones: [nombre],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Criticidad procesos`,
        accion: `criticidad`,
        pestanas: {
            cabecera: [],
            coleccion: [],
            totales: []
        },
        tablaDobleEntrada: false,
        desencadena: false,
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: ``,
            modificar: modficarTodo,
            entidades: [],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    tarea: {
        atributos: {
            names: [_id, orden, nombre, date, username, habilitado],
            titulos: [`_id`, 'Orden', 'Nombre', 'Auditoria', 'Usuario'],
            soloLectura: [date, username],
            oculto: [_id, habilitado],
            importe: {
                totalizador: [],
                importeBase: [],
                importePesos: [],
                importeUsd: [],
            },
            compuesto: [],
            signo: [],
            color: [],
            number: [],
            date: [],
            filtroRapido: {
                referencia: habilitado,
                filtros: [`true`, `false`, `Todos`],
                titulos: [`Habilitado`, `DesHab`, `Todos`]
            },
            valoresIniciales: {
                funcion: [],
                string: {
                    habilitado: true
                },
            },
            configAbm: {
                with: {
                    cuatroCinco: [],
                    cinco: [orden],
                    siete: [username, date],
                    diez: [nombre],
                    quince: [],
                }
            },
            modificar: {
                names: [_id, orden, nombre, date, username],
                pestanas: [],
                soloLectura: [date, username]
            },
            eliminar: false,
            deshabilitar: true,
            videoTutorial: ""
        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, 'Orden', 'Nombre', 'Auditoria', 'Usuario'],
            titulosCompuesto: [],
            oculto: [_id, habilitado],
            ordenFormu: [0, 1, 2, 3, 4, 5, 6, 7],
            inputRenglones: [5, 5],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [_id, orden, nombre, date, username],
                pestanas: [],
                soloLectura: [date, username]
            },
            impresion: {
                tituloFormulario: `Tareas procesos`,
                ocultoImpresion: [_id, id, habilitado],
                titulosImpresionCompuesto: [],
            }
        },
        funcionesPropias: {
            inicio: {
                filtroRapido: filtroRapido
            },
        },
        numerador: [],
        acumulador: [],
        validaciones: [nombre],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Tareas procesos`,
        accion: `tarea`,
        pestanas: {
            cabecera: [],
            coleccion: [],
            totales: []
        },
        tablaDobleEntrada: false,
        desencadena: false,
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: ``,
            modificar: modficarTodo,
            entidades: [],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    pais: {
        atributos: {
            names: [_id, nombre, date, username, habilitado],
            titulos: [`_id`, 'Nombre', 'Auditoria', 'Usuario'],
            soloLectura: [date, username],
            oculto: [_id, habilitado],
            importe: {
                totalizador: [],
                importeBase: [],
                importePesos: [],
                importeUsd: [],
            },
            compuesto: [],
            signo: [],
            color: [],
            number: [],
            date: [],
            filtroRapido: {
                referencia: habilitado,
                filtros: [`true`, `false`, `Todos`],
                titulos: [`Habilitado`, `DesHab`, `Todos`]
            },
            valoresIniciales: {
                funcion: [],
                string: {
                    habilitado: true
                },
            },
            configAbm: {
                with: {
                    cuatroCinco: [],
                    cinco: [],
                    siete: [username, date],
                    diez: [nombre],
                    quince: [],
                }
            },
            modificar: {
                names: [_id, nombre, date, username],
                pestanas: [],
                soloLectura: [date, username]
            },
            eliminar: false,
            deshabilitar: true,
            videoTutorial: "/videosTutoriales/market/pais.mp4 "
        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, 'Nombre', 'Auditoria', 'Usuario'],
            titulosCompuesto: [],
            oculto: [_id, habilitado],
            ordenFormu: [0, 1, 2, 3],
            inputRenglones: [5, 5],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [_id, nombre, date, username],
                pestanas: [],
                soloLectura: [date, username]
            },
            impresion: {
                tituloFormulario: `Pais`,
                ocultoImpresion: [_id, id, habilitado],
                titulosImpresionCompuesto: [],
            }
        },
        funcionesPropias: {
            inicio: {
                filtroRapido: filtroRapido
            },
        },
        numerador: [],
        acumulador: [],
        validaciones: [nombre],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Pais`,
        accion: `pais`,
        pestanas: {
            cabecera: [],
            coleccion: [],
            totales: []
        },
        tablaDobleEntrada: false,
        desencadena: false,
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran los paises necesarios para la aplicación, ya sea para registrar una direccion de un proveedor o un cliente etc.`,
            modificar: modficarTodo,
            entidades: [`Provincia`, `Ciudad`],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    provincia: {
        atributos: {
            names: [id, nombre, pais, date, username, habilitado],
            titulos: [`id`, 'Nombre', `Pais`, 'Auditoria', 'Usuario'],
            soloLectura: [date, username],
            oculto: [id, habilitado],
            compuesto: [],
            signo: [],
            color: [],
            number: [],
            date: [],
            filtroRapido: {
                referencia: habilitado,
                filtros: [`true`, `false`, `Todos`],
                titulos: [`Habilitado`, `DesHab`, `Todos`]
            },
            valoresIniciales: {
                funcion: [],
                string: {
                    habilitado: true
                },
            },
            configAbm: {
                with: {
                    cuatroCinco: [],
                    cinco: [],
                    siete: [username, date],
                    diez: [nombre, pais],
                    quince: [],
                }
            },
            modificar: {
                names: [id, nombre, pais, date, username],
                pestanas: [pais],
                soloLectura: [date, username]
            },
            eliminar: false,
            deshabilitar: true
        },
        formInd: {
            compuesto: false,
            titulos: [`id`, 'Nombre', `Pais`, 'Auditoria', 'Usuario'],
            oculto: [_id, habilitado],
            ordenFormu: [0, 1, 2, 3, 4],
            inputRenglones: [5, 5],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [_id, nombre, pais, date, username],
                pestanas: [pais],
                soloLectura: [date, username]
            },
            impresion: {
                tituloFormulario: `Provincia`,
                ocultoImpresion: [_id, id, habilitado],
                titulosImpresionCompuesto: [],
            }
        },
        funcionesPropias: {
            inicio: {
                filtroRapido: filtroRapido
            },
        },
        numerador: [],
        acumulador: [],
        validaciones: [nombre, pais],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Provincia`,
        accion: `provincia`,
        pestanas: {
            cabecera: [pais],
            coleccion: [],
            totales: [pais]
        },
        tablaDobleEntrada: false,
        desencadena: false,
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran las provincias necesarias para la aplicación, ya sea para registrar una direccion de un proveedor o un cliente etc.`,
            modificar: modficarTodo,
            entidades: [`Ciudad`],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    ciudad: {
        atributos: {
            names: [id, nombre, abrev, provincia, pais, date, username, habilitado],
            titulos: [`id`, 'Nombre', `CP`, `Provincia`, `Pais`, 'Auditoria', 'Usuario'],
            soloLectura: [date, username],
            oculto: [id, habilitado],
            compuesto: [],
            signo: [],
            color: [],
            number: [],
            date: [],
            filtroRapido: {
                referencia: habilitado,
                filtros: [`true`, `false`, `Todos`],
                titulos: [`Habilitado`, `DesHab`, `Todos`]
            },
            valoresIniciales: {
                funcion: [],
                string: {
                    habilitado: true
                },
            },
            configAbm: {
                with: {
                    cuatroCinco: [abrev],
                    cinco: [],
                    siete: [username, date],
                    diez: [nombre, provincia],
                    quince: [],
                }
            },
            modificar: {
                names: [id, nombre, abrev, provincia, pais, date, username],
                pestanas: [provincia, pais],
                soloLectura: [date, username]
            },
            eliminar: false,
            deshabilitar: true
        },
        formInd: {
            compuesto: false,
            titulos: [`id`, 'Nombre', `CP`, `Provincia`, `Pais`, 'Auditoria', 'Usuario'],
            titulosCompuesto: [],
            oculto: [_id, habilitado],
            ordenFormu: [0, 1, 2, 3, 4, 5, 6],
            inputRenglones: [5, 5],
            soloLectura: {
                compuesto: []
            },

            modificar: {
                names: [id, nombre, abrev, provincia, pais, date, username],
                pestanas: [provincia, pais],
                soloLectura: [date, username]
            },
            impresion: {
                tituloFormulario: `Ciudad`,
                ocultoImpresion: [_id, id, habilitado],
                titulosImpresionCompuesto: [],
            }
        },
        funcionesPropias: {
            inicio: {
                filtroRapido: filtroRapido
            },
        },
        numerador: [],
        acumulador: [],
        validaciones: [nombre, abrev, provincia, pais],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Ciudad`,
        accion: `ciudad`,
        pestanas: {
            cabecera: [provincia, pais],
            coleccion: [],
            totales: [provincia, pais]
        },
        tablaDobleEntrada: false,
        desencadena: false,
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran las ciudades necesarias para la aplicación, ya sea para registrar una direccion de un proveedor o un cliente etc.`,
            modificar: modficarTodo,
            entidades: ["Cliente", "Proveedor"],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }

    }
}