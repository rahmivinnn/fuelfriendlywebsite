
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Your Smart Fueling Solution - Anytime, Anywhere!
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The ultimate solution for modern fuel needs. Find and order fuel, schedule deliveries, and pay with ease - all from one convenient app.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base">
                Download Now
              </Button>
              <Button variant="outline" className="border-gray-200">
                View All Features
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Downloaded by over 100,000 users
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative w-[280px] h-[560px] md:w-[320px] md:h-[640px]">
                <img
                  src="/lovable-uploads/0b1492f3-7eb1-46e2-9bf5-c2ec23ca508f.png"
                  alt="FuelFriendly App Preview"
                  className="object-cover w-full h-full rounded-[32px] shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-4 md:px-6 mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 justify-center items-center">
          <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
            <h3 className="text-lg font-medium">Fuel Station</h3>
          </div>
          <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
            <h3 className="text-lg font-medium">Fuel Station</h3>
          </div>
          <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
            <h3 className="text-lg font-medium">Fuel Station</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
