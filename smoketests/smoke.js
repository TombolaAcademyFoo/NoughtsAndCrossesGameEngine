/* global describe */
/* global it */
'use strict';
    var request = require('supertest');
    var app = require('../api/app');

describe('POST newgame random playes played', function(){
    it('respond with json', function(done){
        request(app)
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type','application/json')
            .send({player1: 'random', player2:'random' })
            .expect(200)
            .expect(function(res){
                if(!/^[0|1|2]{9}$/.test(res.body.gameboard)){
                    return 'gamebody ' + res.body.gameboard + ' is not a 9 digit number of 0, 1 or 3';
                }
                if(res.body.outcome ==='Win'){
                    if(res.body.winner === 0){
                        return 'If the outcome is win, the winner cannot be  0';
                    }
                    return;
                }
                else if(res.body.outcome ==='Draw'){
                    if(res.body.winner !== 0){
                        return 'If the outcome is draw, the winner must be 0';
                    }
                    return;
                }

                return 'Unexpected outcome: ' + res.body.outcome;
            })
            .end(function(err){
                if (err){
                    return done(err);
                }
                done();
            });
    });
});

describe('POST newgame invalid player type', function() {
    var agent = request.agent(app);
    it('invalid player type player 1', function (done) {
        agent
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({player1: 'slartybartfarst', player2: 'human' })
            .expect(500, 'unrecognised player type\n')
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 1 undefined throwa', function (done) {
        agent
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({player2: 'Zaphod' })
            .expect(500, 'player1 is undefined\n')
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 2 undefined throwa', function (done) {
        agent
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({player1: 'human' })
            .expect(500, 'player2 is undefined\n')
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('invalid player type player 2', function (done) {
        agent
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({player1: 'human', player2: 'Zaphod' })
            .expect(500, 'unrecognised player type\n')
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('invalid player type player 2', function (done) {
        agent
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({player1: 'arthur', player2: 'ford' })
            .expect(500, 'unrecognised player type\n')
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
});

describe('POST newgame human player player 1', function(){
    it('new board returned correctly', function(done){
        request(app)
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type','application/json')
            .send({player1: 'human', player2:'random' })
            .expect(200)
            .expect({
                gameboard: '000000000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function(err){
                if (err){
                    return done(err);
                }
                done();
            });
    });
});


describe('POST newgame human player 1 robot player 2', function(){
    it('respond with blank board', function(done){
        request(app)
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type','application/json')
            .send({player1: 'human', player2:'random' })
            .expect(200)
            .expect(function(res){
                if(!/^[0|1]{9}$/.test(res.body.gameboard)){
                    return 'gameboard ' + res.body.gameboard + ' is not a 9 digit number of 0, 1';
                }
                if(res.body.outcome!== 'Continue'){
                    return 'Continue outcome expected when random player has made first move: ' + res.body.outcome ;
                }
                if(res.body.winner !== 0){
                    return 'If the outcome is continue, the winner must be 0';
                }
            })
            .end(function(err){
                if (err){
                    return done(err);
                }
                done();
            });
    });
});


describe('POST newgame human players full game1', function(){
    var agent = request.agent(app);
    it('new board', function(done){
        agent
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type','application/json')
            .send({player1: 'human', player2:'human' })
            .expect(200)
            .expect({
                gameboard: '000000000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function(err){
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 1 first move', function(done){
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type','application/json')
            .send({playerNumber: 1, chosenSquare:0 })
            .expect(200)
            .expect({
                gameboard: '100000000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function(err){
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 2 first move', function(done){
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type','application/json')
            .send({playerNumber: 2, chosenSquare:3 })
            .expect(200)
            .expect({
                gameboard: '100200000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function(err){
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 1 second move', function(done){
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type','application/json')
            .send({playerNumber: 1, chosenSquare:1 })
            .expect(200)
            .expect({
                gameboard: '110200000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function(err){
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 2 second move', function(done){
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type','application/json')
            .send({playerNumber: 2, chosenSquare:4 })
            .expect(200)
            .expect({
                gameboard: '110220000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function(err){
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 1 winning move', function(done){
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type','application/json')
            .send({playerNumber: 1, chosenSquare:2 })
            .expect(200)
            .expect({
                gameboard: '111220000',
                outcome: 'Win',
                winner: 1
            })
            .end(function(err){
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 2 cannot player after win', function(done){
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type','application/json')
            .send({playerNumber: 2, chosenSquare:3 })
            .expect(500, 'game already won\n')
            .end(function(err){
                if (err){
                    return done(err);
                }
                done();
            });
    });
});

describe('POST newgame human players repeated move', function() {
    var agent = request.agent(app);
    it('new board', function (done) {
        agent
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({player1: 'human', player2: 'human' })
            .expect(200)
            .expect({
                gameboard: '000000000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 1 first move', function (done) {
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({playerNumber: 1, chosenSquare: 0 })
            .expect(200)
            .expect({
                gameboard: '100000000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 1 repeat move', function (done) {
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({playerNumber: 1, chosenSquare: 0 })
            .expect(500, 'Player Cannot Play Again\n')

            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
});

describe('POST newgame human players second player chooses same sqaure', function() {
    var agent = request.agent(app);
    it('new board', function (done) {
        agent
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({player1: 'human', player2: 'human' })
            .expect(200)
            .expect({
                gameboard: '000000000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 1 first move', function (done) {
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({playerNumber: 1, chosenSquare: 0 })
            .expect(200)
            .expect({
                gameboard: '100000000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 2 chooses same square should throw', function (done) {
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({playerNumber: 2, chosenSquare: 0 })
            .expect(500, 'Square already occupied\n')

            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
});

describe('POST newgame human players incorrect player number', function() {
    var agent = request.agent(app);
    it('new board', function (done) {
        agent
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({player1: 'human', player2: 'human' })
            .expect(200)
            .expect({
                gameboard: '000000000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('incorrect player number should throw', function (done) {
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({playerNumber: 0, chosenSquare: 0 })
            .expect(200)
            .expect(500, 'player number must be either 1 or 2\n')
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
});

describe('POST newgame human players player number not a number', function() {
    var agent = request.agent(app);
    it('new board', function (done) {
        agent
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({player1: 'human', player2: 'human' })
            .expect(200)
            .expect({
                gameboard: '000000000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player number not a number should throw', function (done) {
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({playerNumber: 'z', chosenSquare: 0 })
            .expect(200)
            .expect(500, 'player number is not a number\n')
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
});

describe('POST newgame human players incorrect square number', function() {
    var agent = request.agent(app);
    it('new board', function (done) {
        agent
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({player1: 'human', player2: 'human' })
            .expect(200)
            .expect({
                gameboard: '000000000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 1 first move', function (done) {
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({playerNumber: '1', chosenSquare: 10 })
            .expect(200)
            .expect(500, 'the square position must be an integer in the range 0-8\n')
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
});

describe('POST newgame human players square number NaN', function() {
    var agent = request.agent(app);
    it('new board', function (done) {
        agent
            .post('/api/v1.0/newgame')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({player1: 'human', player2: 'human' })
            .expect(200)
            .expect({
                gameboard: '000000000',
                outcome: 'Continue',
                winner: 0
            })
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
    it('player 1 first move', function (done) {
        agent
            .post('/api/v1.0/makemove')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .send({playerNumber: '1', chosenSquare: 'z' })
            .expect(200)
            .expect(500, 'square number is not a number\n')
            .end(function (err) {
                if (err){
                    return done(err);
                }
                done();
            });
    });
});