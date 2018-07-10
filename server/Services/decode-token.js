const jwt = require('jsonwebtoken');
//const secretkey = require('../../config/OAuth/token_secret');

module.exports = function(token){
var decoded_token = jwt.decode(token);
  return new Promise((resolve,reject) => {
      if(decoded_token != null){
          resolve(decoded_token.Id);
      }else{
          reject("Error");
      }
  });
}