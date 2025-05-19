import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Minimize2, Maximize2, Bot, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

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
  // Set isVisible to true to ensure the chatbot is always displayed
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Force the chatbot to be visible when the component mounts
  useEffect(() => {
    setIsVisible(true);
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

  const handleSendMessage = async () => {
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
      }

      const botMessageObj: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessageObj]);
      setIsTyping(false);
    }, 1500);
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
      {/* Chat Button - Only show if isVisible is true */}
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-[9999]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Button
            onClick={toggleChat}
            className="h-14 w-14 rounded-full bg-white hover:bg-gray-100 shadow-lg p-0 overflow-hidden border-2 border-green-500"
          >
            <img src="./fuel-logo.svg" alt="FuelBot" className="w-full h-full" />
          </Button>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isVisible && isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-[9999] w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col"
            style={{ height: isMinimized ? '60px' : '500px' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {/* Chat Header */}
            <div className="bg-green-500 text-white p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-6 h-6 mr-2 bg-white rounded-full overflow-hidden">
                  <img src="./fuel-logo.svg" alt="FuelBot" className="w-full h-full" />
                </div>
                <h3 className="font-medium">FuelBot Assistant</h3>
              </div>
              <div className="flex space-x-2">
                <button onClick={toggleMinimize} className="text-white hover:text-gray-200">
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button onClick={toggleChat} className="text-white hover:text-gray-200">
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
                      <Avatar className="h-8 w-8 mr-2 bg-white overflow-hidden border border-green-500">
                        <AvatarImage src="./fuel-logo.svg" />
                        <AvatarFallback>FB</AvatarFallback>
                      </Avatar>
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
                    <Avatar className="h-8 w-8 mr-2 bg-white overflow-hidden border border-green-500">
                      <AvatarImage src="./fuel-logo.svg" />
                      <AvatarFallback>FB</AvatarFallback>
                    </Avatar>
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
