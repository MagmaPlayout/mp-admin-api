var config = require('../config'); // get our config file
var db = require('../db/mpadmin.db');

var permissionDao = {}

/**
 * get User Actions ( permissions)
 */
permissionDao.getUserActions = function(idUser,callback)
{	
    db.query("SELECT a.* " +  
                "FROM UserActions ua " +
                "INNER JOIN Action a ON a.id = ua.idAction " +
                "WHERE ua.idUser = :idUser " + 
                "UNION " + 
                "SELECT a.* " +
                "FROM User u " +
                "INNER JOIN RoleActions ra ON ra.idRole = u.idRole " + 
                "INNER JOIN Action a ON a.id = ra.idAction " + 
                "WHERE u.id = :idUser ",
            {
                idUser : idUser
            },
            function(err, rows) {
                callback(err, rows);
    });

    db.end();

}


/**
 * set User Actions by idRole
 */
permissionDao.setUserRole = function(idUser,idRole, callback)
{	
   
    db.query("UPDATE User SET idRol = : idRol WHERE id = : idUser",
            {
                idUser : idUser,
                idRole : idRole
            }
            ,
            function(err, rows) {
                callback(err, rows);
    });

    db.end();

}

/**
 * get all Roles
 */
permissionDao.getAllRoles = function(callback)
{	
    db.query("SELECT * FROM Role",
            function(err, rows) {
                callback(err, rows);
    });

    db.end();

}

module.exports = permissionDao;