let variablesIniciales = {
    error: {
        atributos: {
            names: [num, fecha, cliente, observaciones, observacionesCompleto, criticidad, adjunto, estadoProceso, fechaDos, descripcionCompleto, fechaTres, tareas, adjuntos, date, username, id, destino],
            titulos: ['Numero', `Fecha`, 'Cliente', `Asunto`, `Descripcion`, `Criticidad`, `Ajunto`, `Estado`, `Resol estimada`, `Resolucion`, `Cierre`, `Tarea`, `Estimado`, `Consumido`, `Remanente`, `Descripcion`, `adjuntos`, `Auditoria`, 'Usuario'
            ],
            soloLectura: [num, date, username],
            oculto: [id, destino, origen, idDesen, filename, originalname, path, adjuntos],
            importe: undefined,
            compuesto: {
                tareas: tareas,
                adjuntos: adjuntos
            },
            signo: [],
            color: [],
            vistaPrevia: [adjunto, adjuntoColeccion],
            number: [],
            date: [fecha, fechaDos, fechaTres],
            valoresIniciales: {
                funcion: {
                    fecha: fechaInicialHoy
                },
                string: {
                    tipoCambio: ``
                },
                select: []
            },
            configAbm: {
                with: {
                    cuatroCinco: [num],
                    cinco: [tiempoEstimado, tiempoConsumido, tiempoRemanente],
                    siete: [date, username],
                    diez: [unidades, fecha],
                    quince: [cliente],
                }
            },
            modificar: {
                names: [num, fecha, cliente, observaciones, observacionesCompleto, criticidad, adjunto, estadoProceso, fechaDos, descripcionCompleto, fechaTres, date, username, id, destino],
                pestanas: [cliente, criticidad, estadoProceso],
                soloLectura: [num, date, username],
            },
            eliminar: true,
            deshabilitar: false,
        },
        formInd: {
            compuesto: true,
            titulos: ['Numero', `Fecha`, 'Cliente', `Asunto`, `Descripcion`, `Criticidad`, `Ajunto`, `Estado`, `Resol estimada`, `Resolucion`, `Cierre`, 'Usuario', `Tareas`, `Aditoria`, `id`],
            titulosCompuesto: {
                tareas: [`Tarea`, `Estimado`, `Consumido`, `Remanente`, `Descripcion`],
                adjuntos: [`Descripcion`, `Adjuntos`]
            },
            oculto: [id, num, destino, origen],
            ordenFormu: [3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            soloLectura: [date, username, num],
            inputRenglones: [3, 5, 3, `compuesto`, 6],
            modificar: {
                names: [num, fecha, cliente, observaciones, observacionesCompleto, criticidad, adjunto, estadoProceso, fechaDos, descripcionCompleto, fechaTres, date, username, id, destino],
                pestanas: [cliente, criticidad, estadoProceso, tarea],
                soloLectura: [date, username, num],
            },
            impresion: {
                tituloFormulario: `Error`,
                names: [num, fecha, cliente, adjunto, username, date, id, destino],
                titulos: ['Numero', 'Cliente', `Ajunto`, 'Usuario', `Aditoria`, `id`],
            }
        },
        funcionesPropias: {
            cargar: {
                nombreBotonAdjunto: nombreBotonAdjunto,

            },
            cargarDosAtributo: [],
            formularioIndiv: {
                adjuntoColeccionFuncInicial: adjuntoColeccionFuncInicial
            },
            coleccionFormIndividual: {
                adjuntoColeccionFunc: adjuntoColeccionFunc
            },
        },
        numerador: { /// buscar el numerador en funciones propias
            global: {
                0: {
                    name: `error`,
                    atributos: [num, username],
                    filtro: false
                },
            },
        },
        acumulador: [],
        validaciones: [fecha, cliente, tarea],
        key: {
            atributo: num,
            nombre: `numero`,
        },
        pest: `Error`,
        pestIndividual: `Ingreso Error`,
        accion: `error`,
        pestanas: {
            cabecera: [cliente, criticidad, estadoProceso],
            coleccion: [tarea],
            totales: [cliente, criticidad, estadoProceso, tarea],

        },
        tablaDobleEntrada: false,
        desencadena: false,
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran los errores de los clientes que utilizan GesFin`,
            modificar: modficarInd,
            entidades: [],
            desencadena: [],
            eliminar: true,
            deshabilitar: false,
            FiltroRapido: [],
        }
    },
    requerimiento: {
        atributos: {
            names: [num, fecha, cliente, observaciones, observacionesCompleto, criticidad, adjunto, estadoProceso, fechaDos, descripcionCompleto, fechaTres, tareas, adjuntos, date, username, id, destino],
            titulos: ['Numero', `Fecha`, 'Cliente', `Asunto`, `Descripcion`, `Criticidad`, `Ajunto`, `Estado`, `Resol estimada`, `Resolucion`, `Cierre`, `Tarea`, `Estimado`, `Consumido`, `Remanente`, `Descripcion`, `adjuntos`, `Auditoria`, 'Usuario'
            ],
            soloLectura: [num, date, username],
            oculto: [id, destino, origen, idDesen, filename, originalname, path, adjuntos],
            importe: undefined,
            compuesto: {
                tareas: tareas,
                adjuntos: adjuntos
            },
            signo: [],
            color: [],
            vistaPrevia: [adjunto, adjuntoColeccion],
            number: [],
            date: [fecha, fechaDos, fechaTres],
            valoresIniciales: {
                funcion: {
                    fecha: fechaInicialHoy
                },
                string: {
                    tipoCambio: ``
                },
                select: {
                    estadoProceso: `Ingresado`,
                    tarea: `Revision Gesfin`,
                }
            },
            configAbm: {
                with: {
                    cuatroCinco: [num],
                    cinco: [tiempoEstimado, tiempoConsumido, tiempoRemanente],
                    siete: [date, username],
                    diez: [unidades, fecha],
                    quince: [cliente],
                }
            },
            modificar: {
                names: [num, fecha, cliente, observaciones, observacionesCompleto, criticidad, adjunto, estadoProceso, fechaDos, descripcionCompleto, fechaTres, date, username, id, destino],
                pestanas: [cliente, criticidad, estadoProceso],
                soloLectura: [num, date, username],

            },
            eliminar: true,
            deshabilitar: false,
        },
        formInd: {
            compuesto: true,
            titulos: ['Numero', `Fecha`, 'Cliente', `Asunto`, `Descripcion`, `Criticidad`, `Ajunto`, `Estado`, `Resol estimada`, `Resolucion`, `Cierre`, 'Usuario', `Tareas`, `Aditoria`, `id`],
            titulosCompuesto: {
                tareas: [`Tarea`, `Estimado`, `Consumido`, `Remanente`, `Descripcion`],
                adjuntos: [`Descripcion`, `Adjuntos`]
            },
            oculto: [id, num, destino, origen],
            ordenFormu: [3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            soloLectura: [date, username, num],
            inputRenglones: [3, 5, 3, `compuesto`, 6],
            modificar: {
                names: [num, fecha, cliente, observaciones, observacionesCompleto, criticidad, adjunto, estadoProceso, fechaDos, descripcionCompleto, fechaTres, date, username, id, destino],
                pestanas: [cliente, criticidad, estadoProceso, tarea],
                soloLectura: [date, username, num],

            },
            impresion: {
                tituloFormulario: `Requerimiento`,
                names: [num, fecha, cliente, adjunto, username, date, id, destino],
                titulos: ['Numero', 'Cliente', `Ajunto`, 'Usuario', `Aditoria`, `id`],
            }
        },
        funcionesPropias: {
            cargar: {
                nombreBotonAdjunto: nombreBotonAdjunto,

            },
            cargarDosAtributo: [],
            formularioIndiv: {
                adjuntoColeccionFuncInicial: adjuntoColeccionFuncInicial
            },
            coleccionFormIndividual: {
                adjuntoColeccionFunc: adjuntoColeccionFunc
            },
        },
        numerador: { /// buscar el numerador en funciones propias
            global: {
                0: {
                    name: `requerimiento`,
                    atributos: [num, username],
                    filtro: false
                },
            },
        },
        acumulador: [],
        validaciones: [fecha, cliente, tarea],
        key: {
            atributo: num,
            nombre: `numero`,
        },
        pest: `Requerimiento`,
        pestIndividual: `Ingreso Reque`,
        accion: `requerimiento`,
        pestanas: {
            cabecera: [cliente, criticidad, estadoProceso],
            coleccion: [tarea],
            totales: [cliente, criticidad, estadoProceso, tarea],

        },
        tablaDobleEntrada: false,
        desencadena: false,
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran los requermientos de los clientes que utilizan GesFin`,
            modificar: modficarInd,
            entidades: [],
            desencadena: [],
            eliminar: true,
            deshabilitar: false,
            FiltroRapido: [],
        }
    },
}
