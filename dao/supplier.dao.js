var config = require('../config'); // get our config file
var db = require('../db/mpadmin.db');
var restCall = require('../helpers/restCall.helper');
var _ = require('underscore');

var supplierDao = {}

/**
 * find supplier by id
 */
supplierDao.listAll = function(callback) {
    db.query(
    	"SELECT * FROM Supplier",
        function(err, rows) {
            console.log(rows);
            callback(err, rows);
	    }
    );

    db.end();
}

/**
 * insert new supplier
 * @returns {supplier} last inserted
 */
supplierDao.insert = function(supplierData, callback)
{  

    db.query(
                "INSERT INTO Supplier (name, phone, email) "+
                "VALUES (:name, :phone, :email) "+
                "ON DUPLICATE KEY UPDATE name = name",
                {
                    name: supplierData.name,
                    phone: supplierData.phone,
                    email: supplierData.email
                }              
                , 
                function(err,result) {  
                    if(!err){
                        supplierData.id = result.info.insertId
                    }                                                 
                    else{
                        supplierData = null;
                    }
                    callback(err,supplierData);
                }
    );
    
    db.end();
}

/**
 * find media by name
 */
supplierDao.getByName = function(name,callback)
{

    db.query("SELECT * FROM Supplier WHERE name= ?",
            [name],
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

module.exports = supplierDao;