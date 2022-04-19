const { Schema, model } = require("mongoose");


const AgrupadorRubroPagosSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Unidad"
    },
    habilitado: { type: Boolean }

});

module.exports = model("AgrupadorRubroPagos", AgrupadorRubroPagosSchema);