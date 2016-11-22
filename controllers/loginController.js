module.exports = function(router){
    var User = require('../models/user');

    router.route('/login')
    .post(function(req, res) {
        var email = req.body.email;
        var senha = req.body.senha;
        var user = User.build();

        user.login(email, senha, function(success){
          if(users){
		        var Access = require("../models/access");
        		var access = Access.build({user_id: users.id});
        		access.add();
            res.json(users);
          }
        },
  	    function(err) {
            res.send(err);
        });
    })
 }
