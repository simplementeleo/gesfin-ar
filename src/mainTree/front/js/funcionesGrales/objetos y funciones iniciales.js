let variablesIniciales = {
    cobrosRecibidos: {
        atributos: {
            names: [num, unidades, fecha, cliente, moneda, tipoCambio, tipoPago, observaciones, adjunto, compuestoCobranza, importeDesencadenado, importeDesencadenadoArs, importeDesencadenadoUsd, username, date, id, destino],
            titulos: ['Numero', `Fideicomiso`, `Fecha`, 'Cliente', `Moneda`, `TC`, `Cobro`, `Obrservaciones`, `Ajunto`, `Rubro`, `Descripcion`, `Bruto`, `importeArs`, `importeUsd`, `Cargos`, `impuestoDosArs`, `impuestoDosUsd`, `Subtotal`, `totalArs`, `totalUsd`, `Total`, `importeDesencadenadoArs`, `importeDesencadenadoUsd`, 'Usuario', `Aditoria`, `id`],
            soloLectura: [num, tipoCambio, importeDos, importeDesencadenado, date, username],
            oculto: [id, destino, origen, importeArs, importeUsd, impuestoUnoArs, impuestoUnoUsd, importeDosArs, importeDosUsd, importeDesencadenadoArs, importeDesencadenadoUsd, idDesen, filename, originalname, path],
            importe: {
                saldo: [],
                totalizadorCabecera: {
                    importeBase: {
                        total: [importeDesencadenado],
                        cantidad: [],
                        digitosPositivos: [importeDos],
                        digitosNegativos: []
                    }
                },
                totalizadorColeccion: {
                    importeBase: {
                        total: [importeDos],
                        cantidad: [],
                        digitosPositivos: [importe, impuestoUno],
                        digitosNegativos: []
                    }
                },
                cantidad: [],
                importeBase: [importe, impuestoUno, importeDos, importeDesencadenado],
                importePesos: [importeArs, impuestoUnoArs, importeDosArs, importeDesencadenadoArs],
                importeUsd: [importeUsd, impuestoUnoUsd, importeDosUsd, importeDesencadenadoUsd],
            },
            compuesto: {
                compuestoCobranza: compuestoCobranza,
            },
            signo: [],
            color: [],
            vistaPrevia: [adjunto],
            number: [tipoCambio, importe, importeArs, importeUsd],
            date: [fecha],
            valoresIniciales: {
                funcion: {
                    fecha: fechaInicialHoy
                },
                string: {
                    tipoCambio: ``,
                    destino: `Cobranzas recibidas`,

                },
                select: {
                    moneda: `Pesos`,
                }
            },
            configAbm: {
                with: {
                    cuatroCinco: [num, cantidadDosDigitos, letra, cantidadDosDigDos, tipoCambio],
                    cinco: [],
                    siete: [tipoPago, date, username, moneda, importe, importeArs, importeUsd, impuestoUno, importeDos, importeDesencadenado],
                    diez: [unidades, fecha],
                    quince: [observaciones, tipoUnidad, cliente, rubro],
                }
            },
            modificar: {
                names: [num, unidades, fecha, cliente, moneda, tipoCambio, tipoPago, observaciones, adjunto, username, date, id, destino],
                pestanas: [unidades, cliente, moneda, tipoPago],
                soloLectura: [num, importeDos, importeDesencadenado, date, username],

            },
            eliminar: true,
            deshabilitar: false,
        },
        formInd: {
            compuesto: true,
            titulos: ['Numero', `Fideicomiso`, `Fecha`, 'Cliente', `Moneda`, `TC`, `Medio Pago`, `Obrservaciones`, `Adjunto`, `Items`, `Importe`, `importeArs`, `importeUsd`, 'Usuario', `Aditoria`, `id`],
            titulosCompuesto: {
                compuestoCobranza: [`Rubro`, `Descripción`, `Bruto`, `importeArs`, `importeUsd`, `Cargos`, `impuestoUnoArs`, `impuestoUnoUsd`, `Subtotal`, `totalArs`, `totalUsd`]
            },
            oculto: [id, num, destino, origen, importeArs, importeUsd, impuestoUnoArs, impuestoUnoUsd, importeDosArs, importeDosUsd, importeDesencadenadoArs, importeDesencadenadoUsd],
            ordenFormu: [3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            soloLectura: {
                compuesto: [importeDos]
            },
            inputRenglones: [3, 5, 5, `compuesto`, 6],
            modificar: {
                names: [num, unidades, fecha, cliente, moneda, tipoCambio, tipoPago, observaciones, adjunto, rubro, descripcion, importe, importeArs, importeUsd, impuestoUno, impuestoUnoArs, impuestoUnoUsd, importeDos, importeDosArs, importeDosUsd, importeDesencadenado, importeDesencadenadoArs, importeDesencadenadoUsd, username, date, id, destino],
                pestanas: [unidades, cliente, rubro, moneda, tipoPago],
                soloLectura: [num, unidades, tipoCambio, importeDos, importeDesencadenado, date, username],
            },
            impresion: {
                tituloFormulario: `Recibo`,
                ocultoImpresion: [id, destino, origen, importeArs, importeUsd, impuestoUnoArs, impuestoUnoUsd, importeDosArs, importeDosUsd, importeDesencadenadoArs, importeDesencadenadoUsd,],
                titulosImpresionCompuesto: [`Rubro`, `Descripción`, `Bruto`, `importeArs`, `importeUsd`, `Cargos`, `impuestoUnoArs`, `impuestoUnoUsd`, `Subtotal`, `totalArs`, `totalUsd`],
            }

        },
        funcionesPropias: {
            cargar: {
                numeroFidei: numeroconFiltro,
                totalesBaseYMoneda: totalesBaseYMoneda, //Form ABM -- 834
                nombreBotonAdjunto: nombreBotonAdjunto,

            },
            cargarDosAtributo: {
                lecturaUnoUOtro: [lecturaUnoUOtro, letra, cantidadDosDigDos]
            },
            formularioIndiv: [],
            coleccionFormIndividual: [],
        },
        numerador: { /// buscar el numerador en funciones propias
            funcion: {
                0: {
                    name: `cobrosRecibidos`,
                    atributos: [num, unidades, username],
                    filtro: true,
                    atributoFiltro: unidades
                },
            },
        },
        acumulador: [],
        validaciones: [fecha, cliente, rubro, unidades, cantidadDosDigitos, letra, cantidadDosDigDos, tipoUnidad, moneda, importe, tipoCambio, tipoPago, adjunto],
        key: {
            atributo: cliente,
            nombre: `cliente`,
        },
        pest: `Cobranzas recibidas`,
        pestIndividual: `Ingreso Cobros`,
        accion: `cobrosRecibidos`,
        pestanas: {
            cabecera: [unidades, cliente, moneda, tipoPago],
            coleccion: [rubro],
            totales: [unidades, cliente, rubro, moneda, tipoPago],

        },
        tablaDobleEntrada: false,
        desencadena: {
            principal: [`movimientoFinanciero`],
            desencadenaModif: false,
            desencadenaActualiza: false,
            desencadenaActualizaVar: []
        },
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran los cobros de In-inversiones.`,
            modificar: modficarInd,
            entidades: [],
            desencadena: [`Movimientos financieros`],
            eliminar: true,
            deshabilitar: false,
            FiltroRapido: [],
        }
    },
    pagosRealizados: {
        atributos: {
            names: [id, num, unidades, fecha, proveedor, moneda, tipoCambio, logico, estado, fechaDos, tipoPago, observaciones, adjunto, componenteFiscal, importeDesencadenado, importeDesencadenadoArs, importeDesencadenadoUsd, date, username, destino],
            titulos: [`id`, 'Numero', `Fideicomiso`, `Fecha`, 'Proveedor', `Moneda`, `TC`, `Acopio`, `estado`, `Venc Acopio`, `Pago`, `Observaciones`, `Adjunto`, `Cant`, `Rubro`, `Sub Rubro`, `Descripción`, `Precio Unit`, `importeArs`, `importeUsd`, `Iva`, `impuestoUnoArs`, `impuestoUnoUsd`, `Otros Impuestos`, `impuestoUnoArs`, `impuestoUnoUsd`, `SubTotal`, `importeDosUsd`, `importeDosArs`, `importeDos`, `importeDesencadenadoArs`, `importeDesencadenadoUsd`, `Auditoria`, 'Usuario'],
            soloLectura: [num, tipoCambio, date, username, importeDesencadenado, fechaDos, importeDos, destino],
            oculto: [id, estado, cantidad, importeDesencadenadoArs, importeDesencadenadoUsd, importeArs, importeUsd, impuestoUnoArs, impuestoUnoUsd, impuestoDosArs, impuestoDosUsd, importeDosUsd, importeDosArs, importeArs, destino, origen, idDesen, filename, originalname, path, importeUsd],
            importe: {
                totalizadorCabecera: {
                    importeBase: {
                        total: [importeDesencadenado],
                        cantidad: [],
                        digitosPositivos: [importeDos],
                        digitosNegativos: []
                    }
                },
                totalizadorColeccion: {
                    importeBase: {
                        total: [importeDos],
                        cantidad: [],
                        digitosPositivos: [importe, impuestoUno, impuestoDos],
                        digitosNegativos: []
                    }
                },
                cantidad: [],
                importeBase: [importe, impuestoUno, impuestoDos, importeDos, importeDesencadenado],
                importePesos: [importeArs, impuestoUnoArs, impuestoDosArs, importeDosArs, importeDesencadenadoArs],
                importeUsd: [importeUsd, impuestoUnoUsd, impuestoDosUsd, importeDosUsd, importeDesencadenadoUsd],

            },
            compuesto: {
                componenteFiscal: componenteFiscal,
            },
            signo: [],
            color: [],
            vistaPrevia: [adjunto],
            number: [tipoCambio, importe, importeArs, importeUsd, impuestoUno, impuestoUnoArs, impuestoUnoUsd, impuestoDos, impuestoDosArs, impuestoDosUsd, importeDos, importeDosArs, importeDosUsd, importeDesencadenado, importeDesencadenadoArs, importeDesencadenadoUsd],
            date: [fecha, fechaDos],
            valoresIniciales: {
                funcion: {
                    fecha: fechaInicialHoy
                },
                string: {
                    destino: "Pagos realizados",
                    tipoCambio: ``,

                },
                select: {
                    moneda: `Pesos`,
                }
            },
            configAbm: {
                with: {
                    cuatroCinco: [num, tipoCambio],
                    cinco: [moneda, importe, impuestoUno, impuestoDos, importe, importeArs, importeUsd],
                    siete: [date, username],
                    diez: [unidades, tipoPago, rubroPagos, subRubroPagos, fecha,],
                    quince: [observaciones, proveedor,],
                }
            },
            modificar: {
                names: [id, num, unidades, fecha, proveedor, moneda, tipoCambio, tipoPago, observaciones, adjunto, date, username, destino],
                pestanas: [proveedor, tipoPago, moneda],
                soloLectura: [num, unidades, tipoCambio, date, username],

            },
            eliminar: true,
            deshabilitar: false,
        },
        formInd: {
            compuesto: true,
            titulos: [`id`, 'Numero', `Fideicomiso`, `Fecha`, 'Proveedor', `Moneda`, `TC`, `Acopio`, `Estado`, `Venc Acopio`, `Medio Pago`, `Obrservaciones`, `Adjunto`, `Items`, `Importe importeDos`, `importeDesencadenadoArs`, `importeDesencadenadoUsd`, `Auditoria`, 'Usuario'],
            titulosCompuesto: {
                componenteFiscal: [`cantidad`, `Rubro`, `SubRubro`, `Descripción`, `Precio Unit`, `importeArs`, `importeUsd`, `Iva`, `impuestoUnoArs`, `impuestoUnoUsd`, `Otros Impuestos`, `impuestoDosArs`, `impuestoDosUsd`, `Total`, `importeDosUsd`, `importeDosArs`],
            },

            oculto: [id, num, cantidad, destino, importeDesencadenadoArs, estado, fechaDos, importeDesencadenadoUsd, importeArs, importeArs, importeUsd, importeUsd, impuestoUnoArs, impuestoUnoUsd, impuestoDosArs, impuestoDosUsd, importeDosUsd, importeDosArs],
            ordenFormu: [0, 4, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            inputRenglones: [5, 6, 2, `compuesto`, 6],
            soloLectura: {
                compuesto: [importeDos]
            },
            modificar: {
                names: [id, num, unidades, fecha, proveedor, rubroPagos, subRubroPagos, moneda, tipoCambio, importe, impuestoUno, impuestoDos, importe, importeUsd, impuestoUnoUsd, impuestoDosUsd, importeUsd, importeArs, impuestoUnoArs, impuestoDosArs, importeArs, tipoPago, observaciones, adjunto, importeDesencadenado, importeDesencadenadoArs, importeDesencadenadoUsd, date, username, id, destino],
                pestanas: [proveedor, unidades, tipoPago, moneda, rubroPagos, subRubroPagos],
                soloLectura: [num, tipoCambio, importeDesencadenado, importeDos, date, username],
                compuesto: [cantidad, rubroPagos, subRubroPagos, descripcion, importe, importeArs, importeUsd, impuestoUno, impuestoUnoArs, impuestoUnoUsd, impuestoDos, impuestoDosArs, impuestoDosUsd, importeDos, importeDosArs, importeDosUsd]
            },
            impresion: {
                tituloFormulario: `Orden de pago`,
                ocultoImpresion: [id, cantidad, importeDesencadenadoArs, origen, adjunto, logico, destino, estado, fechaDos, importeDesencadenadoUsd, importeArs, importeArs, importeUsd, importeUsd, impuestoUnoArs, impuestoUnoUsd, impuestoDosArs, impuestoDosUsd, importeDosUsd, importeDosArs],
                titulosImpresionCompuesto: [`cantidad`, `Rubro`, `SubRubro`, `Descripción`, `Precio Unit`, `importeArs`, `importeUsd`, `Iva`, `impuestoUnoArs`, `impuestoUnoUsd`, `Otros Imp`, `impuestoDosArs`, `impuestoDosUsd`, `Total`, `importeDosUsd`, `importeDosArs`],
            }
        },
        funcionesPropias: {
            cargar: {
                numeroFidei: numeroconFiltro, //Form ABM -- 1072
                totalesBaseYMoneda: totalesBaseYMoneda, //Form ABM -- 834
                nombreBotonAdjunto: nombreBotonAdjunto,

            },
            cargarTresAtributo: {
                verdepenOnAtributo: [verdepenOnAtributo, logico, fechaDos, estado]
            },
            formularioIndiv: [],
            coleccionFormIndividual: [],
        },
        numerador: {
            funcion: {
                0: {
                    name: `pagosRealizados`,
                    atributos: [num, unidades, username],
                    filtro: true,
                    atributoFiltro: unidades
                },
            },
        },
        acumulador: [],
        validaciones: [fecha, unidades, moneda, proveedor, rubroPagos, subRubroPagos, tipoPago, adjunto, importe],
        key: {
            atributo: proveedor,
            nombre: `proveedor`,
        },
        pest: `Pagos realizados`,
        pestIndividual: `Ingreso Pagos`,
        accion: `pagosRealizados`,
        pestanas: {
            cabecera: [proveedor, tipoPago, unidades, moneda],
            coleccion: [rubroPagos, subRubroPagos],
            totales: [proveedor, tipoPago, unidades, moneda, rubroPagos, subRubroPagos]
        },
        tablaDobleEntrada: false,
        desencadena: {
            principal: [],
            condicionalUnBooleano: {
                0: {
                    destino: `acopio`, ///creo direccion particular para darle los valores que yo quiero siempre
                    condicion: logico
                },
            },
            desencadenaModif: {
                signoNumero: {
                    movimientoFinanciero: [importeDesencadenado, importeDesencadenadoArs, importeDesencadenadoUsd],

                }
            },
            desencadenaActualiza: [],

        },
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran los Pagos de In-inversiones.`,
            modificar: modficarInd,
            entidades: [],
            desencadena: [`Movimientos financieros`, `Acopio`],
            eliminar: true,
            deshabilitar: false,
            FiltroRapido: [],
        }
    },
    unidades: {
        atributos: {
            names: [id, nombre, direccion, pisos, deptos, oficinaTotal, cocheraTotal, localesTotal, mono, unaHab, dosHab, tresHab, cuatroHab, oficina, cochera, locales, totales, unidadesTorres, date, username, habilitado],
            titulos: [`_id`, 'Nombre', `Direccion`, `Pisos`, `Deptos`, `Oficinas`, `Cocheras`, `Local`, `mono`, `unaHab`, `dosHab`, `tresHab`, `cuatroHab`, `oficina`, `cochera`, `locales`, `totales`, `Torres`, `descripcion`, 'Auditoria', 'Usuario'],
            soloLectura: [date, username],
            oculto: [id, mono, unaHab, dosHab, tresHab, cuatroHab, oficina, cochera, locales, totales, descripcion, habilitado],
            importe: {
                totalizador: [],
                importeBase: [],
                importePesos: [],
                importeUsd: [],
            },
            compuesto: {
                unidadesTorres: unidadesTorres,

            },
            signo: [],
            color: {
                verde: [texto, descripcion
                ]
            },
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
                    cuatroCinco: [pisos, deptos, oficinaTotal, cocheraTotal, localesTotal, mono, unaHab, dosHab, tresHab, cuatroHab, plantaBaja, subsuelo, torres],
                    cinco: [],
                    siete: [date, username],
                    diez: [nombre],
                    quince: [direccion],
                }
            },
            modificar: {
                names: [id, nombre, direccion, pisos, deptos, oficinaTotal, cocheraTotal, localesTotal, mono, unaHab, dosHab, tresHab, cuatroHab, oficina, cochera, locales, totales, plantaBaja, subsuelo, torres, date, username],
                pestanas: [],
                soloLectura: [date, username],
            },
            eliminar: false,
            deshabilitar: true
        },
        formInd: {
            compuesto: true,
            titulos: [`id`, 'Nombre', `Direccion`, `Pisos`, `Deptos`, `Oficinas`, `Cocheras`, `Locales`, `mono`, `unaHab`, `dosHab`, `tresHab`, `cuatroHab`, `oficina`, `cochera`, `locales`, `totales`, `Plantas Bajas`, `Subsuelos`, `Torres`, 'Auditoria', 'Usuario'],
            titulosCompuesto: [`Nombre`, `Descrpción`],
            oculto: [id, mono, unaHab, dosHab, tresHab, cuatroHab, oficina, cochera, locales, totales, habilitado],
            ordenFormu: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            inputRenglones: [4, 4, 4, 4, 6],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [id, nombre, direccion, pisos, deptos, oficinaTotal, cocheraTotal, localesTotal, mono, unaHab, dosHab, tresHab, cuatroHab, oficina, cochera, locales, plantaBaja, subsuelo, torres, date, username],
                pestanas: [],
                soloLectura: [date, username],
            },
            impresion: {
                tituloFormulario: `Unidades`,
                ocultoImpresion: [id, id, mono, unaHab, dosHab, tresHab, cuatroHab, oficina, cochera, locales, habilitado],
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
        validaciones: [nombre, direccion],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Obras`,
        accion: `unidades`,
        pestanas: {
            cabecera: [],
            coleccion: [],
            totales: [],
        },
        tablaDobleEntrada: {
            abm: true,
            type: `regularConTotales`,
            inputType: `text`,
            totales: true,
            filaType: `baseInterna`,
            fila: { unidadesTorres: `texto` }, //fila
            tituloFila: [``],
            columnaType: `fija`,
            columna: [mono, unaHab, dosHab, tresHab, cuatroHab, oficina, cochera, locales],
            titulosColumna: ['Mono', `Una Hab`, `Dos Hab`, `Tres Hab`, `Cuatro Hab`, `Oficinas`, `Cocheras`, `Loc Com`, `Total`],
        },
        desencadena: false,
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran las unidades que utiliza In-inversiones.`,
            modificar: modficarTodo,
            entidades: [`Pagos realizados`, `Acopio`],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    rubro: {
        atributos: {
            names: [_id, num, nombre, date, username, habilitado],
            titulos: [`_id`, `Numero`, `Rubros`, 'Auditoria', 'Usuario'],
            soloLectura: [num, date, username],
            oculto: [_id, habilitado],
            compuesto: [],
            importe: {
                totalizador: [],
                importeBase: [],
                importePesos: [],
                importeUsd: [],
            },
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
                    siete: [username, date],
                    diez: [],
                    quince: [nombre],
                }
            },
            modificar: {
                names: [_id, num, nombre, date, username],
                pestanas: [],
                soloLectura: [date, username],
            },
            eliminar: false,
            deshabilitar: true
        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, `Numero`, `Rubros`, 'Auditoria', 'Usuario'],
            oculto: [_id, habilitado],
            ordenFormu: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            soloLectura: {
                compuesto: []
            },
            inputRenglones: [3, 5, 5],
            modificar: {
                names: [_id, num, nombre, date, username],
                pestanas: [],
                soloLectura: [date, username],
            },
            impresion: {
                tituloFormulario: `Rubro cobranzas`,
                ocultoImpresion: [_id, id, habilitado],
                titulosImpresionCompuesto: [],
            }
        },
        funcionesPropias: {
            inicio: {
                filtroRapido: filtroRapido
            },
        },
        numerador: {
            global: {
                0: {
                    name: `cliente`,
                    atributos: [num, username],
                    filtro: false
                },
            },
        },
        acumulador: [],
        ordenFormu: [0, 1, 2, 3, 4],
        validaciones: [nombre],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Rubro Ingresos`,
        accion: `rubro`,
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
            introduccion: `En esta entidad se registran los rubros de cobranzas que utiliza In-Inversiones.`,
            modificar: modficarTodo,
            entidades: ["Cobranzas Recibidas", `Proyecciones Cash Flow`],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }

    },
    rubroPagos: {
        atributos: {
            names: [_id, num, nombre, agrupadorRubrosPago, date, username, habilitado],
            titulos: [`_id`, `Numero`, `Rubros`, `Agrupado`, 'Auditoria', 'Usuario'],
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
                    cuatroCinco: [num],
                    cinco: [],
                    siete: [username, date],
                    diez: [nombre, agrupadorRubrosPago],
                    quince: [],
                }
            },
            modificar: {
                names: [_id, num, nombre, agrupadorRubrosPago, date, username],
                pestanas: [],
                soloLectura: [date, username],
            },
            eliminar: false,
            deshabilitar: true
        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, `Numero`, `Rubros`, `Agrupado`, 'Auditoria', 'Usuario'],
            oculto: [_id, habilitado],
            ordenFormu: [0, 1, 2, 3, 4, 5, 6, 7],
            inputRenglones: [4, 4],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [_id, num, nombre, agrupadorRubrosPago, date, username],
                pestanas: [],
                soloLectura: [date, username],
            },
            impresion: {
                tituloFormulario: `Rubro de Pagos`,
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
        validaciones: [num, nombre, agrupadorRubrosPago],
        key: {
            atributo: num,
            nombre: `nombre`,
        },
        pest: `Rubro Egresos`,
        accion: `rubroPagos`,
        pestanas: {
            cabecera: [agrupadorRubrosPago],
            coleccion: [],
            totales: [agrupadorRubrosPago],
        },
        tablaDobleEntrada: false,
        desencadena: false,
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran los rubros que utiliza In-inversiones.`,
            modificar: modficarTodo,
            entidades: [`Pagos realizados`, `Proyecciones CashFlow`],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    subRubroPagos: {
        atributos: {
            names: [_id, num, nombre, date, username, habilitado],
            titulos: [`_id`, `Numero`, `Rubros`, 'Auditoria', 'Usuario'],
            soloLectura: [num, date, username],
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
                    cuatroCinco: [num],
                    cinco: [],
                    siete: [username, date],
                    diez: [nombre],
                    quince: [],
                }
            },
            modificar: {
                names: [_id, num, nombre, date, username],
                pestanas: [],
                soloLectura: [num, date, username],
            },
            eliminar: false,
            deshabilitar: true
        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, `Numero`, `Rubros`, 'Auditoria', 'Usuario'],
            oculto: [_id, num, habilitado],
            ordenFormu: [0, 1, 2, 3, 4],
            inputRenglones: [7, 5],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [_id, num, nombre, date, username],
                pestanas: [],
                soloLectura: [num, date, username],
            },
            impresion: {
                tituloFormulario: `Sub Rubro Pago`,
                ocultoImpresion: [_id, id, habilitado],
                titulosImpresionCompuesto: [],
            }
        },
        funcionesPropias: {
            inicio: {
                filtroRapido: filtroRapido
            },
        },
        numerador: {
            global: {
                0: {
                    name: `subRubroPagos`,
                    atributos: [num, username, date],
                    filtro: false
                },
            }
        },
        acumulador: [],
        validaciones: [nombre],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Sub Rubro Egresos`,
        accion: `subRubroPagos`,
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
            introduccion: `En esta entidad se registran los sub rubros que utiliza In-inversiones.`,
            modificar: modficarTodo,
            entidades: [`Pagos realizados`],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    agrupadorRubrosPago: {
        atributos: {
            names: [_id, nombre, date, username, habilitado],
            titulos: [`_id`, `Agrupador`, 'Auditoria', 'Usuario'],
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
                soloLectura: [date, username],
            },
            eliminar: false,
            deshabilitar: true

        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, `Agrupador`, 'Auditoria', 'Usuario'],
            oculto: [_id, habilitado],
            ordenFormu: [0, 1, 2, 3, 4],
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
                tituloFormulario: `Agrupador de pagos`,
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
        validaciones: [nombre],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Agrupador Egresos`,
        accion: `agrupadorRubrosPago`,
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
            introduccion: `En esta entidad se registran los Agrupadores que utiliza In-inversiones. Este agrupados es utlizado
            principalmente cuando se realiza el proyectado del cash flow a fines de poder agrupar los tipos de pagos`,
            modificar: modficarTodo,
            entidades: [`Proyecciones Cash Flow`, `Rubros de pagos`],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    tipoUnidad: {
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
                    siete: [date, username],
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
            deshabilitar: true
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
                tituloFormulario: `Tipo de unidad`,
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
        validaciones: [nombre],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Tipo de Unidad`,
        accion: `tipoUnidad`,
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
            introduccion: `En esta entidad se registran los tipo de unidades que utiliza In-inversiones.`,
            modificar: modficarTodo,
            entidades: [`Cobros recibidos`, `Clientes`],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
}
