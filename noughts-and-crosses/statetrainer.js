'use strict';
var gameBoard = require('./gameboard');
var robotPlayer = require('./robotplayer');

var stateTrainer = function () {

    var currentState;
    var currentPlayer;
    var currentGame;
    var players;

    var move = function (){
        var chosenMove = currentPlayer.getMove(currentGame);
        currentGame.makeMove(currentPlayer.getPlayerNumber(), chosenMove);
    };

    function learnFromGame(){
        var playerToLearnFrom =  currentPlayer;
        var result = currentGame.getGameOutcome();
        if(result !== 'Draw') {
            //Randomly select to learn from the winner or the loser - important to learn
            //to avoid losing as much as to play to win.
            var useWinner =  Math.floor((Math.random() * 2)) === 1;
            if(!useWinner){
                //Learning from the losing player's perspective
                result = 'Loss';
                //Player *number* 1 is at *index* 0. Confused? You will be.
                var playerIndexToUse = currentPlayer.getPlayerNumber() === 1 ?  1 : 0;
                playerToLearnFrom = players[playerIndexToUse];
            }
        }
        currentState = playerToLearnFrom.analyseGame(result);
    }

     function trainCycle(){
        currentGame = new gameBoard(gameBoard.newgameState);
        players =  [new robotPlayer(1, currentState), new robotPlayer(2, currentState)];
        /*Keep playing & break on win or draw*/
        var moveNumber = 0;
        while (!currentGame.isGameEnded()){
            currentPlayer = players[(moveNumber % 2)];
            move();
            moveNumber++;
        }
        learnFromGame();
    }

    this.train = function(originalState, trainingCycles) {
        currentState = originalState;
        for(var i= 0; i < trainingCycles; i++){
            trainCycle();
        }
        return currentState;
    };
};

module.exports = new stateTrainer();
