var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    campground = require("./models/campground"),
    seedDB = require("./seeds.js")
    comment = require("./models/comments");

mongoose.connect("mongodb+srv://Anshuman:Anshu2121@anshumancluster-uabpz.mongodb.net/camp?retryWrites=true&w=majority",{ useNewUrlParser: true })
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");

//seedDB();

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
            res.render("campground/index",{campgrounds:campgrounds});
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
    res.render("campground/new");
});

app.get("/campgrounds/:id", function(req,res){
    campground.findById(req.params.id).populate("comment").exec(function(err, data){
        if(err){
            console.log(err);
        } else {
            res.render("campground/show",{data : data});
        }
    });
});

//Comments route
app.get("/campgrounds/:id/comments/new", function(req,res){
    campground.findById(req.params.id, function(err, campground){
        res.render("comments/new", {campground : campground});
    });   
});

app.post("/campgrounds/:id/comments", function(req, res){
    //lookup from id
    campground.findById(req.params.id, function(err, data){
        comment.create(req.body.comment, function (err, data1) { 
            data.comment.push(data1);
            data.save();
            res.redirect("/campgrounds/" + req.params.id);
         })
    });
})

app.listen(80,function(){
    console.log("Camp Website has started");
});
