'use strict';
var validation = require('../noughts-and-crosses/validation');
var random = require('./randomplayer');
var aiBot  = require('./robotplayer');
var learnedStates = require('./learnedstatefactory');

var createRobot = function (typeName, playerNumber) {
    validation.validatePlayerNumber(playerNumber);

    typeName = typeName.toLowerCase();
    if(typeName === 'human'){
        return;
    }

    if (typeName === 'random'){
        return new random(playerNumber);
    }

    if(typeName === 'pre-trained'){
        return new aiBot(playerNumber, learnedStates.getPreTrained());
    }
    throw 'unrecognised player type';

}

module.exports.createRobot =  createRobot;