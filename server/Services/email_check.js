const kickbox = require('kickbox').client('live_d82cd0b5a10712004d9ef854edd29f713a692b56f1873a47facdf9ea36c4acf7').kickbox();

module.exports = function(email){
    return new Promise((resolve,reject) => {
        kickbox.verify(email, function (err, response) {
            if(!err){
                if(response.body.reason === "accepted_email")
                {
                    resolve(response);
                } else{
                    reject("Not delivered");
                }
            }else{
                reject(err);
            }
        });
    })
}

