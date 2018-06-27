const passport = require('./LogIn/oauth_providers/handle_oauth')
const userSignUp = require('./SignUp/signup');
const userverification = require('./SignUp/verify');




/* Sample Home Url to test the Login Functionality */
module.exports = function(app){

  app.get('/home', function(request,response){

    if(request.isAuthenticated()){
      response.redirect('/');
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
  passport.authenticate('local', { successRedirect: '/home',
                                   failureRedirect: '/home',
                                   failureFlash: true })
);

/* Call back functions for Thirdparty Authentication Mechanisams*/

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/home',
                                      failureRedirect: '/login' }));
app.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/home',
                                      failureRedirect: '/login' }));

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { successRedirect: '/home',
                                      failureRedirect: '/login' }));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
									  
/*SignUp routes*/
app.post('/user/signup',function(request,response)
{
  userSignUp(request).then(function(result){
    console.log("Success");
    response.send(200)
  }).catch(function(error){
    console.log("Error");
    response.send(500);
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
