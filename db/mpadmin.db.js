/*=============================================
----- Client instance, db-> mp_admin_db--------
===============================================*/
var config = require('../config')
var Client = require('mariasql');

var Client = new Client({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  db: config.db.name
});

module.exports = Client;