const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    slotId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: "Available",
        enum: ["Available", "Booked"]
    },
    duration: {
        type: String,
        default: "0 hours",
    },
    duration_to: {
        type: String,
        default: "0",
    },
    duration_from: {
        type: String,
        default: "0",
    },
    whom: {
        name: { type: String, default: null },
        email: { type: String, default: null },
        mobile: { type: String, default: null }
    }
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema) 