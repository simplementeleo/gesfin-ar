const { Schema, model } = require("mongoose");


const ProveedorSchema = new Schema({
    num: { type: Number, required: true },
    name: { type: String },
    documento: { type: String },
    telefono: { type: String },
    email: { type: String },
    direccion: { type: String },
    ciudad: {
        type: Schema.Types.ObjectId,
        ref: "ciudad"
    },
    tipoPago: {
        type: Schema.Types.ObjectId,
        ref: "TipoCobroProveedores"
    },

    observaciones: { type: String },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    },
    date: { type: Date },
    habilitado: { type: Boolean }

});

module.exports = model("Proveedor", ProveedorSchema);