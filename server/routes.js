const passport = require('./LogIn/oauth_providers/handle_oauth')
const userSignUp = require('./SignUp/index');
const userverification = require('./SignUp/verify');
const authCheck = require('./Services/auth-check');
const user = require('./User/index');
const decodeToken = require('../server/Services/decode-token');
const sendResetLink = require('../server/Changepassword/SendResetLink');
const changePassword = require('../server/Changepassword/changepassword');


/* Sample Home Url to test the Login Functionality */
module.exports = function(app){

  app.get('/success', function(request,response){
    if(request.isAuthenticated()){
      response.redirect('/home?token='+request.user);
    }else{
      response.sendStatus(403);
    }
  
});

app.get('/failure', function(request, response) {
  response.send(403);
})

/*Routes for Authentication from third party providers*/


app.get('/auth/facebook',
  passport.authenticate('facebook',{ scope: ['email'] }));

app.get('/auth/google',
   passport.authenticate('google', { scope: ['email'] }));

app.get('/auth/linkedin',
  passport.authenticate('linkedin'));

app.post('/auth/login', function(request, response, next) {
  passport.authenticate('local', function(err, user, info) {
    if(!user){
      if(info != null){
        response.send(info);
      }else{
        response.send({error:'Database Error',message:'Cannot find user'});
      }
    }else{
      request.logIn(user,function(err){
        if (err) { 
          response.send({error:'Server Error',message:'Cannot Login user'});
        }
        response.send({ token: request._passport.session.user });
      })
    }
  })(request, response, next);
});

/* Call back functions for Thirdparty Authentication Mechanisams*/

app.get('/auth/google/callback',function(request,response,next){
  passport.authenticate('google',function(err,user,info) {
    if(!user){
      if(info != null){
        response.redirect('/?error='+info.error+'&message='+info.message);
      }else{
        response.redirect('/?error='+'Database Error'+'&message='+'Cannot find user');
      }
    }else{
      request.logIn(user,function(err){
        if (err) { 
          response.redirect('/?error='+'Server Error'+'&message='+'Cannot Login user');
        }
        response.redirect('/success');
      })
    }
  })(request,response,next);
});

app.get('/auth/facebook/callback',function(request,response,next){
  passport.authenticate('facebook',function(err,user,info) {
    if(!user){
      if(info != null){
        response.redirect('/?error='+info.error+'&message='+info.message);
      }else{
        response.redirect('/?error='+'Database Error'+'&message='+'Cannot find user');
      }
    }else{
      request.logIn(user,function(err){
        if (err) { 
          response.redirect('/?error='+'Server Error'+'&message='+'Cannot Login user');
        }
        response.redirect('/success');
      })
    }
  })(request,response,next);
});

app.get('/auth/linkedin/callback',function(request,response,next){
  passport.authenticate('linkedin',function(err,user,info) {
    if(!user){
      if(info != null){
        response.redirect('/?error='+info.error+'&message='+info.message);
      }else{
        response.redirect('/?error='+'Database Error'+'&message='+'Cannot find user');
      }
    }else{
      request.logIn(user,function(err){
        if (err) { 
          response.redirect('/?error='+'Server Error'+'&message='+'Cannot Login user');
        }
        response.redirect('/success');
      })
    }
  })(request,response,next);
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
									  
/*SignUp routes*/
app.post('/user/signup',function(request,response)
{
  userSignUp(request).then(function(result){
    response.send(result);
  }).catch(function(error){
    response.send(error);
  })
});

app.post('/user/request/resetpassword',function(request,response) {
  sendResetLink(request.body.email,request.get('host')).then(function(result){
    response.send({status: "Password reset Link sent to Registered Email Id."});
  }).catch(function(error){
    response.send(error);
  });
});

app.post('/user/success/resetpassword',function(request,response) {
  changePassword(request).then(function(result){
    response.send(result);
  }).catch(function(error){
    response.send(error);
  });
});

app.get('/verify', function(request,response){
    userverification(request).then(function(result){
      response.sendStatus(200).end();
    }).catch(function(error){
      response.send({error: "Verification Failed"});
    })
});

app.get('/add',function(request,response){
  if(authCheck(request)) {
    let n1 = request.query.num1;
    let n2 = request.query.num2;
    response.send({result: parseInt(n1) + parseInt(n2)});
  }
  else {
    response.send(403);
  }
});

app.get('/subtract',function(request,response){
  if(authCheck(request)) {
    let n1 = request.query.num1;
    let n2 = request.query.num2;
    response.send({result: parseInt(n1) - parseInt(n2)});
  }
  else {
    response.send(403);
  }
});

app.get('/multiply',function(request,response){
  if(authCheck(request)) {
    let n1 = request.query.num1;
    let n2 = request.query.num2;
    response.send({result: parseInt(n1) * parseInt(n2)});
  }
  else {
    response.send(403);
  }
});
app.get('/user', function(request, response) {
    if(authCheck(request)) {
      decodeToken(request.token).then(function(result){
      var id = {
        email: result
      }
      response.send(id);
     })
    }
    else {
      response.send(403);
    }
});

}
