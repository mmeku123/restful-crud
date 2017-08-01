var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var methodOverride = require('method-override');
var passport = require("passport"),
    cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    flash = require("connect-flash"),
    session = require("express-session");
var morgan = require('morgan');

var mysql = require('mysql'),
    connection = require('express-myconnection');

var app = express();

var indexRoutes = require("./routes/index");
app.use(expressValidator());
app.use(morgan('dev'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {  
        var method = req.body._method;  
        delete req.body._method;  
        return method;
    }
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: true
}))

app.set("view engine", "ejs");

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(session({
    secret: 'whatthefuckisthis',
    resave: true,
    saveUninitialized: true
}));

app.use("/", indexRoutes);

app.listen(8000, function() {
    console.log('Example app listening on port 8000!')
})