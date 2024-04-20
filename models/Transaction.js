const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    totalItem: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    paymentMoney: {
        type: Number,
        required: true
    },
    refund: {
        type: Number,
        required: true
    },
    customer: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        alamat: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    items: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Service',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    checkoutDate: {
        type: Date,

    },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema)