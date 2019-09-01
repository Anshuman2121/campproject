var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Anshuman:Anshu2121@anshumancluster-uabpz.mongodb.net/camp?retryWrites=true&w=majority",{ useNewUrlParser: true })
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name : String,
    image : String,
    description: String
});

var campground = mongoose.model("campground", campgroundSchema);

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


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //res.render("campgrounds",{campgrounds:campgrounds});
    //get data from db
    campground.find({}, function(err,campgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index",{campgrounds:campgrounds});
        }
    })
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var newcamp = {name:name, image:image, description:desc};
    //   campgrounds.push(newcamp);
    //  add to database
    campground.create(newcamp, function(err, newentry){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    
} );

app.get("/campgrounds/new", function (req,res) {
    res.render("new");
});

app.get("/campgrounds/:id", function(req,res){
    campground.findById(req.params.id, function(err, data){
        if(err){
            console.log(err);
        } else {
            res.render("show",{data : data});
        }
    });
});

app.listen(80,function(){
    console.log("Camp Website has started");
});
