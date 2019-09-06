var mongoose = require("mongoose");
var schema = mongoose.Schema({
    text : String,
    author : String
});

module.exports = mongoose.model("comment", schema);