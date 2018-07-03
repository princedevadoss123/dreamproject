const express = require('express');
const bodyParser = require('body-parser');
const spdy = require('spdy');
const fs = require('fs');
const app = express();
const db_config = require('./config/DBConfiguration/redis')
const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const sequelize = require('./DatabaseUtil');
const verificationJob = require('../server/Services/Jobs');
const logger = require('../server/Services/Logger');


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Angular DIST output folder
app.use(express.static('./dist'));

var redisClient = redis.createClient(db_config.port,db_config.host);
redisClient.auth(db_config.password);

redisClient.on('connect', function() {
  logger.info('Connected to redis!!!');
});
redisClient.on("error", function (err) {
  logger.error("Error" + err);
});

app.use(session({
  secret: 'keyboardcat',
  store: new RedisStore({ host: db_config.host, port: db_config.port, client: redisClient, pass: db_config.password}),
  saveUninitialized:false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./routes')(app);


// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile('index.html', {root: './dist'});
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

//https server
const options = {
    key: fs.readFileSync('server/config/certificates/localhost-privkey.pem'),
    cert:  fs.readFileSync('server/config/certificates/localhost-cert.pem')
}
spdy
  .createServer(options, app)
  .listen(port, (error) => {
    if (error) {
      logger.error(error)
      return process.exit(1)
    } else {
      logger.info('Listening on port: ' + port + '.');
      verificationJob.verifyTask;
    }
  })
