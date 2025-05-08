
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Features = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showFeatureDialog, setShowFeatureDialog] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  const handleLearnMore = () => {
    setShowFeatureDialog(true);

    toast({
      title: "Feature Details",
      description: "Explore our premium features in detail",
      duration: 3000,
    });
  };

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature);
    setShowFeatureDialog(true);

    toast({
      title: `${feature.title} Details`,
      description: "Exploring feature details",
      duration: 2000,
    });
  };

  const features = [
    {
      title: "Reliable & Secure",
      description: "Rely on our vetted network of fuel stations for consistent quality and secure transactions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
      ),
      color: "bg-blue-500/10",
      textColor: "text-blue-600",
    },
    {
      title: "Fast & Convenient",
      description: "Skip the lines and simplify your refueling experience with our easy-to-use mobile app.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      color: "bg-purple-500/10",
      textColor: "text-purple-600",
    },
    {
      title: "Real-Time Tracking",
      description: "Track your fuel deliveries in real-time and get notifications when your order is on the way.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      ),
      color: "bg-orange-500/10",
      textColor: "text-orange-600",
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
      color: "bg-green-500/10",
      textColor: "text-green-600",
    },
  ];

  // Additional feature details for the dialog
  const getFeatureDetails = (feature) => {
    const details = {
      "Reliable & Secure": {
        benefits: [
          "End-to-end encryption for all transactions",
          "Verified fuel stations with quality assurance",
          "Secure payment processing with fraud protection",
          "Real-time security monitoring and alerts"
        ],
        stats: {
          securityRating: "99.9%",
          transactionSuccess: "99.8%",
          userTrust: "4.9/5"
        }
      },
      "Fast & Convenient": {
        benefits: [
          "Skip lines with mobile ordering",
          "Pre-schedule fuel deliveries",
          "Save favorite stations and orders",
          "Quick reordering of previous purchases"
        ],
        stats: {
          timeReduction: "85%",
          convenienceRating: "4.8/5",
          userSatisfaction: "96%"
        }
      },
      "Real-Time Tracking": {
        benefits: [
          "Live GPS tracking of your fuel delivery",
          "Accurate ETA predictions",
          "Instant notifications on order status changes",
          "Track your Fuel Friend's location in real-time"
        ],
        stats: {
          trackingAccuracy: "98.5%",
          onTimeDelivery: "95%",
          userEngagement: "4.7/5"
        }
      },
      "24/7 Road Assistance": {
        benefits: [
          "Emergency fuel delivery anywhere, anytime",
          "Roadside assistance integration",
          "Priority service for subscribers",
          "Nationwide coverage with local partners"
        ],
        stats: {
          responseTime: "15 min avg",
          coverageArea: "98% of highways",
          customerSatisfaction: "4.9/5"
        }
      }
    };

    return details[feature?.title] || null;
  };

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose Us?</h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We're dedicated to making fueling up as easy as possible.
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card flex flex-col space-y-4 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 p-6 cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              onClick={() => handleFeatureClick(feature)}
            >
              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-50 to-green-50 opacity-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              />

              <div className="flex items-center space-x-4 relative z-10">
                <div className={`p-3 rounded-full ${feature.color}`}>
                  <div className={feature.textColor}>{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-gray-500 relative z-10">{feature.description}</p>

              {/* Learn more button that appears on hover */}
              <motion.div
                className="absolute bottom-4 right-4 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeatureClick(feature);
                  }}
                >
                  Learn more
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
              onClick={handleLearnMore}
            >
              Learn More About Features
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Feature Details Dialog */}
      <Dialog open={showFeatureDialog} onOpenChange={setShowFeatureDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {activeFeature && (
                <div className={`p-2 rounded-full ${activeFeature.color} mr-2`}>
                  <div className={activeFeature?.textColor}>{activeFeature?.icon}</div>
                </div>
              )}
              {activeFeature?.title || "Our Features"}
            </DialogTitle>
            <DialogDescription>
              {activeFeature?.description || "Discover what makes FuelFriendly the best choice for your fueling needs"}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {activeFeature ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Key Benefits</h4>
                  <ul className="space-y-2">
                    {getFeatureDetails(activeFeature)?.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Performance Metrics</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(getFeatureDetails(activeFeature)?.stats || {}).map(([key, value], index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-green-600">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1 text-blue-700">Try it yourself</h4>
                  <p className="text-sm text-blue-600 mb-2">
                    Experience this feature by downloading our mobile app or registering your station.
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-blue-300 text-blue-700"
                      onClick={() => {
                        setShowFeatureDialog(false);
                        navigate('/station-registration');
                      }}
                    >
                      Register Station
                    </Button>
                    <Button
                      size="sm"
                      className="text-xs bg-blue-600"
                      onClick={() => {
                        toast({
                          title: "App Download",
                          description: "Redirecting to app download page",
                          duration: 2000,
                        });

                        setTimeout(() => {
                          setShowFeatureDialog(false);
                        }, 500);
                      }}
                    >
                      Download App
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">
                  FuelFriendly offers a comprehensive suite of features designed to make your fueling experience seamless and efficient.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start"
                      onClick={() => handleFeatureClick(feature)}
                    >
                      <div className={`p-1.5 rounded-full ${feature.color} mr-2`}>
                        <div className={feature.textColor}>{feature.icon}</div>
                      </div>
                      <span>{feature.title}</span>
                    </Button>
                  ))}
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-1 text-green-700">Ready to get started?</h4>
                  <p className="text-sm text-green-600 mb-2">
                    Join thousands of satisfied users and station owners on FuelFriendly.
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      className="bg-green-600"
                      onClick={() => {
                        setShowFeatureDialog(false);
                        navigate('/station-registration');
                      }}
                    >
                      Register Now
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="sm:justify-start">
            <Button
              variant="outline"
              onClick={() => setShowFeatureDialog(false)}
            >
              Close
            </Button>
            {activeFeature && (
              <Button
                variant="ghost"
                onClick={() => setActiveFeature(null)}
              >
                View All Features
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Features;
