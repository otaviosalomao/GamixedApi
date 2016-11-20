var env = require('../config/databaseConfig');
var config = require('../config/database.json')[env];
var sequelize = require('../config/sequelizeConfig');
var dataTypes = require("sequelize");
var crypto = require('crypto');


var Product = sequelize.define('products', {
	name: dataTypes.STRING,
    	description: dataTypes.STRING,
	value: dataTypes.DECIMAL,
	imageName: dataTypes.STRING
  }, {
    instanceMethods: {
      	retrieveAll: function(onSuccess, onError) {
		Product.findAll({}, {raw: true}).success(onSuccess).error(onError);
	  },
      	retrieveById: function(product_id, onSuccess, onError) {
		Product.find({where: {id: product_id}}, {raw: true}).success(onSuccess).error(onError);
	  },
      	add: function(onSuccess, onError) {
		var name = this.name;
		Product.build({ name: name, description: this.description, value: this.value, imageName: this.imageName }).save().success(onSuccess).error(onError);
	   },
  	updateById: function(product_id, onSuccess, onError) {
		Product.update({ name: this.name, description: this.description, value: this.value, imageName: this.imageName},{where: {id: product_id} }).success(onSuccess).error(onError);
	   },
      removeById: function(product_id, onSuccess, onError) {
		Product.destroy({where: {id: product_id}}).success(onSuccess).error(onError);
	  }
    }
  });

  module.exports = Product;
