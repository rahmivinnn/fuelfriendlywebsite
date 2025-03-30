
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Users, Phone, Video, Plus, Send,
  Paperclip, Image, Smile, MoreVertical,
  Star, Clock, Archive, ChevronDown, Check, Trash2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DashboardLayout from '@/components/DashboardLayout';

// Sample contacts data
const contacts = [
  { 
    id: 1, 
    name: 'John Smith', 
    status: 'online', 
    lastMessage: 'When will the fuel prices change?',
    lastMessageTime: '10:30 AM',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png',
    unread: 2
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    status: 'offline', 
    lastMessage: 'Thanks for the assistance!',
    lastMessageTime: 'Yesterday',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png',
    unread: 0
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    status: 'online', 
    lastMessage: 'Do you have premium fuel in stock?',
    lastMessageTime: '2:15 PM',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png',
    unread: 1
  },
  { 
    id: 4, 
    name: 'Emma Wilson', 
    status: 'away', 
    lastMessage: "I'll stop by tomorrow morning",
    lastMessageTime: 'Yesterday',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png',
    unread: 0
  },
  { 
    id: 5, 
    name: 'David Miller', 
    status: 'offline', 
    lastMessage: 'Can you save me 5 gallons?',
    lastMessageTime: 'Monday',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png',
    unread: 0
  },
  { 
    id: 6, 
    name: 'Lisa Taylor', 
    status: 'online', 
    lastMessage: 'Is the car wash working today?',
    lastMessageTime: '5:45 PM',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png',
    unread: 3
  },
  { 
    id: 7, 
    name: 'James Anderson', 
    status: 'online', 
    lastMessage: 'What time do you close tonight?',
    lastMessageTime: '4:20 PM',
    avatar: '/lovable-uploads/86c52672-6ac1-4afa-b99f-d1f6c2a23319.png',
    unread: 0
  }
];

// Sample messages for a conversation
const messageHistory = [
  { 
    id: 1, 
    senderId: 1, 
    receiverId: 0, // 0 is the station/admin
    text: 'Hello, I have a question about fuel prices',
    timestamp: 'Today 10:15 AM',
    status: 'read'
  },
  { 
    id: 2, 
    senderId: 0, // sent by the station/admin
    receiverId: 1,
    text: 'Hi there! How can I help you with fuel prices?',
    timestamp: 'Today 10:17 AM',
    status: 'read'
  },
  { 
    id: 3, 
    senderId: 1, 
    receiverId: 0,
    text: 'When will the fuel prices change? I noticed they have been the same for a week now.',
    timestamp: 'Today 10:20 AM',
    status: 'read'
  },
  { 
    id: 4, 
    senderId: 0, 
    receiverId: 1,
    text: "We usually update our prices every Monday morning, but it depends on the market conditions. The prices have been stable lately, which is why they haven't changed.",
    timestamp: 'Today 10:25 AM',
    status: 'read'
  },
  { 
    id: 5, 
    senderId: 1, 
    receiverId: 0,
    text: 'I see, thank you for the explanation.',
    timestamp: 'Today 10:28 AM',
    status: 'read'
  },
  { 
    id: 6, 
    senderId: 1, 
    receiverId: 0,
    text: 'When will the fuel prices change?',
    timestamp: 'Today 10:30 AM',
    status: 'delivered'
  }
];

