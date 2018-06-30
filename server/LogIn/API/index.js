const auth = require('./auth');
const auth_callback = require('./auth_callback');

module.exports = {
    map_api : function(passport,strategy,callback){
    console.log('MAPI API INDEX')
    if(callback){
        auth_callback.callbackAPI(passport,strategy);
    }else{
        console.log('Initialize api');
        return auth.initializeAPI(passport,strategy);
    }
}
}