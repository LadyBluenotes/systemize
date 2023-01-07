import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    id:{
        type:String,
    },
    createdAt: {
        type: Date,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    hash:{
        type:String,
        required:true
    }
})

module.exports = mongoose.models.User || mongoose.model('User',userSchema)