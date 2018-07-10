const crypto = require('crypto');

module.exports = function(password){
        var saltString = function (length) {
            return crypto.randomBytes(Math.ceil(length / 2))
             .toString('hex')
             .slice(0, length);
        };
        var salt = saltString(16);
        var saltPasswd = crypto.createHmac('sha512', password).update(salt).digest('base64');
        if(saltPasswd != null){
            return {saltPwd: saltPasswd, saltString: salt};
        }
}