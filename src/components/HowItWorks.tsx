
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Find a Nearby Station",
      description: "Use our interactive map to find the closest fuel stations to your current location.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" x2="12" y1="8" y2="12"/>
            <line x1="12" x2="15" y1="12" y2="15"/>
          </svg>
        </div>
      ),
    },
    {
      id: 2,
      title: "Pick-up Fuel & More",
      description: "Choose from a variety of fuel types and add convenience store items to your order.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
            <path d="M3 3h2l.5 5"/>
            <path d="M7 8h10l1 13H6L7 8Z"/>
            <path d="M10 12v4"/>
            <path d="M14 12v4"/>
          </svg>
        </div>
      ),
    },
    {
      id: 3,
      title: "Pay & Track Fuel Price",
      description: "Pay securely through the app and track real-time fuel price changes.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <rect width="20" height="14" x="2" y="5" rx="2"/>
            <line x1="2" x2="22" y1="10" y2="10"/>
          </svg>
        </div>
      ),
    },
    {
      id: 4,
      title: "Schedule Delivery",
      description: "Schedule deliveries to your location for maximum convenience.",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <rect width="18" height="18" x="3" y="4" rx="2"/>
            <line x1="16" x2="16" y1="2" y2="6"/>
            <line x1="8" x2="8" y1="2" y2="6"/>
            <line x1="3" x2="21" y1="10" y2="10"/>
          </svg>
        </div>
      ),
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Finding and paying for fuel has never been easier
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center space-y-4 text-center">
              {step.icon}
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
