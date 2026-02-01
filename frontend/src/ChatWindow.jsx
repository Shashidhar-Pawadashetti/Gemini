import Chat from "./Chat.jsx";
import "./ChatWindow.css";

function ChatWindow(){
    return(
        <div className="chatwindow">
            <nav className="navbar">
                <span>Gemini</span>
                <span><i className="fa-solid fa-circle-user"></i></span>
            </nav>

            <div className="greeting">
                <p><span>Hello User!</span></p>
                <p>How can I help you today?</p>
            </div>

            <Chat></Chat>

            <div className="input-box">
                <div className="search-box">
                    <input type="text" placeholder="Ask Gemini"></input>

                    <div>
                        <i className="fa-solid fa-plus"></i>
                        <i className="fa-solid fa-microphone"></i>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
            </div>
            <p className="bottom-info">
                Gemini can make mistakes, so double-check it
            </p>
        </div>
    )
}

export default ChatWindow;