import Chat from "./Chat.jsx";
import "./ChatWindow.css";

function ChatWindow() {
    return (
          <div className="chatwindow">
            <nav className="navbar">
                <span className="logo">Gemini</span>
                <i className="icon fa-solid fa-circle-user"></i>
            </nav>

            {/* CENTER AREA */}
            <div className="center-area">
                <p className="hello">Hello User!</p>
                <p className="help">How can I help you today?</p>

                <div className="input-box">
                    <input type="text" placeholder="Ask Gemini" />
                    <i className="icon fa-solid fa-plus"></i>
                    <i className="icon fa-solid fa-microphone"></i>
                    <i className="icon fa-solid fa-paper-plane"></i>
                </div>
            </div>

            <p className="bottom-info">
                Gemini can make mistakes, so double-check it
            </p>
        </div>
    )
}

export default ChatWindow;