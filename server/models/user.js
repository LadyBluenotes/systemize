const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true],
    }, 
    username: {
        type: String,
        required: [true],
        ref: "Users",
        minlength: 4
    }, 
    password: {
        type: String,
        required: [true],
        unique: false,
        },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tasks",
        }],
    });

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);