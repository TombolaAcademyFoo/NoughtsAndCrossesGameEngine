/* global describe */
/* global it */

'use strict';
var assert = require('chai').assert;
var gameBoard = require('../noughts-and-crosses/gameboard');
var randomPlayers = require('../noughts-and-crosses/randomplayer');

describe('Random Player', function() {
    it('Player will playe full game', function(done){
        var currentGame = new gameBoard(gameBoard.newgameState);
        var randomPlayer = new randomPlayers(1);


        while (!currentGame.isGameEnded()) {
            var availableMoves = currentGame.getAvailableMoves();
            var move = randomPlayer.getMove(currentGame);
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
