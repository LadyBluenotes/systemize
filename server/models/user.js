const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide an name!"]
    }, 
    username: {
        type: String,
        required: [true, "Please provide an username!"],
        unique: [true, "Username already exists."],
        minlength: 4
    }, 
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
        }});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);