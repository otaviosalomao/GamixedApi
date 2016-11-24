module.exports = function(router){
    var Access = require('../models/access');
    router.route('/access')
    .post(function(req, res) {
        var token = req.body.token;
        var user_id = req.body.user_id;
        var access = Access.build();

        access.retrieveByTokenUserId(token, user_id, function(accesses){        
            if (accesses) {
                access.updateByToken(user_id, token, function(success){
        	       res.json(accesses);
    		    });
            } else {
                res.send(401, "Acesso expirado.");
            }
        }, function(error) {
            res.send(500, "Erro interno.");
        });
    });
}
