
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, Search, PlusCircle, ArrowRight, 
  PhoneCall, Mail, MessageSquare, FileText,
  ChevronDown, ChevronUp, FileQuestion, CheckCircle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import DashboardLayout from '@/components/DashboardLayout';

// Sample FAQ data
const faqData = [
  {
    id: 1,
    category: 'account',
    question: 'How do I reset my dashboard login password?',
    answer: 'To reset your password, go to the login page and click on "Forgot Password". Enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
  },
  {
    id: 2,
    category: 'account',
    question: 'How do I update my station information?',
    answer: 'You can update your station information from the Station Management section of your dashboard. Look for the "Edit Profile" or "Station Details" options to update your address, contact information, and other station details.'
  },
  {
    id: 3,
    category: 'billing',
    question: 'How do I view and download my invoices?',
    answer: 'You can view and download your invoices from the Earnings & Transactions section. Navigate to the "Invoices" tab, select the invoice period you want to view, and click the download button to save a copy.'
  },
  {
    id: 4,
    category: 'billing',
    question: 'What payment methods do you accept?',
    answer: 'We accept credit/debit cards (Visa, Mastercard, American Express), ACH bank transfers, and PayPal. You can update your payment method in the Earnings & Transactions section under "Payment Settings".'
  },
  {
    id: 5,
    category: 'products',
    question: 'How do I add a new product to my inventory?',
    answer: 'To add a new product, go to the Products Management section and click on "Add New Product". Fill out the product details form, including name, description, category, price, and quantity, then click "Save" to add it to your inventory.'
  },
  {
    id: 6,
    category: 'products',
    question: 'How do I update fuel prices on the platform?',
    answer: 'You can update fuel prices in the Products Management section. Find the fuel products in your inventory list, click "Edit", and update the price field. Changes will be reflected immediately for customers searching for fuel stations.'
  },
  {
    id: 7,
    category: 'orders',
    question: 'How do I process a refund for a customer?',
    answer: 'To process a refund, go to the Orders Management section, find the order in question, and click on "Issue Refund". Select the reason for the refund, the amount to refund, and submit. The refund will be processed according to the original payment method.'
  },
  {
    id: 8,
    category: 'orders',
    question: 'Can I manually add an in-person transaction to the system?',
    answer: 'Yes, you can add in-person transactions manually. Go to the Orders Management section and click "Add New Order". Select "Manual Entry" as the order type, fill in the customer details and purchase information, then save to record the transaction.'
  },
  {
    id: 9,
    category: 'technical',
    question: 'The dashboard is loading slowly, what can I do?',
    answer: 'If the dashboard is loading slowly, try clearing your browser cache and cookies, or try using a different browser. Make sure your internet connection is stable. If the problem persists, contact our technical support team for assistance.'
  },
  {
    id: 10,
    category: 'technical',
    question: 'How do I connect my POS system with this platform?',
    answer: 'We offer integration with most major POS systems. Go to the Settings section, select "Integrations", and follow the instructions for your specific POS system. You may need your POS API credentials to complete the setup. For additional help, contact our technical support team.'
  }
];

// Sample knowledge base article previews
const articlesData = [
  {
    id: 1,
    title: 'Getting Started Guide',
    excerpt: 'Learn how to set up your station profile, add products, and start receiving orders.',
    category: 'Onboarding',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Optimizing Your Station Visibility',
    excerpt: 'Tips and tricks to improve your station's ranking and visibility to potential customers.',
    category: 'Marketing',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'Understanding Analytics & Reports',
    excerpt: 'A comprehensive guide to interpreting the data in your dashboard analytics and reports.',
    category: 'Analytics',
    readTime: '10 min read'
  },
  {
    id: 4,
    title: 'Inventory Management Best Practices',
    excerpt: 'Learn how to efficiently manage your fuel and convenience store inventory.',
    category: 'Operations',
    readTime: '7 min read'
  },
  {
    id: 5,
    title: 'Customer Loyalty Programs',
    excerpt: 'How to set up and manage customer loyalty programs to increase retention.',
    category: 'Marketing',
    readTime: '6 min read'
  },
  {
    id: 6,
    title: 'Troubleshooting Common Issues',
    excerpt: 'Solutions to frequently encountered problems with the platform.',
    category: 'Technical',
    readTime: '9 min read'
  }
];

