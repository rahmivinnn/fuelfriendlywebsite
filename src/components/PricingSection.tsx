
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';

const PricingSection = () => {
  const { toast } = useToast();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [selectedPlan, setSelectedPlan] = useState(null);

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

  const handlePaymentClick = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentDialog(true);
  };

  const handlePaymentSubmit = () => {
    // Simulate payment processing
    toast({
      title: "Processing Payment",
      description: "Please wait while we process your payment...",
      duration: 2000,
    });

    setTimeout(() => {
      setPaymentSuccess(true);
      toast({
        title: "Payment Successful",
        description: `You have successfully subscribed to the ${selectedPlan?.name}!`,
        duration: 3000,
      });
    }, 1500);
  };

  return (
    <section className="py-12 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl dark:text-white">
              Choose the Perfect Plan for Your Fuel Station
            </h2>
            <p className="text-gray-500 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Select a plan that fits your needs and budget
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`pricing-card flex flex-col justify-between p-6 rounded-lg shadow-sm ${
                plan.highlighted
                  ? "border-primary bg-primary/5 dark:bg-primary/10 relative"
                  : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              }`}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2, type: "spring", stiffness: 100 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {plan.highlighted && (
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  Most Popular
                </motion.div>
              )}
              <div>
                <h3 className="text-xl font-bold dark:text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold dark:text-white">{plan.price}</span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">/{plan.period}</span>
                </div>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary dark:text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className={`mt-8 ${
                  plan.highlighted
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "bg-white dark:bg-gray-700 text-primary dark:text-primary border border-primary dark:border-primary hover:bg-primary/5 dark:hover:bg-primary/20"
                }`}
                onClick={() => handlePaymentClick(plan)}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Subscribe to {selectedPlan?.name}</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Complete your subscription by adding a payment method.
            </DialogDescription>
          </DialogHeader>

          {!paymentSuccess ? (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium dark:text-white">Select Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                      paymentMethod === 'credit'
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-500 dark:border-green-600'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600'
                    }`}
                    onClick={() => setPaymentMethod('credit')}
                  >
                    <span className="dark:text-white">Credit Card</span>
                  </div>
                  <div
                    className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                      paymentMethod === 'debit'
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-500 dark:border-green-600'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600'
                    }`}
                    onClick={() => setPaymentMethod('debit')}
                  >
                    <span className="dark:text-white">Debit Card</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="cardNumber" className="text-sm dark:text-white">Card Number</label>
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="expiry" className="text-sm dark:text-white">Expiry Date</label>
                  <input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="cvc" className="text-sm dark:text-white">CVC</label>
                  <input
                    id="cvc"
                    type="text"
                    placeholder="123"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setShowPaymentDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                  onClick={handlePaymentSubmit}
                >
                  Pay Now
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-center dark:text-white">Payment Successful!</h3>
              <p className="text-center text-gray-500 dark:text-gray-300 mt-2">
                You have successfully subscribed to {selectedPlan?.name}. You can now enjoy all the features.
              </p>
              <Button
                className="mt-6 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                onClick={() => {
                  setShowPaymentDialog(false);
                  setPaymentSuccess(false);
                }}
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PricingSection;
