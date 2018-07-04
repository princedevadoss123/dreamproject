const CreateUser = require('./service/CreateUser')
const Mailer = require('../Services/Mailer')

var signUp = function(request){
     var emailid = request.body.email;
     var host = request.get('host');
     return  CreateUser(request).then(function(result){

       var link = "https://"+host+"/verify?id="+emailid;
       var body = 'Hello,<br> Please Click on the link to verify your email.<br><a href='+link+'>Click here to verify</a>';
       var subject = 'Verification mail';

       Mailer(emailid,subject,body).then(function(result){
        return result;
       }).catch(function(error){
          
       return  Promise.reject(error);
       })
     }).catch(function(error){
          return Promise.reject(error);
         
    });
}


module.exports = signUp


