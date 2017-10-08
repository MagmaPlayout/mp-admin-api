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


/**
 * insert new playoutLog
 * @returns {playoutLog} last inserted
 */
playoutLogDao.insert = function(playoutLogData, callback)
{

    db.query(
                "INSERT INTO PlayoutLog (timestamp, idRawMedia, filter, sketch, starttime,endtime) "+
                "VALUES (:timestamp, :idRawMedia, :filter, :sketch, :starttime, endtime) ",
              
                {
                    timestamp: playoutLogData.timestamp,
                    idRawMedia: playoutLogData.idRawMedia,
                    filter: playoutLogData.filter,
                    sketch: playoutLogData.sketch, 
                    starttime: playoutLogData.starttime,   
                    endtime: playoutLogData.endtime,
                }              
                , 
                function(err,result) {  
                    if(!err){
                        playoutLogData.id = result.info.insertId
                    }                                                 
                    else{
                        playoutLogData = null;
                    }
                    callback(err,playoutLogData);
                }
   );
    
    db.end();
}

module.exports = playoutLogDao;