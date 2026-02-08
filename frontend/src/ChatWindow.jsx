import { useContext, useState, useEffect } from "react";
import Chat from "./Chat.jsx";
import "./ChatWindow.css";
import { MyContext } from "./MyContext.jsx";
import {ScaleLoader} from "react-spinners";

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function ChatWindow() {
    const { prompt, setPrompt,
        reply, setReply,
        currThreadId, setCurrThreadId,
        prevChats, setPrevChats,
        newChat, setNewChat
    } = useContext(MyContext);

    const [loading, setLoading] = useState(false);
    const [csrfToken, setCsrfToken] = useState(null);

    useEffect(() => {
        fetch(`${backendURL}/api/csrf-token`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setCsrfToken(data.csrfToken))
            .catch(err => console.log(err));
    }, []);

    const getReply = async () => {
        if (!prompt.trim() || !csrfToken) return;
        setLoading(true);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfToken
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            }),
            credentials: 'include'
        }

        try {
            const response = await fetch(`${backendURL}/api/chat`, options);
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
                        
                        <p className="hello"><span className="gemini-logo"><img src="../src/assets/gemini-color.svg" alt="" /></span>Hello Shashidhar</p>
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
