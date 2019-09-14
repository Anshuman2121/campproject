var express     = require("express"),
    app         = express(),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose"),
    campground  = require("./models/campground"),
    seedDB      = require("./seeds.js"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    passport    = require("passport"),
    User        = require("./models/user"),
    comment     = require("./models/comments");

var campgroundsRoute = require("./routes/campgrounds"),
    commentsRoute    = require("./routes/comments"),
    authRoute        = require("./routes/index");


mongoose.connect("mongodb+srv://Anshuman:Anshu2121@anshumancluster-uabpz.mongodb.net/camp?retryWrites=true&w=majority",{ useNewUrlParser: true })
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
mongoose.set('useFindAndModify', false);
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB();

//Passport Configuration
app.use(require("express-session")({
    secret : "This is camp project",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds",campgroundsRoute);
app.use("/campgrounds/:id/comments",commentsRoute);  //important
app.use("/",authRoute);

app.listen(80,function(){
    console.log("Camp Website has started");
});
