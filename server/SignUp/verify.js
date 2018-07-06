const user_model = require('../config/models/User');
const updateUser = require('../Services/updateUser');

var verifyUser = function(request){
    return user_model.findOne({ where: { emailid: request.query.id } }).then(function(result){
        if(result == null){
            return Promise.reject();
        }
        return updateUser(request.query.id,{isverified:true}).then(function(result){
            return result;
        }).catch(function(error){
            return Promise.reject(error);
        });
        /*return user_model.update({isverified:true}, { where: {emailid: request.query.id} }).then(function(result){
               return result;
        }).catch(function(error){
            return Promise.reject(error);
        });*/
   }).catch(function(error){
       return Promise.reject(error);
   });
   
}


module.exports = verifyUser