const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const auth_config = require('../../config/auth_config')



passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user);
  });
passport.deserializeUser(function(id, done) {
    done(null, id);
  });

passport.use(new FacebookStrategy({
      clientID: auth_config.facebook.clientID,
      clientSecret: auth_config.facebook.clientSecret,
      callbackURL: auth_config.facebook.callbackURL,
      profileFields: auth_config.facebook.profileFields
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      //process.nextTick(function () {
        return done(null, profile);
      //});
    }
));

module.exports = passport
