var auth = require("../auth");
module.exports = function(router){
    var User = require('../models/user');
    router.route('/users')
    
    .post(auth, function(req, res) {
        var name = req.body.name;
        var password = req.body.password;
        var email = req.body.email;
        var user = User.build({ name: name, password: password, email: email });

        user.add(function(success){
            res.json({ message: 'User created!' });
        },
        function(err) {
            res.send(err);
        });
    })
    
    .get(auth, function(req, res) {
        var user = User.build();

        user.retrieveAll(function(users) {
            if (users) {
                res.json(users);
            } else {
                res.send(401, "User not found");
            }
        }, function(error) {
            res.send("User not found");
        });
    });     
    
    router.route('/users/:user_id')    
    .put(auth, function(req, res) {
        var user = User.build();
        user.name = req.body.name;
        user.password = req.body.password;
        user.email = req.body.email;
        user.updateById(req.params.user_id, function(success) {
            console.log(success);
            if (success) {
                res.json({ message: 'User updated!' });
            } else {
                res.send(401, "User not found");
            }
        }, function(error) {
            res.send("User not found");
        });
    })
    
    .get(auth, function(req, res) {
        var user = User.build();

        user.retrieveById(req.params.user_id, function(users) {
            if (users) {
                res.json(users);
            } else {
                res.send(401, "User not found");
            }
        }, function(error) {
            res.send("User not found");
        });
    })
    
    .delete(auth, function(req, res) {
        var user = User.build();

        user.removeById(req.params.user_id, function(users) {
            if (users) {
                res.json({ message: 'User removed!' });
            } else {
                res.send(401, "User not found");
            }
        }, function(error) {
            res.send("User not found");
        });
    });
}