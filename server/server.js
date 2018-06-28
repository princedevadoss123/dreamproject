const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const spdy = require('spdy');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const app = express();
const db_config = require('./config/DBConfiguration/redis')
const session = require('express-session')
const routes = require('./routes')
const redis = require('redis')
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const sequelize = require('./DatabaseUtil');
const verificationJob = require('../server/Services/Jobs');


// API file for interacting with MongoDB
//const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Angular DIST output folder
app.use(express.static('./dist'));

var redisClient = redis.createClient(db_config.port,db_config.host);
redisClient.auth(db_config.password);

redisClient.on('connect', function() {
console.log('connected to redis!!');
});
redisClient.on("error", function (err) {
    console.log("Error " + err);
});

app.use(session({
  secret: 'keyboardcat',
  store: new RedisStore({ host: db_config.host, port: db_config.port, client: redisClient, pass: db_config.password}),
  saveUninitialized:false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/',routes);
// API location
//app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile('index.html', {root: './dist'});
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

//http server
// const server = http.createServer(app);
// server.listen(port, () => console.log(`Running on localhost:${port}`));

//https server
const options = {
    key: fs.readFileSync('server/config/certificates/localhost-privkey.pem'),
    cert:  fs.readFileSync('server/config/certificates/localhost-cert.pem')
}
spdy
  .createServer(options, app)
  .listen(port, (error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      console.log('Listening on port: ' + port + '.')
      verificationJob.runTask();
    }
  })
