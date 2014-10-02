'use strict';

var express = require('express');
var vhost = require('vhost');
var appFactory = require('./api/app');
var logger = require('morgan');
var app = new express();
var config = require('./config');

app.use(logger('dev'));
if(config.api.useVHost) {
    app.use(vhost(config.api.vHostName, appFactory));
}

var server = app.listen(config.portNumber, function() {
    console.log('Express server listening on port ' + server.address().port);
});