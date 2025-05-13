import React from "react";
import "./Sidebar.css"; 
export default function Sidebar() {
  const chatHistory = [
    { id: 1, name: "user-192387", lastMessage: "See you tomorrow!", time: "10:00" },
    { id: 2, name: "user-497387", lastMessage: "Don't forget the meeting.", time: "10:03" },
    { id: 3, name: "user-915483", lastMessage: "Thanks for the update!", time: "10:04" },
    { id: 4, name: "user-14081293", lastMessage: "Can you send me the file?", time: "10:00" },
    { id: 5, name: "user-0424988", lastMessage: "Let's catch up soon!", time: "10:00" },
    { id: 6, name: "user-915483", lastMessage: "Thanks for the update!", time: "10:04" },
    { id: 7, name: "user-14081293", lastMessage: "Can you send me the file?", time: "10:00" },
    { id: 8, name: "user-0424988", lastMessage: "Let's catch up soon!", time: "10:00" },
  ];

  return (
    <aside className="sidebar">
      <h2 style={{margin: '10px 0', fontSize: '22px'}}>Chat History</h2>
      <ul>
        {chatHistory.map((chat) => (
          <div className="chat-item-wrapper">
              <li key={chat.id} className="chat-item">
              <p className="chat-name">{chat.name}</p>
              <p className="chat-message">{chat.lastMessage}</p>
            </li>
            <p className="chat-time">{chat.time}</p>
          </div>
          
        ))}
      </ul>

      <div className="settings-wrapper">
        <h2 style={{margin: '10px 0', fontSize: '22px'}}>Settings</h2>
        <div className="settings">
          <div className="setting-item">
            <label>Long memory</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Font-size</label>
            <input type="range" style={{ width: "50%"}} />
          </div>
          <div className="setting-item">
            <label>Auto-translate</label>
            <input type="checkbox" />
          </div>
          <div className="setting-item">
            <label>Theme</label>
            <select name="theme" id="theme">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>
      </div>

    </aside>
  );
}