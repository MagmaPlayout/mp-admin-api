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
 * GET - Return logs filtered
 */
playoutLogController.getByFilter= function(req, res) { 
    var filter = JSON.parse(req.params.filter);

    playoutLogDao.getByFilter(filter, function(err, result) {
        if(err) {
            console.log(err);
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
        idRawMedia: req.body.idRawMedia,
        starttime: req.body.start,
        endtime: req.body.end,
        pieceName: req.body.pieceName,
        resolution: req.body.resolution,
        duration: req.body.duration,
        piecePath: req.body.piecePath,
        frameCount: req.body.frameCount,
        frameRate: req.body.frameRate
    };

    playoutLogDao.insert(playoutLog, function(err, result) {
        if(err) 
            return res.status(500).send(err.message);
     
        res.status(200).jsonp(result);
    });
};


module.exports = playoutLogController;