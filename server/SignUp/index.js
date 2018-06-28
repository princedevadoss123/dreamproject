const CreateUser = require('./service/CreateUser')
const Mailer = require('../Services/Mailer')
//const createUserService = require('./service/creatuser');

var signUp = function(request){
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
}


module.exports = signUp


