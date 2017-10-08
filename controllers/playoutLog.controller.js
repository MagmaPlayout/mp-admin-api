var playoutLogDao = require("../dao/playoutLog.dao");
var config = require('../config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var playoutLogController = {};

/**
 * GET - Return all LOGS
 */
playoutLogController.listAll = function(req, res) { 
    playoutLogDao.listAll(function(err, result) {
        if(err) {
            return res.send(500, err.message);
        }
     
        res.status(200).jsonp(result);
    });
};

/**
 * POST - Create a new log
 * @returns {PlayoutLog} last inserted
 */
playoutLogController.insert = function(req, res) { 
    
	var playoutLog = {
		timestamp: req.body.timestamp,
		idRawMedia: req.body.idRawMedia,
        filter: req.body.filter,
		sketch: req.body.sketch, 
        starttime: req.body.starttime,   
        endtime: req.body.endtime,       
	};

    playoutLogDao.insert(playoutLog, function(err, result) {

        if(err) 
            return res.status(500).send(err.message);
     
        res.status(200).jsonp(result);

    });
};


module.exports = playoutLogController;