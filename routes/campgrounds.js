var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var comment = require("../models/comments");
var middleware = require("../middleware/index")

router.get("/", function(req, res){
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

router.post("/", middleware.isLoggedIn,function(req, res){
    //get data from form and add to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newcamp = {name:name, image:image, price:price, description:desc, author: author};
    //   campgrounds.push(newcamp);
    //  add to database
    campground.create(newcamp, function(err, newentry){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Campground Added!");
            res.redirect("/campgrounds");
        }
    });
    
} );

router.get("/new", middleware.isLoggedIn,function (req,res) {
    
    res.render("campground/new");
});

router.get("/:id", function(req,res){
    campground.findById(req.params.id).populate("comment").exec(function(err, data){
        if(err){
            console.log(err);
        } else {
            res.render("campground/show",{data : data});
        }
    });
});

//Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res){
        campground.findById(req.params.id, function(err, data){
            res.render("campground/edit",{campground : data});
           });
    });
//Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership,function(req, res){
    //no need all in array data var data = { name: req.body.name, image: req.body.image, description: req.body.description };
    campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updateddata){
        if(err){
            res.redirect("/campgrounds")
        } else {
            req.flash("success", "Campgound Updated!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Delete
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
    campground.findByIdAndRemove(req.params.id, function(err){
        req.flash("success", "Campground Deleted!");
        res.redirect("/campgrounds");
    });
});

module.exports = router;