/*global it */
/*global describe */
'use strict';
var assert = require('chai').assert;
var expect = require('chai').expect;
var gameBoard = require('../noughts-and-crosses/gameboard');

describe('Game Board Tests - Validation and Player 1 win', function(){
    var gameState = gameBoard.newgameState;
    it('Should return a 0 representing all 9 squares', function (){
        assert.equal(gameState, '000000000');
    });

  it('Should have nine blank squares', function(done){
        var currentGame = new gameBoard (gameState);
        gameState = currentGame.getGameState();
        assert.equal(currentGame.getGameState(), '000000000');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]);
        done();
    });

    it('Player number validation tests - is not a number should throw', function(done){
        var currentGame = new gameBoard (gameState);
        expect( function (){
            currentGame.makeMove('foo', 0);
        }).to.throw('player number is not a number');
        assert.equal(currentGame.getGameState(), '000000000');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]);
        done();
    });

    it('Player number validation tests - too high should throw', function(done){
        var currentGame = new gameBoard (gameState);
        expect( function (){
            currentGame.makeMove(3, 0);
        }).to.throw('player number must be either 1 or 2');
        assert.equal(currentGame.getGameState(), '000000000');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]);
        done();
    });

     it('Player number validation tests - too high should throw', function(done){
        var currentGame = new gameBoard (gameState);
        expect( function (){
            currentGame.makeMove(3, 0);
        }).to.throw('player number must be either 1 or 2');
        assert.equal(currentGame.getGameState(), '000000000');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]);
        done();
    });

    it('Player number validation tests - too low', function(done){
        var currentGame = new gameBoard (gameState);
        expect( function (){
            currentGame.makeMove(0, 0);
        }).to.throw('player number must be either 1 or 2');
        assert.equal(currentGame.getGameState(), '000000000');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]);
        done();
    });

    it('Player number validation tests - too high', function(done){
        var currentGame = new gameBoard (gameState);
        expect( function (){
            currentGame.makeMove(1, 9);
        }).to.throw('the square position must be an integer in the range 0-8');
        assert.equal(currentGame.getGameState(), '000000000');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]);
        done();
    });

    it('Player number validation tests - too high', function(done){
        var currentGame = new gameBoard (gameState);
        expect( function (){
            currentGame.makeMove(1, 8.1);
        }).to.throw('the square position must be an integer in the range 0-8');
        assert.equal(currentGame.getGameState(), '000000000');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]);
        done();
    });

    it('Player number validation tests - too low', function(done){
        var currentGame = new gameBoard (gameState);
        expect( function (){
            currentGame.makeMove( 1, -1);
        }).to.throw('the square position must be an integer in the range 0-8');
        assert.equal(currentGame.getGameState(), '000000000');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]);
        done();
    });

    it('Should Be able to make valid move', function(done){
        var currentGame = new gameBoard (gameState);
        var result = currentGame.makeMove(1, 4);
        gameState  = currentGame.getGameState();
        assert.equal(gameState, '000010000');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 0, 1, 2, 3, 5, 6, 7, 8 ]);
        done();
    });

    it('Cannot play again', function(done){
        var currentGame = new gameBoard (gameState);
        expect( function (){
            currentGame.makeMove(1, 4);
        }).to.throw('Player Cannot Play Again');
        assert.equal(currentGame.getGameState(), '000010000');
        done();
    });

    it('Player2 should be able to make valid move', function(done){
        var currentGame = new gameBoard (gameState);
        var result = currentGame.makeMove(2, 5);
        gameState  = currentGame.getGameState();
        assert.equal(gameState, '000012000');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 0, 1, 2, 3, 6, 7, 8 ]);
        done();
    });

    it('Player2 cannot make second move in a row', function(done){
        var currentGame = new gameBoard (gameState);
        expect( function (){
            currentGame.makeMove(2, 6);
        }).to.throw('Player Cannot Play Again');
        assert.equal(gameState, '000012000');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 0, 1, 2, 3, 6, 7, 8 ]);
        done();
    });


    it('Player1 wins', function(done){
        var currentGame = new gameBoard (gameState);
        var result ='';
        result = currentGame.makeMove(1, 1);
        assert.equal(result, 'Continue');
        assert.equal(currentGame.getGameState(), '010012000');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 0,  2, 3, 6, 7, 8 ]);

        result = currentGame.makeMove(2, 2);
        assert.equal(result, 'Continue');
        assert.equal(currentGame.getGameState(), '012012000');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 0, 3, 6, 7, 8 ]);

        result = currentGame.makeMove(1, 7);
        assert.equal(result, 'Win');
        assert.equal(currentGame.getGameState(), '012012010');
        assert.deepEqual(currentGame.getAvailableMoves(), [ ]);


        expect( function (){
            currentGame.makeMove(2, 8);
        }).to.throw('game already won');
        assert.equal(currentGame.getGameState(), '012012010');
        assert.deepEqual(currentGame.getAvailableMoves(), [ ]);


        expect( function (){
            currentGame.makeMove(1, 8);
        }).to.throw('game already won');
        assert.equal(currentGame.getGameState(), '012012010');
        assert.deepEqual(currentGame.getAvailableMoves(), [ ]);
        assert.equal(currentGame.getWinner(), 1);
        gameState = currentGame.getGameState();
        done();

    });

    it('Cannot play on after win ', function(done){
        var currentGame;
        expect( function (){
            currentGame =  new gameBoard(gameState);
        }).to.throw('game already won');
        done();
    });

});

