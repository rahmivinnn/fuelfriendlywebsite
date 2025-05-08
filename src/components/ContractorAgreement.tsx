import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ContractorAgreementProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContractorAgreement: React.FC<ContractorAgreementProps> = ({ open, onOpenChange }) => {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  
  const toggleSection = (sectionIndex: number) => {
    setExpandedSections(prev => 
      prev.includes(sectionIndex) 
        ? prev.filter(i => i !== sectionIndex)
        : [...prev, sectionIndex]
    );
  };
  
  const agreementSections = [
    {
      title: "1. Purpose of the Agreement",
      content: `1.1 Fuel Friendly LLC is a technology company that, among other things, operates a multi-sided communications and logistics platform (the "Fuel Friendly LLC Platform") to connect different types of users. These users may include, among others, retailers, who use the Fuel Friendly LLC Platform to offer their goods for sale to customers ("Retailers"); customers, who use the Fuel Friendly LLC Platform to purchase goods from Retailers in their area and to arrange for someone else to shop for and/or deliver those goods to the customer's designated delivery location and/or gas pumping services ("Customers"); and independent contractors, known as Shoppers, who use the Fuel Friendly LLC Platform to find opportunities to provide their personal shopping and/or delivery services and/or gas pumping services to Customers ("Shoppers").

1.2 You are an independent service provider. You desire to enter into this Agreement for the purpose of using the Fuel Friendly LLC Platform to obtain business opportunities to perform your personal shopping and/or delivery services on behalf of Customers. You are in lawful possession of all equipment, insurance, and licenses necessary to perform the shopping and/or delivery services contemplated by this Agreement in accordance with all applicable laws. When engaging with the Fuel Friendly LLC Platform as a Shopper, including but not limited to performing the Services (as defined in Section 2.1 below), you understand and expressly agree that you are not doing so as an employee of Fuel Friendly LLC.

1.3 This Agreement governs the relationship between Fuel Friendly LLC and you as an independent provider of personal shopping and/or delivery services, and establishes the Parties' respective rights and obligations applicable to Delivery Opportunities (as defined in Section 2.1 below) made available to you through the Fuel Friendly LLC Platform and the Services (as defined in Section 2.1 below) performed by you. In exchange for the promises contained in this Agreement, you shall have the opportunity and obligation to perform those Delivery Opportunities that you accept ("Services," defined in Section 2.1 below). Once you accept a Delivery Opportunity, you agree that you shall be contractually bound to complete the Services in accordance with this Agreement and specifications provided to you by the Customer(s). Nothing in this Agreement requires you to accept any Delivery Opportunities during the term of this Agreement, and nothing in this Agreement guarantees you any Delivery Opportunities for any particular time period.

1.4 Fuel Friendly LLC reserves the right to modify and improve the Fuel Friendly LLC Platform. Fuel Friendly LLC may introduce new features, change existing features, or remove features from the Fuel Friendly LLC Platform at any time and without notice, subject to the terms of this Agreement. If you provide Fuel Friendly LLC with any feedback on or comments regarding the Fuel Friendly LLC Platform or your provision of Services under this Agreement, you grant Fuel Friendly LLC the right to use such feedback or comments for any purpose without restriction or payment to you.

1.5 The Parties agree that they will act in accordance with the terms of this Agreement.`
    },
    {
      title: "2. Services of the Contractor",
      content: `2.1 From time to time, Fuel Friendly LLC may notify you of an opportunity to perform personal shopping and/or delivery services through the Fuel Friendly LLC Platform under this Agreement on behalf of Customers (a "Delivery Opportunity"). You understand and agree that the Customer, not Fuel Friendly LLC, determines the Retailer from which the items are to be retrieved, the items to be retrieved, and the timing of delivery. If you accept a Delivery Opportunity using the Fuel Friendly LLC Platform, you agree to, as applicable, retrieve the Customer's requested items from the Retailer selected by the Customer and deliver them in a safe manner within the delivery window requested by the Customer (the "Services").

2.2 Fuel Friendly LLC is interested only in the end results to be achieved by you under this Agreement. Fuel Friendly LLC shall have no right to, and shall not, supervise, oversee, direct, or control you, or the manner or method you use to perform the Services under this Agreement. Nor shall Fuel Friendly LLC have a right to control, oversee, direct, or supervise any Personnel (as defined in Section 4.1 below) you may choose to engage to assist you in the provision of the Services under this Agreement. You will be solely responsible for determining the manner and method of performing the Services under this Agreement, and achieving the desired results, in a lawful and safe manner. You acknowledge that Fuel Friendly LLC does not require training as to the performance of the Services under this Agreement.

2.3 You acknowledge that Fuel Friendly LLC does not impose any minimum or maximum amount of Delivery Opportunities that you are required to accept or Services that you are required to provide. You also acknowledge that there is no minimum or maximum number of Delivery Opportunities that Fuel Friendly LLC will make available to you. You are under no obligation to accept any particular Delivery Opportunity that is offered to you. You are not required to be logged in to the Shopper App on any specific date, at any specific time, or for any minimum period of time. You are free to accept or reject any Delivery Opportunity in your business judgment and discretion. If, however, you do accept a Delivery Opportunity, then you are contractually obligated to complete it. You further agree to accept liability for any and all damages resulting from your or your Personnel's failure to complete a Delivery Opportunity in accordance with the terms set forth in this Agreement.`
    },
    {
      title: "3. Rates and Payment",
      content: `3.1 You will receive payment for completed Services. Fuel Friendly LLC agrees to transmit to you payment for completed Services within 30 days of performance. The rates for payment components may change at any time, and Fuel Friendly LLC will provide you with notice of the changes in advance of your accepting a Delivery Opportunity through Fuel Friendly LLC's Shopper App. Fuel Friendly LLC does not pay for completed Services by salary or by an hourly rate.

3.2 For a Delivery Opportunity that involves both personal shopping and delivery, you will be provided a payment for each delivery, which takes into account factors such as weight of items, number and types of items, estimated distance and time, and any applicable incentive associated with the Delivery Opportunity. Payment components are shown in the Shopper App, and you can review the applicable estimated payments prior to accepting or rejecting a Delivery Opportunity.

3.3 For a Delivery Opportunity that involves delivery only, you will be provided a payment for each delivery, which takes into account factors such as estimated distance and time, and any applicable incentive associated with the Delivery Opportunity. Payment components are shown in the Shopper App, and you can review the applicable estimated payments prior to accepting or rejecting a Delivery Opportunity.`
    },
    {
      title: "4. Your Personnel",
      content: `4.1 Subject to compliance with this Agreement, you will have sole discretion over whether to engage subcontractors or use employees, assistants or helpers (collectively "Personnel") to assist in the provision of the Services, and you will be solely responsible for the direction and control of your Personnel. Notwithstanding the foregoing, you remain liable for the performance of the Services by your Personnel, and the engagement of Personnel will not release you from any of your obligations under this Agreement.

4.2 You will require all Personnel performing the Services hereunder to comply with all eligibility requirements set forth in Sections 1 and 2 above. You acknowledge that, as a prerequisite to performing the Services, your Personnel will need to consent to background checks through Fuel Friendly LLC's outside background check providers, and your Personnel's continued access to the Fuel Friendly LLC Platform is contingent upon passing the background checks and otherwise complying with the terms of this Agreement. Before allowing any Personnel to perform the Services, you agree to make your records demonstrating compliance with the foregoing requirements available to Fuel Friendly LLC for verification. Fuel Friendly LLC's right to verification herein does not in any way mitigate or reduce your obligation to ensure your Personnel's compliance with the requirements of this Agreement.`
    },
    {
      title: "5. Termination of Agreement",
      content: `5.1 You may immediately terminate this Agreement at any time upon written (including email) notice to Fuel Friendly LLC. If your termination of this Agreement results in your failure to complete an accepted Delivery Opportunity in accordance with the terms set forth in this Agreement, you may be subject to liability for any and all damages resulting therefrom.

5.2 Fuel Friendly LLC may immediately terminate this Agreement upon written (including email) notice to you in the event you engage in a material breach of the terms of this Agreement, including, but not limited to, any act that violates Fuel Friendly LLC's Guidelines such as when you:
a. Cause a safety issue;
b. Violate applicable local, state, or federal laws or applicable guidance;
c. Fail to meet acceptable standards of service with respect to the end result of the Services as specified by the Customer;
d. Repeatedly fail to complete deliveries within the Customer's delivery window or repeatedly fail to deliver complete orders after accepting a Delivery Opportunity;
e. Fail your background checks at any time after signing this Agreement;
f. Violate the Customer's privacy rights;
g. Engage in or encourage fraudulent conduct;
h. Misuse or otherwise improperly disclose Confidential Information, or reproduce or prepare derivative works based on Fuel Friendly LLC's platform, in violation of Section 8 of this Agreement;
i. Invalidate this Agreement through an improper signature or identification verification;
j. Direct, cause, or permit any of your Personnel to commit any of the violations listed in (a) through (i) of this paragraph.`
    }
  ];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Independent Contractor Agreement</DialogTitle>
          <DialogDescription>
            This Independent Contractor Agreement (the "Agreement") is made effective as of [Effective Date] by and between [Legal First & Last name / Name of Corporate Entity] ("Contractor," "you," or "your"), and Fuel Friendly LLC, and its subsidiaries, representatives, affiliates, officers, and directors (collectively, "Fuel Friendly LLC," "we," "us," or "our").
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
            <p className="text-amber-700 font-medium">IMPORTANT</p>
            <p className="text-sm text-amber-700">
              YOU ACKNOWLEDGE AT THE OUTSET THAT, FOR THE PURPOSES OF CARRYING OUT THIS AGREEMENT, YOU AGREE TO ALL TERMS AND CONDITIONS SET FORTH IN THIS AGREEMENT. IF YOU DO NOT AGREE TO BE BOUND BY THE TERMS AND CONDITIONS OF THIS AGREEMENT, YOU MAY NOT USE OR ACCESS THE FUEL FRIENDLY LLC PLATFORM TO PERFORM THE SERVICES COVERED BY THIS AGREEMENT.
            </p>
          </div>
          
          <div className="space-y-4">
            {agreementSections.map((section, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 text-left font-medium"
                  onClick={() => toggleSection(index)}
                >
                  {section.title}
                  {expandedSections.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {expandedSections.includes(index) && (
                  <div className="p-4 text-sm whitespace-pre-line">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            This is an abbreviated version of the agreement. The full agreement contains additional sections including Relationship of the Parties, Contractor's Representations and Indemnities, Nondisclosure of Confidential Information, Mutual Agreement to Arbitrate Disputes, and more.
          </p>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContractorAgreement;
