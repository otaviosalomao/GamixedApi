var appConfig = new Object();

appConfig.port = process.env.PORT || 9090;
appConfig.sessionTime = 20;

module.exports = appConfig;