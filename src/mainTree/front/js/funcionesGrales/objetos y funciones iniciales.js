let variablesIniciales = {

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
}
