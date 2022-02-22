const { Schema, model } = require("mongoose");


const TipoPagoschema = new Schema({

    name: { type: String, required: true },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "usuario"
    },
    habilitado: { type: Boolean }

});

module.exports = model("TipoPagos", TipoPagoschema);