const mongoose = require("mongoose");

const barberSchema = new mongoose.Schema({
    barber_id: String,
    user_id: String,
    specialization: String,
    commission_percentage: Number,
    joining_date: Date
});

module.exports = mongoose.model("Barber", barberSchema);