var env = require('../config/databaseConfig');
var config = require('../config/database.json')[env];
var sequelize = require('../config/sequelizeConfig');
var dataTypes = require("sequelize");
var randToken = require("rand-token");
var datetime = require('node-datetime');
var crypto = require('crypto');


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
     	add: function(onSuccess, onError) {
          console.log("TOKEN " + randToken.generate(16));
      		var token = randToken.generate(16);
          var first = datetime.create().format('m/d/Y H:M:S');
          var last = datetime.create().format('m/d/Y H:M:S');          
      		Access.build({ user_id: this.user_id, first: first, last: last, token: token }).save().success(onSuccess).error(onError);
	   },
      updateByToken: function(user_id, token, onSuccess, onError) {
		      var last = datetime.create().format('m/d/Y H;M:S');
      		Access.update({ last: last},{where: {user_id: user_id, token: token} }).success(onSuccess).error(onError);
	   }
    }
  });

  module.exports = Access;
