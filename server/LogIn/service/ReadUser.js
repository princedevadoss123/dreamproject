const strategy_user = require('../../config/models/StrategyUser');
const local_user = require('../../config/models/User');
const crypto = require('crypto');

module.exports = {
    findOrCreateUser : function(profile,password)
    {
        if(!password)
        {
        if(profile.provider == 'facebook')
        {
           return  strategy_user.findOrCreate({
                where: {userid: profile._json.id}, // we search for this user
                defaults: { provider : profile.provider, emailid: profile._json.email, username: profile._json.first_name + ' ' + profile._json.last_name, isdeleted: false, contact: null} // if it doesn't exist, we create it with this additional data
              }).then(function(user){
                 return user;
              }).catch(function(error){
                 return Promise.reject(error);
              });
        }
        else if(profile.provider == 'google')
        {
           return  strategy_user.findOrCreate({
                where: {userid: profile._json.id}, // we search for this user
                defaults: { provider : profile.provider, emailid: profile.emails[0].value, username: profile._json.displayName, isdeleted: false, contact: null} // if it doesn't exist, we create it with this additional data
              }).then(function(user){
                 return user;
              }).catch(function(error){
                 return Promise.reject(error);
              });
        }
        else if(profile.provider == 'linkedin')
        {
           
        return strategy_user.findOrCreate({
          where: {userid: profile._json.id}, // we search for this user
          defaults: { provider : profile.provider, emailid: profile._json.emailAddress, username: profile._json.formattedName, isdeleted: false, contact: null} // if it doesn't exist, we create it with this additional data
        }).then(function(user){
           return user
        }).catch(function(error){
           return Promise.reject(error);
        });
    }
}
    else
    {
           var username = profile;
            return local_user.findOne({where :{ emailid:username }}).then(function(user) {
                if (!user) {
                  return user;
                }else{
                    var saltstring = user.dataValues.saltstring;
                    var hashPassword = crypto.createHmac('sha512', password).update(saltstring).digest('base64');
                    if(hashPassword == user.dataValues.saltpassword){
                          return user;
                     }else{
                        var error = new Error("Invalid password");
                        return Promise.reject(error);
                     }
                }
              }).catch(function(error)
            {
                return Promise.reject(error);
            });
        
    }
    }
}