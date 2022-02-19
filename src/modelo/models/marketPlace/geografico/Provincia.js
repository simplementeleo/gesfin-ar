const { Schema, model } = require("mongoose");

const ProvinciaSchema = new Schema({
    name: { type: String, required: true },
    pais: {
        type: Schema.Types.ObjectId,
        ref: "Pais"
    },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Unidad"
    },
    habilitado:{ type: Boolean },

});


module.exports = model("Provincia", ProvinciaSchema);