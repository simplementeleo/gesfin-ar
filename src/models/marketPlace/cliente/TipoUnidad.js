const { Schema, model } = require("mongoose");


const TiposDeUnidadesSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date },
    username: {
        type: Schema.Types.ObjectId,
        ref: "usuarios"
    },
    habilitado: { type: Boolean },
});

module.exports = model("TipoDeUnidades", TiposDeUnidadesSchema);