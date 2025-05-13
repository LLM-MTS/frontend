// ===== src/context/CoordinatorContext.jsx =====
import React, { createContext, useState } from 'react';

export const CoordinatorContext = createContext();

export function CoordinatorProvider({ children }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [agentOutputs, setAgentOutputs] = useState({
    intent: '',
    emotion: '',
    knowledge: { snippet: '', link: '' },
    suggestion: '',
    qa: {},
    summary: '',
    crm: {},
  });
  const [input, setInput] = useState('');

  async function sendMessage() {
    const message = input.trim();
    if (!message) return;
    // Проверяем, что последнее сообщение отправлено пользователем
    const lastMessage = chatHistory[chatHistory.length - 1];
    if (lastMessage?.role === 'assistant') {
      console.log('Запрос не отправлен, так как последнее сообщение от ассистента.');
      setChatHistory(h => [...h, { role: 'assistant', text: message }]);

      return;
    }

    // Добавляем сообщение пользователя в историю
    setChatHistory(h => [...h, { role: 'user', text: message }]);

    try {
      const res = await fetch('http://127.0.0.1:8000/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log('✅ Response from /message:', data);

      // раскладываем ответ на поля
      setAgentOutputs({
        intent: data.intent,
        emotion: data.emotion,
        knowledge: { snippet: data.knowledge, link: data.knowledgeLink },
        suggestion: data.suggestion,
        qa: data.quality,
        summary: data.summary,
        crm: data.crm_template,
      });

      // добавляем ответ ассистента в историю (используем summary)
      setChatHistory(h => [...h, { role: 'assistant', text: "Приняли ваш запрос, в течение минуты оператор вам ответит" }]);
      // очищаем input после отправки
      setInput('');
    } catch (err) {
      console.error(err);
      setChatHistory(h => [...h, { role: 'assistant', text: 'Ошибка при отправке сообщения.' }]);
    }
  }

  return (
    <CoordinatorContext.Provider value={{
      chatHistory,
      agentOutputs,
      input,
      setInput,
      sendMessage,
    }}>
      {children}
    </CoordinatorContext.Provider>
  );
}
