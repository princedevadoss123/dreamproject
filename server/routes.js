const routes = require('express').Router();
const passportFacebook = require('./LogIn/FacebookLogIn/facebook_oauth');
const passportGoogle = require('./LogIn/GoogleLogIn/google_oauth');
const passportLink = require('./LogIn/LinkedInLogIn//linkedin_oauth');
const userSignUp = require('./SignUp/signup');




/* Sample Home Url to test the Login Functionality */

routes.get('/home', function(request,response){

    if(request.isAuthenticated()){
      response.sendStatus(200);
    }else{
      response.sendStatus(403);
    }
  
});

/*Routes for Authentication from third party providers*/


routes.get('/auth/facebook',
  passportFacebook.authenticate('facebook',{ scope: ['email'] }));

routes.get('/auth/google',
   passportGoogle.authenticate('google', { scope: ['email'] }));

routes.get('/auth/linkedin',
  passportLink.authenticate('linkedin'));

/* Call back functions for Thirdparty Authentication Mechanisams*/

routes.get('/auth/facebook/callback',
  passportFacebook.authenticate('facebook', { successRedirect: '/home',
                                      failureRedirect: '/login' }));
routes.get('/auth/google/callback',
  passportGoogle.authenticate('google', { successRedirect: '/home',
                                      failureRedirect: '/login' }));

routes.get('/auth/linkedin/callback',
  passportLink.authenticate('linkedin', { successRedirect: '/home',
                                      failureRedirect: '/login' }));
									  
/*SignUp routes*/
routes.get('/user/signup',function(request,response)
{
	userSignUp.createUser(request);
});
module.exports = routes;