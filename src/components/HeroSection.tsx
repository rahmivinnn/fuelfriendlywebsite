
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Check } from 'lucide-react';

const HeroSection = () => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const handlePaymentSubmit = () => {
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 1500);
  };

  return (
    <section className="py-12 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div 
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                The Best Way To Fuel - Anytime, Anywhere!
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The ultimate solution for modern fuel needs. Find and order fuel, schedule deliveries, and pay with ease - all from one convenient app.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-base" onClick={() => setShowPaymentDialog(true)}>
                  Register Station
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="border-gray-200">
                  Download App for iOS
                </Button>
              </motion.div>
            </div>
            <p className="text-xs text-gray-500">
              Downloaded by over 100,000 users
            </p>
          </motion.div>
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-[32px] blur-xl opacity-30"></div>
              <motion.div 
                className="relative w-[300px] h-[600px] md:w-[320px] md:h-[640px]"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <img
                  src="/lovable-uploads/7b1b63ff-133e-4806-a870-d769ebf3fd94.png"
                  alt="FuelFriendly App Preview with Map"
                  className="object-contain w-full h-full rounded-2xl shadow-xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="container px-4 md:px-6 mt-12">
        <motion.div 
          className="grid grid-cols-3 gap-12 md:gap-24 justify-center items-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div 
            className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          >
            <h3 className="text-lg font-medium">Shell</h3>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          >
            <h3 className="text-lg font-medium">Memphis Gas</h3>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          >
            <h3 className="text-lg font-medium">BP</h3>
          </motion.div>
        </motion.div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register Your Station</DialogTitle>
            <DialogDescription>
              Complete your registration by adding a payment method.
            </DialogDescription>
          </DialogHeader>
          
          {!paymentSuccess ? (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Select Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div 
                    className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${paymentMethod === 'credit' ? 'bg-green-50 border-green-500' : 'hover:bg-gray-50'}`}
                    onClick={() => setPaymentMethod('credit')}
                  >
                    <span>Credit Card</span>
                  </div>
                  <div 
                    className={`flex items-center justify-center p-3 border rounded-md cursor-pointer ${paymentMethod === 'debit' ? 'bg-green-50 border-green-500' : 'hover:bg-gray-50'}`}
                    onClick={() => setPaymentMethod('debit')}
                  >
                    <span>Debit Card</span>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="cardNumber" className="text-sm">Card Number</label>
                <input 
                  id="cardNumber" 
                  type="text" 
                  placeholder="1234 5678 9012 3456" 
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="expiry" className="text-sm">Expiry Date</label>
                  <input 
                    id="expiry" 
                    type="text" 
                    placeholder="MM/YY" 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="cvc" className="text-sm">CVC</label>
                  <input 
                    id="cvc" 
                    type="text" 
                    placeholder="123" 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-green-500 hover:bg-green-600" onClick={handlePaymentSubmit}>
                  Pay Now
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-center">Payment Successful!</h3>
              <p className="text-center text-gray-500 mt-2">
                Your station has been registered successfully. You can now manage your station from the dashboard.
              </p>
              <Button 
                className="mt-6 bg-green-500 hover:bg-green-600" 
                onClick={() => {
                  setShowPaymentDialog(false);
                  setPaymentSuccess(false);
                }}
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
