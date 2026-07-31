const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    attendance_id: String,
    barber_id: String,
    check_in: Date,
    check_out: Date,
    date: Date
});

module.exports = mongoose.model("Attendance", attendanceSchema);