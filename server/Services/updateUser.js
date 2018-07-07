const user = require('../config/models/User');

module.exports = function(key, updateObject){
    return user.update(updateObject,{ where: {emailid: key} }).then(function(result){
        return result;
    }).catch(function(error){
        return Promise.reject(error);
    });
}