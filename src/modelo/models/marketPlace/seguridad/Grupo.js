const { Schema, model } = require("mongoose");

const GrupoSchema = new Schema({
    name: { type: String },
    observaciones: { type: String },
    date: { type: Date, default: Date.now() },
    username: {
        type: Schema.Types.ObjectId,
        ref: "usuario"
    },
    habilitado: { type: Boolean },
});

module.exports = model("Grupo", GrupoSchema);