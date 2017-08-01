var mysql = require('mysql');
var dbconfig = require('./database');
var bcrypt = require('bcrypt-nodejs');


var connection = mysql.createConnection(dbconfig.connection);


connection.query('CREATE DATABASE IF NOT EXISTS ' + dbconfig.database);

connection.query('\
CREATE TABLE IF NOT EXISTS `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `role` TEXT NOT NULL, \
    `username` TEXT NOT NULL, \
    `email` TEXT NOT NULL, \
    `password` TEXT NOT NULL, \
    `description` TEXT, \
     UNIQUE INDEX `id_UNIQUE` (`id` ASC)) \
');

var insert = 'INSERT INTO `' + dbconfig.database + '`.`' + dbconfig.users_table + '` VALUES (?,?,?,?,?,?)';
connection.query(insert, [1, "Admin", "admin", "admin@admin.com", bcrypt.hashSync("1234", null, null), "THIS IS ADMIN"]);
connection.query(insert, [2, "User", "tusave", "tusave@123.com", bcrypt.hashSync("1234", null, null), "Call me Tusave"]);
connection.query(insert, [3, "User", "johncena", "johncena@wwe.ac.th", bcrypt.hashSync("1234", null, null), "You can't see me !!"]);
connection.query(insert, [4, "User", "unknown", "unknow@user.io", bcrypt.hashSync("1234", null, null), "..."]);
// connection.query(insert, [1, "admin", "admin", bcrypt.hashSync("1234", null, null)]);
// connection.query(insert, [2, "user", "tusave", bcrypt.hashSync("1234", null, null)]);
// connection.query(insert, [3, "user", "johncena", bcrypt.hashSync("1234", null, null)]);
// connection.query(insert, [4, "user", "unknown", bcrypt.hashSync("1234 ", null, null)]);



console.log('Success: Database Created!')

connection.end();