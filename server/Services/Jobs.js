const cron = require('node-cron')
const user_model = require('../config/models/User');

let verificationJob = {
    verifyTask :  cron.schedule('0 0 0 * * *', function(){
            user_model.update({isdeleted:true}, { where: { isverified:false } }).then(function(){
                console.log("Daily job Executed Succesfully");
            }).catch(function(error){
                console.log("Daily job Execution failed");
            });
        }).start()
}
module.exports = verificationJob;