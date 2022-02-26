const { Schema, model } = require("mongoose");


const MovimientosFinancierosSchema = new Schema({
    num: { type: Number, required: true },
    origen: { type: String },
    fecha: { type: Date },
    unidades: {
        type: Schema.Types.ObjectId,
        ref: "unidades"
    },
    moneda: {
        type: Schema.Types.ObjectId,
        ref: "moneda"
    },
    importeDesencadenado: { type: Number },
    importeDesencadenadoArs: { type: Number },
    importeDesencadenadoUsd: { type: Number },
    tipoCambio: { type: Number },
    tipoPagos: {
        type: Schema.Types.ObjectId,
        ref: "formaPago"
    },
    observaciones: { type: String },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "username"
    },
    idDesen: {
        type: Schema.Types.ObjectId,
        ref: "desencadenante"
    },
    desen: { type: String },
    position: { type: [String] },
    idColec: { type: [String] }

});



module.exports = model("MovimientosFinancieros", MovimientosFinancierosSchema);