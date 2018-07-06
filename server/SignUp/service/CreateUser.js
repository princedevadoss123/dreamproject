const user_model = require('../../config/models/User')
const saltPassword = require('../../Services/saltpassword')


var CreateUser = function(request)
{
    var password = request.body.password;
    var saltPasswd = saltPassword(password);
    var emailid = request.body.email;
    return user_model.sync({force: false}).then(function(){
        return user_model.create({
            saltstring: saltPasswd.saltString,
            emailid: emailid,
            contact: request.body.contact,
            saltpassword: saltPasswd.saltPwd
        }).then(function(result){
            return result;
        }).catch(function(error){
            if(error.name === 'SequelizeUniqueConstraintError')
            {
                var userExistsError = {
                    error:"User already Exists"
                }
                return Promise.reject(userExistsError);
            }else{
                return Promise.reject(error);
            }
        })
    }).catch(function(error){
        return Promise.reject(error);
    })
 
}
module.exports = CreateUser;