const { Schema, model } = require("mongoose");


const ErrorSchema = new Schema({
    num: { type: Number, required: true },
    fecha: { type: Date },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: "Cliente"
    },
    observaciones: { type: String },
    observacionesCompleto: { type: String },
    criticidad: {
        type: Schema.Types.ObjectId,
        ref: "Criticidad"
    },
    filename: { type: String },
    path: { type: String },
    originalname: { type: String },
    estado: {
        type: Schema.Types.ObjectId,
        ref: "Estado"
    },
    fechaDos: { type: Date },
    descripcionCompleto: { type: String },
    fechaTres: { type: Date },
    tarea: {
        type: [Schema.Types.ObjectId],
        ref: "Tarea"
    },
    tiempoEstimado: { type: [String] },
    tiempoConsumido: { type: [String] },
    tiempoRemanente: { type: [String] },
    observacionesColec: { type: [String] },
    descripcionAdjunto: { type: [String] },
    filenameColec: { type: [String] },
    originalnameColec: { type: [String] },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "unidad"
    },

});

//////////

module.exports = model("Error", ErrorSchema);