import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Printer, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IndependentContractorAgreementFull = () => {
  const { toast } = useToast();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    '1': true, // Start with section 1 expanded
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print dialog opened",
      description: "Printing the Independent Contractor Agreement",
      duration: 3000,
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download initiated",
      description: "Downloading the Independent Contractor Agreement as PDF",
      duration: 3000,
    });
    // In a real implementation, this would generate and download a PDF
  };

  const handleCopy = () => {
    // Get the text content of the agreement
    const agreementText = document.getElementById('agreement-content')?.textContent;
    if (agreementText) {
      navigator.clipboard.writeText(agreementText);
      toast({
        title: "Copied to clipboard",
        description: "The agreement has been copied to your clipboard",
        duration: 3000,
      });
    }
  };

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
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Independent Contractor Agreement
                </h1>
                <div className="flex space-x-2 print:hidden">
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>

              <div id="agreement-content" className="prose dark:prose-invert max-w-none">
                <p className="font-bold">INDEPENDENT CONTRACTOR AGREEMENT</p>
                <p>This Independent Contractor Agreement (the "Agreement") is made effective as of [Effective Date] by and between [Legal First & Last name / Name of Corporate Entity] ("Contractor," "you," or "your"), and Fuel Friendly LLC, and its subsidiaries, representatives, affiliates, officers, and directors (collectively, "Fuel Friendly LLC," "we," "us," or "our") if you perform the Services (as defined in Section 2.1 below) anywhere within the United States (collectively referred to as the "Parties" or each individually as a "Party").</p>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 my-6 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-bold mb-2">IMPORTANT:</p>
                  <p>YOU ACKNOWLEDGE AT THE OUTSET THAT, FOR THE PURPOSES OF CARRYING OUT THIS AGREEMENT, YOU AGREE TO ALL TERMS AND CONDITIONS SET FORTH IN THIS AGREEMENT. IF YOU DO NOT AGREE TO BE BOUND BY THE TERMS AND CONDITIONS OF THIS AGREEMENT, YOU MAY NOT USE OR ACCESS THE FUEL FRIENDLY LLC PLATFORM TO PERFORM THE SERVICES COVERED BY THIS AGREEMENT. PAY ATTENTION TO SECTION 9, WHICH SETS FORTH THAT WITH CERTAIN EXCEPTIONS YOU AND FUEL FRIENDLY LLC MUTUALLY AGREE TO ARBITRATE ANY LEGAL DISPUTES OR CLAIMS THAT MIGHT ARISE BETWEEN YOU AND FUEL FRIENDLY LLC AS DESCRIBED IN SECTION 9. SECTION 9 REQUIRES THAT, EXCEPT AS PROHIBITED BY LAW OR UNLESS YOU OPT OUT OF THE ARBITRATION PROVISION (AS SET FORTH IN SECTION 9.14), THE PARTIES WILL RESOLVE COVERED DISPUTES OR CLAIMS ON AN INDIVIDUAL BASIS IN AN ARBITRATION PROCEEDING, AND WAIVE THEIR RIGHT TO A TRIAL (INCLUDING A JURY TRIAL) FOR COVERED DISPUTES OR CLAIMS.</p>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                  <button
                    className="flex justify-between items-center w-full py-4 text-left font-semibold"
                    onClick={() => toggleSection('1')}
                  >
                    <span>1. Purpose of the Agreement</span>
                    {expandedSections['1'] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>

                  {expandedSections['1'] && (
                    <div className="pb-4">
                      <p>1.1 Fuel Friendly LLC is a technology company that, among other things, operates a multi-sided communications and logistics platform (the "Fuel Friendly LLC Platform") to connect different types of users. These users may include, among others, retailers, who use the Fuel Friendly LLC Platform to offer their goods for sale to customers ("Retailers"); customers, who use the Fuel Friendly LLC Platform to purchase goods from Retailers in their area and to arrange for someone else to shop for and/or deliver those goods to the customer's designated delivery location and/or gas pumping services ("Customers"); and independent contractors, known as Shoppers, who use the Fuel Friendly LLC Platform to find opportunities to provide their personal shopping and/or delivery services and/or gas pumping services to Customers ("Shoppers").</p>

                      <p>1.2 You are an independent service provider. You desire to enter into this Agreement for the purpose of using the Fuel Friendly LLC Platform to obtain business opportunities to perform your personal shopping and/or delivery services on behalf of Customers. You are in lawful possession of all equipment, insurance, and licenses necessary to perform the shopping and/or delivery services contemplated by this Agreement in accordance with all applicable laws. When engaging with the Fuel Friendly LLC Platform as a Shopper, including but not limited to performing the Services (as defined in Section 2.1 below), you understand and expressly agree that you are not doing so as an employee of Fuel Friendly LLC.</p>

                      <p>1.3 This Agreement governs the relationship between Fuel Friendly LLC and you as an independent provider of personal shopping and/or delivery services, and establishes the Parties' respective rights and obligations applicable to Delivery Opportunities (as defined in Section 2.1 below) made available to you through the Fuel Friendly LLC Platform and the Services (as defined in Section 2.1 below) performed by you. In exchange for the promises contained in this Agreement, you shall have the opportunity and obligation to perform those Delivery Opportunities that you accept ("Services," defined in Section 2.1 below). Once you accept a Delivery Opportunity, you agree that you shall be contractually bound to complete the Services in accordance with this Agreement and specifications provided to you by the Customer(s). Nothing in this Agreement requires you to accept any Delivery Opportunities during the term of this Agreement, and nothing in this Agreement guarantees you any Delivery Opportunities for any particular time period.</p>

                      <p>1.4 Fuel Friendly LLC reserves the right to modify and improve the Fuel Friendly LLC Platform. Fuel Friendly LLC may introduce new features, change existing features, or remove features from the Fuel Friendly LLC Platform at any time and without notice, subject to the terms of this Agreement. If you provide Fuel Friendly LLC with any feedback on or comments regarding the Fuel Friendly LLC Platform or your provision of Services under this Agreement, you grant Fuel Friendly LLC the right to use such feedback or comments for any purpose without restriction or payment to you.</p>

                      <p>1.5 The Parties agree that they will act in accordance with the terms of this Agreement.</p>
                    </div>
                  )}
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                  <button
                    className="flex justify-between items-center w-full py-4 text-left font-semibold"
                    onClick={() => toggleSection('2')}
                  >
                    <span>2. Services of the Contractor</span>
                    {expandedSections['2'] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>

                  {expandedSections['2'] && (
                    <div className="pb-4">
                      <p>2.1 From time to time, Fuel Friendly LLC may notify you of an opportunity to perform personal shopping and/or pump side services through the Fuel Friendly LLC Platform under this Agreement on behalf of Customers (a "Pump Side Opportunity"). You understand and agree that the Customer, not Fuel Friendly LLC, determines the Retailer from which the items are to be retrieved, the items to be retrieved, and the timing of service. If you accept a Pump Side Opportunity using the Fuel Friendly LLC Platform, you agree to, as applicable, retrieve the Customer's requested items from the Retailer selected by the Customer and provide pump side service in a safe manner within the service window requested by the Customer (the "Services").</p>

                      <p>2.2 Fuel Friendly LLC is interested only in the end results to be achieved by you under this Agreement. Fuel Friendly LLC shall have no right to, and shall not, supervise, oversee, direct, or control you, or the manner or method you use to perform the Services under this Agreement. Nor shall Fuel Friendly LLC have a right to control, oversee, direct, or supervise any Personnel (as defined in Section 4.1 below) you may choose to engage to assist you in the provision of the Services under this Agreement. You will be solely responsible for determining the manner and method of performing the Services under this Agreement, and achieving the desired results, in a lawful and safe manner. You acknowledge that Fuel Friendly LLC does not require training as to the performance of the Services under this Agreement.</p>

                      <p>2.3 You acknowledge that Fuel Friendly LLC does not impose any minimum or maximum amount of Pump Side Opportunities that you are required to accept or Services that you are required to provide. You also acknowledge that there is no minimum or maximum number of Pump Side Opportunities that Fuel Friendly LLC will make available to you. You are under no obligation to accept any particular Pump Side Opportunity that is offered to you. You are not required to be logged in to the Shopper App on any specific date, at any specific time, or for any minimum period of time. You are free to accept or reject any Pump Side Opportunity in your business judgment and discretion. If, however, you do accept a Pump Side Opportunity, then you are contractually obligated to complete it. You further agree to accept liability for any and all damages resulting from your or your Personnel's failure to complete a Pump Side Opportunity in accordance with the terms set forth in this Agreement.</p>

                      <p>2.4 You acknowledge and agree that as an independent provider of the Services, you have the right to perform services for others and to hold yourself out to the general public as a separately established service provider. Nothing in this Agreement shall prevent you or Fuel Friendly LLC from engaging in similar arrangements or business with others, including preventing you from providing your services to or through a business directly competing with Fuel Friendly LLC. You may represent, perform services for, or be employed by, any third persons or companies as you see fit.</p>

                      <p>2.5 If Fuel Friendly LLC desires to engage you for any purposes other than or in addition to the Services, and if you agree to such an additional engagement, you and Fuel Friendly LLC shall agree upon the specific terms and conditions for that additional engagement. Those terms and conditions shall govern that additional engagement only and unless the Parties otherwise agree in writing shall not modify the terms and conditions governing the Services as set forth in this Agreement. Unless the Parties otherwise agree in writing, any disputes or claims arising out of or related to the provision of such additional engagement shall be governed by the Arbitration Provision (including the opt-out option) in Section 9 of this Agreement.</p>

                      <p>2.6 The Parties acknowledge that the term of this Agreement does not reflect an uninterrupted service arrangement. Each Delivery Opportunity you accept shall be treated as a separate contractual engagement that requires you to complete the Services for the accepted Delivery Opportunity in accordance with this Agreement and specifications (e.g., the Retailer from which the items are to be retrieved, the items to be retrieved, the timing of delivery, etc.) provided to you by the Customer(s) for that Delivery Opportunity, with no continuing obligation to provide Services after an accepted Delivery Opportunity is completed. No Services will be performed without the Parties' mutual agreement.</p>

                      <p>2.7 You acknowledge that as a prerequisite to performing the Services, and to receive payment for completed Services, in your capacity as an individual and/or sole proprietor or in your capacity as an individual owner of a corporate entity, you will need to consent to background checks through Fuel Friendly LLC's outside background check providers. Continued access to the Fuel Friendly LLC Platform for the purpose of performing Services, as defined in this Agreement, is contingent upon passing the background checks and otherwise complying with the terms of this Agreement. After you receive access to the Fuel Friendly LLC Platform to perform Services, Fuel Friendly LLC may conduct additional background checks on you, in compliance with applicable law, through its outside background check providers. Fuel Friendly LLC will issue you a username and password so that you can access the Fuel Friendly LLC Platform to provide the Services. You agree that only you will use the username and password, as you are the sole authorized user. Nothing in this Agreement should be construed as precluding you from engaging personnel to assist in the provision of Services, as set forth in further detail in Section 4 below.</p>
                    </div>
                  )}
                </div>

                {/* Additional sections would be added here in the same format */}

                <p className="mt-8 text-center text-gray-500">
                  This is the full Independent Contractor Agreement. By using the Fuel Friendly LLC Platform, you agree to be bound by these terms.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IndependentContractorAgreementFull;
