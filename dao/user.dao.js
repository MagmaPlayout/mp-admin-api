var config = require('../config'); // get our config file
var db = require('../db/mpadmin.db');

var userDao = {}


/**
 * find user by username and password
 */
userDao.findUser = function(usr,pass,callback)
{
	
    db.query("SELECT * FROM User WHERE username = ? AND password = ?",
            [usr,pass],
            function(err, rows) {
                callback(err, rows[0]);
                console.log(rows);
    });

    db.end();

}

/**
 * find user by id
 */
userDao.findById = function(id,callback)
{

    db.query("SELECT * FROM User WHERE id = ? ",
            [id],
            function(err, rows) {
                callback(err, rows);
                console.log(rows);
    });

    db.end();
}

module.exports = userDao;