const email_service = require("../Services/emailservice");


var sendLink =  function(emailid){
    var link ;
    return email_service(emailid,"Password reset link",link).then(function(result){
        return result;
    }).catch(function(error){
        return Promise.reject(error);
    });
}


module.exports = sendLink