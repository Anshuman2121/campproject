var express = require("express");
var router = express.Router({mergeParams: true});  //important
var campground = require("../models/campground");
var comment = require("../models/comments");
var middleware = require("../middleware/index")

//Comments route
router.get("/new", middleware.isLoggedIn, function(req,res){
    campground.findById(req.params.id, function(err, campground){
        res.render("comments/new", {campground : campground});
    });   
});

router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup from id
    campground.findById(req.params.id, function(err, data){
        comment.create(req.body.comment, function (err, data1) { 
            data1.author.id = req.user._id;
            data1.author.username = req.user.username;
            data1.save();
            data.comment.push(data1);
            data.save();
            res.redirect("/campgrounds/" + req.params.id);
         })
    });
});

//Comment Edit Route
router.get("/:comment_id/edit", middleware.checkCommentsOwnership,function(req, res){
    comment.findById(req.params.comment_id, function(err, founddata){
        if (err){
            res.redirect("back")
        } else {
            res.render("Comments/edit", {campground_id: req.params.id, comment: founddata});
        }
        
    });       
});

//Comment Update
router.put("/:comment_id", middleware.checkCommentsOwnership,function(req, res){
    var updateData = req.body.comment;
    comment.findByIdAndUpdate(req.params.comment_id, updateData, function (err, data) { 
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+ req.params.id)
        }
     });
});

router.delete("/:comment_id", middleware.checkCommentsOwnership,function (req, res) { 
    comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
 });



module.exports = router;