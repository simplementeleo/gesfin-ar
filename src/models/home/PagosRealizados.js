const { Schema, model } = require("mongoose");


const PagosRealizadosSchema = new Schema({
    num: { type: Number, required: true },
    unidades: {
        type: Schema.Types.ObjectId,
        ref: "unidades"
    },
    fecha: { type: Date },
    proveedor: {
        type: Schema.Types.ObjectId,
        ref: "proveedor"
    },
    moneda: {
        type: Schema.Types.ObjectId,
        ref: "moneda"
    },
    tipoCambio: { type: Number },
    tipoPagos: {
        type: Schema.Types.ObjectId,
        ref: "formaPago"
    },
    observaciones: { type: String },
    logico: { type: Boolean },
    estado: { type: String },
    fechaDos: { type: Date },
    filename: { type: [String] },
    path: { type: [String] },
    originalname: { type: [String] },
    cantidad: { type: [Number] },
    rubroPagos: {
        type: [Schema.Types.ObjectId],
        ref: "rubro"
    },
    subRubroPagos: {
        type: [Schema.Types.ObjectId],
        ref: "subRubro"
    },
    descripcion: { type: [String] },
    importe: { type: [Number] },
    importeArs: { type: [Number] },
    importeUsd: { type: [Number] },
    impuestoUno: { type: [Number] },
    impuestoUnoArs: { type: [Number] },
    impuestoUnoUsd: { type: [Number] },
    impuestoDos: { type: [Number] },
    impuestoDosArs: { type: [Number] },
    impuestoDosUsd: { type: [Number] },
    importeDos: { type: [Number] },
    importeDosArs: { type: [Number] },
    importeDosUsd: { type: [Number] },
    importeDesencadenado: { type: Number },
    importeDesencadenadoArs: { type: Number },
    importeDesencadenadoUsd: { type: Number },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "unidad"
    }
});

module.exports = model("PagosRealizados", PagosRealizadosSchema);