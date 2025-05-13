import React from 'react';
import { CoordinatorProvider } from './context/CoordinatorContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import AgentsDashboard from './components/AgentsDashboard';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <CoordinatorProvider>
      <div className="app-container">
        <Header />
        <div className="main-area">
          <Sidebar />
          <ChatWindow />
          <AgentsDashboard />
        </div>
        <Footer />
      </div>
    </CoordinatorProvider>
  );
}

export default App;