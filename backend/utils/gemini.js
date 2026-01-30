import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const getGeminiResponse = async (message) => {
    try{
        const response = await ai.models.generateContent({
        model: process.env.MODEL,
        contents: [
            {
                role: "user",
                parts: [{text: message}]
            }
        ]
        });
        // console.log(response.text);
        return response.candidates[0].content.parts[0].text;

    }catch(error){
        console.log(error);
    }
}

export default getGeminiResponse;