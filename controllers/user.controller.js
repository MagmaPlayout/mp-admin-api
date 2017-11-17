var userDao = require("../dao/user.dao");
var config = require('../config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var userController = {};

/**
 * GET - Return a user with specified ID
 */
userController.findById = function(req, res, next) {  
    userDao.findById(req.params.id, function(err, usr) {
    
         if(err) 
            return next(err);

        console.log('GET /user/' + req.params.id);
        
        res.status(200).jsonp(usr);
    });
	
};


/**
 * POST - Authentication
 */
userController.authenticate= function(req, res, next) {  
    userDao.findUser(req.body.username, req.body.password, function(err, user) {
		
        if (err) return next(err);

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. Username or password is incorrect.' });
		} else if (user) {

			// if user is found and password is right
			// create a token

            var sessionData = {
                id : user.id,
                name: user.name + ' ' + user.surname               
            } 


			var token = jwt.sign(sessionData, config.secret, {
				expiresIn: config.tokenExpires 
			});

			res.json({
				success: true,
				message: 'your token!',
				token: token
			});	

		}
       
    });
};

/**
 * GET - Get all users
 */
userController.getAll = function(req, res, next) {  
    userDao.getAll(function(err, usr) { 
        if(err) 
            return next(err);
        res.status(200).jsonp(usr);
    });	
};


/**
 * POST - insert an user
 * @returns {UserModel} last inserted
 */
userController.insert = function(req, res, next) { 
    var user = {
        name: req.body.name,
        surname : req.body.surname,
        username : req.body.username,
        password : req.body.password,// to-do => deberia venir encriptado con algoritmo bidireccional
        email : req.body.email,
        phone : req.body.phone,
        idRole : req.body.idRole
    } 

    userDao.insert(user, function(err, usr) { 
        if(err) 
            return next(err);
        res.status(200).jsonp(usr);
    });	
};


/**
 * DEL - Delete an user
 * @returns {boolean} 
 */
userController.delete = function(req, res, next) { 
    userDao.delete(req.params.id, function(err, usr) { 
        if(err) 
            return next(err);
        res.status(200).jsonp(true);
    });	
};

module.exports = userController;