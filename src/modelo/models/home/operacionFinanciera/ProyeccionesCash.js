const { Schema, model } = require("mongoose");


const ProyeccionesCashSchema = new Schema({
    identificador: { type: String, required: true },
    importe: { type: Number },
    importeDos: { type: Number },
    importeTres: { type: Number },
    importeCuatro: { type: Number },
    meses: { type: Object },
    unidades: {
        type: Schema.Types.ObjectId,
        ref: "unidades"
    },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "username"
    }
});



module.exports = model("ProyeccionesCash", ProyeccionesCashSchema);