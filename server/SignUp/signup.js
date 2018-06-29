const crypto = require('crypto');
const user_model = require('../config/models/User')
const email_service = require('../Services/emailservice')


var signUp = function(request){

    var saltString = function (length) {
        return crypto.randomBytes(Math.ceil(length / 2))
         .toString('hex')
         .slice(0, length);
    };
    
    var salt = saltString(16);
    var password = request.body.password;
    var saltPasswd = crypto.createHmac('sha512', password).update(salt).digest('base64');

    var link="https://"+request.get('host')+"/verify?id="+request.body.email;


    return user_model.sync({force: false}).then(function(){
        return user_model.create({
            saltstring: salt,
            emailid: request.body.email,
            contact: request.body.contact,
            saltpassword: saltPasswd
        }).then(function(result){
            return email_service(request.body.email,"Verification Mail",link).then(function(result){
                return result;
            }).catch(function(error){
                return Promise.reject(error);
            });
        }).catch(function(error){
            return Promise.reject(error);
        })
    }).catch(function(error){
        return Promise.reject(error);
    })
}


module.exports = signUp


