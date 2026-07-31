const mongoose = require("mongoose");

const wageRecordSchema = new mongoose.Schema({
    wage_id: String,
    barber_id: String,
    month: String,
    salary: Number,
    commission: Number,
    total_amount: Number
});

module.exports = mongoose.model("WageRecord", wageRecordSchema);