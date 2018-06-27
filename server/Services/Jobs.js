const cron = require('node-cron')
const user_model = require('../config/models/User');

var verifyTask = cron.schedule('0 0 0 * * *', function(){
  console.log('running a task daily mid-night');
    user_model.update({isdeleted:true}, { where: { isverified:false } }).then(function(){
        console.log("Daily job Executed Succesfully");
    }).catch(function(error){
       Promise.reject(error);
       console.log("Daily job Execution failed");
    });
});

module.exports = verifyTask;