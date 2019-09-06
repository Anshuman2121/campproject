var mongoose = require("mongoose");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name : String,
    image : String,
    description: String,
    comment : [
        { type : mongoose.Schema.Types.ObjectId,
            ref : "comment"
        }]
});

module.exports = mongoose.model("campground", campgroundSchema);


// campground.create({
//     name : "Rishikesh",
//     image : "http://www.rishikeshriverrafting.com/images/beach-camp-rishikesh/camping-rishikesh-beach.jpg",
//     description: "This is a Rishikesh Camp"
// }, function(err, camp){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("added" + camp);
//     }
// })