const Messages = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [contactList, setContactList] = useState(contacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState(messageHistory);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  // Filtered contacts based on search
  const filteredContacts = contactList.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedContact) {
      scrollToBottom();
    }
  }, [messages, selectedContact]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setSelectedContact(contacts[0]); // Select first contact by default
      
      toast({
        title: "Messages Loaded",
        description: "You have 6 unread messages",
        duration: 3000,
      });
    }, 1500);
    
    // Simulate receiving messages
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        const randomContactIndex = Math.floor(Math.random() * contacts.length);
        const randomContact = contacts[randomContactIndex];
        
        // Only create a new message if not already showing typing indicator
        if (!isTyping) {
          setIsTyping(true);
          
          // After 3 seconds, add the new message
          setTimeout(() => {
            const newMsg = {
              id: messages.length + 1,
              senderId: randomContact.id,
              receiverId: 0,
              text: `Message from ${randomContact.name} at ${new Date().toLocaleTimeString()}`,
              timestamp: `Today ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              status: 'delivered'
            };
            
            setMessages(prevMessages => [...prevMessages, newMsg]);
            
            // Update contact's last message
            setContactList(prevContacts => 
              prevContacts.map(contact => 
                contact.id === randomContact.id 
                  ? { 
                      ...contact, 
                      lastMessage: newMsg.text,
                      lastMessageTime: 'Just now',
                      unread: selectedContact?.id === contact.id ? 0 : contact.unread + 1
                    } 
                  : contact
              )
            );
            
            setIsTyping(false);
            
            if (selectedContact?.id === randomContact.id) {
              toast({
                title: "New Message",
                description: `${randomContact.name} sent you a message`,
                duration: 3000,
              });
            }
          }, 3000);
        }
      }
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, [toast, selectedContact, messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (newMessage.trim() === '' || !selectedContact) return;
    
    const newMsg = {
      id: messages.length + 1,
      senderId: 0, // sent by the station/admin
      receiverId: selectedContact.id,
      text: newMessage,
      timestamp: `Today ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      status: 'sent'
    };
    
    setMessages([...messages, newMsg]);
    
    // Update contact's last message
    setContactList(prevContacts => 
      prevContacts.map(contact => 
        contact.id === selectedContact.id 
          ? { 
              ...contact, 
              lastMessage: newMessage,
              lastMessageTime: 'Just now'
            } 
          : contact
      )
    );
    
    setNewMessage('');
    
    // After 1 second, change status to delivered
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMsg.id ? { ...msg, status: 'delivered' } : msg
        )
      );
      
      // After 2 more seconds, change status to read if it's the selected contact
      setTimeout(() => {
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === newMsg.id ? { ...msg, status: 'read' } : msg
          )
        );
      }, 2000);
    }, 1000);
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    
    // Mark messages as read
    setContactList(prevContacts => 
      prevContacts.map(c => 
        c.id === contact.id ? { ...c, unread: 0 } : c
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getMessageStatus = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="text-gray-400" size={14} />;
      case 'delivered':
        return <div className="flex"><Check className="text-gray-400" size={14} /><Check className="text-gray-400 -ml-1" size={14} /></div>;
      case 'read':
        return <div className="flex"><Check className="text-blue-500" size={14} /><Check className="text-blue-500 -ml-1" size={14} /></div>;
      default:
        return null;
    }
  };

  const content = isLoading ? (
    <div className="flex-1 flex items-center justify-center p-6">
      <motion.div 
        className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  ) : (
    <div className="flex h-[calc(100vh-136px)]">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Messages</h3>
            <Button variant="ghost" size="icon">
              <Plus size={18} />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search contacts..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {filteredContacts.map((contact) => (
            <div 
              key={contact.id}
              className={`flex items-center p-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedContact?.id === contact.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => handleSelectContact(contact)}
            >
              <div className="relative">
                <img 
                  src={contact.avatar} 
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div 
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}
                ></div>
              </div>
              
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium truncate">{contact.name}</h4>
                  <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                  {contact.unread > 0 && (
                    <span className="bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
            <div className="flex items-center">
              <div className="relative">
                <img 
                  src={selectedContact.avatar} 
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div 
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${getStatusColor(selectedContact.status)}`}
                ></div>
              </div>
              
              <div className="ml-3">
                <h4 className="font-medium">{selectedContact.name}</h4>
                <p className="text-xs text-gray-500 capitalize">{selectedContact.status}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Phone size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Call
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Video size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Video Call
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Star size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Add to Favorites
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Archive className="mr-2" size={16} />
                          Archive Chat
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Clock className="mr-2" size={16} />
                          Mute Notifications
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2" size={16} />
                          Delete Chat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent>
                    More Options
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="max-w-3xl mx-auto">
              {messages
                .filter(msg => 
                  (msg.senderId === selectedContact.id && msg.receiverId === 0) || 
                  (msg.senderId === 0 && msg.receiverId === selectedContact.id)
                )
                .map((message) => {
                  const isSentByMe = message.senderId === 0;
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex mb-4 ${isSentByMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isSentByMe && (
                        <div className="mr-2 mt-1">
                          <img 
                            src={selectedContact.avatar} 
                            alt={selectedContact.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className={`max-w-[70%]`}>
                        <div 
                          className={`p-3 rounded-lg ${
                            isSentByMe 
                              ? 'bg-green-500 text-white rounded-br-none' 
                              : 'bg-white rounded-bl-none shadow-sm'
                          }`}
                        >
                          {message.text}
                        </div>
                        <div 
                          className={`flex items-center mt-1 text-xs text-gray-500 ${
                            isSentByMe ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {message.timestamp}
                          {isSentByMe && (
                            <span className="ml-1">
                              {getMessageStatus(message.status)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex mb-4 justify-start">
                  <div className="mr-2 mt-1">
                    <img 
                      src={selectedContact.avatar} 
                      alt={selectedContact.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                  <div className="bg-white p-3 rounded-lg rounded-bl-none shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <Button type="button" variant="ghost" size="icon">
                <Paperclip size={18} />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <Image size={18} />
              </Button>
              <Input 
                type="text" 
                placeholder="Type a message..." 
                className="mx-2 flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="button" variant="ghost" size="icon">
                <Smile size={18} />
              </Button>
              <Button 
                type="submit" 
                className="ml-2 bg-green-500 hover:bg-green-600 rounded-full p-2 h-auto"
              >
                <Send size={18} />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Users className="mx-auto text-gray-400" size={48} />
            <p className="mt-2 text-gray-600">Select a contact to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout title="Messages">
      {content}
    </DashboardLayout>
  );
};

export default Messages;
