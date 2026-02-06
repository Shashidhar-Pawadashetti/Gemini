import { useContext, useState, useEffect } from "react";
import Chat from "./Chat.jsx";
import "./ChatWindow.css";
import { MyContext } from "./MyContext.jsx";
import {ScaleLoader} from "react-spinners";

function ChatWindow() {
    const { prompt, setPrompt,
        reply, setReply,
        currThreadId, setCurrThreadId,
        prevChats, setPrevChats,
        newChat, setNewChat
    } = useContext(MyContext);

    const [loading, setLoading] = useState(false);

    const getReply = async () => {
        setLoading(true)
        if (!prompt.trim()) return;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        }

        try {
            const response = await fetch("http://localhost:3000/api/chat", options);
            const res = await response.json();

            if (response.ok) {
                // Success: Update UI
                setReply(res.reply);
            } else {
                // Error: Show alert or update UI with error message
                console.log("Server Error:", res.error);
                setReply("Error: " + res.error);
            }

            console.log(res);

            setLoading(false);
        } catch (error) {
            console.log(error);
            setReply("Something went wrong. Please check your connection.");
        }
    }

    // Append new chat to previous chats
    useEffect(()=>{
        if(prompt && reply){
            setPrevChats(prevChats => ([
                ...prevChats,
                { role: "user", content: prompt },
                { role: "ai", content: reply }
            ]));

        setNewChat(false);
        setPrompt("");
        }
    },[reply])

    return (
        <div className="chatwindow">
            <nav className="navbar">
                <span className="logo">Gemini</span>
                <i className="icon fa-solid fa-circle-user"></i>
            </nav>

            {/* CENTER AREA */}
            <div className="center-area">
                {newChat ? (
                    <div className="greet-text">
                        
                        <p className="hello"><span className="gemini-logo"><img src="../src/assets/gemini-color.svg" alt="" /></span>Hello User!</p>
                        <p className="help">How can I help you today?</p>
                    </div>
                ) : (
                    <Chat/>
                )}

                <ScaleLoader color="#fff" loading={loading}/>
                <div className="input-box">
                    <textarea placeholder="Ask Gemini"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                getReply();
                            }
                        }}
                    ></textarea>

                    <div className="icon-row">
                        <i className="icon fa-solid fa-plus"></i>
                        <div className="icon-right">
                            {/* <i className="icon fa-solid fa-microphone"></i> */}
                            <div id="submit" onClick={getReply}><i className="icon fa-solid fa-paper-plane"></i></div>
                        </div>
                    </div>
                </div>
            </div>

            <p className="bottom-info">
                Gemini can make mistakes, so double-check it
            </p>
        </div>
    );
}

export default ChatWindow;
