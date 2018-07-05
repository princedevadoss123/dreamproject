const user_model = require('../../config/models/User')
const crypto = require('crypto');

var CreateUser = function(request)
{
    var saltString = function (length) {
        return crypto.randomBytes(Math.ceil(length / 2))
         .toString('hex')
         .slice(0, length);
    };
    
    var salt = saltString(16);
    var password = request.body.password;
    var saltPasswd = crypto.createHmac('sha512', password).update(salt).digest('base64');
    var emailid = request.body.email;

    return user_model.sync({force: false}).then(function(){
        return user_model.create({
            saltstring: salt,
            emailid: emailid,
            contact: request.body.contact,
            saltpassword: saltPasswd
        }).then(function(result){
           return result;
        }).catch(function(error){
            console.log(error);
            return Promise.reject(error);
        })
    }).catch(function(error){
        console.log('Error Returned');
        return Promise.reject(error);
    })
 
}
module.exports = CreateUser;