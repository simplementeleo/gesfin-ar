const { Schema, model } = require("mongoose");


const SubRubrosPagosSchema = new Schema({
    num: { type: Number },
    name: { type: String, required: true },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    habilitado: {type: Boolean }

});

module.exports = model("SubRubrosPagos", SubRubrosPagosSchema);