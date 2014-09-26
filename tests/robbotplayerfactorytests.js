/* global it */
/* global describe */
'use strict';
var assert = require('chai').assert;
var expect = require('chai').expect;
var roboticplayerfactory = require('../noughts-and-crosses/roboticplayerfactory');
var random = require('../noughts-and-crosses/randomplayer');
var aiBot  = require('../noughts-and-crosses/robotplayer');

describe ('Player Number tests', function() {

    it('no player number NaN  should throw', function (done) {
        expect(function () {
            roboticplayerfactory.createRobot('', 'foo');
        }).to.throw('player number is not a number');
        done();
    });

    it('player number too low should thow', function (done) {

        expect(function () {
            roboticplayerfactory.createRobot('', 0);
        }).to.throw('player number must be either 1 or 2');
        done();
    });

    it('player number too high should thow', function (done) {

        expect(function () {
            roboticplayerfactory.createRobot('', 3);
        }).to.throw('player number must be either 1 or 2');
        done();
    });

    it('unrecognised player type should throw', function (done) {

        expect(function () {
            roboticplayerfactory.createRobot('foo' ,1);
        }).to.throw('unrecognised player type');
        done();
    });


});

describe ('Create Human', function() {

    it('Create human returns not defined', function (done) {

        assert.equal('undefined', typeof(roboticplayerfactory.createRobot('human', 1)));

        done();
    });
});

describe ('Create Random', function() {

    it('Works for player 1', function (done) {
        var player = roboticplayerfactory.createRobot('random', 1);
        assert.isTrue(player instanceof random);
        assert.equal(1, player.getPlayerNumber());
        done();
    });

    it('Works for player 2', function (done) {
        var player = roboticplayerfactory.createRobot('random', 2);
        assert.isTrue(player instanceof random);
        assert.equal(2, player.getPlayerNumber());
        done();
    });
});

describe ('Create pre-trained', function() {

    it('Works for player 1', function (done) {
        var player = roboticplayerfactory.createRobot('pre-trained', 1);
        assert.isTrue(player instanceof aiBot);
        assert.equal(1, player.getPlayerNumber());
        done();
    });

    it('Works for player 2', function (done) {
        var player = roboticplayerfactory.createRobot('pre-trained', 2);
        assert.isTrue(player instanceof aiBot);
        assert.equal(2, player.getPlayerNumber());
        done();
    });
});