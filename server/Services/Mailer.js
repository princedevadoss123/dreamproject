const nodemailer = require('nodemailer');

let Mailer = function(emailid,subject,mail_body)
{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'pdevs2018@gmail.com',
          pass: 'pdevs@123'
        }
      });

      mailOptions = {
        from: 'pdevs2018@gmail.com',
        to: emailid,
        subject: subject,
        html : mail_body
      };
    return transporter.sendMail(mailOptions).then(function(result){
        return result;
    }).catch(function(error){
        return Promise.reject(error);
    })
}

module.exports = Mailer