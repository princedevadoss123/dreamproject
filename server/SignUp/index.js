const CreateUser = require('./service/CreateUser');
const Mailer = require('../Services/Mailer');
const email_check = require('../Services/email_check');
const user = require('../config/models/User');
const stUser = require('../config/models/StrategyUser');

var signUp = function(request){
     var emailid = request.body.email;
     var host = request.get('host');
     
     return user.findOne({where: {emailid: request.body.email}}).then(function(result){
        if(result != null){
          return Promise.reject({error: "Signup Error", message:"User Already Exists, please login with your registered email id"});
        } else{
          return stUser.findOne({where:{emailid: request.body.email}}).then(function(result){
            if(result != null){
              return Promise.reject({error: "Signup Error", message:"User Already Exists, please login with your registered social login"});
            }else{
              return email_check(request.body.email).then(function(result){
                return CreateUser(request).then(function(result){
                  var link = "https://"+host+"/verify?id="+emailid;
                  var body = 'Hello,<br> Please Click on the link to verify your email.<br><a href='+link+'>Click here to verify</a>';
                  var subject = 'Verification mail';
                  
                  return Mailer(emailid,subject,body).then(function(result){
                    return result;
                  }).catch(function(error){
                    return Promise.reject(error);
                  });
          
                }).catch(function(error){
                     return Promise.reject(error);  
               });
               }).catch(function(error){
                  return Promise.reject(error);
               })
            }
          }).catch(function(error){
              return Promise.reject(error);
          })
        }
     }).catch(function(error){
       return error;
     })     
}


module.exports = signUp


