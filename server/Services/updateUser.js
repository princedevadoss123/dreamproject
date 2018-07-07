const user = require('../config/models/User');

module.exports = function(updateDetails){
    let key;
    if(updateDetails){
        for(item in updateDetails){
            if(item == 'key'){
                key = updateDetails[item]; 
            }else{
                
            }
        }
        return user.update({property:value},{ where: {emailid: update} }).then(function(result){
            return result;
        }).catch(function(error){
            return Promise.reject(error);
        });
    }
}