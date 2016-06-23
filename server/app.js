/**
 * Main application file
 */
(function() {
    'use strict';

    // Set default node environment to development
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    var express = require('express');
    var mongoose = require('mongoose');
    var gcm = require('node-gcm');
    var dash_button = require('node-dash-button');
    var config = require('./config/environment');

    var serverKey = 'AIzaSyDwKwXPVcDl6V7OfkAHWD34cxcUebYK5xg';
    //var fcm = new FCM(serverKey);
    var sender = new gcm.Sender(serverKey);

    // Connect to database
    mongoose.connect(config.mongo.uri, config.mongo.options);
    mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    });
    // Populate DB with sample data
    if (config.seedDB) {
        require('./config/seed');
    }

    // Setup server
    var app = express();
    var server = require('http').createServer(app);
    require('./config/express')(app);
    require('./routes')(app);

    // Start server
    server.listen(config.port, config.ip, function() {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });

    //warning this may trigger multiple times for one press
    //...usually triggers twice based on testing for each press
    var Device = require('./api/device/device.model');
    var dash = dash_button("44:65:0d:4b:64:38"); //address from step above
    dash.on("detected", function() {
        Device.find({}, function(err, devices) {
            console.log(devices);
            var reg_ids = [];
            devices.forEach(function(device) {
                reg_ids.push(device.fcmid);
            });

            console.log(reg_ids);

            var message = new gcm.Message({
                collapse_key: 'barren_doorbell',
                priority: 'high',
                delay_while_idle: false,
                data: {
                    location: '13656 Barren Springs Ct',
                    action: 'doorbell'
                }
            });

            sender.send(message, {
                registrationTokens: reg_ids
            }, function(err, response) {
                if (err) console.error(err);
                else console.log(response);
            });
        });
        console.log("omg found");
    });

    // Expose app
    exports = module.exports = app;
}());
