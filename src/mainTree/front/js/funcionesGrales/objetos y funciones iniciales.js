let variablesIniciales = {
    unidades: {
        atributos: {
            names: [_id, nombre, direccion, pisos, deptos, oficinaTotal, cocheraTotal, localesTotal, mono, unaHab, dosHab, tresHab, cuatroHab, unidadesTorres, date, username, habilitado],
            titulos: [`_id`, 'Nombre', `Direccion`, `Pisos`, `Deptos`, `Oficinas`, `Cocheras`, `Local`, `mono`, `unaHab`, `dosHab`, `tresHab`, `cuatroHab`, `Torres`, 'Auditoria', 'Usuario'],
            soloLectura: [date, username],
            oculto: [_id, mono, unaHab, dosHab, tresHab, cuatroHab, descripcion, habilitado],
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
                names: [_id, nombre, direccion, pisos, deptos, oficinaTotal, cocheraTotal, localesTotal, mono, unaHab, dosHab, tresHab, cuatroHab, plantaBaja, subsuelo, torres, date, username],
                pestanas: [],
                soloLectura: [date, username],
            },
            eliminar: false,
            deshabilitar: true
        },
        formInd: {
            compuesto: true,
            titulos: [`_id`, 'Nombre', `Direccion`, `Pisos`, `Deptos`, `Oficinas`, `Cocheras`, `Locales`, `mono`, `unaHab`, `dosHab`, `tresHab`, `cuatroHab`, `Plantas Bajas`, `Subsuelos`, `Torres`, 'Auditoria', 'Usuario'],
            titulosCompuesto: [`Nombre`, `Descrpción`],
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
            abm: true,
            type: `regular`,
            filaType: `baseInterna`,
            fila: [plantaBaja, subsuelo, torres], //fila
            tituloFila: [``],
            columnaType: `fija`,
            columna: [mono, unaHab, dosHab, tresHab, cuatroHab, oficina, cochera, locales, totales],
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

    }
}
