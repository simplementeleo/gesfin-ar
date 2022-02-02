const { Schema, model } = require("mongoose");


const PaisSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Unidad"
    },
    habilitado: { type: Boolean }


});

module.exports = model("Pais", PaisSchema);