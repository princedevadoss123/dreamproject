const passport = require('passport');
const auth_api = require('./API/index.js');
const auth_service = require('./service/index')(passport);


module.exports = function(strategy,callback){
   console.log("API index");
   console.log(auth_service);
   return auth_api.map_api(auth_service,strategy,callback);
}