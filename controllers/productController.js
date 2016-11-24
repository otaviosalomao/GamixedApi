module.exports = function(router){
    var Product = require('../models/product');
    router.route('/products')
    
    .post(function(req, res) {
        var name = req.body.name;
        var description = req.body.description;
        var value = req.body.value;
        var imageName = req.body.imageName;	
        var product = Product.build({ name: name, description : description, value : value, imageName : imageName });

        product.add(function(success){
            res.json({ message: 'Product created!' });
        },
        function(err) {
            res.send(err);
        });
    })    
    .get(function(req, res) {
        var product = Product.build();

        product.retrieveAll(function(products) {
            if (products) {
                res.json(products);
            } else {
                res.send(401, "Product not found");
            }
        }, function(error) {
            res.send("Product not found");
        });
    });
    
    router.route('/products/:product_id')
    .put(function(req, res) {
        var product = Product.build();
        product.name = req.body.name;
        product.description = req.body.description;
        product.value = req.body.value;
        product.imageName = req.body.imageName;       

        product.updateById(req.params.product_id, function(success) {            
            if (success) {
               res.json({ message: 'Product updated!' });
            } else {
	           res.send(401, "Product not found");
            }
        }, function(error) {
            res.send("Product not found");
        });
    })
    
    .get(function(req, res) {
        var product = Product.build();
        product.retrieveById(req.params.product_id, function(product) {
            if (products) {
                res.json(products);
            } else {
                res.send(401, "Product not found");
            }
        }, function(error) {
            res.send("Product not found");
        });
    })
    
    .delete(function(req, res) {
        var product = Product.build();

        product.removeById(req.params.product_id, function(products) {
            if (products) {
                res.json({ message: 'Product removed!' });
            } else {
                res.send(401, "Product not found");
            }
        }, function(error) {
            res.send("Product not found");
        });
    });
}
