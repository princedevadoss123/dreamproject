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

passport.serializeUser(function(user, done) {
    try {
        var userid = user[0].dataValues.userid;
    } catch (error) {
        var userid = user.dataValues.emailid;
    }
    done(null, userid);
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
     //console.log(profile);
    //process.nextTick(function () {
      strategy_user.findOrCreate({
        where: {userid: profile._json.id}, // we search for this user
        defaults: { provider : profile.provider, emailid: profile._json.email, username: profile._json.first_name + ' ' + profile._json.last_name, isdeleted: false, contact: null} // if it doesn't exist, we create it with this additional data
      }).then(function(user){
         return done(null,user);
      }).catch(function(error){
         return done(error);
      });
    //});
  }
));

passport.use(new GoogleStrategy({
    clientID: auth_config_go.clientID,
    clientSecret: auth_config_go.clientSecret,
    callbackURL: auth_config_go.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    //console.log(profile);
    strategy_user.findOrCreate({
      where: {userid: profile._json.id}, // we search for this user
      defaults: { provider : profile.provider, emailid: profile.emails[0].value, username: profile._json.displayName, isdeleted: false, contact: null} // if it doesn't exist, we create it with this additional data
    }).then(function(user){
       return done(null,user);
    }).catch(function(error){
       return done(error);
    });
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
    console.log(profile);
    process.nextTick(function () {
      strategy_user.findOrCreate({
        where: {userid: profile._json.id}, // we search for this user
        defaults: { provider : profile.provider, emailid: profile._json.emailAddress, username: profile._json.formattedName, isdeleted: false, contact: null} // if it doesn't exist, we create it with this additional data
      }).then(function(user){
         return done(null,user);
      }).catch(function(error){
         return done(error);
      });
    });
  }
));

passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log(username)
      console.log(password)
      local_user.findOne({where :{ emailid: username }}).then(function(user) {
        console.log(user.dataValues.saltstring);
        if (!user) {
          console.log('user name issue');
          return done(null, false, { message: 'Incorrect username.' });
        }else{
            var saltstring = user.dataValues.saltstring;
            console.log(saltstring);
            var hashPassword = crypto.createHmac('sha512', password).update(saltstring).digest('base64');
            console.log(hashPassword);
            if(hashPassword == user.dataValues.saltpassword){
                  done(null,user);
             }else{
                var error = new Error("Invalid password");
                return done(error);
             }
        }
      });
    }
  ));

  module.exports = passport;