import React, { useState, useRef, useEffect } from 'react';
<<<<<<< HEAD
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Minimize2, Maximize2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

=======
import { Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Simple SVG for the fuel logo
const FUEL_LOGO = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="none" stroke="#3ECF8E" stroke-width="3"/>
  <path d="M50 20 L65 45 L50 70 C45 65 40 60 45 50 C50 40 45 35 40 30 Z" fill="#3ECF8E"/>
</svg>
`;

>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
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
  const { toast } = useToast();

<<<<<<< HEAD
=======
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

>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
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

<<<<<<< HEAD
  const handleSendMessage = async () => {
=======
  const handleSendMessage = () => {
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
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

<<<<<<< HEAD
    // Simulate AI response (replace with actual API call in production)
    setTimeout(() => {
      let botResponse = '';
      
      // Simple pattern matching for demo purposes
      const lowercaseInput = inputValue.toLowerCase();
      
      if (lowercaseInput.includes('nearest') || lowercaseInput.includes('nearby') || lowercaseInput.includes('close')) {
        botResponse = "You can find nearby stations by using our 'Nearby Stations' feature. It allows you to select your country and city to find stations registered on Google Maps in your area.";
      } else if (lowercaseInput.includes('add') && lowercaseInput.includes('station')) {
        botResponse = "To add your station to our platform, go to the 'Station Management' section in your dashboard and click on 'Add New Station'. You'll need to provide details like location, services offered, and operating hours.";
      } else if (lowercaseInput.includes('payment')) {
        botResponse = "We accept various payment methods including credit/debit cards, PayPal, Apple Pay, and Google Pay. Station owners can set up their preferred payment methods in the 'Settings' section.";
      } else if (lowercaseInput.includes('earning') || lowercaseInput.includes('transaction')) {
        botResponse = "You can check your earnings in the 'Earnings & Transactions' section of your dashboard. It provides daily, weekly, monthly, and total earnings along with detailed transaction history.";
      } else if (lowercaseInput.includes('support') || lowercaseInput.includes('help') || lowercaseInput.includes('contact')) {
        botResponse = "For customer support, please visit the 'Help & Support' section or email us at support@fuelfriendly.com. Our team is available 24/7 to assist you.";
      } else {
        botResponse = "I'm not sure I understand your question. Could you please rephrase or select one of the suggested questions below?";
=======
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
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
      }

      const botMessageObj: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessageObj]);
      setIsTyping(false);
<<<<<<< HEAD
    }, 1500);
=======
    }, 1000);
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
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
<<<<<<< HEAD
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
        >
          <MessageSquare size={24} />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col"
            style={{ height: isMinimized ? '60px' : '500px' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {/* Chat Header */}
            <div className="bg-green-500 text-white p-3 flex justify-between items-center">
              <div className="flex items-center">
                <Bot size={20} className="mr-2" />
                <h3 className="font-medium">FuelBot Assistant</h3>
              </div>
              <div className="flex space-x-2">
                <button onClick={toggleMinimize} className="text-white hover:text-gray-200">
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button onClick={toggleChat} className="text-white hover:text-gray-200">
=======
      {/* Chat Button - Direct implementation with inline SVG */}
      <div
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: '2px solid #3ECF8E',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 99999,
          padding: '8px'
        }}
        dangerouslySetInnerHTML={{ __html: FUEL_LOGO }}
      />

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '24px',
            width: '350px',
            height: isMinimized ? '60px' : '500px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 99999
          }}
        >
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
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
<<<<<<< HEAD
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png" />
                        <AvatarFallback>FB</AvatarFallback>
                      </Avatar>
=======
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
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-green-500 text-white'
                          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center mb-4">
<<<<<<< HEAD
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/lovable-uploads/f1f34c25-67df-4603-8eb1-3f1fe84812a4.png" />
                      <AvatarFallback>FB</AvatarFallback>
                    </Avatar>
=======
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
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

<<<<<<< HEAD
            {/* Suggested Questions */}
            {!isMinimized && messages.length < 3 && (
              <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full px-3 py-1 text-gray-700 dark:text-gray-300"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            {!isMinimized && (
              <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 mr-2"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Send size={18} />
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
=======
            {/* Chat Input */}
            {!isMinimized && (
              <>
                <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 mr-2"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Send size={18} />
                  </Button>
                </div>

                {/* Suggested Questions */}
                <div className="p-3 pt-0 bg-white dark:bg-gray-800">
                  <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full px-3 py-1 text-gray-700 dark:text-gray-300 transition-colors"
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

>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
    </>
  );
};

export default ChatBot;
