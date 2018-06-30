const FacebookStrategy = require('passport-facebook').Strategy;
const auth_config_fb = require('../../config/OAuth/FacebookStrategy');
const strategy_user = require('../../config/models/StrategyUser');


module.exports = function(passport){
    console.log('fb strategy');
    passport.use(new FacebookStrategy({
        clientID: auth_config_fb.clientID,
        clientSecret: auth_config_fb.clientSecret,
        callbackURL: auth_config_fb.callbackURL,
        profileFields: auth_config_fb.profileFields
      },
      function(accessToken, refreshToken, profile, done) {
          console.log("profile:"+profile);
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

    return passport;
}