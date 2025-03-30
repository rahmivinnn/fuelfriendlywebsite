
import React from 'react';
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  return (
    <section className="py-12 md:py-16 bg-primary text-white">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
          Register your station today for a better future in fuel business!
        </h2>
        <Button className="bg-white text-primary hover:bg-gray-100 mt-6">
          Register Station
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
