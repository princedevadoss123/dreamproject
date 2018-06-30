module.exports = {
    callbackAPI : function(passport,strategy){
    switch(strategy){
        case 'facebook':
            passport.authenticate('facebook', { successRedirect: '/success',
            failureRedirect: '/' });
        break;
        case 'google':
            passport.authenticate('google', { successRedirect: '/success',
            failureRedirect: '/' });
        break;
        case 'linkedin':
            passport.authenticate('linkedin', { successRedirect: '/success',
            failureRedirect: '/' });
        break;
    }
}
}