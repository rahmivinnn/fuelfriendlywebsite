import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeProvider';

const ShopperTerms = () => {
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Fuel Friendly LLC Shopper Terms and Conditions</h1>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  These Terms and Conditions ("Terms") govern your use of the Fuel Friendly LLC Shopper Application ("Shopper App"), platform, and affiliated content, which are copyrighted works belonging or licensed to Fuel Friendly LLC, a Tennessee corporation ("Fuel Friendly LLC"), to sign up as a personal shopper or delivery provider and/or provide such services through the Fuel Friendly LLC Platform (as defined herein).
                </p>

                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Your provision of any personal shopping and/or delivery services are subject to the Independent Contractor Agreement between you and Fuel Friendly LLC, including its subsidiaries or affiliates; or, if you are using the Shopper App in the course of your employment, the provision of any personal shopping and/or delivery services are subject to your employment agreement or your employer's agreement with Fuel Friendly LLC, including its subsidiaries or affiliates (each agreement may be referenced in these Terms as the "Agreement" and such terms regarding the Agreement are only applicable if you or your employer have entered into one).
                </p>

                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Before using the Shopper App, you are required to read, understand, and agree to these Terms. By using the Shopper App, you agree to be bound by these Terms and acknowledge and agree to the collection, use, and disclosure of your personal information in accordance with Fuel Friendly LLC's Shopper and Shopper Applicant Privacy Policy.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">1. DEFINITIONS</h2>

                <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800 dark:text-gray-200">1.1. The "Shopper App"</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The "Shopper App" shall mean the software provided by Fuel Friendly LLC, to be used on Apple iOS and Android OS devices and any upgrades from time to time and any other software or documentation which enables the use of the Shopper App. The Shopper App allows you to submit your information to sign up to provide services through the Fuel Friendly LLC Platform and to receive information to enable your performance of "Services" which shall mean personal shopping, delivery services, and gas pumping services through the Fuel Friendly LLC Platform pursuant to the Agreement.
                </p>

                <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800 dark:text-gray-200">1.2. The "Fuel Friendly LLC Platform"</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The "Fuel Friendly LLC Platform" is Fuel Friendly LLC's technology that provides a communications and logistics platform that enables consumers who seek Services from retailers in their area to be matched with individuals or third party providers interested in providing those services.
                </p>

                <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800 dark:text-gray-200">1.3. "Device"</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  "Device" shall mean a mobile device capable of running the Shopper App.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">2. PROPRIETARY RIGHTS AND LICENSES</h2>

                <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800 dark:text-gray-200">2.1. Intellectual Property</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  All trademarks, copyright, database rights, patent, and other intellectual property rights of any nature in the Shopper App together with the underlying software code, its affiliated content (which may be accessed outside of the Shopper App on Fuel Friendly LLC-controlled webpages), and any and all rights in, or derived from the Shopper App or the Fuel Friendly LLC Platform are proprietary and owned either directly by Fuel Friendly LLC or by Fuel Friendly LLC's licensors and is protected by applicable intellectual property and other laws.
                </p>

                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  You agree that you will not use such proprietary information or materials in any way whatsoever except for use of the Shopper App in compliance with these Terms and the Agreement. No portion of the Shopper App may be reproduced in any form or by any means, except as expressly permitted in these Terms.
                </p>

                <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800 dark:text-gray-200">2.2. License Grant</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Fuel Friendly LLC hereby grants you a non-exclusive, non-transferable, non-sublicensable, worldwide, and perpetual revocable license to use the Shopper App for your lawful use in accordance with these Terms and the Agreement on your Device. Fuel Friendly LLC retains all rights, title, and interest in and to the Shopper App, the Fuel Friendly LLC Platform, and its other intellectual property.
                </p>

                <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800 dark:text-gray-200">2.3. Feedback</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The Shopper App may request from you any feedback, including but not limited to product or retailer information, or images of receipts or products ("Feedback"). You agree that such Feedback shall be the exclusive property of Fuel Friendly LLC and that you will sign all documents necessary to confirm or perfect the exclusive ownership of Fuel Friendly LLC to the Feedback.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">3. CONDITIONS OF USE</h2>

                <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800 dark:text-gray-200">3.1. Account Security</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  When signing up to be a user of the Fuel Friendly LLC Platform, your information will be used to create an account. You may not sign up more than once. You will take all reasonable steps to protect your log in details and keep them secret, including any access codes you may be sent to access your account. You are responsible for all activities performed using the Shopper App whether the access is authorized by you or not.
                </p>

                <h3 className="text-lg font-medium mt-4 mb-2 text-gray-800 dark:text-gray-200">3.2. Usage Conditions</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You may use the Shopper App in accordance with the following conditions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Pursuant to the Agreement, with the terms of service of the relevant digital storefront where you obtained the Shopper App, including but not limited to the Apple iOS App Store and the Google Play Store, in accordance with any applicable third party terms of agreement using the Shopper App, and per any applicable law, rule, and regulation.</li>
                  <li>You may only use the Shopper App in countries and territories where Fuel Friendly LLC's services are available to customers.</li>
                  <li>You must provide Fuel Friendly LLC information that is true, accurate, and complete at all times and you may not impersonate any other person in your use of the Shopper App or the Fuel Friendly LLC Platform or post another person's personal information, data, content, or materials through the Shopper App or the Fuel Friendly LLC Platform without the person's consent.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">4. DISCLAIMER AND LIMITATION OF LIABILITY</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  THE SHOPPER APP AND FUEL FRIENDLY LLC PLATFORM ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, FUEL FRIENDLY LLC DISCLAIMS ALL REPRESENTATIONS, CONDITIONS, AND WARRANTIES, EXPRESS, LEGAL, IMPLIED, OR STATUTORY, INCLUDING THE IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, QUALITY, FITNESS FOR A PARTICULAR PURPOSE, DURABILITY, TITLE, AND NON-INFRINGEMENT.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">5. CHANGES AND UPDATES</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Fuel Friendly LLC may make changes to these Terms from time to time. When Fuel Friendly LLC does so, Fuel Friendly LLC will post the most current version of the Terms and, if a revision to the Terms is material, Fuel Friendly LLC will notify you of the new Terms (for example, by email or a notification on the Shopper App). Changes to these terms will not apply retroactively. If you do not agree to the modified terms, you should discontinue your use of the Shopper App.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">6. CONTACT INFORMATION</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  If you have questions about signing up or performing your Services as a shopper, please review our Help Center.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  If you have any questions about these Terms, you may contact info@gofuelfriendly.com
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

export default ShopperTerms;
