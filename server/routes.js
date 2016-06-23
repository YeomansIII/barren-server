/**
 * Main application routes
 */
(function() {
    'use strict';

    var path = require('path');

    module.exports = function(app) {

        // Insert routes below
        app.use('/api/v1/devices', require('./api/device'));
        app.use('/api/v1/doorbells', require('./api/doorbell'));
        app.use('/api/v1/things', require('./api/thing'));
        app.use('/api/v1/users', require('./api/user'));

        app.use('/auth', require('./auth'));

    };
}());
