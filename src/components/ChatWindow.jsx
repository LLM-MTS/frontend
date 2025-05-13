// src/components/ChatWindow.jsx
import React, { useContext, useState, useEffect } from 'react';
import { CoordinatorContext } from '../context/CoordinatorContext';
import './ChatWindow.css';
import { arrow_right } from '../assets/imports';

export default function ChatWindow() {
  const { chatHistory, sendMessage, suggestedReply } = useContext(CoordinatorContext);
  const { input, setInput } = useContext(CoordinatorContext);

  // Если есть подсказка, устанавливаем её в input
  useEffect(() => {
    if (suggestedReply) {
      setInput(suggestedReply);
    }
  }, [suggestedReply, setInput]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {chatHistory.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'msg user' : 'msg assistant'}>
            <span className="timestamp">{msg.timestamp}</span>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Введите сообщение..."
        />
        <button onClick={handleSend} className='button-send'>
          <img src={arrow_right} alt="Send" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}