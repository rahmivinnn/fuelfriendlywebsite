
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
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
        duration: 3000,
      });
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
      </div>
    </DashboardLayout>
  );
};

export default SupportHelp;
