var express = require("express"),
mongoStore = require('connect-mongo')(express),
session = require('express-session'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
morgan = require("morgan"),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
mongoose = require("mongoose"),
port = process.env.PORT || 8080,
database = require("./config/database"),

UserController = require("./controllers/UserController");


var app = express();

// config
mongoose.connect(database.url);

app.use(morgan("dev")); // log every request to the console
app.use(bodyParser()); // pull information from html in POST
app.use(methodOverride()); // simulate DELETE and PUT
app.use(session({secret: 'anything', 
	cookie: { secure: false, maxAge: null}, 
	store: new mongoStore({url: database.url,collection : 'sessions'})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public/app"));


var controllers = {
	user: new UserController()
};


require("./controllers/AuthenticateController")(app, passport, LocalStrategy);
require("./controllers/RoutesController")(app, passport, controllers.user);

app.listen(port);
console.log("App Clistening on port " + port);