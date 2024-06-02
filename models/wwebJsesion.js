const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    sessionData: { type: Object, required: true },
    qrCode: { type: String }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;