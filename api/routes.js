'use strict';
var express = require('express');
var router = express.Router();
var gameBoard = require('../noughts-and-crosses/gameboard');
var robotFactory = require('../noughts-and-crosses/roboticplayerfactory');

router.post('/api/v1.0/newgame', function(req, res) {

    var currentPlayerIndex = 0;
    req.session.lastPlayState = gameBoard.newgameState;
    req.session.player1 = req.body.player1;
    req.session.player2 = req.body.player2;
    var currentGame = new gameBoard( req.session.lastPlayState);
    makeMovesAndSend(currentPlayerIndex,currentGame, req, res);
});

router.post('/api/v1.0/makemove', function(req, res) {
    var playerNumber = parseInt(req.body.playerNumber);
    var chosenSquare = parseInt(req.body.chosenSquare);
    var currentGame = new gameBoard( req.session.lastPlayState);
    currentGame.makeMove(playerNumber, chosenSquare);
    var currentPlayerIndex = getOtherPlayerIndex(playerNumber -1 /* Index = player number -1*/);
    makeMovesAndSend(currentPlayerIndex,currentGame, req, res);
});

function makeMovesAndSend(currentPlayerIndex, currentGame, req, res ){

    var players = [robotFactory.createRobot(req.session.player1 ,1), robotFactory.createRobot(req.session.player2 ,2)];
    while (!currentGame.isGameEnded()){
        var currentPlayer = players[currentPlayerIndex];
        if (!currentPlayer){
            break; //null player = human player - get the move from the UI.
        }
        var move = currentPlayer.getMove(currentGame);
        currentGame.makeMove(currentPlayer.getPlayerNumber(), move);
        currentPlayerIndex = getOtherPlayerIndex(currentPlayerIndex)
    }

    req.session.lastPlayState = currentGame.getGameState();
    var response = { outcome: currentGame.getGameOutcome(), gamestate: currentGame.getGameState(), winner: currentGame.getWinner()};
    res.contentType='application/json';
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    res.send(response);
}

function getOtherPlayerIndex(currentPlayerIndex){
    return currentPlayerIndex === 0 ? 1 :0;
}

module.exports = router;