const { Schema, model } = require("mongoose");


const TipoCambioSchema = new Schema({
    fecha: { type: Date, required: true },
    tipoCambio: { type: Number, required: true },
    tipoCambioAlternativo: { type: Number, required: true },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Unidad"
    }

});


module.exports = model("TipoCambio", TipoCambioSchema);