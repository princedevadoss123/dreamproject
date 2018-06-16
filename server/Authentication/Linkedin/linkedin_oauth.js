const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const auth_config = require('../../config/auth_config')

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new LinkedInStrategy({
    clientID: auth_config.linkedin.clientID,
    clientSecret: auth_config.linkedin.clientSecret,
    scope: auth_config.linkedin.scope,
    callbackURL: auth_config.linkedin.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    console.log(profile);
    process.nextTick(function () {

      // To keep the example simple, the user's LinkedIn profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

module.exports = passport
