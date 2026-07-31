const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    service_id: String,
    service_name: String,
    duration: Number,
    price: Number,
    description: String
});

module.exports = mongoose.model("Service", serviceSchema);