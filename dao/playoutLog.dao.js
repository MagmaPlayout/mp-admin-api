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
playoutLogDao.getByFilter = function(filters, callback) {
     db.query(
    	"SELECT pl.*, rm.location,rm.idSupplier AS supplierId, s.name AS supplierName, s.phone AS supplierPhone, s.email AS supplierEmail "+
        "FROM PlayoutLog pl "+
        "INNER JOIN RawMedia rm ON rm.id = pl.idRawMedia " +
        "INNER JOIN Supplier s ON s.id = rm.idSupplier ",
        "WHERE pl.starttime >= :starttime AND pl.endtime <= :endtime ",
        filters,
        function (err, logs) {

            //get mediaIds           
            var mediaIdList = [];
            
            _.uniq(logs, 'id').map(function (item) {
                mediaIdList.push(item.idRawMedia);
            });
            
            restCall.request(config.apis.mp_playout_api + 'medias/ids/', 'GET', mediaIdList, function (error, mediaList) {
                
                //join logs with mediaList
                logs.forEach(log => 
                    mediaList.forEach(function(media){
                        if(log.idRawMedia == media.id)
                            log.mediaName = media.name;
                            log.mediaDuration = media.duration;
                            log.mediaFrameRate = media.frameRate;
                            log.mediaFrameCount = media.frameCount;
                            log.mediaDescription = media.description;     
                    })
                );
                callback(error, logs);              
            });          
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