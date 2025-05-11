
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import AppShowcase from '@/components/AppShowcase';
import BusinessSection from '@/components/BusinessSection';
import MapSection from '@/components/MapSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';

import PerfectPlan from '@/components/PerfectPlan';
import Footer from '@/components/Footer';
import WhyItWorks from '@/components/WhyItWorks';
import PartnerWithUs from '@/components/PartnerWithUs';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [showAppStoreDialog, setShowAppStoreDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);

  // Simulating real-time data loading
  useEffect(() => {
    const loadData = setTimeout(() => {
      setIsLoading(false);

      // Show welcome toast when the page loads
      toast({
        title: "Welcome to FuelFriendly!",
        description: "Discover the smartest way to find and purchase fuel.",
        duration: 5000,
      });

      // Simulate real-time updates
      const interval = setInterval(() => {
        const messages = [
          "New fuel station added in your area!",
          "Gas prices updated in real-time",
          "Special discount available now!",
          "New feature: Schedule recurring deliveries"
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        toast({
          title: "Real-time Update",
          description: randomMessage,
          duration: 3000,
        });
      }, 45000); // Show a random update every 45 seconds

      return () => clearInterval(interval);
    }, 1000); // Reduced from 1500 to 1000

    return () => clearTimeout(loadData);
  }, [toast]);

  const handleAppStoreClick = () => {
    setShowAppStoreDialog(true);
  };

  const handleContactClick = () => {
    setShowContactDialog(true);
  };

  return (
    <motion.div
      className="flex min-h-screen flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }} // Faster animation
    >
      <NavBar />
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="space-y-4 text-center">
            <motion.div
              className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p className="text-gray-500">Loading FuelFriendly experience...</p>
          </div>
        </div>
      ) : (
        <main>
          <HeroSection />
          <div id="how-it-works">
            <HowItWorks />
          </div>
          <div id="why-it-works">
            <WhyItWorks />
          </div>
          <Features />
          <div id="app">
            <AppShowcase handleAppStoreClick={handleAppStoreClick} />
          </div>
          <BusinessSection />
          <MapSection />
          <PricingSection />
          <TestimonialsSection />
          <div id="partner-with-us">
            <PartnerWithUs />
          </div>
          <PerfectPlan />
          <CtaSection />
        </main>
      )}
      <Footer />

      {/* App Store Dialog */}
      <Dialog open={showAppStoreDialog} onOpenChange={setShowAppStoreDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Our Mobile App</DialogTitle>
            <DialogDescription>
              Get the FuelFriendly experience on your mobile device
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors cursor-pointer">
              <svg className="w-16 h-16 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5689 12.9203C17.5497 10.1443 19.8283 8.79465 19.9124 8.74006C18.6135 6.84407 16.6012 6.58714 15.8758 6.56358C14.1517 6.38391 12.4795 7.57982 11.6047 7.57982C10.7298 7.57982 9.35361 6.58358 7.88884 6.61893C5.99285 6.65427 4.22354 7.76304 3.23909 9.49783C1.21902 13.0259 2.73612 18.2392 4.6793 21.0388C5.65196 22.4042 6.78429 23.9213 8.26085 23.859C9.70205 23.7967 10.2304 22.9139 11.9427 22.9139C13.6549 22.9139 14.1478 23.859 15.6601 23.8237C17.2077 23.7967 18.1803 22.4454 19.1295 21.0682C20.2382 19.5088 20.6974 17.9801 20.7209 17.9095C20.6739 17.8918 17.5924 16.721 17.5689 12.9203Z" />
                <path d="M14.9694 4.28149C15.7772 3.28525 16.3173 1.91084 16.1612 0.523438C14.9929 0.570522 13.5753 1.32232 12.7557 2.29498C12.0186 3.16162 11.3758 4.56773 11.5554 5.93035C12.8779 6.01852 14.1381 5.27731 14.9694 4.28149Z" />
              </svg>
              <h4 className="font-medium">iOS App</h4>
              <p className="text-sm text-gray-500 mt-1">Download on the App Store</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors cursor-pointer">
              <svg className="w-16 h-16 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.60481 21.5988L12.0586 13.145L3.60481 4.69133L3.60481 21.5988Z" />
                <path d="M14.2851 15.3716L5.83139 23.8253C5.83139 23.8253 6.14563 23.8253 6.54695 23.8253C7.56231 23.8253 8.96854 23.5111 10.3748 22.6373L21.2972 16.3891L14.2851 15.3716Z" />
                <path d="M21.2984 7.88899L14.2863 6.87152L5.83261 15.3253C5.83261 15.3253 9.98037 23.0962 10.376 22.6385C10.7716 22.1809 21.2984 7.88899 21.2984 7.88899Z" />
                <path d="M5.83236 0.454578C5.83236 0.454578 5.1905 0.0532505 3.93337 0.908025C2.67625 1.7628 2.83215 3.35418 2.83215 3.35418L12.0586 12.5807L14.2847 10.3546L5.83236 0.454578Z" />
              </svg>
              <h4 className="font-medium">Android App</h4>
              <p className="text-sm text-gray-500 mt-1">Get it on Google Play</p>
            </div>
          </div>

          <div className="py-4 text-center">
            <h4 className="font-medium mb-2">Scan QR Code</h4>
            <div className="bg-gray-800 inline-block p-2 rounded-lg">
              <div className="bg-white p-4 rounded">
                <div className="w-36 h-36 mx-auto bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzAgMzMwIj48cGF0aCBkPSJNMCAwaDMzMHYzMzBIMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTYwIDMwaDMwdjMwSDYwek05MCAzMGgzMHYzMEg5MHpNMTIwIDMwaDMwdjMwaC0zMHpNMTUwIDMwaDMwdjMwaC0zMHpNMTgwIDMwaDMwdjMwaC0zMHpNMjEwIDMwaDMwdjMwaC0zMHpNMjcwIDMwaDMwdjMwaC0zMHpNMzAgNjBoMzB2MzBIMzB6TTIxMCA2MGgzMHYzMGgtMzB6TTI3MCA2MGgzMHYzMGgtMzB6TTMwIDkwaDMwdjMwSDMwek05MCA5MGgzMHYzMEg5MHpNMTIwIDkwaDMwdjMwaC0zMHpNMTUwIDkwaDMwdjMwaC0zMHpNMjEwIDkwaDMwdjMwaC0zMHpNMjcwIDkwaDMwdjMwaC0zMHpNMzAgMTIwaDMwdjMwSDMwek02MCAxMjBoMzB2MzBINjB6TTkwIDEyMGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTE1MCAxMjBoMzB2MzBoLTMwek0xODAgMTIwaDMwdjMwaC0zMHpNMjEwIDEyMGgzMHYzMGgtMzB6TTI0MCAxMjBoMzB2MzBoLTMwek0yNzAgMTIwaDMwdjMwaC0zMHpNMzAgMTUwaDMwdjMwSDMwek0yNzAgMTUwaDMwdjMwaC0zMHpNMzAgMTgwaDMwdjMwSDMwek05MCAxODBoMzB2MzBIOTB6TTEyMCAxODBoMzB2MzBoLTMwek0xNTAgMTgwaDMwdjMwaC0zMHpNMTgwIDE4MGgzMHYzMGgtMzB6TTI3MCAxODBoMzB2MzBoLTMwek0zMCAyMTBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg2MHpNOTAgMjEwaDMwdjMwSDkwek0xMjAgMjEwaDMwdjMwaC0zMHpNMTUwIDIxMGgzMHYzMGgtMzB6TTE4MCAyMTBoMzB2MzBoLTMwek0yMTAgMjEwaDMwdjMwaC0zMHpNMjQwIDIxMGgzMHYzMGgtMzB6TTI3MCAyMTBoMzB2MzBoLTMwek0zMCAyNDBoMzB2MzBIMzB6TTYwIDI0MGgzMHYzMEg2MHpNOTAgMjQwaDMwdjMwSDkwek0xMjAgMjQwaDMwdjMwaC0zMHpNMTUwIDI0MGgzMHYzMGgtMzB6TTE4MCAyNDBoMzB2MzBoLTMwek0yMTAgMjQwaDMwdjMwaC0zMHpNMjQwIDI0MGgzMHYzMGgtMzB6TTI3MCAyNDBoMzB2MzBoLTMwek0zMCAyNzBoMzB2MzBIMzB6TTYwIDI3MGgzMHYzMEg2MHpNOTAgMjcwaDMwdjMwSDkwek0xMjAgMjcwaDMwdjMwaC0zMHpNMTUwIDI3MGgzMHYzMGgtMzB6TTE4MCAyNzBoMzB2MzBoLTMwek0yMTAgMjcwaDMwdjMwaC0zMHpNMjQwIDI3MGgzMHYzMGgtMzB6TTI3MCAyNzBoMzB2MzBoLTMweiIvPjwvc3ZnPg==')] bg-center bg-contain"></div>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-center">
            <Button
              variant="outline"
              onClick={() => setShowAppStoreDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Us Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact FuelFriendly</DialogTitle>
            <DialogDescription>
              Have questions or feedback? We'd love to hear from you!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Customer Support</h4>
              <p className="text-sm text-gray-500">
                Email: support@fuelfriendly.com<br />
                Phone: 1-800-FUEL-123<br />
                Hours: 24/7 Support
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Business Inquiries</h4>
              <p className="text-sm text-gray-500">
                Email: hellofuel@com<br />
                Phone: 1-888-FUEL-BIZ<br />
                Hours: Monday - Friday, 9am - 5pm EST
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Station Registration</h4>
              <p className="text-sm text-gray-500">
                For fuel station owners looking to register their stations on our platform.
              </p>
              <Button
                asChild
                className="w-full bg-green-500 hover:bg-green-600 mt-2"
              >
                <Link to="/station-registration">Register Your Station</Link>
              </Button>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              variant="outline"
              onClick={() => setShowContactDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Index;
