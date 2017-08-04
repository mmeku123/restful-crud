var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var mysql = require('mysql');
var passport = require("../passport");
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../script/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
// USER INDEX PAGE
router.get('/', middleware.isAdmin, function(req, res) {
    req.getConnection(function(err, connection) {
        var query = connection.query('SELECT * FROM members', function(err, rows) {
            if (err)
                throw err;
            res.render('users/users', { title: "Users", data: rows });
        });
    });
});

router.get('/new', middleware.isAdmin, function(req, res) {
    res.render("users/new");
})

// USER EDIT
router.get('/(:username)/profile', middleware.isAdmin, function(req, res) {
    req.getConnection(function(err, connection) {
        var query = connection.query('SELECT * FROM members WHERE username = ?', req.params.username, function(err, rows) {
            if (err)
                throw err;
            // console.log(rows[0]);
            res.render('users/profile', { user: rows[0] });
        });
    });
});

router.get('/(:username)/profile/edit', middleware.isAdmin, function(req, res) {
    req.getConnection(function(err, connection) {
        var query = connection.query('SELECT * FROM members WHERE username = ?', req.params.username, function(err, rows) {
            if (err)
                throw err;
            // console.log(rows[0]);
            res.render('users/edit', { user: rows[0] });
        });
    });
});

router.post('/(:username)/profile', function(req, res) {
    var newData = {
        password: bcrypt.hashSync(req.body.password, null, null),
        description: req.body.description
    }
    req.getConnection(function(err, conn) {
        if (err) throw err;
        else {
            var para = [newData.password, newData.description, req.params.username];
            conn.query("UPDATE members \
                    SET password = ?, description = ?  WHERE username = ?", para);
            res.redirect('/');
        }
    })
});

// NEW USER
router.post('/', function(req, res) {
    var select_sql = "SELECT * FROM members WHERE username = ?";
    req.getConnection(function(err, connection) {
        var query = connection.query(select_sql, [req.body.username], function(err, rows) {
            console.log(req.body);
            if (err) throw err;
            if (rows.length) {
                res.redirect('/users/new');
                console.log("THIS NAME IS ALREADY CREATED!");
            } else {
                var newUserMysql = {
                    role: req.body.role,
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, null, null) // use the generateHash function in our user model
                };
                console.log(newUserMysql)
                var insertQuery = "INSERT INTO members ( role,username,email, password ) values (?,?,?,?)";

                var query = connection.query(insertQuery, [newUserMysql.role, newUserMysql.username, newUserMysql.email, newUserMysql.password], function(err, rows) {
                    if (err) res.redirect("/users/new");
                    else {
                        newUserMysql.id = rows.insertId;
                        newUserMysql.description = "";
                        res.redirect("/users");
                    }
                });
            }
        });
    });
});

router.get("/(:username)/delete", middleware.isAdmin, function(req, res) {
    req.getConnection(function(err, connection) {
        var delete_sql = "DELETE FROM members WHERE username = ?";
        var query = connection.query(delete_sql, req.params.username, function(err, rows) {
            if (err) throw err;
            res.redirect('/users');
        });
    });
});

module.exports = router;