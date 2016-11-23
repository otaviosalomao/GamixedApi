module.exports = function(router){
    var User = require('../models/user');

    router.route('/login')
    .post(function(req, res) {
        var email = req.body.email;
        var password = req.body.password;                
        User.build().retrieveByEmailPassword(email, password, function(users){            
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