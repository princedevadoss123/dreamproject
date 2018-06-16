const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const auth_config = require('../../config/auth_config')

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: auth_config.google.clientID,
    clientSecret: auth_config.google.clientSecret,
    callbackURL: auth_config.google.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile);
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

module.exports = passport
