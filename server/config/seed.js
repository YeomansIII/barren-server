/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
(function() {
    'use strict';
    // Insert seed models below
    var Device = require('../api/device/device.model');
    var Doorbell = require('../api/doorbell/doorbell.model');
    var Thing = require('../api/thing/thing.model');
    var User = require('../api/user/user.model');

    // Insert seed data below
    var deviceSeed = require('../api/device/device.seed.json');
    var doorbellSeed = require('../api/doorbell/doorbell.seed.json');
    var thingSeed = require('../api/thing/thing.seed.json');

    // Insert seed inserts below
    Device.find({}).remove(function() {
	Device.create(deviceSeed);
});

    Doorbell.find({}).remove(function() {
        Doorbell.create(doorbellSeed);
    });

    Thing.find({}).remove(function() {
        Thing.create(thingSeed);
    });
}());
