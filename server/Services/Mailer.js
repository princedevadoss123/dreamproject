const nodemailer = require('nodemailer');

var Mailer = function(emailid,host)
{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kumarirakhi031@gmail.com',
          pass: 'pass_word2_'
        }
      });

      var link="https://"+host+"/verify?id="+emailid;
      mailOptions = {
        from: 'kumarirakhi031@gmail.com',
        to: emailid,
        subject: 'Sending Email using Node.js',
        html : 'Hello,<br> Please Click on the link to verify your email.<br><a href='+link+'>Click here to verify</a>'
      };
    return transporter.sendMail(mailOptions).then(function(result){
        return result;
    }).catch(function(error){
        return Promise.reject(error);
    })
}

module.exports = Mailer