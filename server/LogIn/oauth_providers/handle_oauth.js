const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const auth_config_fb = require('../../config/OAuth/FacebookStrategy');
const auth_config_go = require('../../config/OAuth/GoogleStrategy');
const auth_config_li = require('../../config/OAuth/LinkedInStrategy');
const strategy_user = require('../../config/models/StrategyUser');
const local_user = require('../../config/models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secretkey = require('../../config/OAuth/token_secret');

passport.serializeUser(function(user, done) {
    try {
        var userid = user[0].dataValues.emailid;
        id = {Id:userid}
    } catch (error) {
        var userid = user.dataValues.emailid;
        id = {Id:userid}
    }
    var token = jwt.sign(id,secretkey.key);
    done(null, token);
  });
passport.deserializeUser(function(id, done) {
    done(null, id);
  });

passport.use(new FacebookStrategy({
    clientID: auth_config_fb.clientID,
    clientSecret: auth_config_fb.clientSecret,
    callbackURL: auth_config_fb.callbackURL,
    profileFields: auth_config_fb.profileFields
  },
  function(accessToken, refreshToken, profile, done) {
    //process.nextTick(function () {
      local_user.findOne({where:{emailid:profile._json.email}}).then(function(result){
        if(result != null){
          return done(null,false,{error: "Login Error", message: 'User Already Exists, Please Login with your registered emailid'});
        }else{
          strategy_user.findOrCreate({
            where: {userid: profile._json.email}, // we search for this user
            defaults: { provider : profile.provider, emailid: profile._json.email, username: profile._json.first_name + ' ' + profile._json.last_name, isdeleted: false, contact: null} // if it doesn't exist, we create it with this additional data
          }).then(function(user){
             return done(null,user);
          }).catch(function(error){
             return done(error,false);
          });
        }
      }).catch(function(error){
        return done(error);
      })
  }
));

passport.use(new GoogleStrategy({
    clientID: auth_config_go.clientID,
    clientSecret: auth_config_go.clientSecret,
    callbackURL: auth_config_go.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    local_user.findOne({where:{emailid:profile.emails[0].value}}).then(function(result){
      if(result != null){
        return done(null,false,{error: "Login Error", message: 'User Already Exists, Please Login with your registered emailid'});
      }else{
        strategy_user.findOrCreate({
          where: {userid: profile._json.id}, // we search for this user
          defaults: { provider : profile.provider, emailid: profile.emails[0].value, username: profile._json.displayName, isdeleted: false, contact: null} // if it doesn't exist, we create it with this additional data
        }).then(function(user){
           return done(null,user);
        }).catch(function(error){
           return done(error,false);
        });
      }
    }).catch(function(error){
      return done(error);
    })
  }
));

passport.use(new LinkedInStrategy({
    clientID: auth_config_li.clientID,
    clientSecret: auth_config_li.clientSecret,
    scope: auth_config_li.scope,
    callbackURL: auth_config_li.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    local_user.findOne({where:{emailid: profile._json.emailAddress}}).then(function(result){
      if(result != null){
        return done(null,false,{error: "Login Error", message: 'User Already Exists, Please Login with your registered emailid'})
      }else{
        strategy_user.findOrCreate({
          where: {userid: profile._json.id}, // we search for this user
          defaults: { provider : profile.provider, emailid: profile._json.emailAddress, username: profile._json.formattedName, isdeleted: false, contact: null} // if it doesn't exist, we create it with this additional data
        }).then(function(user){
           return done(null,user);
        }).catch(function(error){
           return done(error,false);
        });
      }
    }).catch(function(error){
      return done(error);
    })
  }
));

passport.use(new LocalStrategy(
    function(username, password, done) {
      strategy_user.findOne({where:{emailid: username}}).then(function(user){
        if(!user){
          local_user.findOne({where :{ emailid: username }}).then(function(user) {
            if (!user) {
              return done(null,false,{ error: 'Login Error',message:'User doesn\'t Exist.' });
            }else{
              if(user.dataValues.isverified == false){
                return done(null,false,{ error: 'Verification Error', message: 'Please Verify your Email-Id before Logging in.' });
              }else{
                var saltstring = user.dataValues.saltstring;
                var hashPassword = crypto.createHmac('sha512', password).update(saltstring).digest('base64');
                if(hashPassword == user.dataValues.saltpassword){
                      done(null,user);
                 }else{
                   return done(null,false,{ error: 'Login Error', message:'Invalid Password.' });
                 }
              }
            }
          });
        }else{
          return done(null,false,{error: 'Login Error',message:'User Already Exists, please login through your registered social account.'});
        }
      })
    }
  ));

  module.exports = passport;