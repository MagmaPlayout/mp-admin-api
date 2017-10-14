var config = require('../config'); // get our config file
var db = require('../db/mpadmin.db');
var restCall = require('../helpers/restCall.helper');
var _ = require('underscore');

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
 * find logs by filters
 */
playoutLogDao.getByFilter = function(filter, callback) {
   
     console.log(filter.starttime);
     db.query(
    	"SELECT pl.*, rm.location,rm.idSupplier AS supplierId, s.name AS supplierName, s.phone AS supplierPhone, s.email AS supplierEmail "+
        "FROM PlayoutLog pl "+
        "INNER JOIN RawMedia rm ON rm.id = pl.idRawMedia " +
        "INNER JOIN Supplier s ON s.id = rm.idSupplier "+
        "WHERE pl.starttime >= :starttime AND pl.endtime <= :endtime ",
        filter,
        function (err, logs) {           
            callback(err, logs);                        
        }
    );

    db.end();

   

   
}


/**
 * insert new playoutLog
 * @returns {playoutLog} last inserted
 */
playoutLogDao.insert = function(playoutLogData, callback) {
    db.query(
        " INSERT INTO PlayoutLog (idRawMedia, starttime, endtime, pieceName, " +
        " resolution, duration, piecePath, frameCount, frameRate) "+
        " VALUES (:idRawMedia, :starttime, :endtime, :pieceName, :resolution, "+
        " :duration, :piecePath, :frameCount, :frameRate) ",
        {
            idRawMedia: playoutLogData.idRawMedia,
            starttime: playoutLogData.starttime,   
            endtime: playoutLogData.endtime,
            duration: playoutLogData.duration,
            pieceName: playoutLogData.pieceName,
            piecePath: playoutLogData.piecePath,
            frameRate: playoutLogData.frameRate,
            resolution: playoutLogData.resolution,
            frameCount: playoutLogData.frameCount
        }, 
        function(err,result) {  
            if(!err){
                playoutLogData.id = result.info.insertId;
            }                                                 
            else{
                playoutLogData = null;
            }
            callback(err,playoutLogData);
        }
   );
    
    db.end();
};

module.exports = playoutLogDao;