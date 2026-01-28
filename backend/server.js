import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).json({message:"Running"});
})

app.listen(process.env.PORT,()=>{
    console.log(`Server listening to port ${process.env.PORT}`);
})

