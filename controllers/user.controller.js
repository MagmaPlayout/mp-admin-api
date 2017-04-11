var userDao = require("../dao/user.dao");
var config = require('../config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var userController = {};

/**
 * GET - Return a user with specified ID
 */
userController.findById = function(req, res) {  
    userDao.findById(req.params.id, function(err, usr) {
    
        if(err) return res.send(500, err.message);

        console.log('GET /user/' + req.params.id);
        
        res.status(200).jsonp(usr);
    });
};


/**
 * POST - Authentication
 */
userController.authenticate= function(req, res) {  
    userDao.findUser(req.body.username, req.body.password, function(err, user) {
        if (err) throw err;

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

module.exports = userController;