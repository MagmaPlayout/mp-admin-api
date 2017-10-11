var config = require('../config'); // get our config file
var db = require('../db/mpadmin.db');
var restCall = require('../helpers/restCall.helper');
var _ = require('underscore');

var rawMediaDao = {}

/**
 * find rawMedia by id
 */
rawMediaDao.listAll = function(callback) {
    db.query(
    	"SELECT * FROM rawMedia",
        function(err, rows) {
            console.log(rows);
            callback(err, rows);
	    }
    );

    db.end();
}

/**
 * insert new rawMedia
 * @returns {rawMedia} last inserted
 */
rawMediaDao.insert = function(rawMediaData, callback)
{
    console.log("Estoy en rawMedia DAO");
    console.log("idSupplier:" +rawMediaData.idSupplier);
    console.log("id:" +rawMediaData.id);
    console.log("location:" +rawMediaData.location);
    db.query(
                "INSERT INTO RawMedia (id, idSupplier, location) "+
                "VALUES (:id, :idSupplier, :location) ",
              
                {
                    id: rawMediaData.id,
                    idSupplier: rawMediaData.idSupplier,
                    location: rawMediaData.location
                }              
                , 
                function(err,result) {  
                    if(!err){
                        rawMediaData.id = result.info.insertId
                    }                                                 
                    else{
                        rawMediaData = null;
                    }
                    callback(err,rawMediaData);
                }
   );
    
    db.end();
}


/**
 * find media by name
 */
rawMediaDao.getByLocation = function(location,callback)
{

    db.query("SELECT * FROM RawMedia WHERE location= ?",
            [location],
            function(err, rows) {
                console.log(" rows[0]: "+rows[0]);
                if(rows[0] != null){
                    console.log(" rows is NOT null ");
                    callback(err, rows[0]);    
                }else{
                    console.log(" rows is null ");
                    rows[0] = {};
                    callback(err, rows[0]);
                }
                
    });

    db.end();
}

module.exports = rawMediaDao;