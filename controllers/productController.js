module.exports = function(router){
    var Product = require('../models/product');
    router.route('/products')
    // create a user (accessed at POST http://localhost:8080/api/products)
    .post(function(req, res) {
        var name = req.body.name;
        var description = req.body.description;
	var value = req.body.value;
	var imageName = req.body.imageName;
	console.log(req.body);
        var product = Product.build({ name: name, description : description, value : value, imageName : imageName });

        product.add(function(success){
            res.json({ message: 'Product created!' });
        },
        function(err) {
            res.send(err);
        });
    })

    // get all the products (accessed at GET http://localhost:8080/api/products)
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


    // on routes that end in /products/:product_id    
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

    // get a product by id(accessed at GET http://localhost:8080/api/products/:product_id)
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

    // delete a product by id (accessed at DELETE http://localhost:8080/api/products/:product_id)
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
