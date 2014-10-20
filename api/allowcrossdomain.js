
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('origin')); //This is a security hole if want to use in earnest - effectively saying we'll accept, whatever the origin....
    res.header('Access-Control-Allow-Credentials', true); // Need this true - the game state is held in a cookie.
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(204);
    }
    else {
        next();
    }
};
module.exports =  allowCrossDomain;