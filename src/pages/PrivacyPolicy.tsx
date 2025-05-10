import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <motion.div
            className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Thank you for using Fuel Friendly! We are committed to providing you the best online shopping and delivery experience possible. This Privacy Policy explains how Fuel Friendly LLC("Fuel Friendly", "we", or "us") collect, use, and share your Personal Information. "Personal Information" is information about you that we collect when you browse or place orders for goods or services on the Fuel Friendly platform, including any websites, mobile application, device, or API where this Privacy Policy is linked (the "Services").
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">1. Information We Collect</h2>
                <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800 dark:text-gray-200">a. Information you provide</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We collect the following types of Personal Information directly from you:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Contact information.</strong> When you use or interact with the Services, we collect or obtain relevant contact details from you, including your name, telephone number and email address.</li>
                  <li><strong>Account information.</strong> When you set up a Fuel Friendly account, we collect your username and password, and other relevant information we request.</li>
                  <li><strong>Order information.</strong> If you place an order through the Services, we collect information necessary to fulfill the order, including your delivery address, the date and time of the order, the items you ordered and any special instructions. In certain jurisdictions, drivers may use personal dashcams. Fuel Friendly prohibits recording of private conversations or customer residences unless required by law or permitted by customer consent.</li>
                  <li><strong>Age and identity verification information.</strong> If you order alcohol, prescriptions, or other age- or dollar amount restricted orders, we collect information from your government ID to verify your age or your identity, including the government ID number and state or country.</li>
                  <li><strong>Vehicle Information.</strong> For fueling orders, we may collect your vehicle license plate number(s).</li>
                  <li><strong>Payment information.</strong> If you place an order through the Services, we collect your billing address and method of payment. Additional details regarding the processing of your payment information can be found below.</li>
                </ul>

                <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800 dark:text-gray-200">b. Information collected by automated means</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  When you use and interact with the Services, we automatically receive certain information about your device, browser, and/or activity:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Device and usage information.</strong> Our servers will record information about the device you use to connect to the Services and your usage of the Services.</li>
                  <li><strong>Browser and Activity Information.</strong> When you access the Services, we collect information about your activity and interactions with the Services, including but not limited to, the products with which you engage or place in your cart, information related to your orders, the pages that you navigate to, and the frequency and duration of your use of the Services.</li>
                  <li><strong>Location Information.</strong> When you access the Services, we may collect information about your device's location.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2. Payment Processors and Partners</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  When you pay for orders using a credit card or other payment method on our Services, your credit card or other payment information (e.g., Google Pay, FSA/HSA) is collected and processed by our third-party payment processors.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">3. Information Use</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We use the Personal Information we collect or otherwise obtain about you for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Provide and manage the Services.</strong> We use your Personal Information in connection with the provision, administration, and management of the Services.</li>
                  <li><strong>Process your transactions.</strong> If you place an order through the Services, we will use your Personal Information to process your payment and facilitate the delivery of your order.</li>
                  <li><strong>Provide customer support.</strong> We use your Personal Information to respond to your customer support communications and inquiries and assist you in your use of the Services.</li>
                  <li><strong>Communicate with you.</strong> We use your Personal Information to provide you with relevant information about us or our Services.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">4. Information Disclosure</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We may disclose your Personal Information to the categories of recipients listed below.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>Our affiliates and subsidiaries.</strong> We may disclose your Personal Information to our affiliates, subsidiaries, and other companies under common control and ownership for purposes consistent with this Privacy Policy and other business and operational purposes.</li>
                  <li><strong>Our service providers and third-party partners.</strong> We disclose your Personal Information to third parties that provide services to us, including: cloud storage services; system hosting, services; research partners; data security services; fraud prevention; payment processing services; delivery services; analytics services; legal services; map services; email or SMS communication services, or partners that assist us with providing, operating or maintaining parts of our services.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">5. Children's Privacy</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We understand the importance of protecting the privacy of children, especially in the online environment. The Services are not designed for or intentionally directed to children under the age of 16, and we do not knowingly collect Personal Information from children under the age of 16.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">6. Information Security</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We employ and maintain reasonable administrative, physical, and technical measures designed to safeguard and protect Personal Information under our control from unauthorized access, use, and disclosure.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">7. Your Privacy Choices</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Depending on your place of residence, under applicable law, you can make certain choices and exercise certain rights with respect to our use of your Personal Information.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">8. Changes to this Privacy Policy</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We may occasionally update this Privacy Policy to reflect changes in our practices with respect to the collection, use, and disclosure of Personal Information and/or changes in applicable law.
                </p>

                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={() => navigate('/')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
