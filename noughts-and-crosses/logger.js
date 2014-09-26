'use strict';

var winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { level: 'error' });
//winston.add(winston.transports.File, { filename: 'oxo.log', json:false, level:'silly' });


var loggerCtor = function() {
    this.log = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.push('\r\n');
        winston.log.apply(winston, args);
    };
};

var logger = logger || new loggerCtor();



module.exports = logger;