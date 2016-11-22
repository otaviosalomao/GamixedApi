module.exports = function(router){
    var Access = require('../models/access');
    router.route('/access')   

    // get all the products (accessed at GET http://localhost:8080/api/products)
    .get(function(req, res) {
	var token = req.body.token;
        var access = Access.build();

        product.retrieveByToken(function(token) {
            if (accesses) {
		access.updateByToken(token, function(success){			
            		res.json(accesses);
		}
            } else {
            	res.send(401, "Login expirado.");
            }
        }, function(error) {
            res.send(500, "Erro interno.");
        });
    });
}
