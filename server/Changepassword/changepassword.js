const decodeToken = require('../Services/decode-token');
const user = require('../config/models/User');
const saltPassword = require('../Services/saltpassword');
const updateUser = require('../Services/updateUser');

module.exports = function(request){
       let emailid = request.body.emailid;
       return user.find( {where : { emailid : emailid } } ).then(function(result){
            if(result == null){
                return Promise.reject({error: "Change Password Error", message: "User not found"});
            }else{
                let saltPwd = saltPassword(request.body.password);
                let updateObject = {
                    saltpassword : saltPwd.saltPwd,
                    saltstring : saltPwd.saltString
                };
                return updateUser(emailid,updateObject).then(function(result){
                    return {success: "Change Password Error", message: "Password Updated Sucessfully"};
                }).catch(function(error){
                    return Promise.reject({error: "Change Password Error", message:"Database Error"});
                });
            }
       }).catch(function(error){
           return Promise.reject(error);
       });
}