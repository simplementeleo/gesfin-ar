const { Schema, model } = require("mongoose");

const GrupoSchema = new Schema({
    name: { type: String },
    observaciones: { type: String },
    date: { type: Date, default: Date.now() },
    habilitado: { type: Boolean },
    visualizar: { type: Object },
    editar: { type: Object },
    eliminar: { type: Object },
    limite: { type: Object },
    username: {
        type: Schema.Types.ObjectId,
        ref: "usuario"
    },
    habilitado: { type: Boolean }

});

module.exports = model("Grupo", GrupoSchema);