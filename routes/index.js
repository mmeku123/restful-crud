var middleware = require("../middleware");
var express = require('express');
var bcrypt = require('bcrypt-nodejs');
// bcrypt.hashSync(password, null, null)
module.exports = function(app, passport) {

    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/login", function(req, res) {
        res.render('login', { message: req.flash('loginMessage') });

    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
    }));

    app.get("/register", function(req, res) {
        res.render("register", { message: req.flash('signupMessage') });
    });

    app.post("/register", passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/register', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // USER PROFILE
    app.get('/profile/(:username)', middleware.isLoggedIn, function(req, res) {
        res.render('profile', { user: req.user });
    });

    // USER EDIT PROFILE
    app.get('/profile/(:username)/edit', middleware.isLoggedIn, function(req, res) {
        res.render('edit', { user: req.user });
    });

    // PUT METHOD , EDIT PROFILE
    app.post("/profile/(:username)", function(req, res) {
        var newData = {
            password: bcrypt.hashSync(req.body.password, null, null),
            description: req.body.description
        }
        req.getConnection(function(err, conn) {
            if (err) throw err;
            else {
                var para = [newData.password, newData.description, req.user.username];
                conn.query("UPDATE members \
                    SET password = ?, description = ? WHERE username = ?", para);
                res.redirect('/');
            }
        })

    });

    // LOGOUT
    app.get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/'); //Inside a callback… bulletproof!
        });
    });

}