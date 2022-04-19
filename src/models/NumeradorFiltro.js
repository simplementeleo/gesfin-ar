const { Schema, model } = require("mongoose");


const NumeroSchema = new Schema({
    name: { type: String, required: true },
    num: { type: Number, required: true },
    unidades: {
        type: Schema.Types.ObjectId,
        ref: "Referencia"
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Unidad"
    }

});


module.exports = model("NumeradorFiltro", NumeroSchema);