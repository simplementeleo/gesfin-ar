const { Schema, model } = require("mongoose");


const ProyeccionesCashSchema = new Schema({
    identificador: { type: String, required: true },
    previsto: { type: Number },
    gastoReal: { type: Number },
    pagado: { type: Number },
    aPagar: { type: Number },
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