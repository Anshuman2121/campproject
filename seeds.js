var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment = require("./models/comments");

var data = [
    {
        name : "Rishikesh",
        image : "https://cdn.downtoearth.org.in/library/large/2017-03-02/0.29442000_1488459193_camping.jpg",
        description: "Camps at bank of Ganga"
    },
    {
        name : "Jaisalmer",
        image : "https://www.jaisalkot.com/wp-content/uploads/2019/01/desert_camp.jpg",
        description: "Oasis at Desert"
    },
    {
        name : "Dandeli",
        image : "https://i1.wp.com/www.dfordelhi.in/wp-content/uploads/2018/12/treehouse-point.jpg?w=2043&ssl=1",
        description: "Tree House in Jungle"
    }
];

function seedDB(){
    campground.remove({}, function(err){
        console.log("removed campgrounds");
    });

data.forEach(function(seed){
    campground.create(seed, function(err, data1){
        if(err){
            console.log(err);
        } else{
            console.log(data1);
            comment.create({
                text: "This place is great",
                author: "anshuman"
            }, function(err, data){
                console.log(data);
                data1.comment.push(data);
                data1.save();
            });
        }
    });
});
};



module.exports = seedDB;