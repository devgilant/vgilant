var express = require('express');
var bodyParser = require('body-parser');
var vgilant_config = require('./lib/config');

var app = express();
app.use(bodyParser.json());

app.use(express.static('static'));

/*
app.get('/', function(req, res) {
});
*/

app.listen(vgilant_config.WEB_APP_PORT,  function () {
  console.log('\nVgilant app is listening at port '+vgilant_config.WEB_APP_PORT+'\n');
});