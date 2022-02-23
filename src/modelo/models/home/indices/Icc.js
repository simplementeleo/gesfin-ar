const { Schema, model } = require("mongoose");


const IccSchema = new Schema({
    fecha: { type: Date, required: true },
    tipoCambio: { type: Number, required: true },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "Unidad"
    }

});


module.exports = model("Icc", IccSchema);