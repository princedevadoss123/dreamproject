module.exports = function(model){
    return model.sync({force: false}).then(function(result){
        return result;
    }).catch(function(error){
        return error;
    });
}