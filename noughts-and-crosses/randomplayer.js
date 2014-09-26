'use strict';
function randomPlayer(playerNumber)
{
    /*jshint validthis: true */
    this.getPlayerNumber = function (){
        return playerNumber;
    };

    this.getMove = function(gameBoard) {
       var availableMoves = gameBoard.getAvailableMoves();
       var arrayLength = availableMoves.length;
       if (arrayLength === 1){
           return availableMoves[0];
       }
       var indexToChoose = Math.floor((Math.random() * arrayLength));
       return availableMoves[indexToChoose];
    };
}

module.exports = randomPlayer;
