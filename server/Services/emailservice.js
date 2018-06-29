const nodemailer = require('nodemailer');


var sendMail = function(mailid,subject,mail_body){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pdevs2018@gmail.com',
          pass: 'pdevs@123'
        }
      });
      
      
      mailOptions = {
        from: 'pdevs2018@gmail.com',
        to: mailid,
        subject: subject,
        html : 'Hello,<br> Please Click on the link to verify your email.<br><a href='+mail_body+'>Click here to verify</a>'
      };
    
    return transporter.sendMail(mailOptions).then(function(result){
        return result;
    }).catch(function(error){
        return Promise.reject(error);
    })

} 


module.exports = sendMail