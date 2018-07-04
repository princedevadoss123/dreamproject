const email_service = require("../Services/Mailer");


var sendLink =  function(emailid){
    var link = "https://"+host+"/change/pwd?request="+emailid;
    var body = 'Hello,<br> Please Click on the link to change your password.<br><a href='+link+'>Click here to reset your password</a>';
    return email_service(emailid,"Password reset link",body).then(function(result){
        return result;
    }).catch(function(error){
        return Promise.reject(error);
    });
}


module.exports = sendLink