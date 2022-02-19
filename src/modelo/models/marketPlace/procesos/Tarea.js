const { Schema, model } = require("mongoose");


const TareaSchema = new Schema({
    orden:{type: Number},
    name: { type: String, required: true },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Unidad"
    },
    habilitado: { type: Boolean }
});

module.exports = model("Tarea", TareaSchema);