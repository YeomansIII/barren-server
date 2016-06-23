(function() {
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var DeviceSchema = new Schema({
        name: String,
        owner: String,
        fcmid: String
    });

    module.exports = mongoose.model('Device', DeviceSchema);
}());
