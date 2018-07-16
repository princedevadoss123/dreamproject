const kickbox = require('kickbox').client('live_e50255ec0b1df365444aad7ad4bcb9d872fc18e73a2e7d86bc8b3621d859e84c').kickbox();

module.exports = function(email){
    return new Promise((resolve,reject) => {
        kickbox.verify(email, function (err, response) {
            if(!err){
                if(response.body.reason === "accepted_email")
                {
                    resolve(response);
                } else{
                    reject({error:"Signup Error", message: "EmailID doesn't exist"});
                }
            }else{
                reject({error: "Kickbox Error", message: "No Balance"});
            }
        });
    })
}

