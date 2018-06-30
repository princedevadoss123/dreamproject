const userSignUp = require('./SignUp/index.js');
const auth = require('./LogIn/index')

var signup = userSignUp.signUp;
var verify = userSignUp.verify;



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
app.get('/auth/facebook',function(request,response){
  console.log('facebook');
  response.setHeader(auth('facebook'));
});

app.get('/auth/google', function(){
  auth('google');
});

app.get('/auth/linkedin',function(){
  auth('linkedin');
});

app.post('/auth/login',function(){
  auth('local');
});

/* Call back functions for Thirdparty Authentication Mechanisams*/

app.get('/auth/facebook/callback',function(){
  auth('facebook','callback');
});

app.get('/auth/google/callback',function(){
  auth('google','callback');
});

app.get('/auth/linkedin/callback',function(){
  auth('linkedin','callback');

});


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
									  
/*SignUp routes*/
app.post('/user/signup',function(request,response)
{ 
  signup(request).then(function(result){
    console.log("Success");
    response.send(200)
  }).catch(function(error){
    console.log(error);
    response.send(500);
  })
});

app.get('/verify', function(request,response){
  verify(request).then(function(result){
      response.sendStatus(200).end();
    }).catch(function(error){
      console.log('error');
      response.send("Verification Failed").end();
    })
});

}
