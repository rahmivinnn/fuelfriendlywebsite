<<<<<<< HEAD
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Send
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import DashboardLayout from '@/components/DashboardLayout';

type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQItem[] = [
  {
    question: "How do I update my station's fuel prices?",
    answer: "You can update your fuel prices by navigating to Products Management > Fuel Products. Click on the fuel type you want to update, enter the new price, and click Save Changes.",
    category: "pricing"
  },
  {
    question: "How do I view my earnings and transactions?",
    answer: "Navigate to Earnings & Transactions in the sidebar menu. Here you can view daily, weekly, and monthly earnings, as well as all transaction details.",
    category: "billing"
  },
  {
    question: "How do I add a new staff member to my account?",
    answer: "Go to Settings > Staff Management. Click on 'Add New Staff', fill in their details, and assign appropriate permissions. Then click 'Create Account'.",
    category: "account"
  },
  {
    question: "What payment methods are supported?",
    answer: "We support credit/debit cards, mobile payments (Apple Pay, Google Pay), and in some regions, cryptocurrency payments. You can manage your payment methods in Settings > Payment Methods.",
    category: "billing"
  },
  {
    question: "How do I respond to customer reviews?",
    answer: "Go to Customers > Reviews. You'll see all customer reviews for your station. Click on 'Reply' next to any review to respond to it.",
    category: "customers"
  },
  {
    question: "How do I set up promotions or discounts?",
    answer: "Navigate to Products Management > Promotions. Click 'Create New Promotion', set the discount amount, applicable products, and validity period, then click 'Activate Promotion'.",
    category: "pricing"
  },
  {
    question: "How do I update my station's operating hours?",
    answer: "Go to Station Management > General Information. Scroll down to Operating Hours section, update the hours for each day, and click 'Save Changes'.",
    category: "account"
  },
  {
    question: "How do I generate reports for my station?",
    answer: "Navigate to Reports in the sidebar. Select the type of report (sales, inventory, customer, etc.), set the date range, and click 'Generate Report'. You can download reports in PDF, CSV, or Excel formats.",
    category: "reports"
  },
  {
    question: "How do I add or remove fuel types from my station?",
    answer: "Go to Products Management > Fuel Products. To add a new fuel type, click 'Add New Fuel Type', fill in the details, and click 'Add'. To remove, find the fuel type in the list, click the three dots menu, and select 'Remove'.",
    category: "products"
  },
  {
    question: "How do I contact customer support?",
    answer: "You can contact our support team via email at support@fuelfriendly.com, by phone at 1-800-FUEL-HELP (1-800-383-5435), or by using the live chat feature in the Help & Support section.",
    category: "support"
  }
];

const SupportHelp: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [activeTab, setActiveTab] = useState('faqs');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter FAQs based on search query and category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? faq.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!contactFormData.name || !contactFormData.email || !contactFormData.message) {
=======

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronRight, Search, MessageCircle, Phone, Mail, ExternalLink, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const faqCategories = [
  {
    id: 'general',
    title: 'General Questions',
    questions: [
      {
        id: 'q1',
        question: 'How do I update my station information?',
        answer: 'You can update your station information by navigating to the Station Management page from the sidebar menu. There, you can edit details like your address, operating hours, available services, and contact information.'
      },
      {
        id: 'q2',
        question: 'Can I change my subscription plan?',
        answer: 'Yes, you can change your subscription plan at any time. Go to Settings > Subscription to view available plans and make changes. Changes to your subscription will be effective from the next billing cycle.'
      },
      {
        id: 'q3',
        question: 'How do I add new team members to my account?',
        answer: 'To add new team members, go to Settings > Team Members > Add New Member. You can set different permission levels for each team member based on their role in your organization.'
      }
    ]
  },
  {
    id: 'products',
    title: 'Products & Inventory',
    questions: [
      {
        id: 'q4',
        question: 'How do I update fuel prices?',
        answer: 'You can update fuel prices in the Products Management section. Changes will immediately be reflected in the customer app and on your station page.'
      },
      {
        id: 'q5',
        question: 'Can I set different prices for different times of day?',
        answer: 'Yes, our system supports dynamic pricing. In the Products Management section, you can set up price schedules for different times of day or days of the week.'
      },
      {
        id: 'q6',
        question: 'How do I receive low inventory alerts?',
        answer: 'Low inventory alerts are automatically enabled for all fuel types. You can customize the threshold levels in Settings > Notifications > Inventory Alerts.'
      }
    ]
  },
  {
    id: 'orders',
    title: 'Orders & Transactions',
    questions: [
      {
        id: 'q7',
        question: 'How do I process a refund?',
        answer: 'To process a refund, find the order in your Orders Management page, click on the specific order, and select the "Issue Refund" option. You can issue full or partial refunds as needed.'
      },
      {
        id: 'q8',
        question: 'Can I export my transaction history?',
        answer: 'Yes, you can export your transaction history in the Reports section. We offer exports in CSV, Excel, and PDF formats for your convenience.'
      },
      {
        id: 'q9',
        question: "What should I do if a customer's payment fails?",
        answer: 'If a payment fails, the system will automatically notify the customer. You can also manually reach out to them through the messaging system. Failed payments are marked in the Orders section for your reference.'
      }
    ]
  }
];

const SupportHelp = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewTicketDialog, setShowNewTicketDialog] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });
  const [tickets, setTickets] = useState([]);

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery.trim() === ''
    ? faqCategories
    : faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(q =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0);

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!newTicket.subject || !newTicket.category || !newTicket.description) {
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
        duration: 3000,
      });
