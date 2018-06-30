module.exports = {
    initializeAPI : function(passport,strategy){
        console.log("In API init");
    switch(strategy){
        case 'facebook':
            console.log('In fb init');
            var url = passport.authenticate('facebook',{ scope: ['email'] });
            console.log(url);
            return url;
        break;
        case 'google':
            passport.authenticate('google',{ scope: ['email'] });
        break;
        case 'linkedin':
            passport.authenticate('linkedin');
        break;
        case 'local':
        passport.authenticate('local', { successRedirect: '/success',
                                         failureRedirect: '/',
                                         failureFlash: true })
        break;
    }
}
}