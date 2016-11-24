var env = require('../config/databaseConfig');
var config = require('../config/database.json')[env];
var sequelize = require('../config/sequelizeConfig');
var dataTypes = require("sequelize");

var User = sequelize.define('users', {
    name: dataTypes.STRING,
    password: dataTypes.STRING,
    email: dataTypes.STRING,
  }, {
    instanceMethods: {
    retrieveAll: function(onSuccess, onError){
	 	User.findAll({}, {raw: true}).success(onSuccess).error(onError);
	},
    retrieveById: function(user_id, onSuccess, onError) {
		User.find({where: {id: user_id}}, {raw: true}).success(onSuccess).error(onError);
	},
	retrieveByEmailPassword(email, password, onSuccess, onError) {		
		var crypto = require('crypto');
		var shasum = crypto.createHash('sha1');
		shasum.update(password);		
		User.find({where: {email: email, password: shasum.digest('hex')}}, {raw: true}).success(onSuccess).error(onError);	
	},
  	add: function(onSuccess, onError) {
		var name = this.name;
		var password = this.password;		
		var email = this.email;
		var crypto = require('crypto');
		var shasum = crypto.createHash('sha1');
		shasum.update(password);
		password = shasum.digest('hex');
		User.build({ name: name, password: password, email: email }).save().success(onSuccess).error(onError);
   	},
    updateById: function(user_id, onSuccess, onError) {
		var id = user_id;
		var name = this.name;
		var password = this.password;
		var email = this.email;
		shasum.update(password);
		password = shasum.digest('hex');
		User.update({ name: name,password: password, email: email},{where: {id: id} }).success(onSuccess).error(onError);
   	},
    removeById: function(user_id, onSuccess, onError) {
		User.destroy({where: {id: user_id}}).success(onSuccess).error(onError);
	  }
    }
  });

  module.exports = User;
