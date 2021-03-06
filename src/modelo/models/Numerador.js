const { Schema, model } = require("mongoose");


const NumeroSchema = new Schema({
    name: { type: String, required: true },
    num: { type: Number, required: true },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Unidad"
    }

});


module.exports = model("Numerador", NumeroSchema);