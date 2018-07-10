const email_service = require("../Services/Mailer");
const check_email = require("../Services/email_check");
const user = require("../config/models/StrategyUser");

module.exports =  function(emailid,host){
    var link = "https://"+host+"/change/pwd?mode=success";
    var body = 'Hello,<br> Please Click on the link to change your password.<br><a href='+link+'>Click here to reset your password</a>';
    return user.find({emailid: emailid}).then(function(result){
        if(result != null){
            return check_email(emailid).then(function(result){
                return email_service(emailid,"Password reset link",body).then(function(result){
                    return result;
                }).catch(function(error){
                    return Promise.reject({error: "Cannot Send Email, Check Internet Connection"});
                });
            }).catch(function(error){
                return Promise.reject({error: "Enter a Valid Email"});
            });
        }else{
            return Promise.reject({error : "User Doesn't Exist"});
        }
    }).catch(function(error){
        return Promise.reject(error);
    });
}