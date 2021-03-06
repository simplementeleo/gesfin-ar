const mongoose = require("mongoose");
const config = require("./config");

const MONGODB_URI = `mongodb://localhost/mainTree`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: false,
})
    .then((db) => console.log("Mongodb is connected to", db.connection.host))
    .catch((err) => console.error(err));