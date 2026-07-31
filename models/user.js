const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    email: String,
    password: String,
    role: String,
    status: String,
    created_at: Date
});

module.exports = mongoose.model("User", userSchema);