
let authChecker = function(request) {
    let sessionToken = request.user;
    let authToken = request.token;
    console.log( sessionToken );
    console.log( authToken );
    if(sessionToken && authToken) {
        return (sessionToken === authToken);
    }
    else {
        return false;
    }
}

module.exports = authChecker;