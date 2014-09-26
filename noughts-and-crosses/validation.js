var logger = require('./logger');

function validatePlayerNumber (playerNumber) {
    if(isNaN(playerNumber)){
        logger.log('info', 'Player Number NaN');
        throw 'player number is not a number';
    }
    if(playerNumber !== 1 &&  playerNumber !== 2){
        logger.log('info', 'player number must be either 1 or 2');
        throw('player number must be either 1 or 2');
    }
}

function validateSquarePosition (squarePosition) {

    if(isNaN(squarePosition)){
        logger.log('info', 'Square Number NaN');
        throw 'square number is not a number';
    }
    var validSquares = [0,1,2,3,4,5,6,7,8];

    if( validSquares.indexOf(squarePosition) === -1){
        logger.log('info', 'square number is invalid');
        throw('the square position must be an integer in the range 0-8');
    }
}


module.exports.validatePlayerNumber = validatePlayerNumber;
module.exports.validateSquarePosition = validateSquarePosition;
