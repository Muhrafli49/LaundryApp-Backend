// models/WWebJSSession.js

const mongoose = require('mongoose');

const WWebJSSessionSchema = new mongoose.Schema({
    session: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('WWebJSSession', WWebJSSessionSchema);
