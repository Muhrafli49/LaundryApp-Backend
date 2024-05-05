const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });
UserSchema.methods.toJSON = function () {
        const { __v, ...object } = this.toObject();
        object._id = object._id.toString();
        return object;
    };

module.exports = mongoose.model('User', UserSchema);



