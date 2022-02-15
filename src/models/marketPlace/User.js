const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    name: { type: String },
    surname: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    logico: { type: Boolean },
    username: { type: String, unique: true },
    date: { type: Date, default: Date.now() },
    usuario: { type: String, unique: true },
    habilitado: { type: Boolean },
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);