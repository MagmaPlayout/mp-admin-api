var permissionDao = require("../dao/permission.dao");
var config = require('../config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var permissionController = {};

/**
 * GET - Return user actions
 */
permissionController.getUserActions = function(req, res) { 

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
    jwt.verify(token, config.secret, function(err, sessionDataDecoded) {	// esto no va a ser necesario cuando todas las rutas esten autenticadas porque el decode lo prevee el middlware		
        
        permissionDao.getUserActions(sessionDataDecoded.id, function(err, usr) { 
            if(err) 
                return res.send(500, err.message);
            res.status(200).jsonp(usr);
        });	
    });
};

module.exports = permissionController;