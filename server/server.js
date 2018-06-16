const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const spdy = require('spdy');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const app = express();

// API file for interacting with MongoDB
//const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static('./dist'));

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
    key: fs.readFileSync('server/certificates/localhost-privkey.pem'),
    cert:  fs.readFileSync('server/certificates/localhost-cert.pem')
}
spdy
  .createServer(options, app)
  .listen(port, (error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      console.log('Listening on port: ' + port + '.')
    }
  })
