
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const auth_config_fb = require('../config/OAuth/FacebookStrategy');
const auth_config_go = require('../config/OAuth/GoogleStrategy');
const auth_config_li = require('../config/OAuth/LinkedInStrategy');
const jwt = require('jsonwebtoken');
const secretkey = require('../config/OAuth/token_secret').key;
const ReadUser = require('./service/ReadUser');

var  findOrCreateUser = ReadUser.findOrCreateUser;

passport.serializeUser(function(user, done) {
    try {
        var userid = user[0].dataValues.userid;
        id = {Id:userid}
    } catch (error) {
        var userid = user.dataValues.emailid;
        id = {Id:userid}
    }
    var token = jwt.sign(id,secretkey);
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

      findOrCreateUser(profile).then(function(user)
    {
        return done(null,user);
    }).catch(function(error){
        return done(error);
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: auth_config_go.clientID,
    clientSecret: auth_config_go.clientSecret,
    callbackURL: auth_config_go.callbackURL
  },
  function(token, tokenSecret, profile, done) {

    findOrCreateUser(profile).then(function(user)
    {
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

    findOrCreateUser(profile).then(function(user)
    {
        return done(null,user);
    }).catch(function(error){
        return done(error);
    });
  }
));

passport.use(new LocalStrategy({
    passReqToCallback : true
},
    function(req,username, password, done) {
   
    findOrCreateUser(username,password).then(function(user)
    {
        console.log(user);
        if(!user)
           return done(null, false, { message: 'Incorrect username.' });
        else
           return done(null,user);
    }).catch(function(error){
           return done(error);
    });
    }
  ));

  module.exports = passport;