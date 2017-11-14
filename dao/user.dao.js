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
    });

    db.end();
}

/**
 * get all users
 */
userDao.getAll = function(callback)
{

    db.query("SELECT id, name, surname, username, email, phone, idRole FROM User",
            function(err, rows) {
                callback(err, rows);
                
    });

    db.end();
}


/**
 * insert new user
 * @returns {user} last inserted
 */
userDao.insert = function(userData, callback)
{  
    db.query(
                "INSERT INTO User (name, surname, username, password, email, phone) "+
                "VALUES (:name, :surname, :username, :password, :email, :phone) ",
                userData          
                , 
                function(err,result) {  
                    if(!err){
                        userData.id = result.info.insertId
                    }                                                 
                    else{
                        userData = null;
                    }
                    callback(err, userData);
                }
    );
    
    db.end();
}


/**
 * Update an user
 */
userDao.update= function(userData, callback)
{
	 db.query("UPDATE User SET name = :name,"+ 
                    "username = :username, password = :password, phone = :phone, email = :email  " +
                "WHERE id = :id",
                userData, 
                function(err, result) {
                    callback(err, result);
                }
    );
    
    db.end();
}



/**
 * Delete an user
 */
userDao.delete= function(idUser, callback)
{
	 db.query("START TRANSACTION;" +
                "DELETE FROM UserActions WHERE idUser = :idUser; " +
                "DELETE FROM User WHERE id = :idUser;" +
                "COMMIT;" ,
                {
                    idUser
                }, 
                function(err, result) {
                    callback(err, result);
                }
    );
    
    db.end();
}

module.exports = userDao;