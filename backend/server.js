import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import getGeminiResponse from "./utils/gemini.js";
import connectDB from "./dbconfig/dbConnect.js";
dotenv.config();

const app = express();
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Running"});
})

app.post("/test", async(req,res)=>{
    const message = await getGeminiResponse("A Joke related computer science");
    res.send(message);
})

app.listen(process.env.PORT,()=>{
    console.log(`Server listening to port ${process.env.PORT}`);
    connectDB();
})

