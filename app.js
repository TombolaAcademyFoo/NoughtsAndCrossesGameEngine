'use strict';

var express = require('express');
var vhost = require('vhost');
var appFactory = require('./api/app');
var logger = require('morgan');
var app = new express();
var config = require('./config');

if(config.api.useVHost) {
    app.use(vhost(config.api.vHostName, appFactory));
}
else {
    app = appFactory;
}

app.use(logger('combined'));

app.disable('etag');//prevent the http 304 (not modified) responses, less efficient but better for seeing what it going on.;

//Allow CORS
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});



var server = app.listen(config.portNumber, function() {
    console.log('Express server listening on port ' + server.address().port);
});
