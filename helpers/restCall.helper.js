var request = require('request');
var restCallHelper = {};

restCallHelper.request = function (path, method, data, callback) {
    
    var options = {
        uri : path,
        method : method
    }; 
    
    if (method == 'GET') {
        options.uri += JSON.stringify(data);
    }
    else {
        options.headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };
        options.form = data;
    }

    request(options, function (error, response, body) {
        callback(error, (body == null || body == '' ? null : JSON.parse(body)));
    });
   
}



module.exports = restCallHelper;  