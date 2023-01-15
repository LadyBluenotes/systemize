const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true],
        minlength: 3
    },
    description: {
        type: String,
        minlength: 3
    },
    priority: {
        type: String,
        default: "Low",
        enum: ["Low", "Medium", "High"],
        required: [true],
    },
    dueDate: {
        type: Date,
        required: [true],
        default: Date.now,
    },
    completed: {
        type: String,
        default: "No",
        enum: ["Yes", "No", "In Progress"],
    },
    userId:{
        type: String,
    }
});

module.exports = mongoose.model.Tasks || mongoose.model("Tasks", TaskSchema);

    