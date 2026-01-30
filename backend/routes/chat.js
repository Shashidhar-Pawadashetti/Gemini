import express from "express";
import Thread from "../models/Thread.js";
import getGeminiResponse from "../utils/gemini.js";

const router = express.Router();

// test
router.post("/test", async(req,res)=>{
    try{
        const thread = new Thread({
            threadId: "123",
            title: "Testing New Thread"
        })

        const response = await thread.save();
        res.send(response);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Failed to save in DB"});
    }
})

// Get all threads data
router.get("/thread", async(req,res)=>{
    try{
        const threads = await Thread.find({}).sort({updateedAt: -1});
        // descending order of threads -> Most recent thread on top
        res.json(threads);
    }catch(error){
        console.log("Error in getting threads", error);
        res.status(500).json({error:"Failed to fetch threads"})
    }
});

// Get a particular thread's data
router.get("/thread/:threadId", async(req,res)=>{
    const {threadId} = req.params;

    try{
        const thread = await Thread.findOne({threadId});

        if(!thread){
            res.status(404).json({error:"Thread not found"});
        }

        res.json(thread.messages);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Failed to fetch chat"});
    }
})

// Delete a particular thread
router.delete("/thread/:threadId", async(req,res)=>{
    const {threadId} = req.params;
    try{
        const deletedThread = await Thread.deleteOne({threadId});

        if(!deletedThread){
            res.status(404).json({error:"Thread not found"});
        }

        res.status(200).json({success:"Thread deleted successfully"});

    }catch(error){
        console.log(error);
        res.status(500).json({error:"Failed to delete thread"});
    }
});

// Generate response from gemini and store and send to frontend
router.post("/chat", async(req,res)=>{
    const {threadId, message} = req.body;

    if(!threadId || !message){
        res.status(400).json({error:"Missing required details"});
    }

    try{
        const thread = await Thread.findOne({threadId});

        if(!thread){
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role:"user", content:message}]
            });
        } else {
            if (!thread.messages) {
                thread.messages = [];
            }
            thread.messages.push({role:"user", content:message});
        }

        const aiResponse = await getGeminiResponse(message);

        thread.messages.push({role:"ai",content:aiResponse});
        thread.updatedAt = new Date();

        await thread.save();
        
        res.json({reply: aiResponse});

    }catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to get response"});
    }
})

export default router;