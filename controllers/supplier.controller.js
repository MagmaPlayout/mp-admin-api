var supplierDao = require("../dao/supplier.dao");
var config = require('../config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var supplierController = {};

/**
 * GET - Return all suppliers
 */
supplierController.listAll = function(req, res) { 
    supplierDao.listAll(function(err, result) {
        if(err) {
            return res.send(500, err.message);
        }
     
        res.status(200).jsonp(result);
    });
};


/**
 * POST - Create a new supplier
 * @returns {supplier} last inserted
 */
supplierController.insert = function(req, res) { 
    
	var supplier = {
		name: req.body.provider,
		phone: req.body.phone,
        email: req.body.email       
	};

    supplierDao.insert(supplier, function(err, result) {

        if(err){
            return res.status(500).send(err.message);
            console.log(err);
        }
     
        res.status(200).jsonp(result);

    });
};

/**
 * GET - find suppliers by name
 */
supplierController.getByName= function(req, res){

    supplierDao.getByName(req.params.name, function(err, result) {

        if(err) 
            return res.send(500, err.message);
    
        res.status(200).jsonp(result);

    });
}

module.exports = supplierController;



