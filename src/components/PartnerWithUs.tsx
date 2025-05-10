import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Car,
  Truck,
  DollarSign,
  Clock,
  Calendar,
  CheckCircle2,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import ContractorAgreement from './ContractorAgreement';

const PartnerWithUs = () => {
  const { toast } = useToast();
  const [showPartnerDialog, setShowPartnerDialog] = useState(false);
  const [showAgreementDialog, setShowAgreementDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("benefits");
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    vehicleType: '',
    experience: '',
    message: '',
    cv: null as File | null,
    agreeToTerms: false
  });

  const handlePartnerClick = () => {
    setShowPartnerDialog(true);
  };

  const handleViewAgreement = () => {
    setShowAgreementDialog(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!formData.cv) {
      toast({
        title: "CV Required",
        description: "Please upload your CV",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Agreement Required",
        description: "You must agree to the terms and conditions to continue",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Application Submitted",
      description: "Thank you for your interest! We'll be in touch soon.",
      duration: 3000,
    });

    setShowPartnerDialog(false);

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      vehicleType: '',
      experience: '',
      message: '',
      agreeToTerms: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;

      if (file && !file.type.match('application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or Word document",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      setFormData(prev => ({
        ...prev,
        cv: file
      }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      agreeToTerms: checked
    }));
  };

  const toggleSection = (sectionIndex: number) => {
    setExpandedSections(prev =>
      prev.includes(sectionIndex)
        ? prev.filter(i => i !== sectionIndex)
        : [...prev, sectionIndex]
    );
  };

  const benefits = [
    {
      title: "Flexible Schedule",
      description: "Work when you want, where you want. Set your own hours and be your own boss.",
      icon: <Clock className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Competitive Earnings",
      description: "Earn competitive rates with opportunities for bonuses and incentives.",
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Weekly Payments",
      description: "Get paid weekly with direct deposit to your bank account.",
      icon: <Calendar className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Use Your Own Vehicle",
      description: "No special vehicle requirements. Use your car, truck, or SUV.",
      icon: <Car className="h-5 w-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const requirements = [
    "Valid driver's license",
    "Vehicle insurance",
    "Smartphone with data plan",
    "Clean driving record",
    "Background check approval",
    "21 years or older",
    "Ability to lift up to 30 pounds"
  ];

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Partner With Us</h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-3xl mx-auto">
              Join our team of Fuel Friends and help us revolutionize the fuel delivery industry while earning competitive pay on your own schedule.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                Partner Benefits
              </h3>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex">
                    <div className={`p-2 rounded-full ${benefit.bgColor} mr-3 flex-shrink-0`}>
                      <div className={benefit.color}>{benefit.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Requirements</h3>
              <ul className="space-y-2">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to Join?</h3>
              <p className="text-gray-600 mb-6">
                Become a Fuel Friend today and start earning on your own schedule while providing an essential service to your community.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Deliver Fuel & Convenience</h4>
                    <p className="text-sm text-gray-600">Help customers get fuel and convenience store items delivered right to their location.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Earn More</h4>
                    <p className="text-sm text-gray-600">Competitive base pay plus tips and incentives for top performers.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Simple Onboarding</h4>
                    <p className="text-sm text-gray-600">Easy application process with quick approval for qualified applicants.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-6 text-lg"
                  onClick={handlePartnerClick}
                >
                  Become a Fuel Friend
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  className="w-full border-green-200 text-green-700 hover:bg-green-50"
                  onClick={handleViewAgreement}
                >
                  View Partner Agreement
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Partner Application Dialog */}
      <Dialog open={showPartnerDialog} onOpenChange={setShowPartnerDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Partner Application</DialogTitle>
            <DialogDescription>
              Fill out the form below to apply as a Fuel Friend partner.
            </DialogDescription>
          </DialogHeader>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 py-4"
            encType="multipart/form-data"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="cv">CV/Resume</Label>
                <Input
                  type="file"
                  id="cv"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleInputChange}
                  className="cursor-pointer"
                  required
                />
                <p className="text-xs text-gray-500">Upload your CV (PDF or Word, max 5MB)</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value="">Select Vehicle Type</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
                <option value="van">Van</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Delivery Experience</Label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value="">Select Experience Level</option>
                <option value="none">No Experience</option>
                <option value="less-than-1">Less than 1 year</option>
                <option value="1-3">1-3 years</option>
                <option value="3+">3+ years</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Information</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us why you'd like to partner with us"
              />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="agreeToTerms" className="text-sm">
                I agree to the <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    handleViewAgreement();
                  }}
                >
                  Independent Contractor Agreement
                </button>
              </Label>
            </div>

            <DialogFooter>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                  Submit Application
                </Button>
              </motion.div>
            </DialogFooter>
          </motion.form>
        </DialogContent>
      </Dialog>

      {/* Contractor Agreement Dialog */}
      <ContractorAgreement
        open={showAgreementDialog}
        onOpenChange={setShowAgreementDialog}
      />
    </section>
  );
};

export default PartnerWithUs;
