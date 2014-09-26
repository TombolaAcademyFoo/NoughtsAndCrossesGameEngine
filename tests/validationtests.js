/* global describe */
/* global it */

'use strict';
var expect = require('chai').expect;
var validation = require('../noughts-and-crosses/validation');


describe('Validate Player Number', function() {

    it('no player number NaN  should throw', function (done) {
        expect(function () {
            validation.validatePlayerNumber('foo');
        }).to.throw('player number is not a number');
        done();
    });

    it('player number too low should thow', function (done) {

        expect(function () {
            validation.validatePlayerNumber(0);
        }).to.throw('player number must be either 1 or 2');
        done();
    });

    it('player number too high should thow', function (done) {

        expect(function () {
            validation.validatePlayerNumber(3);
        }).to.throw('player number must be either 1 or 2');
        done();
    });

    it('non integer should thow', function (done) {

        expect(function () {
            validation.validatePlayerNumber(1.5);
        }).to.throw('player number must be either 1 or 2');
        done();
    });

    it('correct number should validate', function (done) {

        expect(function () {
            validation.validatePlayerNumber(1);
            validation.validatePlayerNumber(2);
        }).to.not.throw();
        done();
    });

});

describe('Validate squarePosition', function() {

    it('no player number NaN  should throw', function (done) {
        expect(function () {
            validation.validateSquarePosition('foo');
        }).to.throw('square number is not a number');
        done();
    });

    it('player number too low should thow', function (done) {

        expect(function () {
            validation.validateSquarePosition(-1);
        }).to.throw('the square position must be an integer in the range 0-8');
        done();
    });

    it('player number too high should thow', function (done) {

        expect(function () {
            validation.validateSquarePosition(9);
        }).to.throw('the square position must be an integer in the range 0-8');
        done();
    });

    it('non integer should thow', function (done) {

        expect(function () {
            validation.validateSquarePosition(1.5);
        }).to.throw('the square position must be an integer in the range 0-8');
        done();
    });

    it('correct number should validate', function (done) {

        expect(function () {
            validation.validateSquarePosition(0);
            validation.validateSquarePosition(1);
            validation.validateSquarePosition(2);
            validation.validateSquarePosition(3);
            validation.validateSquarePosition(4);
            validation.validateSquarePosition(5);
            validation.validateSquarePosition(6);
            validation.validateSquarePosition(7);
            validation.validateSquarePosition(8);
        }).to.not.throw();
        done();
    });

});