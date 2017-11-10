var permissionDao = require("../dao/permission.dao");
var config = require('../config'); // get our config file

var permissionController = {};

/**
 * GET - Return user actions
 */
permissionController.getUserActions = function(req, res) {  
    permissionDao.getUserActions(req.params.idUser, function(err, usr) { 
        if(err) 
            return res.send(500, err.message);
        res.status(200).jsonp(usr);
    });	
};

module.exports = permissionController;