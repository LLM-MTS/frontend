import React from 'react';
import './AgentPanel.css';
import { intent_icon, emotion_icon, knowledge_icon, action_icon, summary_icon, qa_icon } from '../assets/imports';

const agentConfig = {
  intent: {
    label: 'Intent Agent',
    Icon: emotion_icon,
    actions: [{ label: 'Принять намерение', handler: (output) => console.log('Intent accepted:', output) }],
  },
  emotion: {
    label: 'Emotion Agent',
    Icon: emotion_icon,
    actions: [{ label: 'Показать график эмоций', handler: (output) => console.log('Show emotion chart') }],
  },
  knowledge: {
    label: 'Knowledge Agent',
    Icon: knowledge_icon,
    actions: [{ label: 'Открыть статью', handler: (output) => window.open(output.link, '_blank') }],
  },
  action: {
    label: 'Action Suggestion',
    Icon: action_icon,
    actions: [
      { label: 'Применить рекомендацию', handler: (output) => console.log('Applied action:', output) },
    ],
  },
  summary: {
    label: 'Summary Agent',
    Icon: summary_icon,
    actions: [
      { label: 'Копировать в CRM', handler: (output) => navigator.clipboard.writeText(JSON.stringify(output)) },
    ],
  },
  qa: {
    label: 'Quality Assurance',
    Icon: qa_icon,
    actions: [
      { label: 'Отметить проблему', handler: (output) => console.log('QA flagged:', output) },
    ],
  },
};

export default function AgentPanel({ agentKey, output }) {
  const config = agentConfig[agentKey] || {};
  const { label, Icon, actions = [] } = config;

  // Render text content or object
  const renderContent = () => {
    if (!output) return <i>Ждем данные...</i>;
    if (typeof output === 'string') return <span>{output}</span>;
    // assume object
    return Object.entries(output).map(([key, value]) => (
      <div key={key} className="field">
        <strong>{key}:</strong> {String(value)}
      </div>
    ));
  };

  return (
    <div className="agent-panel enhanced">
      <div className="header">
        {Icon && <Icon className="icon" />}
        <h3>{label}</h3>
      </div>
      <div className="panel-content">{renderContent()}</div>
      {actions.length > 0 && (
        <div className="actions">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className="action-btn"
              onClick={() => action.handler(output)}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
