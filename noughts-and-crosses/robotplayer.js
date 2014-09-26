'use strict';
var logger = require('./logger');
function robotPlayer(playerNumber, learnedStates)
{
    /*jshint validthis: true */

    var movesMadeThisGame = {};

    this.getPlayerNumber = function (){
        return playerNumber;
    };

    //TODO: inject learned states.
    this.getMove = function(gameBoard) {
        var move;
        var currentState = gameBoard.getGameState();
        var availableMoves = gameBoard.getAvailableMoves();

        if (learnedStates[currentState]) {
            logger.log('silly', 'gate state exists', currentState);
            // Pick the most probable move
            var maxValue = 0.0;
            var potentialMoves = [];

            for (var i in learnedStates[currentState]) {
                if (learnedStates[currentState][i] > maxValue) {
                    maxValue = learnedStates[currentState][i];
                    potentialMoves = [parseInt(i)];
                }
                else if (learnedStates[currentState][i] === maxValue) {
                    potentialMoves.push(parseInt(i));
                }
                else if (potentialMoves.length === 0) { // Fail-safe
                    potentialMoves = [availableMoves[Math.floor(Math.random() * availableMoves.length)]];
                }
                logger.log('silly', 'potential moves', potentialMoves);
                // select a random move from the highest values this allows
                // us to fully train and weed out the default values
                move = potentialMoves[Math.floor(Math.random()*potentialMoves.length)];
                logger.log('silly', 'chosen move', move);
            }
        }
        else {
            // Try something new
            move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            logger.log('silly', 'New State, random move:', move);
        }

        logger.log('debug', 'Move chosen:', move);
        movesMadeThisGame[currentState] = move;
        if (!learnedStates[currentState]) {
            learnedStates[currentState] = [];
            for (var j = 0; j < availableMoves.length; j++) {
                learnedStates[currentState][availableMoves[j]] = 1.0;
            }
        }
        return move;
    };

    this.analyseGame = function(result) {
        var factor = 0.5; //Assume loss for ease.
        logger.log('silly', 'Factor:', result);
        if(result === 'Draw'){
            factor = 1.0;
        }
        else if (result === 'Win'){
            factor = 1.5;
        }
        logger.log('silly', 'Factor:', factor);
        // Review the game
        logger.log('silly', 'State Before learning:', learnedStates);
        for (var state in movesMadeThisGame) {
            if (movesMadeThisGame.hasOwnProperty(state)) {
                var squareSelected = movesMadeThisGame[state];
                learnedStates[state][squareSelected] *= factor;
            }
        }
        logger.log('silly', 'State After learning: ', learnedStates);
        return learnedStates;
    };
}

module.exports = robotPlayer;