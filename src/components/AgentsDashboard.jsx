import React, { useContext, useEffect, useRef } from 'react';
import { CoordinatorContext } from '../context/CoordinatorContext';
import './AgentsDashboard.css';

export default function AgentsDashboard() {
  const {
    agentOutputs,
    handleIntentAccept,
    handleShowEmotionChart,
    handleOpenSource,
    handleApplyAction,
    handleCopyToCRM,
    handleFlagQA,
    setInput
  } = useContext(CoordinatorContext);

  const suggestPanelRef = useRef(null);


  const handleGetSuggestionContent = () => {
    // console.log("slkdjflkf")
    // if (suggestPanelRef.current) {
      // Получаем текстовое содержимое div
      const content = suggestPanelRef.current.textContent;
      // console.log('sssss')
      console.log('Содержимое suggest-panel-content:', content);
      setInput(content);

    // }
  };


  const getEmotionClass = (emotion) => {
    switch (emotion) {
      case 'anger':
        return 'emotion-anger';
      case 'happy':
        return 'emotion-happy';
      case 'neutral':
        return 'emotion-neutral';
      default:
        return 'emotion-default';
    }
  };

  // console.log(agentOutputs)

  return (
    <section className="agents-dashboard">
            <h2 style={{margin: '0pc', fontSize: '22px'}}>Agents</h2>

      {/* Intent Agent */}
      <div className="agent-panel intent-agent" style={{ height: '60px'}}>
        <h3>Intent</h3>
        <div className="panel-content">
          {agentOutputs.intent || "Waiting for info"}
        </div>
        <div className="actions">
          {/* <button onClick={() => handleIntentAccept(agentOutputs.intent)}>
            Принять намерение
          </button> */}
        </div>
      </div>

      {/* Emotion Agent */}
      <div className="agent-panel emotion-agent" style={{ height: '60px'}}>
        <h3>Emotion </h3>
        <div className="panel-content" style={{ display: 'flex', alignItems: 'center'}}>
          {agentOutputs.emotion || <p>Waiting for info</p>}
          <div className={`emotion-indicator ${getEmotionClass(agentOutputs.emotion)}`}></div>
          </div>
        </div>

      <div className="agent-panel suggestion-agent">
        <div className='suggestion-agent-h'>
          <p>Suggestion</p>
          <div className='suggest-butttons'>
          <button
              className="accept-btn"
              onClick={() => {
                handleGetSuggestionContent(); // Вызываем функцию для получения содержимого
                // setInput(agentOutputs.suggestion?.snippet || '');
              }}
            >
              Принять
            </button>      
            <button className='discard-btn'>Отклонить</button>
          </div>
        </div>
        {/* <h3>Suggestion Agent
          
        </h3> */}
        <div className="suggest-panel-content panel-content" ref={suggestPanelRef}>
          {agentOutputs.knowledge?.snippet || <p>Waiting for info</p>}
        </div>
        <div className="actions">
          {agentOutputs.knowledge?.link && (
            <button onClick={() => handleOpenSource(agentOutputs.knowledge.link)}>
              Открыть источник
            </button>
          )}
        </div>
      </div>


      {/* Summary Agent */}
      <div className="agent-panel summary-agent">
      <div className='suggestion-agent-h'>
          <p>Summary</p>
          <div className="actions">
          <button onClick={() => handleCopyToCRM(agentOutputs.summary)}>
            Копировать в CRM
          </button>
        </div>
        </div>
        <div className="panel-content">
          {agentOutputs.summary || <p>Waiting for info</p>}
        </div>

      </div>

     {/* Quality Assurance Agent */}
<div className="agent-panel qa-agent">
  <div className='qa-h'>
  <p>Quality Assurance</p>
    <button onClick={() => handleCopyToCRM(agentOutputs.summary)}>
            Отметить проблему
          </button>
  </div>
 
    <div className="panel-content ">
    {agentOutputs.qa && Object.keys(agentOutputs.qa).length > 0 ? (
      <>
      <div className="qa-row">
        <span className="qa-label">Politeness:</span>
        <span className="qa-value">{agentOutputs.qa.politeness}</span>
      </div>
      <div className="qa-row">
        <span className="qa-label">Script match:</span>
        <span className="qa-value">{String(agentOutputs.qa.script_match)}</span>
      </div>
      <div className="qa-row">
        <span className="qa-label">Correctness:</span>
        <span className="qa-value">{agentOutputs.qa.correctness}</span>
      </div>
      <div className="qa-row">
        <span className="qa-label">Comment:</span>
        <span className="qa-value">{agentOutputs.qa.comment}</span>
      </div>
    </>
    ) : (
      <p>Waiting for info</p>
    )}
  </div>
</div>

    </section>
  );
}
