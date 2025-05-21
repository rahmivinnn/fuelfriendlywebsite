import React from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const IndependentContractorAgreement = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-center">
                Independent Contractor Agreement
              </h1>

              <div className="prose dark:prose-invert max-w-none">
                <p>This Independent Contractor Agreement (the "Agreement") is made effective as of [Effective Date] by and between [Legal First & Last name / Name of Corporate Entity] ("Contractor," "you," or "your"), and Fuel Friendly LLC, and its subsidiaries, representatives, affiliates, officers, and directors (collectively, "Fuel Friendly LLC," "we," "us," or "our") if you perform the Services (as defined in Section 2.1 below) anywhere within the United States (collectively referred to as the "Parties" or each individually as a "Party").</p>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 my-6 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-bold mb-2">IMPORTANT:</p>
                  <p>YOU ACKNOWLEDGE AT THE OUTSET THAT, FOR THE PURPOSES OF CARRYING OUT THIS AGREEMENT, YOU AGREE TO ALL TERMS AND CONDITIONS SET FORTH IN THIS AGREEMENT. IF YOU DO NOT AGREE TO BE BOUND BY THE TERMS AND CONDITIONS OF THIS AGREEMENT, YOU MAY NOT USE OR ACCESS THE FUEL FRIENDLY LLC PLATFORM TO PERFORM THE SERVICES COVERED BY THIS AGREEMENT. PAY ATTENTION TO SECTION 9, WHICH SETS FORTH THAT WITH CERTAIN EXCEPTIONS YOU AND FUEL FRIENDLY LLC MUTUALLY AGREE TO ARBITRATE ANY LEGAL DISPUTES OR CLAIMS THAT MIGHT ARISE BETWEEN YOU AND FUEL FRIENDLY LLC AS DESCRIBED IN SECTION 9. SECTION 9 REQUIRES THAT, EXCEPT AS PROHIBITED BY LAW OR UNLESS YOU OPT OUT OF THE ARBITRATION PROVISION (AS SET FORTH IN SECTION 9.14), THE PARTIES WILL RESOLVE COVERED DISPUTES OR CLAIMS ON AN INDIVIDUAL BASIS IN AN ARBITRATION PROCEEDING, AND WAIVE THEIR RIGHT TO A TRIAL (INCLUDING A JURY TRIAL) FOR COVERED DISPUTES OR CLAIMS.</p>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">1. Purpose of the Agreement</h2>
                <p>1.1 Fuel Friendly LLC is a technology company that, among other things, operates a multi-sided communications and logistics platform (the "Fuel Friendly LLC Platform") to connect different types of users. These users may include, among others, retailers, who use the Fuel Friendly LLC Platform to offer their goods for sale to customers ("Retailers"); customers, who use the Fuel Friendly LLC Platform to purchase goods from Retailers in their area and to arrange for someone else to shop for and/or deliver those goods to the customer's designated delivery location and/or gas pumping services ("Customers"); and independent contractors, known as Shoppers, who use the Fuel Friendly LLC Platform to find opportunities to provide their personal shopping and/or delivery services and/or gas pumping services to Customers ("Shoppers").</p>

                <p>1.2 You are an independent service provider. You desire to enter into this Agreement for the purpose of using the Fuel Friendly LLC Platform to obtain business opportunities to perform your personal shopping and/or delivery services on behalf of Customers. You are in lawful possession of all equipment, insurance, and licenses necessary to perform the shopping and/or delivery services contemplated by this Agreement in accordance with all applicable laws. When engaging with the Fuel Friendly LLC Platform as a Shopper, including but not limited to performing the Services (as defined in Section 2.1 below), you understand and expressly agree that you are not doing so as an employee of Fuel Friendly LLC.</p>

                <p>1.3 This Agreement governs the relationship between Fuel Friendly LLC and you as an independent provider of personal shopping and/or delivery services, and establishes the Parties' respective rights and obligations applicable to Delivery Opportunities (as defined in Section 2.1 below) made available to you through the Fuel Friendly LLC Platform and the Services (as defined in Section 2.1 below) performed by you. In exchange for the promises contained in this Agreement, you shall have the opportunity and obligation to perform those Delivery Opportunities that you accept ("Services," defined in Section 2.1 below). Once you accept a Delivery Opportunity, you agree that you shall be contractually bound to complete the Services in accordance with this Agreement and specifications provided to you by the Customer(s). Nothing in this Agreement requires you to accept any Delivery Opportunities during the term of this Agreement, and nothing in this Agreement guarantees you any Delivery Opportunities for any particular time period.</p>

                <p>1.4 Fuel Friendly LLC reserves the right to modify and improve the Fuel Friendly LLC Platform. Fuel Friendly LLC may introduce new features, change existing features, or remove features from the Fuel Friendly LLC Platform at any time and without notice, subject to the terms of this Agreement. If you provide Fuel Friendly LLC with any feedback on or comments regarding the Fuel Friendly LLC Platform or your provision of Services under this Agreement, you grant Fuel Friendly LLC the right to use such feedback or comments for any purpose without restriction or payment to you.</p>

                <p>1.5 The Parties agree that they will act in accordance with the terms of this Agreement.</p>

                <h2 className="text-2xl font-bold mt-8 mb-4">2. Services of the Contractor</h2>
                <p>2.1 From time to time, Fuel Friendly LLC may notify you of an opportunity to perform personal shopping and/or pump side services through the Fuel Friendly LLC Platform under this Agreement on behalf of Customers (a "Pump Side Opportunity"). You understand and agree that the Customer, not Fuel Friendly LLC, determines the Retailer from which the items are to be retrieved, the items to be retrieved, and the timing of service. If you accept a Pump Side Opportunity using the Fuel Friendly LLC Platform, you agree to, as applicable, retrieve the Customer's requested items from the Retailer selected by the Customer and provide pump side service in a safe manner within the service window requested by the Customer (the "Services").</p>

                <p className="mt-4 text-gray-500 italic">This agreement continues with additional sections covering all aspects of the independent contractor relationship. Please review the full agreement for complete details on services, payment, personnel, termination, relationship of parties, representations, confidentiality, arbitration, and other important terms.</p>
              </div>

              <div className="mt-8 flex justify-center">
                <a
                  href="/independent-contractor-agreement-full"
                  className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  View Full Agreement
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IndependentContractorAgreement;
