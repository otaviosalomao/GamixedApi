var express = require('express');
var bodyParser = require('body-parser');
var appConfig = require('./config/appConfig');
var cors = require('cors');
var app = express();
var router = express.Router();
app.use(cors());
app.use(bodyParser());
require('./controllers/loginController')(router);
require('./controllers/productController')(router);
require('./controllers/userController')(router);
app.use('/api', router);
app.listen(appConfig.port);
console.log("Server was started.");
