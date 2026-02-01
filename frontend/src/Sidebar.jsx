import "./Sidebar.css";

function Sidebar() {
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
                        <div className="new-chat">
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
                            <li>
                                <i className="fa-regular fa-message"></i>
                                <span>What is React?</span>
                            </li>
                            <li>
                                <i className="fa-regular fa-message"></i>
                                <span>Debug this code</span>
                            </li>
                            <li>
                                <i className="fa-regular fa-message"></i>
                                <span>MERN Project Ideas</span>
                            </li>
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
