
import React from 'react';
import { Button } from '@/components/ui/button';

const Features = () => {
  const features = [
    {
      title: "Reliable & Secure",
      description: "Rely on our vetted network of fuel stations for consistent quality and secure transactions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
      ),
    },
    {
      title: "Fast & Convenient",
      description: "Skip the lines and simplify your refueling experience with our easy-to-use mobile app.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      title: "Real-Time Tracking",
      description: "Track your fuel deliveries in real-time and get notifications when your order is on the way.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 7.7c0 2.1-1.7 3.9-3.8 3.9-2 0-3.7-1.7-3.7-3.8 0-2.1 1.7-3.8 3.8-3.8 2 0 3.7 1.7 3.7 3.7z"/>
          <path d="M18.4 11.6L9.7 15l-1.1-5.5-5.4-1.1 3.4-8.8c0.2-0.5 0.8-0.7 1.3-0.5l11.3 4.4c0.5 0.2 0.7 0.8 0.5 1.3l-1.3 6.8z"/>
        </svg>
      ),
    },
    {
      title: "24/7 Road Assistance",
      description: "Get help whenever you need it with our 24/7 customer support and roadside assistance service.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4l2 2"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose Us?</h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We're dedicated to making fueling up as easy as possible.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="feature-card flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button className="bg-primary hover:bg-primary/90">Learn More</Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
