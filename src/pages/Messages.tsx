
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
import { DefaultAvatar } from '@/components/ui/avatar';
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

// Generate 5000 contacts (only a subset will be displayed at once)
const generateContacts = () => {
  const names = [
    "John Smith", "Sarah Johnson", "Michael Brown", "Emma Wilson", "David Miller", "Lisa Taylor", "James Anderson",
    "Anna Lee", "Robert Chen", "Jennifer Kim", "Thomas Wright", "Maria Garcia", "Daniel Martinez", "Julia White",
    "Richard Moore", "Susan Lopez", "Paul Scott", "Linda Rodriguez", "Mark Davis", "Patricia Clark", "Joseph Hill"
  ];
  
  const statuses = ["online", "offline", "away"];
  
  const messages = [
    "When will the fuel prices change?",
    "Thanks for the assistance!",
    "Do you have premium fuel in stock?",
    "I'll stop by tomorrow morning",
    "Can you save me 5 gallons?",
    "Is the car wash working today?",
    "What time do you close tonight?",
    "Are there any discounts today?",
    "Can I pay with a mobile app?",
    "Is your diesel pump working?",
    "Do you accept credit cards?",
    "How much for a car wash?",
    "Is the convenience store open?",
    "When will the new fuel arrive?",
    "What's your busiest time?",
    "Can I reserve a fuel pump?",
    "Do you have an EV charging station?",
    "What's the octane rating of your premium fuel?",
    "Are there any loyalty programs?",
    "Could you check my tire pressure?"
  ];
  
  const timePeriods = ["Just now", "5 min ago", "10 min ago", "30 min ago", "1 hour ago", "2 hours ago", "Yesterday", "2 days ago", "This week", "Last week"];
  
  return Array.from({ length: 5000 }, (_, i) => {
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const randomStatusIndex = Math.floor(Math.random() * statuses.length);
    const randomMessageIndex = Math.floor(Math.random() * messages.length);
    const randomTimeIndex = Math.floor(Math.random() * timePeriods.length);
    const randomUnread = Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0;
    
    return {
      id: i + 1,
      name: names[randomNameIndex] + " " + (i + 1),
      status: statuses[randomStatusIndex],
      lastMessage: messages[randomMessageIndex],
      lastMessageTime: timePeriods[randomTimeIndex],
      avatar: "/lovable-uploads/e85eacbe-3d90-49fb-9c5a-f798f456543e.png",
      unread: randomUnread
    };
  });
};

// Generate a large set of message history for real-time interactions
const generateMessages = (contactId) => {
  const messageTemplates = [
    "Hello, I have a question about fuel prices",
    "Hi there! How can I help you with fuel prices?",
    "When will the fuel prices change? I noticed they have been the same for a week now.",
    "We usually update our prices every Monday morning, but it depends on the market conditions. The prices have been stable lately, which is why they haven't changed.",
    "I see, thank you for the explanation.",
    "Is there anything else I can help you with?",
    "Yes, do you have premium fuel available?",
    "Yes, we have premium fuel available at all our pumps.",
    "Great, I'll stop by later today.",
    "Perfect! Let us know if you need anything else.",
    "What time do you close tonight?",
    "We're open 24/7 so you can come by anytime.",
    "That's convenient, thanks!",
    "You're welcome! Have a great day.",
    "One more question - do you offer car wash services?",
    "Yes, we have both automatic and self-service car wash options.",
    "What's the price for the automatic wash?",
    "The standard wash is $8.99, and the premium wash with wax is $12.99.",
    "Thanks for the information!",
    "No problem, see you soon!"
  ];
  
  return Array.from({ length: 20 }, (_, i) => {
    // Alternate messages between contact and admin (0)
    const senderId = i % 2 === 0 ? contactId : 0;
    const receiverId = i % 2 === 0 ? 0 : contactId;
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - (20 - i) * 5); // Space messages out by 5 minutes
    
    return {
      id: i + 1,
      senderId,
      receiverId,
      text: messageTemplates[i],
      timestamp: i < 18 ? `Today ${timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : `Today ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      status: i % 2 === 0 ? 'read' : (i < 18 ? 'read' : (i < 19 ? 'delivered' : 'sent'))
    };
  });
};

