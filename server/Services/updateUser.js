const user = require('../config/models/User');

module.exports = function(updatedetails){
    var key;
    if(updatedetails){
        for(item in updatedetails){
            if(item == 'key'){
                key = updatedetails[item]; 
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