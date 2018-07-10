const jwt = require('jsonwebtoken');
//const secretkey = require('../../config/OAuth/token_secret');

module.exports = function(token){
let decodedToken = jwt.decode(token);
  return new Promise((resolve,reject) => {
      if(decodedToken != null){
          resolve(decodedToken.Id);
      }else{
          reject("Error");
      }
  });
}