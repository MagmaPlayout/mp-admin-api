var config = require('../config'); // get our config file
var db = require('../db/mpadmin.db');

var permissionDao = {}

/**
 * get User Actions ( permissions)
 */
permissionDao.getUserActions = function(idUser,callback)
{	
    db.query("SELECT DISTINCT a.* " +  
                "FROM UserActions ua " +
                "INNER JOIN Action a ON a.id = ua.idAction " +
                "WHERE ua.idUser = ?",
            [idUser],
            function(err, rows) {
                callback(err, rows);
    });

    db.end();

}


/**
 * set User Actions by idRole
 */
permissionDao.setUserActionsByIdRole= function(idUser,idRole, callback)
{	
   
    db.query("START TRANSACTION; "+ 
                "DELETE FROM UserActions WHERE idUser = :idUser ;" +
                "INSERT INTO UserActions " +
                "SELECT :idUser, ra.idAction " +
                "FROM RoleActions ra " +
                "WHERE ra.idRole = :idRole; " +
                "COMMIT;",
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