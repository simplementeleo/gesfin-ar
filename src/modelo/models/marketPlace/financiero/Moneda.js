const { Schema, model } = require("mongoose");


const MonedaSchema = new Schema({
    name: { type: String, required: true },
    abrev: { type: String },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    habilitado: { type: Boolean }, 

});


module.exports = model("Moneda", MonedaSchema);