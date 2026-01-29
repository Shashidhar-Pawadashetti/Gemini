import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const ai = new GoogleGenAI({});


app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Running"});
})

app.post("/test", async(req,res)=>{
    try{
        const response = await ai.models.generateContent({
        model: process.env.MODEL,
        contents: "A Joke related computer science",
        });
        
        res.send(response.text);

    }catch(error){
        console.log(error);
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`Server listening to port ${process.env.PORT}`);
})

