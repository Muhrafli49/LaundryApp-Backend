const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    sessionData: { type: Object, required: true },
    qrCode: { type: String }
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
