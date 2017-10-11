var rawMediaDao = require("../dao/rawMedia.dao");
var config = require('../config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var rawMediaController = {};

/**
 * GET - Return all rawMedias
 */
rawMediaController.listAll = function(req, res) { 
    rawMediaDao.listAll(function(err, result) {
        if(err) {
            return res.send(500, err.message);
        }
     
        res.status(200).jsonp(result);
    });
};


/**
 * POST - Create a new rawMedia
 * @returns {rawMedia} last inserted
 */
rawMediaController.insert = function(req, res) { 

    
	var rawMedia = {
		id: req.body.mediaId,
		idSupplier: req.body.supplierId,
        location: req.body.path       
	};

    rawMediaDao.insert(rawMedia, function(err, result) {

        if(err){
            return res.status(500).send(err.message);
            console.log(err);
        }
        res.status(200).jsonp(result);

    });
};

/**
 * GET - find suppliers by location
 */
rawMediaController.getByLocation= function(req, res){

    rawMediaDao.getByLocation(req.params.location, function(err, result) {

        if(err) 
            return res.send(500, err.message);
    
        res.status(200).jsonp(result);

    });
}


module.exports = rawMediaController;