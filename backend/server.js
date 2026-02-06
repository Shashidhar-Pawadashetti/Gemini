import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import getGeminiResponse from "./utils/gemini.js";
import connectDB from "./dbconfig/dbConnect.js";
import chatRoutes from "./routes/chat.js";
dotenv.config();
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

const app = express();

const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(express.json());
app.use(cors({
    origin: frontendURL, // Your frontend URL
    credentials: true
}));

app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });

app.get('/api/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.use("/api", csrfProtection, chatRoutes);

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


export default app;