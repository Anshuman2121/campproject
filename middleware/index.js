var campground = require("../models/campground");
var comment = require("../models/comments");

var middlewareObj = {}

middlewareObj.checkCampgroundOwnership = function(req, res, next){ 
        if(req.isAuthenticated()){ 
            campground.findById(req.params.id, function(err, data){
                //console.log(data);
                if(err){
                    res.redirect("back")
                } else {
                    //does the user owned the campground?
                if(data.author.id.equals(req.user._id)){
                        next();
                } else{
                    req.flash("error", "You do not have permission to do that!");
                    res.redirect("back");
                }
                    
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");  //goes one step back
        }  
}

middlewareObj.checkCommentsOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id, function(err, data){
            //console.log(data);
            if(err){
                res.redirect("back")
            } else {
                //does the user owned the campground?
            if(data.author.id.equals(req.user._id)){
                    next();
            } else{
                res.redirect("back");
            }
                
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");  //goes one step back
    }  
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;