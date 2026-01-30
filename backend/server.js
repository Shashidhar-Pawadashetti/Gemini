import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import getGeminiResponse from "./utils/gemini.js";
import connectDB from "./dbconfig/dbConnect.js";
import chatRoutes from "./routes/chat.js";
dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);

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

