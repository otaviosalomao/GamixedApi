
// router.use(function(req,res,next){	
// 	if(req.headers.token && req.headers.user_id){
// 		var Access = require("./models/access"); 			
// 		Access.build().retrieveByTokenUserId(req.headers.token, req.headers.user_id, function(access){
// 			if(access){				
				
// 			}
// 			else{
// 				res.send(401, "Não Autorizado.");
// 			}
// 		});
// 	}
// 	else{
// 		res.send(401, "Não Autorizado.");
// 	}
	
// });

module.exports = function (req, res, next) {
var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(401, "Não Autorizado.");
    }
}

