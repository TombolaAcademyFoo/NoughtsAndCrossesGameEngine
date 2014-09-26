'use strict';
var logger = require('./logger');
var validation = require('./validation');

function gameBoard(gameState) {
    /*jshint validthis: true */
    var gameOutcome ='Continue';
    var self = this;
    var winner = 0;

    function validateSquareNotTaken(squarePosition){
        if(self.getAvailableMoves().indexOf(squarePosition) === -1){
            logger.log('info', 'Square Occupied');
            throw 'Square already occupied';
        }
    }

    function validateIsPlayersTurn (playerNumber) {
        var player1Moves =countPlayerMoves(1, gameState);
        var player2Moves =countPlayerMoves(2, gameState);

        if(playerNumber === 1 && player1Moves === player2Moves ){
            logger.log('silly', 'Player ' + 1 + ' can play ');
            return;
        }

        if(playerNumber === 2 && player1Moves - player2Moves === 1 ) {
            logger.log('silly', 'Player ' + 2 + ' can play ');
            return;
        }
        logger.log('info', 'Player cannot play again');
        throw 'Player Cannot Play Again';
    }

    function hasPlayerWon(playerNumber) {
        playerNumber = playerNumber.toString();
        var winningStates = [
                                [0,1,2],
                                [3,4,5],
                                [6,7,8],
                                [0,4,8],
                                [2,4,6],
                                [0,3,6],
                                [1,4,7],
                                [2,5,8]];

        for (var i = 0; i < winningStates.length; i++) {
            if (gameState[winningStates[i][0]] === playerNumber &&
                gameState[winningStates[i][1]] === playerNumber &&
                gameState[winningStates[i][2]] === playerNumber) {
                gameOutcome = 'Win';
                winner = playerNumber;
                logger.log('silly', 'Play' +
                    'r ' + playerNumber + ' wins: ' + winningStates[i]);
                return gameOutcome;
            }
        }
        if(self.getAvailableMoves().length === 0){
            gameOutcome = 'Draw';
            logger.log('silly', 'Game ended in a draw');
            return gameOutcome;
        }
        return gameOutcome;
    }

    function gameEnded() {
        return gameOutcome !== 'Continue';
    }

    function validateGameNotAlreadyWon(){
        if(gameEnded()) {
            throw 'game already won';
        }
    }

    function validateGameState(){
        if(!gameState){
            throw 'No Game State Passed';
        }
        /*TODO - is the board being passed actually a valid game -
        * can use is players turn algorithm to do a final check once we've verified
        * it is a string of 8 * 0|1|2*/

        hasPlayerWon(1);
        validateGameNotAlreadyWon();
        hasPlayerWon(2);
        validateGameNotAlreadyWon();
     }


    function countPlayerMoves (playerNumber){
        var playerMatch = new RegExp(playerNumber, 'g');
        var playerMoves = gameState.match(playerMatch);
        if(playerMoves === null ) {
            return 0;
        }
        return playerMoves.length;
    }

    this.getGameState = function (){
        return gameState.toString();
    };

    this.getAvailableMoves = function() {
        var available = [];
        if (this.isGameEnded()) {
            return available;
        }
        for (var i=0; i < gameState.length; i++){
            if(gameState[i] === '0'){
                available.push(i);
            }
        }
        return available;
    };

    this.getGameOutcome = function(){
        return gameOutcome;
    };

    this.isGameEnded = function() {
        return gameEnded();
    };

    this.getWinner = function(){
        return winner;
    }

    this.makeMove = function (playerNumber, position){
        validateGameState();
        logger.log('silly', 'Game passed is valid');
        validation.validatePlayerNumber(playerNumber);
        logger.log('silly', 'Player Number OK');
        validation.validateSquarePosition(position);
        logger.log('silly', 'Chosen position valid');
        validateIsPlayersTurn(playerNumber, gameState);
        logger.log('silly', 'Is Players turn');
        validateSquareNotTaken(position);
        logger.log('silly', 'Square not taken');
        gameState = gameState.substr(0, position) + playerNumber + gameState.substr(position+1);
        logger.log('silly', 'Game State = ' + gameState);
        return hasPlayerWon(playerNumber);
    };

    validateGameState();
}
module.exports = gameBoard;
module.exports.newgameState = '000000000';