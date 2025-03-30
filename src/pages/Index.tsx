
import React, { useEffect } from 'react';
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
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Show welcome toast when the page loads
    setTimeout(() => {
      toast({
        title: "Welcome to FuelFriendly!",
        description: "Discover the smartest way to find and purchase fuel.",
        duration: 5000,
      });
    }, 1500);
  }, [toast]);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main>
        <HeroSection />
        <HowItWorks />
        <Features />
        <AppShowcase />
        <BusinessSection />
        <MapSection />
        <PricingSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
