var express = require("express");
var router = express.Router();
var passport    = require("passport");
var User        = require("../models/user");


router.get("/", function(req, res){
    res.render("landing");
});

//Auth Routes
//show register form
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    User.register(new User({username : req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//Login
router.get("/login", function(req, res){
    res.render("login");
})
//here middleware will come
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }) ,function(req, res){
    
});

router.get("/logout", function (req, res) { 
    req.logout(); //in built function
    res.redirect("/campgrounds");
 })

 //this function can be put on any page
 //put this function on post as well
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;