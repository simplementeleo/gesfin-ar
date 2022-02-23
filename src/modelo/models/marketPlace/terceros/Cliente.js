const { Schema, model } = require("mongoose");


const ClientesSchema = new Schema({
    num: { type: Number, required: true },
    name: { type: String, required: true },
    documento: { type: String },
    telefono: { type: String },
    email: { type: String },
    direccion: { type: String },
    ciudad: {
        type: Schema.Types.ObjectId,
        ref: "ciudad"
    },
    observaciones: { type: String },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    },
    date: { type: Date },
    habilitado: { type: Boolean }

});



module.exports = model("Clientes", ClientesSchema);