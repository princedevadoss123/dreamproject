const email_service = require("../Services/Mailer");
const check_email = require("../Services/email_check");
const user = require("../config/models/User");

module.exports =  function(emailid,host){
    var link = "https://"+host+"/change/pwd?mode=success&email="+emailid+"";
    var body = 'Hello,<br> Please Click on the link to change your password.<br><a href='+link+'>Click here to reset your password</a>';
    return user.find({where : {emailid: emailid}}).then(function(result){
        if(result != null){
            return email_service(emailid,"Password reset link",body).then(function(result){
                return result;
            }).catch(function(error){
                return Promise.reject({error: "Change Password Error", message: "Cannot send Email"});
            });
        }else{
            return Promise.reject({error : "Change Password Error", message: "User not found"});
        }
    }).catch(function(error){
        return Promise.reject(error);
    });
}