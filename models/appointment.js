const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    appointment_id: String,
    customer_id: String,
    barber_id: String,
    service_id: String,
    appointment_date: Date,
    status: String,
    remarks: String
});

module.exports = mongoose.model("Appointment", appointmentSchema);