const SupportHelp = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('faq');
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Filtered FAQs based on search and category
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Filtered articles based on search
  const filteredArticles = articlesData.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Help Center Loaded",
        description: "You can search through our help resources or contact support",
        duration: 3000,
      });
    }, 1500);
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitContactForm = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Support Request Sent",
      description: "We've received your message and will respond within 24 hours",
      duration: 3000,
    });
    
    // Reset form
    setContactFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleViewArticle = (article) => {
    toast({
      title: "Opening Article",
      description: `Viewing: ${article.title}`,
      duration: 2000,
    });
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
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">How can we help you today?</h2>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              type="text" 
              placeholder="Search for answers, articles, and topics..." 
              className="pl-12 py-6 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6 mx-auto max-w-md grid grid-cols-3">
            <TabsTrigger value="faq" className="flex flex-col items-center py-3">
              <FileQuestion className="mb-1" size={20} />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex flex-col items-center py-3">
              <FileText className="mb-1" size={20} />
              Articles
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex flex-col items-center py-3">
              <MessageSquare className="mb-1" size={20} />
              Contact Us
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <div className="bg-white p-4 rounded-lg border border-gray-200 sticky top-6">
                  <h3 className="font-bold mb-4">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === 'all' 
                            ? 'bg-green-100 text-green-800' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory('all')}
                      >
                        All Categories
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === 'account' 
                            ? 'bg-green-100 text-green-800' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory('account')}
                      >
                        Account & Profile
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === 'billing' 
                            ? 'bg-green-100 text-green-800' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory('billing')}
                      >
                        Billing & Payments
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === 'products' 
                            ? 'bg-green-100 text-green-800' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory('products')}
                      >
                        Products & Inventory
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === 'orders' 
                            ? 'bg-green-100 text-green-800' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory('orders')}
                      >
                        Orders & Transactions
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === 'technical' 
                            ? 'bg-green-100 text-green-800' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCategory('technical')}
                      >
                        Technical Issues
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
                  
                  {filteredFAQs.length > 0 ? (
                    <Accordion type="single" collapsible className="space-y-4">
                      {filteredFAQs.map((faq) => (
                        <AccordionItem 
                          key={faq.id} 
                          value={`faq-${faq.id}`}
                          className="border border-gray-200 rounded-lg px-4 py-2"
                        >
                          <AccordionTrigger className="text-left hover:no-underline">
                            <span className="font-medium">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-3 text-gray-600">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-12">
                      <HelpCircle className="mx-auto text-gray-400 mb-4" size={48} />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No FAQs found</h3>
                      <p className="text-gray-500 mb-4">
                        Try adjusting your search or browse a different category
                      </p>
                      <Button 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('all');
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                  
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium mb-2">Still have questions?</h4>
                    <p className="text-gray-600 mb-4">If you couldn't find the answer you were looking for, please contact our support team.</p>
                    <Button 
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => setActiveTab('contact')}
                    >
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="articles">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-6">Knowledge Base Articles</h3>
              
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <Card key={article.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {article.category}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">{article.readTime}</span>
                        </div>
                        <CardTitle>{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-gray-600">{article.excerpt}</p>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="ghost" 
                          className="text-green-600 hover:text-green-700 p-0"
                          onClick={() => handleViewArticle(article)}
                        >
                          Read article
                          <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No articles found</h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search terms or browse all articles
                  </p>
                  <Button 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => setSearchTerm('')}
                  >
                    View All Articles
                  </Button>
                </div>
              )}
              
              <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-100 flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h4 className="font-bold text-lg mb-1">Can't find what you're looking for?</h4>
                  <p className="text-gray-600">Our support team is here to help with any questions you have.</p>
                </div>
                <Button 
                  className="bg-green-500 hover:bg-green-600 mt-4 md:mt-0"
                  onClick={() => setActiveTab('contact')}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-6">
                  <h3 className="font-bold text-lg mb-4">Contact Options</h3>
                  
                  <div className="flex flex-col space-y-4">
                    <Card>
                      <CardContent className="p-4 flex items-start">
                        <div className="mr-4 mt-1">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <MessageSquare className="text-blue-600" size={20} />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Live Chat</h4>
                          <p className="text-sm text-gray-600 mb-2">Available 24/7 for real-time support</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-blue-600"
                            onClick={() => {
                              toast({
                                title: "Live Chat",
                                description: "Connecting you to a support agent...",
                                duration: 3000,
                              });
                            }}
                          >
                            Start Chat
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-start">
                        <div className="mr-4 mt-1">
                          <div className="bg-green-100 p-2 rounded-full">
                            <PhoneCall className="text-green-600" size={20} />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Phone Support</h4>
                          <p className="text-sm text-gray-600 mb-2">Monday-Friday, 9am-6pm EST</p>
                          <p className="font-medium">+1 (800) 123-4567</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-start">
                        <div className="mr-4 mt-1">
                          <div className="bg-purple-100 p-2 rounded-full">
                            <Mail className="text-purple-600" size={20} />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Email Support</h4>
                          <p className="text-sm text-gray-600 mb-2">Response within 24 hours</p>
                          <p className="font-medium">support@fuelfriendly.com</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium mb-3">Operating Hours</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Monday-Friday:</span>
                        <span>9:00 AM - 6:00 PM EST</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Saturday:</span>
                        <span>10:00 AM - 4:00 PM EST</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Sunday:</span>
                        <span>Closed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-6">Contact Support</h3>
                  
                  <form onSubmit={handleSubmitContactForm} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <Input 
                          id="name"
                          name="name"
                          value={contactFormData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={contactFormData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input 
                        id="subject"
                        name="subject"
                        value={contactFormData.subject}
                        onChange={handleInputChange}
                        placeholder="What is your question about?"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea 
                        id="message"
                        name="message"
                        value={contactFormData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Please describe your issue or question in detail"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        id="terms" 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" 
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                        I agree to the <a href="#" className="text-green-600 hover:underline">privacy policy</a> and <a href="#" className="text-green-600 hover:underline">terms of service</a>
                      </label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Send Message
                    </Button>
                  </form>
                  
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start">
                    <div className="mr-3 mt-1">
                      <CheckCircle className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">We're committed to your success</h4>
                      <p className="text-sm text-blue-700">
                        Our support team will respond to your inquiry within 24 hours. For urgent matters, please use the live chat or call us directly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );

  return (
    <DashboardLayout title="Help & Support">
      {content}
    </DashboardLayout>
  );
};

export default SupportHelp;
