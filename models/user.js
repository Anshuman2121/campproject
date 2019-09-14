var mongoose = require("mongoose"),
    passportLocal = require("passport-local-mongoose");

var Schema = new mongoose.Schema({
    username : String,
    password : String
});

Schema.plugin(passportLocal);

module.exports = mongoose.model("User", Schema);