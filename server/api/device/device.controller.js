(function() {
    'use strict';

    var _ = require('lodash');
    var Device = require('./device.model');

    // Get list of devices
    exports.index = function(req, res) {
        Device.find(function(err, devices) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(devices);
        });
    };

    // Get a single device
    exports.show = function(req, res) {
        Device.findById(req.params.id, function(err, device) {
            if (err) {
                return handleError(res, err);
            }
            if (!device) {
                return res.status(404).send('Not Found');
            }
            return res.json(device);
        });
    };

    // Creates a new device in the DB.
    exports.create = function(req, res) {
      console.log('Creating new device');
        Device.create(req.body, function(err, device) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(201).json(device);
        });
    };

    // Updates an existing device in the DB.
    exports.update = function(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        Device.findById(req.params.id, function(err, device) {
            if (err) {
                return handleError(res, err);
            }
            if (!device) {
                return res.status(404).send('Not Found');
            }
            var updated = _.merge(device, req.body);
            updated.save(function(err) {
                if (err) {
                    return handleError(res, err);
                }
                return res.status(200).json(device);
            });
        });
    };

    // Deletes a device from the DB.
    exports.destroy = function(req, res) {
        Device.findById(req.params.id, function(err, device) {
            if (err) {
                return handleError(res, err);
            }
            if (!device) {
                return res.status(404).send('Not Found');
            }
            device.remove(function(err) {
                if (err) {
                    return handleError(res, err);
                }
                return res.status(204).send('No Content');
            });
        });
    };

    function handleError(res, err) {
        return res.status(500).send(err);
    }
}());
