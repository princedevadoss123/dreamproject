const jwt = require('jsonwebtoken');
const secretkey = require('../../config/OAuth/token_secret').key;

module.exports = function(passport){
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

    return passport;
}