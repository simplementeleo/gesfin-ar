const { Schema, model } = require("mongoose");


const CiudadSchema = new Schema({
    name: { type: String, required: true },
    cp: { type: Number, required: true },
    provincia: {
        type: Schema.Types.ObjectId,
        ref: "Provincia"
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: "Pais"
    },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Unidad"
    },
    habilitado: { type: Boolean }

});


module.exports = model("Ciudad", CiudadSchema);