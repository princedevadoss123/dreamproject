const user_model = require('../config/models/User');

var verifyUser = function(request)
{ 
    return user_model.findOne({ where: { emailid: request.query.id } }).then(function(result){
    if(result == null){
        return Promise.reject();
    }
    return user_model.update({isverified:true}, { where: {emailid: request.query.id} }).then(function(result){
           return result;
    }).catch(function(error){
        return Promise.reject(error);
    });
}).catch(function(error){
   return Promise.reject(error);
});

}
module.exports = verifyUser