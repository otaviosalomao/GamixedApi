var env = require('../config/databaseConfig');
var config = require('../config/database.json')[env];
var sequelize = require('../config/sequelizeConfig');
var dataTypes = require("sequelize");
var randToken = require("rand-token");
var crypto = require('crypto');
var appConfig = require('../config/appConfig');

var Access = sequelize.define('accesses', {
	  user_id: dataTypes.INTEGER,
    first: dataTypes.DATE,
	  token: dataTypes.STRING,
  	last: dataTypes.DATE
  }, {
    instanceMethods: {
      retrieveByTokenUserId: function(token,user_id, onSuccess, onError) {
    		Access.find({where: {token: token, user_id: user_id}}, {raw: true}).success(onSuccess).error(onError);
      },    
      retrieveByUserId: function(user_id, onSuccess, onError) {                  
        var limitSession = new Date(new Date().getTime() - appConfig.sessionTime*60000);
        Access.find({where: ['user_id = ? and last > ?', user_id, limitSession]}, {raw: true}).success(onSuccess).error(onError);
      },
     	add: function(onSuccess, onError) {          
      	var token = randToken.generate(16);                 
      	Access.build({ user_id: this.user_id, first: new Date(), last: new Date(), token: token }).save().success(onSuccess).error(onError);
      },
      updateByToken: function(user_id, token, onSuccess, onError) {		      
      	Access.update({ last: new Date()},{where: {user_id: user_id, token: token} }).success(onSuccess).error(onError);
      }
    }
  });

module.exports = Access;