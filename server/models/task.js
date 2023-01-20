const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        default: "New Task",
        required: true,
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
        default: "Low",
        enum: ["Low", "Medium", "High"],
    },
    dueDate: {
        type: Date,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model.Tasks || mongoose.model("Tasks", TaskSchema);

    