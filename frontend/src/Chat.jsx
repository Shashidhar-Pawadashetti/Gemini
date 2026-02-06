import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

function Chat(){
    const {prevChats, setPrevChats, newChat, setNewChat, reply} =useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    useEffect(() => {
        if(reply === null){
            setLatestReply(null);
            return;
        }

        if(!prevChats?.length) return;

        const content = reply.split(" ");

        let idx = 0;
        setLatestReply("");
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx+1).join(" "));
            idx++;

            if(idx >= content.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);

    }, [prevChats, reply])

    if (newChat) return null;
    return(
        <>
            <div className="chats">
                {newChat && <h1>Where should we start?</h1>}

                {
                    prevChats?.slice(0, -1).map((chat, idx) =>
                        <div className={chat.role === "user" ? "user-div" : "gemini-div"} key={idx}>
                            {chat.role === "user" ?
                                <p className="user-message">{chat.content}</p> :
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                            }
                        </div>
                    )
                }

                {
                    prevChats.length > 0 && (
                        <>
                            {
                                latestReply === null ? (
                                    <div className="gemini-div" key={"non-typing"}>
                                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="gemini-div" key={"typing"}>
                                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                                    </div>
                                )
                            }
                        </>
                    )
                }

                {/* {
                    prevChats.length > 0 && latestReply !== null &&
                    <div className="gemini-div">
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                    </div>
                } */}

            </div>
        </>
    )
}

export default Chat;
