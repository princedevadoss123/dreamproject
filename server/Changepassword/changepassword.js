const decode_token = require('../Services/decode-token');
const user = require('../config/models/User');
const saltPassword = require('../Services/saltpassword');
const updateUser = require('../Services/updateUser');

module.exports = function(request){
    return decode_token(request.token).then(function(result){
       let emailid = result.email;
       return user.find({emailid:emailid}).then(function(result){
            if(result == null){
                return Promise.reject({error: "User Doesn't Exist"});
            }else{
                let saltPwd = saltPassword(request.body.password);
                let updateObject = {
                    saltpassword : saltPwd.saltPwd,
                    saltstring : saltPwd.saltString
                };
                updateUser(emailid,updateObject).then(function(result){
                    return {status: "Password Updated Sucessfully"};
                }).catch(function(error){
                    return Promise.reject(error);
                });
            }
       }).catch(function(error){
           return Promise.reject(error);
       })
    }).catch(function(error){
        return Promise.reject(error);
    });
}