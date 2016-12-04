var Helper = new Object();
var jwt  = require('jsonwebtoken');
var randToken = require("rand-token");
var appConfig = require('./appConfig');
var secret = randToken.generate(16);

Helper.GenerateToken = function(req) {    
  var GUID = new Date().getTime();  
  var token = jwt.sign({
    auth:  GUID,
    agent: req.headers['user-agent'],
    exp: appConfig.sessionTime,
  }, secret);
  return token;
}

module.exports = Helper;