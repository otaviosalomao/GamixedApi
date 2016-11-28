module.exports = function(router){
    var User = require('../models/user');

    router.route('/login')
    .post(function(req, res) {
        console.log(req.body);
        var email = req.body.email;
        var password = req.body.password;                
        User.build().retrieveByEmailPassword(email, password, function(users){            
          if(users){                
		        var Access = require("../models/access");        		
                Access.build({user_id: users.id}).retrieveByUserId(users.id, function(access){                    
                    if(access) {
                        res.json(access);
                    }
                    else {
                        Access.build({user_id: users.id}).add(function(access){                                        
                            res.json(access);
                        });   
                    }                                 
                });        		
            }else {
                res.send(400, "Usuário não encontrado.");
            }
        },
  	    function(err) {
            res.send(err);
        });
    })
}