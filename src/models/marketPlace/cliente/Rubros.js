const { Schema, model } = require("mongoose");


const RubrosSchema = new Schema({
    num: { type: String },
    name: { type: String, required: true },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "ciudad"
    },
    habilitado: { type: Boolean },
});

module.exports = model("Rubros", RubrosSchema);