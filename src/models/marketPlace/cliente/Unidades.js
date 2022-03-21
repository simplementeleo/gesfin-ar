const { Schema, model } = require("mongoose");


const UnidadesSchema = new Schema({
    name: { type: String, required: true },
    direccion: { type: String, required: true },
    pisos: { type: String },
    deptos: { type: String },
    oficinaTotal: { type: String },
    cocheraTotal: { type: String },
    localesTotal: { type: String },
    plantaBaja: { type: String },
    subsuelo: { type: String },
    torres: { type: String },
    mono: { type: Object },
    unaHab: { type: Object },
    dosHab: { type: Object },
    tresHab: { type: Object },
    cuatroHab: { type: Object },
    oficina: { type: Object },
    cochera: { type: Object },
    locales: { type: Object },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Unidad"
    },
    habilitado: { type: Boolean }
});

module.exports = model("Unidades", UnidadesSchema);