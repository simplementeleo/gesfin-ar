const { Schema, model } = require("mongoose");


const CobrosRecibidosSchema = new Schema({
    num: { type: Number, required: true },
    unidades: {
        type: Schema.Types.ObjectId,
        ref: "unidades"
    },
    fecha: { type: Date },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: "Cliente"
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
    filename: { type: String },
    path: { type: String },
    originalname: { type: String },
    rubro: {
        type: [Schema.Types.ObjectId],
        ref: "rubro"
    },
    descripcion: { type: [String] },
    importe: { type: [Number] },
    importeArs: { type: [Number] },
    importeUsd: { type: [Number] },
    impuestoUno: { type: [Number] },
    impuestoUnoArs: { type: [Number] },
    impuestoUnoUsd: { type: [Number] },
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
    },

    totalImporteArs: { type: Number },
    totalImporteUsd: { type: Number },

});



module.exports = model("CobrosRecibidos", CobrosRecibidosSchema);