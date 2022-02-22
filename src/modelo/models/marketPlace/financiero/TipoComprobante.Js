const { Schema, model } = require("mongoose");


const tipoComprobanteSchema = new Schema({
    letraComprobante: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    habilitado: { type: Boolean },

});


module.exports = model("tipoComprobante", tipoComprobanteSchema);