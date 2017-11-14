var permissionDao = require("../dao/permission.dao");
var config = require('../config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var permissionController = {};

/**
 * GET - Return user actions
 */
permissionController.getUserActions = function(req, res, next) { 

    
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    jwt.verify(token, config.secret, function(err, sessionDataDecoded) {	// esto no va a ser necesario cuando todas las rutas esten autenticadas porque el decode lo prevee el middlware		
        if(err)
             return next(err);
        permissionDao.getUserActions(sessionDataDecoded.id, function(err, usr) { 
            if(err) 
                return next(err);
            res.status(200).jsonp(usr);
        });	
    });
    
   
    
};

/**
 * POST - Set User Role
 */
permissionController.setUserRole = function(req, res, next) { 

    var idRole = req.body.idRole;
    var idUser = req.body.idUser;
  
    permissionDao.setUserActionsByIdRole(idUser, idRole, function(err, usr) { 
        if(err) 
            return next(err);

        res.status(200).jsonp(usr);
    });	
   
};


/**
 * GET - Get all Roles
 */
permissionController.getAllRoles = function(req, res, next) { 

    permissionDao.getAllRoles(function(err, usr) { 
        if(err) 
            return next(err);

        res.status(200).jsonp(usr);
    });	
   
};

module.exports = permissionController;