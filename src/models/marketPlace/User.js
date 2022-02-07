const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    name: { type: String },
    surname: { type: String },
    username: { type: String, unique: true },
    email: { type: String,  unique: true },
    password: { type: String },
    date: { type: Date, default: Date.now() },
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);