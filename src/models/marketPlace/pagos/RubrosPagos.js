const { Schema, model } = require("mongoose");


const RubrosPagosSchema = new Schema({
    nume: { type: String },
    name: { type: String, required: true },
    agrupadorRubrosPago: {
        type: Schema.Types.ObjectId,
        ref: "AgrupadorRubros"
    },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Unidad"
    },
    habilitado: { type: Boolean }

});

module.exports = model("RubrosPagos", RubrosPagosSchema); s