describe('Game Board Tests - Player 2 win', function(){
    var gameState = gameBoard.newgameState;
    it('Move 1', function(done){
        var currentGame = new gameBoard (gameState);
        var result = currentGame.makeMove(1, 0);
        gameState = currentGame.getGameState();
        assert.equal(gameState, '100000000');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [1, 2, 3, 4, 5, 6, 7, 8 ]);
        done();
    });

    it('Move 2', function(done){
        var currentGame = new gameBoard (gameState);
        var result = currentGame.makeMove(2, 4);
        gameState = currentGame.getGameState();
        assert.equal(gameState, '100020000');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [1, 2, 3, 5, 6, 7, 8 ]);
        done();
    });

    it('Move 3', function(done){
        var currentGame = new gameBoard (gameState);
        var result = currentGame.makeMove(1, 1);
        gameState = currentGame.getGameState();
        assert.equal(gameState, '110020000');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 2, 3, 5, 6, 7, 8 ]);
        done();
    });

    it('Move 4', function(done){
        var currentGame = new gameBoard (gameState);
        var result = currentGame.makeMove(2, 2);
        gameState = currentGame.getGameState();
        assert.equal(gameState, '112020000');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [3, 5, 6, 7, 8 ]);
        done();
    });

    it('Move 4', function(done){
        var currentGame = new gameBoard (gameState);
        var result = currentGame.makeMove(1, 3);
        gameState = currentGame.getGameState();
        assert.equal(gameState, '112120000');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [5, 6, 7, 8 ]);
        done();
    });

    it('Move 4', function(done){
        var currentGame = new gameBoard (gameState);
        var result = currentGame.makeMove(2, 6);
        gameState = currentGame.getGameState();
        assert.equal(gameState, '112120200');
        assert.equal(result, 'Win');
        assert.deepEqual(currentGame.getAvailableMoves(), []);
        assert.equal(currentGame.getWinner(), 2);
        done();
    });

    it('Cannot initialise board after game ended', function(done){
        expect( function (){
            new gameBoard (gameState);
        }).to.throw('game already won');
        done();
    });
});

describe('Game Board Tests - Draw', function(){
    /*This test also tests "synchronous" mode - where the game board is not re-initialised each time..."*/
    var currentGame = new gameBoard (gameBoard.newgameState);
    it('Move 1', function(done){
        var result = currentGame.makeMove(1, 4);
        assert.equal(currentGame.getGameState(), '000010000');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [0, 1, 2, 3,  5, 6, 7, 8 ]);
        done();
    });

    it('Move 2', function(done){
        var result = currentGame.makeMove(2, 0);
        assert.equal(currentGame.getGameState(), '200010000');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [1, 2, 3,  5, 6, 7, 8 ]);
        done();
    });

    it('Move 3', function(done){
        var result = currentGame.makeMove(1, 1);
        assert.equal(currentGame.getGameState(), '210010000');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [2, 3,  5, 6, 7, 8 ]);
        done();
    });


    it('Move 4', function(done){
        var result = currentGame.makeMove(2, 7);
        assert.equal(currentGame.getGameState(), '210010020');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [2, 3,  5, 6, 8 ]);
        done();
    });

    it('Move 5', function(done){
        var result = currentGame.makeMove(1, 3);
        assert.equal(currentGame.getGameState(), '210110020');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [2, 5, 6, 8 ]);
        done();
    });

    it('Move 6', function(done){
        var result = currentGame.makeMove(2, 5);
        assert.equal(currentGame.getGameState(), '210112020');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [2, 6, 8 ]);
        done();
    });

    it('Move 7', function(done){
        var result = currentGame.makeMove(1, 8);
        assert.equal(currentGame.getGameState(), '210112021');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [2, 6 ]);
        done();
    });


    it('Move 8', function(done){
        var result = currentGame.makeMove(2, 6);
        assert.equal(currentGame.getGameState(), '210112221');
        assert.equal(result, 'Continue');
        assert.deepEqual(currentGame.getAvailableMoves(), [ 2 ]);
        done();
    });

    it('Move 9', function(done){
        var result = currentGame.makeMove(1, 2);
        assert.equal(currentGame.getGameState(), '211112221');
        assert.equal(result, 'Draw');
        assert.deepEqual(currentGame.getAvailableMoves(), [  ]);
        assert.equal(currentGame.getWinner(), 0);
        done();
    });

    it('Player2 cannot play after game ended', function(done){
        expect( function (){
            currentGame.makeMove(2, 8);
        }).to.throw('game already won');
        assert.equal(currentGame.getGameState(), '211112221');
        done();
    });

    it('Player1 cannot play after game ended', function(done){
        expect( function (){
            currentGame.makeMove(1, 8);
        }).to.throw('game already won');
        assert.equal(currentGame.getGameState(), '211112221');
        done();
    });
});