const Messages = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [allContacts, setAllContacts] = useState([]);
  const [displayedContacts, setDisplayedContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const contactsPerPage = 20;

  // Initialize with 5000 contacts
  useEffect(() => {
    const contacts = generateContacts();
    setAllContacts(contacts);
    setDisplayedContacts(contacts.slice(0, contactsPerPage));
    
    setTimeout(() => {
      setIsLoading(false);
      setSelectedContact(contacts[0]); // Select first contact by default
      setMessages(generateMessages(contacts[0].id));
      
      toast({
        title: "Messages Loaded",
        description: `You have ${contacts.filter(c => c.unread > 0).reduce((acc, curr) => acc + curr.unread, 0)} unread messages from 5000 contacts`,
        duration: 3000,
      });
    }, 1500);
  }, []);

  // Handle pagination and search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setDisplayedContacts(allContacts.slice(currentPage * contactsPerPage, (currentPage + 1) * contactsPerPage));
    } else {
      const filtered = allContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedContacts(filtered.slice(0, contactsPerPage));
      setCurrentPage(0);
    }
  }, [searchTerm, currentPage, allContacts]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedContact) {
      scrollToBottom();
      setMessages(generateMessages(selectedContact.id));
    }
  }, [selectedContact]);

  useEffect(() => {
    if (selectedContact) {
      scrollToBottom();
    }
  }, [messages]);

  // Simulate receiving real-time messages
  useEffect(() => {
    // Real-time message simulation
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        const randomContactIndex = Math.floor(Math.random() * allContacts.length);
        const randomContact = allContacts[randomContactIndex];
        
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
            
            setMessages(prevMessages => 
              selectedContact?.id === randomContact.id ? [...prevMessages, newMsg] : prevMessages
            );
            
            // Update contact's last message
            setAllContacts(prevContacts => 
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
            
            // Update displayed contacts if the contact is in the current view
            setDisplayedContacts(prev => {
              const contactIndex = prev.findIndex(c => c.id === randomContact.id);
              if (contactIndex >= 0) {
                const updated = [...prev];
                updated[contactIndex] = {
                  ...updated[contactIndex],
                  lastMessage: newMsg.text,
                  lastMessageTime: 'Just now',
                  unread: selectedContact?.id === randomContact.id ? 0 : updated[contactIndex].unread + 1
                };
                return updated;
              }
              return prev;
            });
            
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
    }, 10000); // More frequent updates for demo purposes
    
    return () => clearInterval(interval);
  }, [toast, selectedContact, messages, isTyping, allContacts]);

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
    setAllContacts(prevContacts => 
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
    
    // Update in displayed contacts
    setDisplayedContacts(prev => {
      const contactIndex = prev.findIndex(c => c.id === selectedContact.id);
      if (contactIndex >= 0) {
        const updated = [...prev];
        updated[contactIndex] = {
          ...updated[contactIndex],
          lastMessage: newMessage,
          lastMessageTime: 'Just now'
        };
        return updated;
      }
      return prev;
    });
    
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
    setMessages(generateMessages(contact.id));
    
    // Mark messages as read
    setAllContacts(prevContacts => 
      prevContacts.map(c => 
        c.id === contact.id ? { ...c, unread: 0 } : c
      )
    );
    
    // Update in displayed contacts
    setDisplayedContacts(prev => {
      const contactIndex = prev.findIndex(c => c.id === contact.id);
      if (contactIndex >= 0) {
        const updated = [...prev];
        updated[contactIndex] = { ...updated[contactIndex], unread: 0 };
        return updated;
      }
      return prev;
    });
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

  const handleNextPage = () => {
    if ((currentPage + 1) * contactsPerPage < allContacts.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
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
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-500">
                {searchTerm ? 'Search Results' : `${currentPage * contactsPerPage + 1}-${Math.min((currentPage + 1) * contactsPerPage, allContacts.length)} of ${allContacts.length}`}
              </span>
              <Button variant="ghost" size="icon" onClick={handlePrevPage} disabled={currentPage === 0}>
                <ChevronDown className="rotate-90" size={18} />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleNextPage} disabled={(currentPage + 1) * contactsPerPage >= allContacts.length}>
                <ChevronDown className="rotate-270" size={18} />
              </Button>
              <Button variant="ghost" size="icon">
                <Plus size={18} />
              </Button>
            </div>
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
          {displayedContacts.map((contact) => (
            <div 
              key={contact.id}
              className={`flex items-center p-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedContact?.id === contact.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => handleSelectContact(contact)}
            >
              <div className="relative">
                <DefaultAvatar className="w-12 h-12" />
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
                <DefaultAvatar className="w-10 h-10" />
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
                          <DefaultAvatar className="w-8 h-8" />
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
                    <DefaultAvatar className="w-8 h-8" />
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
