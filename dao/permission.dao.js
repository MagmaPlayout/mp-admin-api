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
                if(err){
                    console.log(err);
                }
                callback(err, rows);
    });

    db.end();

}

module.exports = permissionDao;