const { Schema, model } = require("mongoose");


const CriticidadSchema = new Schema({
    orden:{type: Number},
    name: { type: String, required: true },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Unidad"
    },
    habilitado: { type: Boolean }
});

module.exports = model("Criticidad", CriticidadSchema);