var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var index = require('./routes/index');
var passport = require('passport');
var LocalStrategy = require("passport-local");
var expressValidator = require('express-validator');
var methodOverride = require('method-override');
var connection = require('express-myconnection');
var mysql = require('mysql');
var userRoutes = require("./routes/users")

var app = express();
require('./passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({
    secret: 'chuuuuuu',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(flash());
app.use(expressValidator());
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));



app.use(
    connection(mysql, {
        host: 'localhost',
        user: 'root', // your mysql user
        password: '', // your mysql password
        port: 3306, //port mysql
        database: 'mydb' // your database name
    }, 'pool') //or single

);

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

require('./routes/index.js')(app, passport);
app.use("/users", userRoutes);


app.listen(8000, function() {
    console.log('Example app listening on port 8000!')
})