module.exports = function(passport){
    console.log("service index"+passport)
  var temp =  require('./SerializeDeserialize')(passport);
 var fb = require('./FacebookService')(temp);
    //require('./GoogleService')(passport);
    //require('./LinkedInService')(passport);

    return fb;
}