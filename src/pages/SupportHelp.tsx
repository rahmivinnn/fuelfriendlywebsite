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
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
        duration: 3000,
      });
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
      </div>
    </DashboardLayout>
  );
};

export default SupportHelp;
