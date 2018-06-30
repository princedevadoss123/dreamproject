const CreateUser = require('./service/CreateUser')
const Mailer = require('../Services/Mailer')
const verifyUser = require('../Services/VerifyUser')

module.exports = {

  /* User Registeration */
  signUp: function(request){
    var emailid = request.body.email;
    var host = request.get('host');
    return  CreateUser(request).then(function(result){

      Mailer(emailid,host).then(function(result){
       return result;
      }).catch(function(error){
      return  Promise.reject(error);
      })
    }).catch(function(error){
         return Promise.reject(error);
   });
},

/* User Verification */

verify: function(request){

  verifyUser(request).then(function(result){
    return result;
  }).catch(function(error){
    console.log('error');
    Promise.reject(error);
  })
}


}


