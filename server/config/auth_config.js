const auth_config = {
    facebook: {
        clientID: "178817399504849",
        clientSecret: "d764cd573c50f79efbfeb1ac2dd11fbb",
        callbackURL: "https://127.0.0.1:3000/auth/facebook/callback",
        profileFields: ['id', 'emails', 'name']
    },
    google: {
        clientID: '695820943975-gn5frri7lg1d1632gg6qngo8ci1c4jk2.apps.googleusercontent.com',
        clientSecret: 'ViEbRQSPCs8f8KkQUO-7WbMO',
        callbackURL: 'https://127.0.0.1:3000/auth/google/callback'
    },
    linkedin:
    {
        clientID: '81k72ase19nwbz',
        clientSecret: 'b96Jxrpw8lOyAxsm',
        callbackURL: "https://127.0.0.1:3000/auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_basicprofile']
    }
};
   
module.exports = auth_config