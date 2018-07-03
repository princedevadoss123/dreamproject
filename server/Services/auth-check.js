
var authChecker = function(request) {
    let sessionToken = request.user;
    let authToken = request.token;
    if(sessionToken && authToken) {
        return (sessionToken === authToken);
    }
    else {
        return false;
    }
}

module.exports = authChecker;