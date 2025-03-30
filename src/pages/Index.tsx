
import React from 'react';
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

const Index = () => {
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
