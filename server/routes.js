const routes = require('express').Router();
const passport = require('./LogIn/oauth_providers/handle_oauth')
const userSignUp = require('./SignUp/signup');
const userverification = require('./SignUp/verify');




/* Sample Home Url to test the Login Functionality */

routes.get('/home', function(request,response){
    console.log("myrequest: " +  request.user);
  
   // console.log("myrequest: " +  request.session);
    request.session
    if(request.isAuthenticated()){
      console.log("Authentication successful");
      response.redirect('/');
    }else{
      response.sendStatus(403);
    }
  
});

/*Routes for Authentication from third party providers*/


routes.get('/auth/facebook',
  passport.authenticate('facebook',{ scope: ['email'] }));

routes.get('/auth/google',
   passport.authenticate('google', { scope: ['email'] }));

routes.get('/auth/linkedin',
  passport.authenticate('linkedin'));

routes.post('/auth/login',
  passport.authenticate('local', { successRedirect: '/home',
                                   failureRedirect: '/home'
                                   })
);

/* Call back functions for Thirdparty Authentication Mechanisams*/

routes.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/home',
                                      failureRedirect: '/login' }));
routes.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/home',
                                      failureRedirect: '/login' }));

routes.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { successRedirect: '/home',
                                      failureRedirect: '/login' }));

routes.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
									  
/*SignUp routes*/
routes.post('/user/signup',function(request,response)
{
  userSignUp(request).then(function(result){
    console.log("Success");
    response.send(200)
  }).catch(function(error){
    console.log("Error");
    response.send(500);
  })
});

routes.get('/verify', function(request,response){
    userverification(request).then(function(result){
      response.sendStatus(200).end();
    }).catch(function(error){
      console.log('error');
      response.send("Verification Failed").end();
    })
});
module.exports = routes;