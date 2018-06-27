const crypto = require('crypto');
const nodemailer = require('nodemailer');
const user_model = require('../config/models/User')
//const createUserService = require('./service/creatuser');

var signUp = function(request){

    var saltString = function (length) {
        return crypto.randomBytes(Math.ceil(length / 2))
         .toString('hex')
         .slice(0, length);
    };
    
    var salt = saltString(16);
    var password = request.body.password;
    var saltPasswd = crypto.createHmac('sha512', password).update(salt).digest('base64');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dattu046@gmail.com',
          pass: 'Sridatta_046'
        }
      });

      var link="https://"+request.get('host')+"/verify?id="+request.body.email;

      mailOptions = {
        from: 'dattu046@gmail.com',
        to: request.body.email,
        subject: 'Sending Email using Node.js',
        html : 'Hello,<br> Please Click on the link to verify your email.<br><a href='+link+'>Click here to verify</a>'
      };

    return user_model.sync({force: false}).then(function(){
        return user_model.create({
            saltstring: salt,
            emailid: request.body.email,
            contact: request.body.contact,
            saltpassword: saltPasswd
        }).then(function(result){
            return transporter.sendMail(mailOptions).then(function(result){
                return result;
            }).catch(function(error){
                return Promise.reject(error);
            })
        }).catch(function(error){
            console.log(error);
            console.log('Error')
            return Promise.reject(error);
        })
    }).catch(function(error){
        console.log('Error Returned');
        return Promise.reject(error);
    })
}


module.exports = signUp


