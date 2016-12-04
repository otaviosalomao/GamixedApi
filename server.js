var express = require('express');
var bodyParser = require('body-parser');
var appConfig = require('./config/appConfig');
var cors = require('cors');
var app = express();
var router = express.Router();
app.use(cors());
app.use(bodyParser());
require('./controllers/loginController')(router);
router.use(function(req,res,next){	
	if(req.headers.token && req.headers.user_id){
		var Access = require("./models/access"); 			
		Access.build().retrieveByTokenUserId(req.headers.token, req.headers.user_id, function(access){
			if(access){				
				require('./controllers/productController')(router);
			 	require('./controllers/userController')(router);
			}
			else{
				res.send(401, "Não Autorizado.");
			}
		});
	}
	else{
		res.send(401, "Não Autorizado.");
	}
	
});
app.use('/api', router);
app.listen(appConfig.port);
console.log("Server was started.");
