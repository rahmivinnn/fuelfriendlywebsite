import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize2, Maximize2 } from 'lucide-react';

// Simple SVG for the fuel logo
const FUEL_LOGO = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="none" stroke="#3ECF8E" stroke-width="3"/>
  <path d="M50 20 L65 45 L50 70 C45 65 40 60 45 50 C50 40 45 35 40 30 Z" fill="#3ECF8E"/>
</svg>
`;

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m FuelBot, your AI assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  "Where is the nearest fuel station?",
  "How do I add my station to the platform?",
  "What payment methods are accepted?",
  "How do I check my earnings?",
  "How to contact customer support?",
];

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Add a style tag to the document head to ensure the chatbot is visible
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .chatbot-button {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        width: 60px !important;
        height: 60px !important;
        border-radius: 50% !important;
        background-color: white !important;
        border: 2px solid #3ECF8E !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        cursor: pointer !important;
        z-index: 999999 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 0 !important;
        overflow: hidden !important;
      }
      
      .chatbot-window {
        position: fixed !important;
        bottom: 90px !important;
        right: 20px !important;
        width: 350px !important;
        border-radius: 12px !important;
        background-color: white !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
        z-index: 999999 !important;
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = '';

      // Simple pattern matching for demo purposes
      const lowercaseInput = inputValue.toLowerCase();

      if (lowercaseInput.includes('nearest') || lowercaseInput.includes('nearby')) {
        botResponse = "You can find nearby stations by using our 'Nearby Stations' feature.";
      } else if (lowercaseInput.includes('add') && lowercaseInput.includes('station')) {
        botResponse = "To add your station to our platform, go to the 'Station Management' section.";
      } else if (lowercaseInput.includes('payment')) {
        botResponse = "We accept various payment methods including credit/debit cards, PayPal, and more.";
      } else if (lowercaseInput.includes('support') || lowercaseInput.includes('help')) {
        botResponse = "For customer support, please visit the 'Help & Support' section.";
      } else {
        botResponse = "I'm not sure I understand your question. Could you please rephrase?";
      }

      const botMessageObj: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessageObj]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        className="chatbot-button"
        onClick={toggleChat}
        dangerouslySetInnerHTML={{ __html: FUEL_LOGO }}
      ></button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window" style={{ height: isMinimized ? '60px' : '500px' }}>
          {/* Chat Header */}
          <div style={{
            backgroundColor: '#3ECF8E',
            color: 'white',
            padding: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                marginRight: '8px', 
                backgroundColor: 'white', 
                borderRadius: '50%',
                padding: '2px'
              }}
              dangerouslySetInnerHTML={{ __html: FUEL_LOGO }}
              ></div>
              <h3 style={{ fontWeight: 500 }}>FuelBot Assistant</h3>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={toggleMinimize} 
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button 
                onClick={toggleChat} 
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          {!isMinimized && (
            <div style={{ 
              flex: 1, 
              overflowY: 'auto', 
              padding: '16px', 
              backgroundColor: '#f9f9f9',
              height: 'calc(100% - 130px)'
            }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  style={{ 
                    marginBottom: '16px', 
                    display: 'flex', 
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' 
                  }}
                >
                  {message.sender === 'bot' && (
                    <div 
                      style={{
                        width: '32px',
                        height: '32px',
                        marginRight: '8px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        border: '1px solid #3ECF8E',
                        padding: '4px',
                        flexShrink: 0
                      }}
                      dangerouslySetInnerHTML={{ __html: FUEL_LOGO }}
                    ></div>
                  )}
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: message.sender === 'user' ? '#3ECF8E' : 'white',
                      color: message.sender === 'user' ? 'white' : 'black',
                      border: message.sender === 'user' ? 'none' : '1px solid #e0e0e0'
                    }}
                  >
                    <p style={{ fontSize: '14px' }}>{message.content}</p>
                    <p style={{ fontSize: '12px', marginTop: '4px', opacity: 0.7 }}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      marginLeft: '8px', 
                      backgroundColor: '#3ECF8E', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>U</div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <div 
                    style={{
                      width: '32px',
                      height: '32px',
                      marginRight: '8px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      border: '1px solid #3ECF8E',
                      padding: '4px',
                      flexShrink: 0
                    }}
                    dangerouslySetInnerHTML={{ __html: FUEL_LOGO }}
                  ></div>
                  <div style={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0', 
                    padding: '12px', 
                    borderRadius: '8px' 
                  }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div style={{ 
                        height: '8px', 
                        width: '8px', 
                        backgroundColor: '#aaa', 
                        borderRadius: '50%',
                        animation: 'bounce 0.6s infinite',
                        animationDelay: '0ms'
                      }}></div>
                      <div style={{ 
                        height: '8px', 
                        width: '8px', 
                        backgroundColor: '#aaa', 
                        borderRadius: '50%',
                        animation: 'bounce 0.6s infinite',
                        animationDelay: '300ms'
                      }}></div>
                      <div style={{ 
                        height: '8px', 
                        width: '8px', 
                        backgroundColor: '#aaa', 
                        borderRadius: '50%',
                        animation: 'bounce 0.6s infinite',
                        animationDelay: '600ms'
                      }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Chat Input */}
          {!isMinimized && (
            <>
              <div style={{ 
                padding: '12px', 
                backgroundColor: 'white', 
                borderTop: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center'
              }}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{ 
                    flex: 1, 
                    marginRight: '8px', 
                    padding: '8px 12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  style={{ 
                    backgroundColor: '#3ECF8E', 
                    color: 'white', 
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                    opacity: inputValue.trim() ? 1 : 0.5
                  }}
                >
                  <Send size={18} />
                </button>
              </div>

              {/* Suggested Questions */}
              <div style={{ 
                padding: '0 12px 12px 12px', 
                backgroundColor: 'white'
              }}>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Suggested questions:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      style={{ 
                        fontSize: '12px', 
                        backgroundColor: '#f0f0f0', 
                        border: 'none',
                        borderRadius: '16px',
                        padding: '4px 12px',
                        color: '#333',
                        cursor: 'pointer'
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
