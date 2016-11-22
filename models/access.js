var env = require('../config/databaseConfig');
var config = require('../config/database.json')[env];
var sequelize = require('../config/sequelizeConfig');
var dataTypes = require("sequelize");
var TokenGenerator = require("token-generator");
var crypto = require('crypto');


var Access = sequelize.define('accesses', {
	user_id: dataTypes.INTEGER,
    	first_access: dataTypes.DATE,
	token: dataTypes.STRINGL,
	last_access: dataTypes.DATE
  }, {
    instanceMethods: {
      	retrieveByToken: function(token, onSuccess, onError) {
		Access.find({where: {token: token}}, {raw: true}).success(onSuccess).error(onError);
	  },
      	add: function(onSuccess, onError) {
		var token = TokenGenerator.generate();
		Product.build({ user_id: this.user_id, first: this.first, last: this.last, token: this.token }).save().success(onSuccess).error(onError);
	   },
  	updateByToken: function(token, onSuccess, onError) {
		var last = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		Product.update({ last: last},{where: {token: token} }).success(onSuccess).error(onError);
	   }
    }
  });

  module.exports = Access;
