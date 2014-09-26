/* global describe */
/* global it */

'use strict';
var assert = require('chai').assert;
var gameBoard = require('../noughts-and-crosses/gameboard');
var robotPlayers = require('../noughts-and-crosses/robotplayer');


describe('Robot Player test', function() {
    it('Player will play full game', function(done){
    var currentGame = new gameBoard(gameBoard.newgameState);
    var robotPlayer = new robotPlayers(1, {});


    while (!currentGame.isGameEnded()) {
        var availableMoves = currentGame.getAvailableMoves();
        var move = robotPlayer.getMove(currentGame);
        assert.include(availableMoves, move);
        currentGame.makeMove(1, move);
        if (currentGame.isGameEnded()) {
            break;
        }
        currentGame.makeMove(2, currentGame.getAvailableMoves()[0]);
        if (currentGame.isGameEnded()) {
            break;
        }
    }
    done();
    });
 });