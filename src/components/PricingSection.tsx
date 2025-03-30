
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Basic Plan",
      price: "$0",
      period: "free",
      description: "Perfect for occasional users",
      features: [
        "Find nearby stations",
        "Basic price tracking",
        "Mobile payments",
        "Limited support"
      ],
      buttonText: "Sign Up For Free",
      highlighted: false
    },
    {
      name: "Pro Plan",
      price: "$25",
      period: "per month",
      description: "Ideal for regular commuters",
      features: [
        "All basic features",
        "Priority fuel access",
        "24/7 customer support",
        "Price alerts & notifications",
        "Scheduled deliveries",
        "Route planning",
        "Expense tracking",
        "Monthly reports"
      ],
      buttonText: "Start Pro Trial",
      highlighted: true
    },
    {
      name: "Enterprise Plan",
      price: "$100",
      period: "per month",
      description: "Perfect for businesses",
      features: [
        "All Pro features",
        "Multiple vehicles",
        "Team management",
        "Expense reporting",
        "API access"
      ],
      buttonText: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Choose the Perfect Plan for Your Fuel Station
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Select a plan that fits your needs and budget
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card flex flex-col justify-between ${
                plan.highlighted 
                  ? "border-primary bg-primary/5 relative" 
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="ml-1 text-gray-500">/{plan.period}</span>
                </div>
                <p className="mt-2 text-gray-500 text-sm">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                className={`mt-8 ${
                  plan.highlighted 
                    ? "bg-primary hover:bg-primary/90 text-white" 
                    : "bg-white text-primary border border-primary hover:bg-primary/5"
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
