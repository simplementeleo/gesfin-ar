let variablesIniciales = {
    pagosRealizados: {
        atributos: {
            names: [id, num, unidades, fecha, proveedor, moneda, tipoCambio, acopio, estado, vencimientoAcopio, tipoPago, observaciones, adjunto, componenteFiscal, importeTotal, importeTotalArs, importeTotalUsd, date, username, destino],
            titulos: [`id`, 'Numero', `Fideicomiso`, `Fecha`, 'Proveedor', `Moneda`, `TC`, `Acopio`, `estado`, `Venc Acopio`, `Pago`, `Observaciones`, `Adjunto`, `Cant`, `Rubro`, `Sub Rubro`, `Descripción`, `Precio Unit`, `importeArs`, `importeUsd`, `Iva`, `ivaArs`, `ivaUsd`, `Otros Impuestos`, `otrosImpuestosArs`, `otrosImpuestosUsd`, `SubTotal`, `totalUsd`, `totalArs`, `Total`, `importeTotalArs`, `importeTotalUsd`, `Auditoria`, 'Usuario'],
            soloLectura: [num, tipoCambio, importe, date, username, importeTotal, vencimientoAcopio, total, destino],
            oculto: [id, estado, cantidad, importeTotalArs, importeTotalUsd, precioUnitarioArs, precioUnitarioUsd, ivaArs, ivaUsd, otrosImpuestosArs, otrosImpuestosUsd, totalUsd, totalArs, importeArs, destino, origen, idDesen, filename, originalname, path, importeUsd],
            importe: {
                totalizadorCabecera: {
                    importeBase: {
                        total: [importeTotal],
                        cantidad: [],
                        digitosPositivos: [total],
                        digitosNegativos: []
                    }
                },
                totalizadorColeccion: {
                    importeBase: {
                        total: [total],
                        cantidad: [],
                        digitosPositivos: [precioUnitario, iva, otrosImpuestos],
                        digitosNegativos: []
                    }
                },
                cantidad: [],
                importeBase: [precioUnitario, iva, otrosImpuestos, total, importeTotal],
                importePesos: [precioUnitarioArs, ivaArs, otrosImpuestosArs, totalArs, importeTotalArs],
                importeUsd: [precioUnitarioUsd, ivaUsd, otrosImpuestosUsd, totalUsd, importeTotalUsd],

            },
            compuesto: {
                componenteFiscal: componenteFiscal,
            },
            signo: [],
            color: [],
            vistaPrevia: [adjunto],
            number: [tipoCambio, precioUnitario, precioUnitarioArs, precioUnitarioUsd, iva, ivaArs, ivaUsd, otrosImpuestos, otrosImpuestosArs, otrosImpuestosUsd, total, totalArs, totalUsd, importeTotal, importeTotalArs, importeTotalUsd],
            date: [fecha, vencimientoAcopio],
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
                    cinco: [moneda, importeBruto, iva, otrosImp, importe, importeArs, importeUsd],
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
            titulos: [`id`, 'Numero', `Fideicomiso`, `Fecha`, 'Proveedor', `Moneda`, `TC`, `Acopio`, `Estado`, `Venc Acopio`, `Medio Pago`, `Obrservaciones`, `Adjunto`, `Items`, `Importe Total`, `importeTotalArs`, `importeTotalUsd`, `Auditoria`, 'Usuario'],
            titulosCompuesto: {
                componenteFiscal: [`cantidad`, `Rubro`, `SubRubro`, `Descripción`, `Precio Unit`, `importeArs`, `importeUsd`, `Iva`, `ivaArs`, `ivaUsd`, `Otros Impuestos`, `otrosImpuestosArs`, `otrosImpuestosUsd`, `Total`, `totalUsd`, `totalArs`],
            },

            oculto: [id, num, cantidad, destino, importeTotalArs, estado, vencimientoAcopio, importeTotalUsd, importeArs, precioUnitarioArs, precioUnitarioUsd, importeUsd, ivaArs, ivaUsd, otrosImpuestosArs, otrosImpuestosUsd, totalUsd, totalArs],
            ordenFormu: [0, 4, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            inputRenglones: [5, 6, 2, `compuesto`, 6],
            soloLectura: {
                compuesto: [total]
            },
            modificar: {
                names: [id, num, unidades, fecha, proveedor, rubroPagos, subRubroPagos, moneda, tipoCambio, importeBruto, iva, otrosImp, importe, importeBrutoUsd, ivaUsd, otrosImpUsd, importeUsd, importeBrutoArs, ivaArs, otrosImpArs, importeArs, tipoPago, observaciones, adjunto, importeTotal, importeTotalArs, importeTotalUsd, date, username, id, destino],
                pestanas: [proveedor, unidades, tipoPago, moneda, rubroPagos, subRubroPagos],
                soloLectura: [num, tipoCambio, importeTotal, total, date, username],
                compuesto: [cantidad, rubroPagos, subRubroPagos, descripcion, precioUnitario, precioUnitarioArs, precioUnitarioUsd, iva, ivaArs, ivaUsd, otrosImpuestos, otrosImpuestosArs, otrosImpuestosUsd, total, totalArs, totalUsd]
            },
            impresion: {
                tituloFormulario: `Orden de pago`,
                ocultoImpresion: [id, cantidad, importeTotalArs, origen, adjunto, acopio, destino, estado, vencimientoAcopio, importeTotalUsd, importeArs, precioUnitarioArs, precioUnitarioUsd, importeUsd, ivaArs, ivaUsd, otrosImpuestosArs, otrosImpuestosUsd, totalUsd, totalArs],
                titulosImpresionCompuesto: [`cantidad`, `Rubro`, `SubRubro`, `Descripción`, `Precio Unit`, `importeArs`, `importeUsd`, `Iva`, `ivaArs`, `ivaUsd`, `Otros Imp`, `otrosImpuestosArs`, `otrosImpuestosUsd`, `Total`, `totalUsd`, `totalArs`],
            }
        },
        funcionesPropias: {
            cargar: {
                numeroFidei: numeroconFiltro, //Form ABM -- 1072
                totalesBaseYMoneda: totalesBaseYMoneda, //Form ABM -- 834
                nombreBotonAdjunto: nombreBotonAdjunto,

            },
            cargarTresAtributo: {
                verdepenOnAtributo: [verdepenOnAtributo, acopio, vencimientoAcopio, estado]
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
        validaciones: [fecha, unidades, moneda, proveedor, rubroPagos, subRubroPagos, tipoPago, adjunto, precioUnitario],
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
                    condicion: acopio
                },
            },
            desencadenaModif: {
                signoNumero: {
                    movimientoFinanciero: [importeTotal, importeTotalArs, importeTotalUsd],

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
    acopio: {
        atributos: {
            names: [id, unidades, proveedor, fecha, num, origen, vencimientoAcopio, moneda, importeTotal, saldo, saldoArs, saldoUsd, estado, adjunto, observaciones, componenteAcopio, importeTotalArs, importeTotalUsd, importe, importeArs, importeUsd, date, username, idDesen],
            titulos: [`id`, `Fideicomiso`, `Proveedor`, `Fecha`, `Numero`, `Origen`, `Venc Acopio`, `Moneda`, `Total Acopiado`, `Saldo`, `saldoUsd`, `saldoArs`, `Estado`, `Adjunto`, `Observaciones`, `cantidad`, `Remito`, `Importe`, `importeArs`, `importeUsd`, `adjuntoColeccion`, `position`, `importeTotalArs`, `importeTotalUsd`, `Desacopiado`, `importeArs`, `importeUsd`, `Auditoria`, `Usuario`],
            soloLectura: [date, username, origen, estado, num, descripcion, importe, total, saldo],
            oculto: [id, importeTotalArs, importeTotalUsd, importeAcopioArs, importeAcopioUsd, saldoArs, saldoUsd, importeArs, importeUsd, totalArs, totalUsd, cantidad, adjuntoColeccion, idDesen, position],
            importe: {
                totalizadorCabecera: {
                    importeBase: {
                        total: [importe],
                        cantidad: [],
                        digitosPositivos: [importeAcopio],
                        digitosNegativos: []
                    },
                    saldo: {
                        total: [saldo],
                        cantidad: [],
                        digitosPositivos: [importeTotal],
                        digitosNegativos: [importe]
                    }
                },
                totalizadorColeccion: [],
                cantidad: [],
                importeBase: [importeTotal, saldo, importe, importeAcopio],
                importePesos: [importeTotalArs, saldoArs, importeArs, importeAcopioArs],
                importeUsd: [importeTotalUsd, saldoUsd, importeUsd, importeAcopioUsd],

            },
            compuesto: {
                componenteAcopio: componenteAcopio,
            },
            signo: [],
            desencadenado: [idDesen],
            color: [],
            vistaPrevia: [adjunto],
            filtroRapido: {
                referencia: estado,
                filtros: [`Abierto`, `Cerrado`, `Todos`],
                titulos: [`Abiertos`, `Cerrados`, `Todos`]
            },
            number: [cantidad, importeTotal],
            date: [fecha, vencimiento, vencimientoAcopio],
            valoresIniciales: {
                funcion: {
                    fecha: fechaInicialHoy
                },
                string: {
                    estado: `Abierto`,
                    origen: `Acopio`
                },
                select: [],
            },
            configAbm: {
                with: {
                    cuatroCinco: [],
                    cinco: [moneda, num, importeTotal, saldo, importe, total],
                    siete: [rubro, username, date],
                    diez: [unidades, fecha],
                    quince: [rubro],
                }
            },
            modificar: {
                names: [id, vencimientoAcopio, adjunto, observaciones, importeTotalArs, date, username, idDesen],
                compuesto: [cantidad, descripcion, importe],
                soloLectura: [date, username],
            },
            eliminar: true,
            deshabilitar: false,
        },
        formInd: {
            compuesto: true, //form unica instancia 865
            titulos: [`id`, `Fideicomiso`, `Proveedor`, `Fecha`, `Numero`, `Origen`, `Venc Acopio`, `Moneda`, `Total Acopiado`, `Saldo`, `saldoUsd`, `saldoArs`, `Estado`, `Adjunto`, `Observaciónes`, `importeArs`, `importeUsd`, `Items Acopiados`, `Total Desacopiado`, `importeArs`, `importeUsd`, `Auditoria`, `Usuario`,],
            titulosCompuesto: {
                componenteAcopio: [`cantidad`, `Remito`, `Importe`, `Adjunto`],
            },
            oculto: [id, num, importeTotalArs, importeTotalUsd, saldoArs, saldoUsd, importeArs, importeUsd, cantidad, idDesen],
            ordenFormu: [0, 1, 2, 3, 4, 5, 11, 12, 13, 9, 6, 7, 8, 10, 16, 17, 18, 14, 20, 21, 22, 23, 24, 25],
            soloLectura: {
                compuesto: []
            },
            inputRenglones: [5, 6, 5, `compuesto`, 6],
            modificar: {
                names: [id, vencimientoAcopio, adjunto, observaciones, importeTotalArs, date, username, idDesen],
                compuesto: [cantidad, descripcion, importe],
                pestanas: [],
                soloLectura: [date, username],
            },
            impresion: {
                tituloFormulario: `Acopio`,
                ocultoImpresion: [id, num, importeTotalArs, importeTotalUsd, saldoArs, saldoUsd, importeArs, importeUsd, cantidad],
                titulosImpresionCompuesto: [`cantidad`, `Remito`, `Importe`, `Adjunto`],
            }
        },
        funcionesPropias: {
            inicio: {
                filtroRapido: filtroRapido,
            },
            cargar: {
                nombreBotonAdjunto: nombreBotonAdjunto,
                totalesBaseYMoneda: totalesBaseYMoneda,
                numeroFidei: numeroconFiltro,
            },
            formularioIndiv: {
                deshabitarValidarColec: deshabitarValidarColec,
                adjuntoColeccionFuncInicial: adjuntoColeccionFuncInicial

            },
            coleccionFormIndividual: {
                adjuntoColeccionFunc: adjuntoColeccionFunc
            },
        },
        numerador: {
            funcion: {
                0: {
                    name: `acopio`,
                    atributos: [num, unidades, username],
                    filtro: true,
                    atributoFiltro: unidades
                },
            },
        },
        acumulador: [],
        validaciones: [adjunto, fecha, total, descripcion],
        key: {
            atributo: num,
            nombre: `num`,
        },
        pest: `Acopio`,
        accion: `acopio`,
        pestanas: {
            cabecera: [unidades, proveedor, moneda],
            coleccion: [],
            totales: [unidades, proveedor, moneda]
        },
        tablaDobleEntrada: false,
        desencadena: {
            principal: [],
            condicionalUnBooleano: [],
            desencadenaModif: [],
            desencadenaActualiza: [],
        },
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran los acopios de In-inversiones.`,
            modificar: modficarInd,
            entidades: [],
            desencadena: [],
            eliminar: true,
            deshabilitar: false,
            FiltroRapido: [],
        }
    },
    movimientoFinanciero: {
        atributos: {
            names: [id, num, origen, fecha, unidades, moneda, importeTotal, importeTotalArs, importeTotalUsd, tipoCambio, tipoPago, observaciones, date, username, idDesen, desen, idColec],
            titulos: [`id`, 'Numero', 'Origen', `Fecha`, `Fideicomiso`, `Moneda`, `Importe`, `importe $`, `Importe Usd`, `Tipo de Cambio`, `Forma de pago`, `Observaciones`, `Auditoria`, 'Usuario'],
            soloLectura: [num, date, username, idDesen, desen, idColec],
            oculto: [id, idDesen, desen, idColec],
            importe: [],
            compuesto: [],
            signo: [],
            color: [],
            desencadenado: [idDesen],
            number: [tipoCambio, moneda, importeArs, importeUsd],
            date: [fecha],
            valoresIniciales: {
                funcion: {
                    fecha: fechaInicialHoy
                }
            },
            configAbm: {
                with: {
                    cuatroCinco: [num, tipoCambio],
                    cinco: [fecha, moneda, importe, importeArs, importeUsd],
                    siete: [date, username],
                    diez: [unidades, tipoPago],
                    quince: [nombre, observaciones],
                }
            },
            modificar: {
                names: [id, num, origen, fecha, unidades, moneda, importeTotal, importeTotalArs, importeTotalUsd, tipoCambio, tipoPago, observaciones, date, username, idDesen, desen],
                pestanas: [unidades, tipoPago, moneda],
                soloLectura: [num, date, username],
            },
            eliminar: true,
            deshabilitar: false,
        },
        formInd: {
            compuesto: false,
            titulos: [`id`, 'Numero', 'Origen', `Fecha`, `Fideicomiso`, `Moneda`, `Importe`, `Importe USD`, `Tipo de Cambio`, `Forma de pago`, `Observaciones`, `Auditoria`, 'Usuario',],
            titulosCompuesto: [],
            oculto: [id, idDesen],
            ordenFormu: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10],
            soloLectura: {
                compuesto: []
            },
        },
        funcionesPropias: [],
        numerador: {
            0: {
                name: `movimientoFinanciero`,
                atributos: [num, unidades, username],
                filtro: false
            },
        },
        acumulador: [],
        validaciones: [fecha, importeArs, importe],
        key: {
            atributo: num,
            nombre: `fecha`,
        },
        pest: `Movimientos Financieros`,
        accion: `movimientoFinanciero`,
        pestanas: [`unidades`, `tipoPago`, `moneda`],
        pestanas: {
            cabecera: [unidades, tipoPago, moneda],
            coleccion: [],
            totales: [unidades, tipoPago, moneda]
        },
        tablaDobleEntrada: false,
        desencadena: false,

    },
    proyeccionesCashFlow: {
        atributos: {
            names: [],
            titulos: [],
            soloLectura: [],
            oculto: [],
            ocultoSiempre: [porcentage],
            compuesto: [],
            signo: [],
            color: [],
            filtroRapido: {
                referencia: estado,
                filtros: [`Reducido`, `Completo`]
            },
            number: [],
            date: []
        },
        modificar: {
            names: [],
            soloLectura: [],
        },
        formInd: {
            compuesto: false,
            titulos: [],
            titulosCompuesto: [],
            oculto: [],
            ordenFormu: [],
            soloLectura: {
                compuesto: []
            },
        },
        formDoblePest: {
            names: [previsto, porcentage, gastoReal, pagado, aPagar],
            titulos: [`Rubro`, `Previsto`, `%`, `Gasto Real`, `Pagado`, `A Pagar`],
            datos: {
                columna: rubroPagos,
                agrupador: agrupadorRubrosPago
            },
            valorCalculado: [porcentage]
        },
        funcionesPropias: {
            inicio: {
                filtroRapido: filtroRapido
            },
            formularioIndiv: {},
        },
        numerador: [],
        acumulador: [],
        validaciones: [],
        pest: `Proyecciones`,
        accion: `proyeccionesCashFlow`,
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

    },
    prestamosFideicomisos: {
        atributos: {
            names: [id, num, fecha, unidades, unidadesDestino, moneda, importeTotal, importeTotalArs, importeTotalUsd, tipoCambio, tipoPago, prestamoCompuesto, devolucionImporte, devolucionImporteArs, devolucionImporteUsd, saldo, saldoArs, saldoUsd, observaciones, date, username, destino, contadorId],
            titulos: [`id`, 'Numero', `Fecha`, `Origen`, `Destino`, `Moneda`, `Importe`, `importeArs`, `importeUsd`, `Tipo de Cambio`, `Forma de pago`, `fechaDevolucion`, `importe`, `importeArs`, `importeUsd`, `descripcion`, `tipoPagoColeccion`, `idColec`, `destinoColec`, `post`, `Devuelto`, `devolucionImporteArs`, `devolucionImporteUsd`, `Saldo`, `saldoArs`, `saldoUsd`, `Observaciones`, `Auditoria`, 'Usuario'],
            soloLectura: [num, tipoCambio, devolucion, saldo, saldoArs, date, devolucionImporte, username],
            oculto: [id, importeTotalArs, importeTotalUsd, devolucionImporteArs, devolucionImporteUsd, saldoUsd, saldoArs, origen, destino, fechaDevolucion, importe, importeArs, importeUsd, descripcion, tipoPagoColeccion, idColec, contadorId, destinoColec, post],
            deshabilitado: [importe, tipoPagoColeccion, fechaDevolucion],
            importe: {
                totalizadorCabecera: {
                    importeBase: {
                        total: [devolucionImporte],
                        cantidad: [],
                        digitosPositivos: [importe],
                        digitosNegativos: []
                    },
                    saldo: {
                        total: [saldo],
                        cantidad: [],
                        digitosPositivos: [importeTotal],
                        digitosNegativos: [devolucionImporte]
                    }
                },
                totalizadorColeccion: [],
                cantidad: [],
                importeBase: [importe, devolucionImporte, importeTotal],
                importePesos: [importeArs, devolucionImporteArs, importeTotalArs],
                importeUsd: [importeUsd, devolucionImporteUsd, importeTotalUsd],
            },
            compuesto: {
                prestamoCompuesto: prestamoCompuesto
            },
            signo: [],
            color: [],
            vistaPrevia: [],
            number: [importeTotal, importeTotalArs, importeTotalUsd, tipoCambio, devolucionImporte, devolucionImporteArs, devolucionImporteUsd, saldo, saldoArs, saldoUsd],
            date: [fecha],
            valoresIniciales: {
                funcion: {
                    fecha: fechaInicialHoy,

                },
                string: {
                    tipoCambio: ``,
                    destino: "Prestamos Fideicomisos",
                    contadorId: 0,

                },
                select: {
                    moneda: `Pesos`,
                }
            },
            configAbm: {
                with: {
                    cuatroCinco: [moneda, tipoCambio],
                    cinco: [num],
                    siete: [date, importeTotal, importe, devolucionImporte, saldo],
                    diez: [fecha, tipoPago, username],
                    quince: [unidades, unidadesDestino, observaciones],
                }
            },
            modificar: {
                names: [id, num, fecha, unidades, unidadesDestino, importeTotal, importeTotalArs, importeTotalUsd, tipoCambio, tipoPago, devolucion, devolucionImporteArs, devolucionImporteUsd, saldo, saldoArs, saldoUsd, observaciones, date, username, destino],
                pestanas: [tipoPago],
                soloLectura: [num, unidades, unidadesDestino, tipoCambio, moneda, devolucion, saldo, date, username],
            },
            eliminar: true,
            deshabilitar: false,
        },
        formInd: {
            compuesto: true,
            compuestoObligatorio: false,
            titulos: [`id`, 'Numero', `Fecha`, `Origen`, `Destino`, `Moneda`, `Importe`, `importeArs`, `importeUsd`, `Tipo de Cambio`, `Forma de pago`, `Compuesto`, `Devuelto`, `devolucionImporteArs`, `devolucionImporteUsd`, `Saldo`, `saldoArs`, `saldoUsd`, `Observaciones`, `Auditoria`, 'Usuario'],
            titulosCompuesto: {
                prestamoCompuesto: [`Fecha`, `Devolucion`, `Observaciones`, `Forma de pago`]
            },
            oculto: [id, num, origen, destino, importeTotalArs, importeTotalUsd, devolucionImporteArs, devolucionImporteUsd, saldoUsd, saldoArs, importeArs, importeUsd, contadorId, post, idColec, destinoColec],
            ordenFormu: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
            soloLectura: {
                compuesto: []
            },
            inputRenglones: [7, 6, 7, `compuesto`, 6],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [id, num, fecha, unidades, unidadesDestino, importeTotal, importeTotalArs, importeTotalUsd, tipoCambio, tipoPago, devolucion, devolucionImporteArs, devolucionImporteUsd, saldo, saldoArs, saldoUsd, observaciones, date, username, destino],
                compuesto: [importe, importeArs, importeUsd, fechaDevolucion, descripcion, idColec, tipoPagoColeccion, destinoColec, post],
                pestanas: [unidades, unidadesDestino, tipoPago, tipoPagoColeccion],
                soloLectura: [num, tipoCambio, devolucion, moneda, saldo, date, username],
            },
            impresion: {
                tituloFormulario: `Prestamos Inter-Company`,
                oculto: [id, origen, destino],
                titulosImpresionCompuesto: [`Rubro`, `Descripción`, `Bruto`, `importeArs`, `importeUsd`, `Cargos`, `otrosImpuestosArs`, `otrosImpuestosUsd`, `Subtotal`, `totalArs`, `totalUsd`],
            }
        },
        funcionesPropias: {
            cargar: {
                totalesBaseYMoneda: totalesBaseYMoneda, //Form ABM -- 834
            },
            formularioIndiv: {
                deshabitarValidarColec: deshabitarValidarColec,
                postPutColeccionInicial: postPutColeccionInicial,
            },
            coleccionFormIndividual: {
                idColeccion: idColeccion,
                postPutColeccionInicialAdd: postPutColeccionInicialAdd,
            },
        },
        numerador: {
            global: {
                0: {
                    name: `prestamosFideicomisos`,
                    filtro: false
                },
            },
        },
        acumulador: [],
        validaciones: [fecha, fechaDevolucion, importeTotal, nombre, moneda, tipoPago, unidades, unidadesDestino, tipoPagoColeccion, importe],
        key: {
            atributo: num,
            nombre: `numero`,
        },
        pest: `Prestamos Fideicomisos`,
        accion: `prestamosFideicomisos`,
        pestanas: {
            cabecera: [unidades, unidadesDestino, tipoPago, moneda],
            coleccion: [tipoPagoColeccion],
            totales: [unidades, unidadesDestino, tipoPago, moneda, tipoPagoColeccion],
        },
        tablaDobleEntrada: false,
        desencadena: {
            principal: [],
            desencadenaModif: {
                signoNumero: {
                    movimientoFinanciero: [importeTotal, importeTotalArs, importeTotalUsd],
                },
                atributo: {
                    movimientoFinanciero: {
                        atributoOrigen: [unidadesDestino],
                        atributoEnDestino: [unidades]
                    }
                },
                signoNumeroAtyributo: []
            },
            condicionalUnBooleano: [],
        },
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: {
                signoNumeroAtyributo: {
                    movimientoFinanciero: {
                        numero: [importeTotal, importeTotalArs, importeTotalUsd],
                        atributos: {
                            atributoOrigen: {
                                cabecera: [unidadesDestino, num, username, moneda],
                                colec: [fechaDevolucion, importe, importeArs, importeUsd, descripcion, tipoPagoColeccion, destinoColec]
                            },
                            atributoEnDestino: {
                                cabecera: [unidades, num, username, moneda],
                                colec: [fecha, importeTotal, importeTotalArs, importeTotalUsd, observaciones, tipoPago, origen]
                            }
                        }

                    }
                },
                atributo: {
                    movimientoFinanciero: {
                        atributoOrigen: {
                            cabecera: [unidades, num, username, moneda],
                            colec: [fechaDevolucion, importe, importeArs, importeUsd, descripcion, tipoPagoColeccion, destinoColec]

                        },
                        atributoEnDestino: {
                            cabecera: [unidades, num, username, moneda],
                            colec: [fecha, importeTotal, importeTotalArs, importeTotalUsd, observaciones, tipoPago, origen]
                        }
                    }
                }
            }
        },
        ayuda: {
            introduccion: `En esta entidad se registran los prestamos de In-inversiones.`,
            modificar: modficarInd,
            entidades: [],
            desencadena: [``],
            eliminar: true,
            deshabilitar: false,
            FiltroRapido: [],
        }
    },
    liquidacionMoneda: {
        atributos: {
            names: [id, num, fecha, unidades, logico, unidadesDestino, moneda, importeTotal, importeTotalArs, importeTotalUsd, tipoCambio, tipoPago, observaciones, date, username, destino],
            titulos: [`id`, 'Numero', `Fecha`, `Origen`, `Externo`, `Destino`, `Moneda`, `Importe`, `importeArs`, `importeUsd`, `Tipo de Cambio`, `Forma de pago`, `Observaciones`, `Auditoria`, 'Usuario'],
            soloLectura: [num, tipoCambio, date, username],
            oculto: [id, importeTotalArs, importeTotalUsd],
            deshabilitado: [importe, tipoPagoColeccion, fechaDevolucion],
            importe: {
                totalizadorCabecera: {
                    importeBase: {
                        total: [devolucionImporte],
                        cantidad: [],
                        digitosPositivos: [importe],
                        digitosNegativos: []
                    },
                    saldo: []
                },
                totalizadorColeccion: [],
                cantidad: [],
                importeBase: [importe],
                importePesos: [importeArs],
                importeUsd: [importeUsd],
            },
            compuesto: [],
            signo: [],
            color: [],
            vistaPrevia: [],
            number: [importeTotal, importeTotalArs, importeTotalUsd, tipoCambio],
            date: [fecha],
            valoresIniciales: {
                funcion: {
                    fecha: fechaInicialHoy,

                },
                string: [],
                select: {
                    moneda: `Dolar`,
                }
            },
            configAbm: {
                with: {
                    cuatroCinco: [moneda, tipoCambio],
                    cinco: [num],
                    siete: [date, importeTotal],
                    diez: [fecha, tipoPago, username],
                    quince: [nombre, unidades, unidadesDestino, observaciones],
                }
            },
            modificar: {
                names: [id, num, fecha, unidades, unidadesDestino, importeTotal, importeTotalArs, importeTotalUsd, tipoCambio, tipoPago, observaciones, date, username, destino],
                pestanas: [tipoPago],
                soloLectura: [num, unidades, unidadesDestino, tipoCambio, moneda, devolucion, saldo, date, username],
            },
            eliminar: true,
            deshabilitar: false,
        },
        formInd: {
            compuesto: true,
            compuestoObligatorio: false,
            titulos: [`id`, 'Numero', `Fecha`, `Origen`, `Externo`, `Destino`, `Moneda`, `Importe`, `importeArs`, `importeUsd`, `Tipo de Cambio`, `Forma de pago`, `Observaciones`, `Auditoria`, 'Usuario'],
            titulosCompuesto: [],
            oculto: [id, num, importeTotalArs, importeTotalUsd],
            ordenFormu: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
            soloLectura: {
                compuesto: []
            },
            inputRenglones: [, 6, 7, 5, 6],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [id, num, fecha, unidades, unidadesDestino, importeTotal, importeTotalArs, importeTotalUsd, tipoCambio, tipoPago, observaciones, date, username, destino],
                compuesto: [],
                pestanas: [tipoPago],
                soloLectura: [num, unidades, unidadesDestino, tipoCambio, moneda, devolucion, saldo, date, username],
            },
            impresion: {
                tituloFormulario: `Liquidacion moneda extrangera`,
                oculto: [],
                titulosImpresionCompuesto: [],
            }
        },
        funcionesPropias: {
            cargar: {
                totalesBaseYMoneda: totalesBaseYMoneda, //Form ABM -- 834

            },
            cargarDosAtributo: {
                lecturaLengthBooleano: [lecturaLengthBooleano, logico, unidadesDestino]
            },
            formularioIndiv: [],
            coleccionFormIndividual: [],
        },
        numerador: {
            global: {
                0: {
                    name: `liquidacionMoneda`,
                    filtro: false
                },
            },
        },
        acumulador: [],
        validaciones: [fecha],
        key: {
            atributo: num,
            nombre: `numero`,
        },
        pest: `Moneda Extrangera`,
        accion: `liquidacionMoneda`,
        pestanas: {
            cabecera: [unidades, unidadesDestino, tipoPago, moneda],
            coleccion: [],
            totales: [unidades, unidadesDestino, tipoPago, moneda, tipoPagoColeccion],
        },
        tablaDobleEntrada: false,
        desencadena: {
            principal: [],
            desencadenaModif: {
                signoNumero: {
                    movimientoFinanciero: [importeTotal, importeTotalArs, importeTotalUsd],
                },
                atributo: {
                    movimientoFinanciero: {
                        atributoOrigen: [unidadesDestino],
                        atributoEnDestino: [unidades]
                    }
                },
                signoNumeroAtyributo: []
            },
            condicionalUnBooleano: [],
        },
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran las operaciones de monedas extrangeras
             de In-inversiones.`,
            modificar: modficarInd,
            entidades: [],
            desencadena: [`Movimientos financieros`],
            eliminar: true,
            deshabilitar: false,
            FiltroRapido: [],
        }
    },
    icc: {
        atributos: {
            names: [_id, fecha, tipoCambio, date, username],
            titulos: [`_id`, `Fecha`, 'ICC', 'Auditoria', 'Usuario'],
            soloLectura: [date, username],
            oculto: [_id],
            compuesto: [],
            signo: [],
            color: [],
            number: [tipoCambio],
            date: [fecha],
            valoresIniciales: {
                funcion: {
                    fecha: fechaInicialHoy
                },
                string: [],
                select: [],
            },
            configAbm: {
                with: {
                    cuatroCinco: [],
                    cinco: [],
                    siete: [fecha, tipoCambio, date, username],
                    diez: [],
                    quince: [],
                }
            },
        },
        modificar: {
            names: [_id, fecha, tipoCambio, date, username],
            soloLectura: [date, username],
        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, `Fecha`, 'ICC', 'Auditoria', 'Usuario'],
            titulosCompuesto: [],
            oculto: [_id],
            ordenFormu: [0, 1, 2, 3, 4],
            soloLectura: {
                compuesto: []
            },
        },
        funcionesPropias: [],
        numerador: [],
        acumulador: [],
        validaciones: [fecha, tipoCambio,],
        key: {
            atributo: fecha,
            nombre: `fecha`,
        },
        pest: `ICC`,
        accion: `icc`,
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
    },
    tipoCambio: {
        atributos: {
            names: [_id, fecha, tipoCambio, tipoCambioAlternativo, date, username],
            titulos: [`_id`, `Fecha`, 'BNA', `Blue`, 'Auditoria', 'Usuario'],
            soloLectura: [date, username],
            oculto: [_id],
            compuesto: [],
            signo: [],
            color: [],
            number: [tipoCambio, tipoCambioAlternativo],
            date: [fecha],
            valoresIniciales: {
                funcion: {
                    fecha: fechaInicialHoy
                },
                string: [],
                select: [],
            },
            configAbm: {
                with: {
                    cuatroCinco: [],
                    cinco: [fecha, tipoCambio, tipoCambioAlternativo],
                    siete: [date, username],
                    diez: [],
                    quince: [],
                }
            },
        },
        modificar: {
            names: [_id, fecha, tipoCambio, tipoCambioAlternativo, date, username],
            soloLectura: [date, username],
        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, `Fecha`, 'BNA', `Blue`, 'Auditoria', 'Usuario'],
            titulosCompuesto: [],
            oculto: [_id],
            ordenFormu: [0, 1, 2, 3, 4, 5, 6, 7],
            soloLectura: {
                compuesto: []
            },
        },
        funcionesPropias: [],
        numerador: [],
        acumulador: [],
        validaciones: [fecha, tipoCambio, tipoCambioAlternativo,],
        key: {
            atributo: fecha,
            nombre: `fecha`,
        },
        pest: `Tipo de Cambio`,
        accion: `tipoCambio`,
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
    },
    users: {
        atributos: {
            names: [_id, nombre, apellido, email, logico, usuario, password, username, habilitado],
            titulos: [`_id`, 'Nombre', `Apellido`, `Email`, `Empleado`, `Username`, `Contraseña`, 'Auditoria', 'Usuario'],
            soloLectura: [password, date, username],
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
                select: []
            },
            configAbm: {
                with: {
                    cuatroCinco: [],
                    cinco: [],
                    siete: [],
                    diez: [],
                    quince: [],
                }
            },
            modificar: {
                names: [_id, nombre, direccion, email, date, username],
                pestanas: [],
                soloLectura: [date, username],
            },
            eliminar: false,
            deshabilitar: true
        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, 'Nombre', `Apellido`, `Email`, `Empleado`, `Usuario`, `Contraseña`, 'Auditoria', 'Usuario'],
            titulosCompuesto: [],
            oculto: [_id, habilitado],
            ordenFormu: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            inputRenglones: [4, 4, 4, 4, 6],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [_id, nombre, direccion, email, date, username],
                pestanas: [],
                soloLectura: [date, username],
            },
            impresion: {
                tituloFormulario: `Usuarios`,
                ocultoImpresion: [_id, id, mono, unaHab, dosHab, tresHab, cuatroHab, habilitado],
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
            atributo: email,
            nombre: `email`,
        },
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
    unidades: {
        atributos: {
            names: [_id, nombre, direccion, pisos, deptos, oficinaTotal, cocheraTotal, localesTotal, mono, unaHab, dosHab, tresHab, cuatroHab, plantaBaja, subsuelo, torres, date, username, habilitado],
            titulos: [`_id`, 'Nombre', `Direccion`, `Pisos`, `Deptos`, `Oficinas`, `Cocheras`, `Local`, `mono`, `unaHab`, `dosHab`, `tresHab`, `cuatroHab`, `Plantas Bajas`, `Subsuelos`, `Torres`, 'Auditoria', 'Usuario'],
            soloLectura: [date, username],
            oculto: [_id, mono, unaHab, dosHab, tresHab, cuatroHab, habilitado],
            importe: {
                totalizador: [],
                importeBase: [],
                importePesos: [],
                importeUsd: [],
            },
            compuesto: [],
            signo: [],
            color: {
                verde: [plantaBaja, subsuelo, torres]
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
                names: [_id, nombre, direccion, pisos, deptos, oficinaTotal, cocheraTotal, localesTotal, mono, unaHab, dosHab, tresHab, cuatroHab, plantaBaja, subsuelo, torres, date, username],
                pestanas: [],
                soloLectura: [date, username],
            },
            eliminar: false,
            deshabilitar: true
        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, 'Nombre', `Direccion`, `Pisos`, `Deptos`, `Oficinas`, `Cocheras`, `Locales`, `mono`, `unaHab`, `dosHab`, `tresHab`, `cuatroHab`, `Plantas Bajas`, `Subsuelos`, `Torres`, 'Auditoria', 'Usuario'],
            titulosCompuesto: [],
            oculto: [_id, mono, unaHab, dosHab, tresHab, cuatroHab, habilitado],
            ordenFormu: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            inputRenglones: [4, 4, 4, 4, 6],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [_id, nombre, direccion, pisos, deptos, oficinaTotal, cocheraTotal, localesTotal, mono, unaHab, dosHab, tresHab, cuatroHab, plantaBaja, subsuelo, torres, date, username],
                pestanas: [],
                soloLectura: [date, username],
            },
            impresion: {
                tituloFormulario: `Unidades`,
                ocultoImpresion: [_id, id, mono, unaHab, dosHab, tresHab, cuatroHab, habilitado],
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
            columna: [plantaBaja, subsuelo, torres], //fila
            tituloColumna: [`Planta Baja`, `Subsuelo`, `Torre`],
            nameDobleEn: [mono, unaHab, dosHab, tresHab, cuatroHab, oficina, cochera, locales, totales],
            titulosDobleEn: ['Mono', `Una Hab`, `Dos Hab`, `Tres Hab`, `Cuatro Hab`, `Oficinas`, `Cocheras`, `Loc Com`, `Total`],
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
    cliente: {
        atributos: {
            names: [id, num, nombre, dni, telefono, email, direccion, ciudad, tipoPago, observaciones, departamento, username, date, habilitado],
            titulos: [`id`, 'Numero', 'Nombre ', `DNI/CUIT`, `Telefono`, `Email`, `Dirección`, `Ciudad`, `Forma de pago`, `Observaciones`, `Fideicomiso`, `Piso`, `Letra`, `Nro`, `Tipo de Unidad`, `descripcion`, 'Usuario', 'Auditoria'],
            soloLectura: [id, num, username, date],
            oculto: [id, habilitado],
            compuesto: {
                departamento: departamento
            }, //form unica instancia 865 y 1028
            signo: [],
            color: {
                amarillo: [unidades, piso, letra, numer, tipoUnidad, descripcion]
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
            },
            configAbm: {
                with: {
                    cuatroCinco: [num, piso, letra, numer],
                    cinco: [],
                    siete: [dni, telefono, email, username, date, tipoUnidad],
                    diez: [nombre, ciudad, unidades],
                    quince: [direccion, observaciones],
                }
            },
            modificar: {
                names: [id, num, nombre, dni, telefono, email, direccion, ciudad, tipoPago, observaciones, username, date],
                pestanas: [ciudad, tipoPago],
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
            titulos: [`id`, 'Numero', 'Nombre ', `DNI/CUIT`, `Telefono`, `Email`, `Dirección`, `Ciudad`, `Forma de pago`, `Observaciones`, `Departamentos`, 'Usuario', 'Auditoria'],
            titulosCompuesto: {
                departamento: [`Fideicomiso`, `Piso`, `Letra`, `Nro`, `Tipo de Unidad`, `Descripcion`,]
            },
            soloLectura: [],
            oculto: [id, num, habilitado],
            ordenFormu: [0, 3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25],
            inputRenglones: [4, 4, 2, `compuesto`, 6],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [id, num, nombre, departamento, dni, telefono, email, direccion, ciudad, tipoPago, observaciones, unidades, piso, letra, numer, tipoUnidad, descripcion, username, date],
                pestanas: [unidades, tipoUnidad, ciudad, tipoPago],
                soloLectura: [id, username, date],
            },
            impresion: {
                tituloFormulario: `Cliente`,
                oculto: [id, num],
                titulosImpresionCompuesto: []
            }
        },
        funcionesPropias: {
            formularioIndiv: {

            },
            cargar: {
                //           inhabilitarNumer: inhabilitarNumer
            },
            cargarDosAtributo: {
                lecturaUnoUOtro: [lecturaUnoUOtro, letra, numer]
            },
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
                    filtro: false
                },
            },
        },
        validaciones: [nombre, unidades, tipoUnidad, dni, telefono, email, direccion, ciudad, tipoPago, piso, letra, numer],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Propietarios`,
        accion: `cliente`,
        pestanas: {
            cabecera: [ciudad, tipoPago],
            coleccion: [unidades, tipoUnidad],
            totales: [unidades, tipoUnidad, ciudad, tipoPago],
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
    rubro: {
        atributos: {
            names: [_id, nume, nombre, date, username, habilitado],
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
                    cinco: [nume],
                    siete: [username, date],
                    diez: [],
                    quince: [nombre],
                }
            },
            modificar: {
                names: [_id, nume, nombre, date, username],
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
                names: [_id, nume, nombre, date, username],
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
        numerador: [],
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
    proveedor: {
        atributos: {
            names: [id, num, nombre, dni, telefono, email, direccion, ciudad, tipoPago, observaciones, username, date, habilitado],
            titulos: [`id`, 'Numero', 'Nombre', `DNI/CUIT`, `Telefono`, `Email`, `Dirección`, `Ciudad`, `Forma de pago`, `Observaciones`, 'Usuario', 'Auditoria'],
            soloLectura: [num, username, date],
            oculto: [id, habilitado],
            importe: {
                totalizador: [],
                importeBase: [],
                importePesos: [],
                importeUsd: [],
            },
            coompuesto: [],
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
                    siete: [dni, telefono, username, date],
                    diez: [nombre, email, direccion, ciudad, tipoPago],
                    quince: [observaciones],
                }
            },
            modificar: {
                names: [id, num, nombre, dni, telefono, email, direccion, ciudad, tipoPago, observaciones, username, date],
                pestanas: [ciudad, tipoPago],
                soloLectura: [num, username, date],
            },
            eliminar: false,
            deshabilitar: true
        },
        formInd: {
            compuesto: false,
            titulos: [`id`, 'Numero', 'Nombre', `DNI/CUIT`, `Telefono`, `Email`, `Dirección`, `Ciudad`, `Forma de pago`, `Observaciones`, 'Usuario', 'Auditoria'],
            oculto: [id, num, habilitado],
            ordenFormu: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            inputRenglones: [4, 4, 5],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [id, num, nombre, dni, telefono, email, direccion, ciudad, tipoPago, observaciones, username, date],
                pestanas: [ciudad, tipoPago],
                soloLectura: [num, username, date],
            },
            impresion: {
                tituloFormulario: `Proveedores`,
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
        numerador: {
            global: {
                0: {
                    name: `proveedor`,
                    filtro: false
                },
            }
        },

        validaciones: [nombre, dni, telefono, email, direccion, ciudad, tipoPago],
        key: {
            atributo: dni,
            nombre: `dni`,
        },
        pest: `Proveeedor`,
        accion: `proveedor`,
        pestanas: {
            cabecera: [ciudad, tipoPago],
            coleccion: [],
            totales: [ciudad, tipoPago],
        },
        tablaDobleEntrada: false,
        desencadena: false,
        desencadenaColeccion: {
            principal: [],
            desencadenaModif: []
        },
        ayuda: {
            introduccion: `En esta entidad se registran los proveedores' que utiliza In-inversiones.`,
            modificar: modficarTodo,
            entidades: [`Pagos realizados`, `Acopio`],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    rubroPagos: {
        atributos: {
            names: [_id, nume, nombre, agrupadorRubrosPago, date, username, habilitado],
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
                    cuatroCinco: [nume],
                    cinco: [],
                    siete: [username, date],
                    diez: [nombre, agrupadorRubrosPago],
                    quince: [],
                }
            },
            modificar: {
                names: [_id, nume, nombre, agrupadorRubrosPago, date, username],
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
                names: [_id, nume, nombre, agrupadorRubrosPago, date, username],
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
        validaciones: [nume, nombre, agrupadorRubrosPago],
        key: {
            atributo: nume,
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
    moneda: {
        atributos: {
            names: [_id, nombre, abrev, date, username, habilitado],
            titulos: [`_id`, `Nombre`, `$`, 'Auditoria', 'Usuario'],
            soloLectura: [date, username],
            oculto: [_id, habilitado],
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
                    diez: [nombre],
                    quince: [],
                }
            },
            modificar: {
                names: [_id, nombre, abrev, date, username],
                pestanas: [],
                soloLectura: [date, username]
            },
            eliminar: false,
            deshabilitar: true
        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, `Nombre`, `$`, 'Auditoria', 'Usuario'],
            oculto: [_id, habilitado],
            ordenFormu: [0, 1, 2, 3, 4],
            inputRenglones: [5, 5],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [_id, nombre, abrev, date, username],
                pestanas: [],
                soloLectura: [date, username]
            },
            impresion: {
                tituloFormulario: `Moneda`,
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
        validaciones: [nombre, abrev],
        key: {
            atributo: nombre,
            nombre: `nombre`,
        },
        pest: `Moneda`,
        accion: `moneda`,
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
            introduccion: `En esta entidad se registran las monedas que utiliza In-inversiones.`,
            modificar: modficarTodo,
            entidades: [`Cobros recibidos`, `Pagos realizados`, `Movimientos financieros`, `Prestamos Fideicomisos`, `Devolucion de Pestamos`],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    tipoPago: {
        atributos: {
            names: [_id, nombre, date, username, habilitado],
            titulos: [`_id`, `Nombre`, 'Auditoria', 'Usuario'],
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
                    inputRenglones: [5, 5]
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
            titulos: [`_id`, `Nombre`, 'Auditoria', 'Usuario'],
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
                tituloFormulario: `Tipo de pago`,
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
        pest: `Forma de Pago`,
        accion: `tipoPago`,
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
            introduccion: `En esta entidad se registran los tipos de pagos que utiliza In-inversiones.`,
            modificar: modficarTodo,
            entidades: [`Cobros recibidos`, `Pagos realizados`, `Acopios`, `Proyecciones Cash Flow`, `Movimientos financieros`, `Prestamos Fideicomisos`, `Devolucion de Pestamos`],
            desencadena: [],
            eliminar: false,
            deshabilitar: true,
            FiltroRapido: `Habitalitado/deshabilitado`
        }
    },
    tipoComprobante: {
        atributos: {
            names: [_id, letraComprobante, nombre, date, username, habilitado],
            titulos: [`_id`, `Letra`, `Nombre`, 'Auditoria', 'Usuario'],
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
                    cuatroCinco: [letraComprobante],
                    cinco: [],
                    siete: [date, username],
                    diez: [nombre],
                    quince: [],
                }
            },
            modificar: {
                names: [_id, letraComprobante, nombre, date, username],
                pestanas: [],
                soloLectura: [date, username]
            },
            eliminar: false,
            deshabilitar: true
        },
        formInd: {
            compuesto: false,
            titulos: [`_id`, `Letra`, `Nombre`, 'Auditoria', 'Usuario'],
            titulosCompuesto: [],
            oculto: [_id],
            ordenFormu: [0, 1, 2, 3, 4, 5, 6],
            inputRenglones: [5, 5],
            soloLectura: {
                compuesto: []
            },
            modificar: {
                names: [_id, letraComprobante, nombre, date, username],
                pestanas: [],
                soloLectura: [date, username]
            },
            impresion: {
                tituloFormulario: `Tipo de comprobante`,
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
        validaciones: [letraComprobante, nombre],
        key: {
            atributo: letraComprobante,
            nombre: `Letra Comprobante`,
        },
        pest: `Tipo Comprobante`,
        accion: `tipoComprobante`,
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
            introduccion: `En esta entidad se registran los tipos de comprobantes fiscales`,
            modificar: modficarTodo,
            entidades: ["Registro Factura"],
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
            names: [id, nombre, cp, provincia, pais, date, username, habilitado],
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
                    cuatroCinco: [cp],
                    cinco: [],
                    siete: [username, date],
                    diez: [nombre, provincia],
                    quince: [],
                }
            },
            modificar: {
                names: [id, nombre, cp, provincia, pais, date, username],
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
                names: [id, nombre, cp, provincia, pais, date, username],
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
        validaciones: [nombre, cp, provincia, pais],
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

////////////////ESCRITORIO///////////////
///CAJA Y BANCOS////

let progressBarFun = function (numeroForm) {


    let valorPrgress = $(`#bf${numeroForm} .progressBar`).css(`--with`)


    if (parseFloat(valorPrgress) > 70) {

        $(`#bf${numeroForm} .progressBar`).css(`--with`, 10)
    } else {
        $(`#bf${numeroForm} .progressBar`).css(`--with`, parseFloat(valorPrgress) + 10)

    }

}
const numerosNegativos = function () {
    let ars = $(`.arsHome`);

    $.each(ars, function (indice, value) {
        Math.sign(value)
    })
}
