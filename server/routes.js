const passport = require('./LogIn/oauth_providers/handle_oauth')
const userSignUp = require('./SignUp/signup');
const userverification = require('./SignUp/verify');




/* Sample Home Url to test the Login Functionality */
module.exports = function(app){

  app.get('/success', function(request,response){

    if(request.isAuthenticated()){
      response.setHeader("Authorization",request.user);
      response.redirect('/home');
    }else{
      response.sendStatus(403);
    }
  
});

/*Routes for Authentication from third party providers*/


app.get('/auth/facebook',
  passport.authenticate('facebook',{ scope: ['email'] }));

app.get('/auth/google',
   passport.authenticate('google', { scope: ['email'] }));

app.get('/auth/linkedin',
  passport.authenticate('linkedin'));

app.post('/auth/login',
  passport.authenticate('local', { successRedirect: '/success',
                                   failureRedirect: '/',
                                   failureFlash: true })
);

/* Call back functions for Thirdparty Authentication Mechanisams*/

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/success',
                                      failureRedirect: '/' }));
app.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/success',
                                      failureRedirect: '/' }));

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { successRedirect: '/success',
                                      failureRedirect: '/' }));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
									  
/*SignUp routes*/
app.post('/user/signup',function(request,response)
{
  userSignUp(request).then(function(result){
    console.log("Success");
    response.sendStatus(200).end();
  }).catch(function(error){
    console.log("Error");
    response.sendStatus(500).end();
  })
});

app.get('/verify', function(request,response){
    userverification(request).then(function(result){
      response.sendStatus(200).end();
    }).catch(function(error){
      console.log('error');
      response.send("Verification Failed").end();
    })
});

}
