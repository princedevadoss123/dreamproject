const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const auth_config = require('../../config/OAuth/FacebookStrategy')



passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user);
  });
passport.deserializeUser(function(id, done) {
    done(null, id);
  });

passport.use(new FacebookStrategy({
      clientID: auth_config.clientID,
      clientSecret: auth_config.clientSecret,
      callbackURL: auth_config.callbackURL,
      profileFields: auth_config.profileFields
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      //process.nextTick(function () {
        return done(null, profile);
      //});
    }
));

module.exports = passport
