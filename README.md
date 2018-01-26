
# RESTful_CRUD
This is my First ever web application.

Basic RESTful API 
By Nodejs, Expressjs, MySQL

## Instruction

To run it on your own computer

1. Clone the repo: `https://github.com/mmeku123/restful-crud.git` or download zip file
2. Install packages: `npm install `
3. Change your mysql settings in `./script/database.js`
```
module.exports = {
    'connection': {
        'host': 'localhost',
        'user': 'root',
        'password': '1234'
    },
    'database': 'mydb',
    'users_table': 'members'
};
```
and `./app.js` on `line 49`
```
app.use(
    connection(mysql, {
        host: 'localhost',
        user: 'root', // your mysql user
        password: '1234', // your mysql password
        port: 3306, //port mysql
        database: 'mydb' // your database name
    }, 'single') //or singlem
);
```

Create Database: `node ./script/create_database.js`

# restful-crud
Basic RESTful API 

By Nodejs, Expressjs, MySQL

# Instruction

To run it on your own computer

1. Clone the repo:` https://github.com/mmeku123/restful-crud.git ` or download zip file
2. Install packages: ` npm install `

3. Launch at first time: `npm start` 
(Only for the first time, After that sees below)

or

3. Create the database schema `node script/create_database.js`
4. Launch: `node app.js`
5. Open in browser at: `http://localhost:8000`

Admin: username `admin` password `1234`

TRY IT!!

if npm doesn't exist try this `npm install express path morgan serve-favicon ejs cookie-parser express-flash express-session passport passport-local express-validator method-override express-myconnection mysql bcrypt-nodejs`

or see also `"dependencies": {
        "bcrypt-nodejs": "0.0.3",
        "body-parser": "^1.15.2",
        "confirm-dialog": "^0.1.2",
        "connect-flash": "^0.1.1",
        "cookie-parser": "^1.4.3",
        "debug": "~2.2.0",
        "ejs": "^2.5.7",
        "express": "~4.14.0",
        "express-flash": "git://github.com/RGBboy/express-flash.git",
        "express-myconnection": "^1.0.4",
        "express-session": "^1.15.4",
        "express-validator": "^2.21.0",
        "jade": "~1.11.0",
        "method-override": "^2.3.9",
        "morgan": "^1.7.0",
        "mysql": "^2.14.0",
        "passport": "^0.3.2",
        "passport-local": "^1.0.0",
        "path": "^0.12.7",
        "serve-favicon": "^2.3.2"
        }` 

## Testing

If the database and server go well, 

There are 2 roles of user type: `Admin` and `User`

1. `User` can only visit normal webpages like home, profile.
2. `Admin` can visit manage the users-list (new edit or delete).
=======
1.`User` can only visit normal webpages like home, profile.
2.`Admin` can visit manage the users-list (new edit or delete).
