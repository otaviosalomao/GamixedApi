module.exports = function(router){
    var User = require('../models/user');
    router.route('/login')
    // create a user (accessed at POST http://localhost:8080/api/login)
    .post(function(req, res) {
        var email = req.body.email;
        var senha = req.body.senha;	
        var user = User.build();

        user.login(email, senha, function(success){
		var Access = require("../models/access");
		var access = Access.build({user_id: users.id});
		access.add();
        },
	function(err) {
            res.send(err);
        });
    })

 }
