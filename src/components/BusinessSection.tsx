
import React from 'react';
import { Button } from '@/components/ui/button';

const BusinessSection = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative w-full max-w-[500px] rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800"
                alt="Business Analytics Dashboard"
                className="object-cover w-full"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Grow Your Fuel Business with Digital Convenience!
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our network of fuel providers and unlock new revenue streams. Our platform makes it easy to reach more customers, streamline operations, and boost profits.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Partner With Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
