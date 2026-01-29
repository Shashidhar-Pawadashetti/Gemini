import mongoose from "mongoose";

const MessagaSchema = new mongoose.Schema({
    role:{
        type: String,
        enum: ["user", "ai"],
        required: true
    },
    content:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

const ThreadSchema = new mongoose.Schema({
    threadId:{
        type: String,
        required: true,
        unique: true
    },
    title:{
        type: String,
        default: "New Chat"
    },
    meaasges: [MessagaSchema],
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Thread", ThreadSchema);