<<<<<<< HEAD
      return;
    }
    
    // Simulate form submission
    toast({
      title: "Message Sent",
      description: "Your support request has been submitted. We'll get back to you soon.",
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

  const toggleFAQ = (question: string) => {
    setExpandedFAQ(expandedFAQ === question ? null : question);
  };

  // Fix for the sidebar issue - ensure no z-index or overlay issues
  return (
    <DashboardLayout title="Help & Support">
      <div className="p-6 relative" style={{ zIndex: 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold">Help & Support Center</h2>
          <p className="text-gray-500">Find answers to common questions or contact our support team</p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="faqs" className="flex items-center">
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQs
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Us
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Resources
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <TabsContent value="faqs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions about using the FuelFriendly platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search FAQs..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedCategory === null ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All
                  </Button>
                  <Button 
                    variant={selectedCategory === "account" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedCategory("account")}
                  >
                    Account
                  </Button>
                  <Button 
                    variant={selectedCategory === "billing" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedCategory("billing")}
                  >
                    Billing
                  </Button>
                  <Button 
                    variant={selectedCategory === "pricing" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedCategory("pricing")}
                  >
                    Pricing
                  </Button>
                  <Button 
                    variant={selectedCategory === "products" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedCategory("products")}
                  >
                    Products
                  </Button>
                  <Button 
                    variant={selectedCategory === "customers" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedCategory("customers")}
                  >
                    Customers
                  </Button>
                  <Button 
                    variant={selectedCategory === "reports" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedCategory("reports")}
                  >
                    Reports
                  </Button>
                  <Button 
                    variant={selectedCategory === "support" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedCategory("support")}
                  >
                    Support
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg overflow-hidden"
                    >
                      <div 
                        className={`p-4 flex justify-between items-center cursor-pointer ${expandedFAQ === faq.question ? 'bg-gray-50' : 'bg-white'}`}
                        onClick={() => toggleFAQ(faq.question)}
                      >
                        <h3 className="font-medium">{faq.question}</h3>
                        {expandedFAQ === faq.question ? (
                          <ChevronUp size={20} className="text-gray-500" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-500" />
                        )}
                      </div>
                      {expandedFAQ === faq.question && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="p-4 border-t bg-gray-50"
                        >
                          <p className="text-gray-600">{faq.answer}</p>
                        </motion.div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <HelpCircle size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No FAQs Found</h3>
                    <p className="text-gray-500 mb-4">
                      We couldn't find any FAQs matching your search criteria.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory(null);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Get in touch with our support team for personalized assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <form onSubmit={handleSubmitContactForm} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name *</label>
                      <Input 
                        name="name" 
                        value={contactFormData.name} 
                        onChange={handleContactFormChange} 
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <Input 
                        name="email" 
                        type="email" 
                        value={contactFormData.email} 
                        onChange={handleContactFormChange} 
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Subject</label>
                      <Input 
                        name="subject" 
                        value={contactFormData.subject} 
                        onChange={handleContactFormChange} 
                        placeholder="What is your inquiry about?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Message *</label>
                      <Textarea 
                        name="message" 
                        value={contactFormData.message} 
                        onChange={handleContactFormChange} 
                        placeholder="Please describe your issue or question in detail"
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Other Ways to Reach Us</h3>
                    <p className="text-gray-500 mb-4">
                      Choose the method that works best for you
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Phone Support</h4>
                        <p className="text-gray-500 mb-1">Available 24/7 for urgent issues</p>
                        <a href="tel:1-800-383-5435" className="text-green-600 hover:underline">
                          1-800-FUEL-HELP (1-800-383-5435)
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <Mail className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email Support</h4>
                        <p className="text-gray-500 mb-1">Response within 24 hours</p>
                        <a href="mailto:support@fuelfriendly.com" className="text-green-600 hover:underline">
                          support@fuelfriendly.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Live Chat</h4>
                        <p className="text-gray-500 mb-1">Available Monday-Friday, 9am-6pm EST</p>
                        <Button variant="outline" size="sm" className="mt-1">
                          Start Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resources & Documentation</CardTitle>
              <CardDescription>
                Helpful guides, tutorials, and documentation to help you get the most out of FuelFriendly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Getting Started Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-500">
                      A comprehensive guide to setting up your station and understanding the dashboard
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => window.open('#', '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Guide
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Video Tutorials</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-500">
                      Step-by-step video guides for all features of the FuelFriendly platform
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => window.open('#', '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Watch Videos
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">API Documentation</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-500">
                      Technical documentation for developers integrating with our API
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => window.open('#', '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Docs
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-500">
                      Tips and strategies to maximize your station's performance
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => window.open('#', '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Release Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-500">
                      Stay updated with the latest features and improvements
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => window.open('#', '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Updates
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Community Forum</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-500">
                      Connect with other station owners and share experiences
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => window.open('#', '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Join Forum
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
=======
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Create a new ticket object
      const ticket = {
        id: Date.now().toString(),
        ...newTicket,
        status: 'open',
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString()
      };

      // Add to tickets list
      setTickets([ticket, ...tickets]);

      // Reset form
      setNewTicket({
        subject: '',
        category: '',
        priority: 'medium',
        description: ''
      });

      setLoading(false);
      setShowNewTicketDialog(false);

      toast({
        title: "Support Ticket Submitted",
        description: "We'll get back to you within 24 hours",
        duration: 3000,
      });
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewTicket(prev => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout title="Help & Support">
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-4">How can we help you today?</h1>
          <p className="text-green-50 mb-6">Search our knowledge base for answers or reach out to our support team</p>

          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for answers..."
              className="pl-10 bg-white text-black h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="mb-6 w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-4 text-lg text-gray-500">No results found</p>
                <p className="text-gray-400">Try searching with different keywords</p>
                <Button
                  className="mt-4"
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredFAQs.map((category) => (
                  <div key={category.id}>
                    <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
                    <Accordion type="single" collapsible className="bg-white rounded-lg border">
                      {category.questions.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                          <AccordionTrigger className="px-4 hover:no-underline">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <p className="text-gray-600">{item.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mb-2">
                    <MessageCircle className="text-green-600" size={24} />
                  </div>
                  <CardTitle>Chat Support</CardTitle>
                  <CardDescription>Chat with our support team in real-time</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-500 mb-4">Average response time: 5 minutes</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => {
                    toast({
                      title: "Chat Initiated",
                      description: "Connecting you with a support agent...",
                      duration: 3000,
                    });
                  }}>
                    Start Chat
                    <ChevronRight className="ml-2" size={16} />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-2">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <CardTitle>Phone Support</CardTitle>
                  <CardDescription>Speak directly with our support team</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-500 mb-4">Available Mon-Fri, 9am-6pm</p>
                  <p className="font-medium">+1 (800) 123-4567</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => {
                    toast({
                      title: "Phone Support",
                      description: "Calling support line...",
                      duration: 3000,
                    });
                  }}>
                    Call Now
                    <ChevronRight className="ml-2" size={16} />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full mb-2">
                    <Mail className="text-purple-600" size={24} />
                  </div>
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>Submit a detailed support ticket</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitTicket} className="space-y-3">
                    <div>
                      <Input placeholder="Subject" className="mb-2" />
                      <textarea
                        className="w-full rounded-md border-gray-300 p-3 min-h-[100px] border"
                        placeholder="Describe your issue..."
                      ></textarea>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleSubmitTicket} disabled={loading}>
                    {loading ? "Submitting..." : "Submit Ticket"}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Additional Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Documentation",
                      description: "Opening documentation in a new tab",
                      duration: 2000,
                    });
                  }}
                >
                  <ExternalLink className="mr-3 text-gray-500" size={20} />
                  <div>
                    <h4 className="font-medium">Documentation</h4>
                    <p className="text-sm text-gray-500">Detailed guides and tutorials</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center p-3 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Video Tutorials",
                      description: "Opening video tutorials in a new tab",
                      duration: 2000,
                    });
                  }}
                >
                  <ExternalLink className="mr-3 text-gray-500" size={20} />
                  <div>
                    <h4 className="font-medium">Video Tutorials</h4>
                    <p className="text-sm text-gray-500">Visual guides for common tasks</p>
                  </div>
                </a>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tickets">
            <div className="bg-white rounded-lg border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">My Support Tickets</h2>
                <Dialog open={showNewTicketDialog} onOpenChange={setShowNewTicketDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-500 hover:bg-green-600">
                      <Plus className="mr-2 h-4 w-4" /> Create a New Ticket
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Create New Support Ticket</DialogTitle>
                      <DialogDescription>
                        Fill out the form below to submit a new support ticket. Our team will respond within 24 hours.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitTicket}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="subject" className="text-right">
                            Subject
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={newTicket.subject}
                            onChange={handleInputChange}
                            className="col-span-3"
                            placeholder="Brief description of your issue"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="category" className="text-right">
                            Category
                          </Label>
                          <div className="col-span-3">
                            <Select
                              value={newTicket.category}
                              onValueChange={(value) => handleSelectChange('category', value)}
                            >
                              <SelectTrigger id="category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="technical">Technical Issue</SelectItem>
                                <SelectItem value="billing">Billing & Payments</SelectItem>
                                <SelectItem value="account">Account Management</SelectItem>
                                <SelectItem value="feature">Feature Request</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="priority" className="text-right">
                            Priority
                          </Label>
                          <div className="col-span-3">
                            <Select
                              value={newTicket.priority}
                              onValueChange={(value) => handleSelectChange('priority', value)}
                            >
                              <SelectTrigger id="priority">
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="description" className="text-right pt-2">
                            Description
                          </Label>
                          <div className="col-span-3">
                            <textarea
                              id="description"
                              name="description"
                              value={newTicket.description}
                              onChange={handleInputChange}
                              className="w-full rounded-md border border-gray-300 p-3 min-h-[120px]"
                              placeholder="Please provide details about your issue..."
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setShowNewTicketDialog(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-green-500 hover:bg-green-600" disabled={loading}>
                          {loading ? "Submitting..." : "Submit Ticket"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {tickets.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-4 text-lg text-gray-500">No support tickets found</p>
                  <p className="text-gray-400 mb-6">Your submitted support tickets will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{ticket.subject}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {ticket.description.length > 100
                              ? `${ticket.description.substring(0, 100)}...`
                              : ticket.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            ticket.status === 'open'
                              ? 'bg-green-100 text-green-800'
                              : ticket.status === 'in-progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {ticket.status === 'open'
                              ? 'Open'
                              : ticket.status === 'in-progress'
                              ? 'In Progress'
                              : 'Closed'}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">Created: {ticket.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-3 border-t">
                        <div className="flex space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            ticket.priority === 'low'
                              ? 'bg-gray-100 text-gray-800'
                              : ticket.priority === 'medium'
                              ? 'bg-blue-100 text-blue-800'
                              : ticket.priority === 'high'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                            {ticket.category === 'technical'
                              ? 'Technical Issue'
                              : ticket.category === 'billing'
                              ? 'Billing & Payments'
                              : ticket.category === 'account'
                              ? 'Account Management'
                              : ticket.category === 'feature'
                              ? 'Feature Request'
                              : 'Other'}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => {
                            toast({
                              title: "Viewing Ticket",
                              description: `Viewing details for ticket #${ticket.id}`,
                              duration: 2000,
                            });
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
      </div>
    </DashboardLayout>
  );
};

export default SupportHelp;
