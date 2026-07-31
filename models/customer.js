const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    customer_id: String,
    name: String,
    phone: String,
    email: String,
    gender: String,
    created_at: Date
});
module.exports = mongoose.model("Customer", customerSchema);