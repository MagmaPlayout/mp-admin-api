// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var userController = require('./controllers/user.controller');
var playoutLogController = require('./controllers/playoutLog.controller');
var supplierController = require('./controllers/supplier.controller');
var rawMediaController = require('./controllers/rawMedia.controller');
var permissionController = require('./controllers/permission.controller');
var config = require('./config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var routes = require('./routes');
var routesAuth = require('./routesAuth');


// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || config.port; // used to create, sign, and verify tokens
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));




// Enable CORS
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// =================================================================
// routes ==========================================================
// =================================================================

// basic route (http://localhost:8080)
app.get('/', function(req, res) {
	res.send('The API is at http://localhost:' + port + '/api');
	
	
});


//----------------Controllers------------------------------------------
var controllers = {
  user : userController,
  playoutLog : playoutLogController,
  supplier : supplierController, 
  rawMedia : rawMediaController,
  permission : permissionController, 
  others : {
	  check : function(req, res) {
		res.json(req.decoded);
	  },
	  welcome: function(req, res) {
			res.json({ message: 'Welcome to Admin API!' });
	  }
  }
   /** 
   * ...
   * Aca van todos los controlers 
   * */
};

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router(); 

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
//apiRoutes.post('/authenticate', userController.authenticate);
routes.setup(apiRoutes,controllers);

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	
	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes

				req.decoded = decoded;				
				next();
			}
		});

	} else {
		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});		
	}
	
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
routesAuth.setup(apiRoutes,controllers);
app.use('/api', apiRoutes);


//middleware for error handler 
app.use(function(err, req, res, next) {
    
    // development error handler 
    if (app.get('env') === 'development') {
        res.status(500).send(err);
    }
    else{
        // production error handler
        // no stacktraces leaked to user
        res.status(500).send(         {
                message: err.message,
                error: {}
        });
        console.log("production");
    }
    console.log(err);
});


// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);

console.log("========================================================");
console.log("************** Magma-Playout | admin-api ***************");
console.log("========================================================");
console.log("________________________________________________________");

console.log("Server listening on port %d in %s mode", port, app.settings.env);
console.log("________________________________________________________");
