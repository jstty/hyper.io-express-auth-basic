/*
 * Express Basic Auth Middleware for Hyper.io
 */
'use strict';

var basicAuth  = require('basic-auth');

module.exports = Express_Route_AuthBasic;

function Express_Route_AuthBasic() {
}

Express_Route_AuthBasic.prototype.getInfo = function() {
    return {
        name: 'auth-basic',
        type: 'route'
    };
};

Express_Route_AuthBasic.prototype.init = function() {
    // nothing to do
};

Express_Route_AuthBasic.prototype.isType = function(type) {
    return (type === 'express');
};

Express_Route_AuthBasic.prototype.setupRoute = function(app, method, routeStr, func, options) {
    var auth = function (req, res, next) {
        function unauthorized(res) {
            res.set('WWW-Authenticate', 'Basic realm='+(options.message || 'Authorization Required') );
            return res.send(401);
        }

        var user = basicAuth(req);
        if (!user || !user.name || !user.pass) {
            return unauthorized(res);
        }

        if ( user.name === options.user &&
            user.pass === options.pass ) {
            return next();
        } else {
            return unauthorized(res);
        }
    };

    app[ method ](routeStr, auth, func);
};
