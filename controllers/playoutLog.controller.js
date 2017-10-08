var playoutLogDao = require("../dao/playoutLog.dao");
var config = require('../config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var playoutLogController = {};

/**
 * GET - Return a LOG with specified ID
 */
playoutLogController.getById = function(req, res) { 
    playoutLogDao.getById(req.params.id, function(err, result) {
        if(err) {
            return res.send(500, err.message);
        }
     
        res.status(200).jsonp(result);
    });
};


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


module.exports = playoutLogController;
