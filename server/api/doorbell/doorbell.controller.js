(function() {
    'use strict';

    var _ = require('lodash');
    var Doorbell = require('./doorbell.model');

    // Get list of doorbells
    exports.index = function(req, res) {
        Doorbell.find(function(err, doorbells) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(doorbells);
        });
    };

    // Get a single doorbell
    exports.show = function(req, res) {
        Doorbell.findById(req.params.id, function(err, doorbell) {
            if (err) {
                return handleError(res, err);
            }
            if (!doorbell) {
                return res.status(404).send('Not Found');
            }
            return res.json(doorbell);
        });
    };

    // Creates a new doorbell in the DB.
    exports.create = function(req, res) {
        Doorbell.create(req.body, function(err, doorbell) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(201).json(doorbell);
        });
    };

    // Updates an existing doorbell in the DB.
    exports.update = function(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        Doorbell.findById(req.params.id, function(err, doorbell) {
            if (err) {
                return handleError(res, err);
            }
            if (!doorbell) {
                return res.status(404).send('Not Found');
            }
            var updated = _.merge(doorbell, req.body);
            updated.save(function(err) {
                if (err) {
                    return handleError(res, err);
                }
                return res.status(200).json(doorbell);
            });
        });
    };

    // Deletes a doorbell from the DB.
    exports.destroy = function(req, res) {
        Doorbell.findById(req.params.id, function(err, doorbell) {
            if (err) {
                return handleError(res, err);
            }
            if (!doorbell) {
                return res.status(404).send('Not Found');
            }
            doorbell.remove(function(err) {
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
