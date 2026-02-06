import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";

const DEFAULT_BACKEND_URL = 'http://localhost:3000';
const backendURL = import.meta.env.VITE_BACKEND_URL || DEFAULT_BACKEND_URL;

function Sidebar() {
    const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch(`${backendURL}/api/thread`, { credentials: 'include' });
            const res = await response.json();

            const filteredData = res.map((thread) => ({
                threadId: thread.threadId,
                title: thread.title,
            }));

            setAllThreads(filteredData);
            // console.log(filteredData);
            // console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId]);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread = async(newThreadId) => {
        setCurrThreadId(newThreadId);

        try{
            const response = await fetch(`${backendURL}/api/thread/${newThreadId}`, { credentials: 'include' });
            const res = await response.json();
            // console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        }catch(error){
            console.log(error);
        }
    }

    const deleteThread = async(threadId) => {
        try{
            const response = await fetch(`${backendURL}/api/thread/${threadId}`, { method: "DELETE", credentials: 'include' });
            const res = await response.json();
            console.log(res);

            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if(threadId === currThreadId){
                createNewChat();
            }
        }catch(error){
            console.log(error);
        }
    }

    return (
        <section className="sidebar">
            <div className="top-section">
                {/* Sidebar nav */}
                <nav className="sidebar-nav">
                    <span>
                        <i className="fa-solid fa-bars menu"></i>
                    </span>
                    <span>
                        <i className="fa-solid fa-magnifying-glass search-bar"></i>
                    </span>
                </nav>

                {/* Chat related UI */}
                <div>
                    <div className="new-chat-container">
                        <div className="new-chat" onClick={createNewChat}>
                            <i className="fa-regular fa-pen-to-square"></i>
                            <span>New chat</span>
                        </div>
                        <div className="temporary-chat">
                            <i className="fa-regular fa-message"></i>
                        </div>
                    </div>

                    {/* Chat history */}
                    <div>
                        <h5>Chats</h5>
                        <ul className="history">
                            {allThreads.map((thread, idx) => (
                                <li key={thread.threadId} onClick={(e) => changeThread(thread.threadId)} className={thread.threadId === currThreadId ? "highlighted" : " "}>
                                    {" "}
                                    {/* Key goes here! Use ID, not Index */}
                                    <i className="fa-regular fa-message"></i>
                                    <span>{thread.title}</span>
                                    <i className="fa-solid fa-trash"
                                        onClick={(e)=>{
                                            e.stopPropagation(); //Stop event bubbling
                                            deleteThread(thread.threadId);
                                        }}
                                    ></i>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* sidebar footer */}
            <footer>
                <div className="bottom-item">
                    <i className="fa-solid fa-gear"></i>
                    <span>Settings and Help</span>
                </div>
            </footer>
        </section>
    );
}

export default Sidebar;
