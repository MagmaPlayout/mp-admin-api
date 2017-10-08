var config = require('../config'); // get our config file
var db = require('../db/mpadmin.db');

var playoutLogDao = {}

/**
 * find user by id
 */
playoutLogDao.listAll = function(callback) {
    db.query(
    	"SELECT * FROM PlayoutLog",
        function(err, rows) {
            console.log(rows);
            callback(err, rows);
	    }
    );

    db.end();
}

module.exports = playoutLogDao;
