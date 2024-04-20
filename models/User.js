const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
    role: {
        type: String,
    },
}, { timestamps: true });
UserSchema.methods.toJSON = function () {
        const { __v, ...object } = this.toObject();
        object._id = object._id.toString();
        return object;
    };

module.exports = mongoose.model('User', UserSchema);



