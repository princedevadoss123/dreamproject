// // var crypto = require('crypto');
// // //var createUserService = require('./service/creatuser');



// // app.get('/',function(req,res){
// //     res.sendfile('signup.html');

// //          sequelize
// //       .authenticate()
// //       .then(() => {
// //         console.log('Connection has been established successfully.');
// //       })
// //       .catch(err => {
// //         console.error('Unable to connect to the database:', err);
// //       });
// // });



// // app.get('/send',function(req,res){

// //    console.log('Inside send method');
// //    console.log(req.query.email);

// //    host=req.get('host');
// //    link="http://"+req.get('host')+"/verify?id="+req.query.email;  

// //    var saltString = function (length) {
// //        return crypto.randomBytes(Math.ceil(length / 2))
// //         .toString('hex')
// //         .slice(0, length);
// //    };



   


//     const temporaryusers = sequelize.define('temporaryusers', {
//       username: {
//         type: Sequelize.STRING
//       },
//       saltstring: {
//         type: Sequelize.STRING
//       },
//       email: {
//         type: Sequelize.STRING
//       },
//       contact: {
//         type: Sequelize.STRING
//       },
//       saltpassword: {
//         type: Sequelize.STRING
//       }
//     });


//     var salt = saltString(16);
//     var password = req.query.password;
//     var saltPasswd = crypto.createHmac('sha512', password).update(salt).digest('base64');

//     console.log('The password after salting is : ' + saltPasswd);
   

    
//     temporaryusers.sync({ force: false }).then(() => {
//       return temporaryusers.create({
//         username: req.query.username,
//         saltstring: salt,
//         email: req.query.email,
//         contact: req.query.contact,
//         saltpassword: saltPasswd
//       });
//     });

//     temporaryusers.findAll().then(temporaryuser => {
//       console.log(temporaryuser);
//     });


    
// host=req.get('host');
// link='http://'+host+'/verify?id='+req.query.email;

// mailOptions = {
//   from: 'jameelaaa2018@gmail.com',
//   to: req.query.email,
//   subject: 'Sending Email using Node.js',
//   html : 'Hello,<br> Please Click on the link to verify your email.<br><a href='+link+'>Click here to verify</a>'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// }); 

// res.send('sent');

// });


// app.get('/verify',function(req,res){
// console.log(req.protocol+":/"+req.get('host'));
// if((req.protocol+"://"+req.get('host'))==("http://"+host))
// {
//     console.log("Domain is matched. Information is from Authentic email");
//         console.log(req.query.id);

// const 
// temporaryusers = sequelize.define('temporaryusers', {
//       username: {
//         type: Sequelize.STRING
//       },
//       saltstring: {
//         type: Sequelize.STRING
//       },
//       email: {
//         type: Sequelize.STRING
//       },
//       contact: {
//         type: Sequelize.STRING
//       },
//       saltpassword: {
//         type: Sequelize.STRING
//       }
//     });
//         temporaryusers.findOne({ where: {email: req.query.id} }).then(temporaryuser => {

//                    const useraccounts = sequelize.define('useraccounts', {
//       username: {
//         type: Sequelize.STRING
//       },
//       saltstring: {
//         type: Sequelize.STRING
//       },
//       email: {
//         type: Sequelize.STRING
//       },
//       contact: {
//         type: Sequelize.STRING
//       },
//       saltpassword: {
//         type: Sequelize.STRING
//       }
//     });

    
//     useraccounts.sync({ force: false }).then(() => {
//       return useraccounts.create({
//         username: temporaryuser.username,
//         saltstring: temporaryuser.saltstring,
//         email: temporaryuser.email,
//         contact: temporaryuser.contact,
//         saltpassword: temporaryuser.saltpassword
//       });
//     });

//     useraccounts.findAll().then(useraccounts => {
//       console.log(useraccounts);
//     });


//                    console.log("email is verified");
//            res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
//         });
// }
// else
// {
//     res.end("<h1>Request is from unknown source");
// }
// });



