import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ShieldCheck, BadgeCheck } from 'lucide-react';
import DriverLicenseVerification from './DriverLicenseVerification';
import FaceVerification from './FaceVerification';
import PhoneVerification from './PhoneVerification';
import EmailVerification from './EmailVerification';
import DocumentVerification from './DocumentVerification';
import GovernmentIdVerification from './GovernmentIdVerification';
import BiometricVerification from './BiometricVerification';

// Verification types
const verificationTypes = [
  { id: 'license', name: 'Driver License', icon: Check, required: true },
  { id: 'face', name: 'Face Verification', icon: Check, required: true },
  { id: 'phone', name: 'Phone', icon: Check, required: true },
  { id: 'email', name: 'Email', icon: Check, required: true },
  { id: 'document', name: 'Document', icon: Check, required: false },
  { id: 'government_id', name: 'Government ID', icon: Check, required: false },
  { id: 'biometric', name: 'Biometric', icon: Check, required: false },
];

interface VerificationStepProps {
  email: string;
  onNext: () => void;
  onPrev: () => void;
  onSkip?: () => void;
}

const VerificationStep: React.FC<VerificationStepProps> = ({ email, onNext, onPrev, onSkip }) => {
  const [activeTab, setActiveTab] = useState('license');

  // Verification states
  const [licenseVerified, setLicenseVerified] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [documentVerified, setDocumentVerified] = useState(false);
  const [governmentIdVerified, setGovernmentIdVerified] = useState(false);
  const [biometricVerified, setBiometricVerified] = useState(false);

  // Verification data
  const [licenseData, setLicenseData] = useState(null);
  const [faceData, setFaceData] = useState(null);
  const [phoneData, setPhoneData] = useState(null);
  const [emailData, setEmailData] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [governmentIdData, setGovernmentIdData] = useState(null);
  const [biometricData, setBiometricData] = useState(null);

  // Verification completion status
  const [isRequiredVerificationComplete, setIsRequiredVerificationComplete] = useState(false);
  const [isAllVerificationComplete, setIsAllVerificationComplete] = useState(false);

  // Check verification status
  useEffect(() => {
    // Check if all required verifications are complete
    const requiredComplete = licenseVerified && faceVerified && phoneVerified && emailVerified;
    setIsRequiredVerificationComplete(requiredComplete);

    // Check if all verifications are complete
    const allComplete = requiredComplete && documentVerified && governmentIdVerified && biometricVerified;
    setIsAllVerificationComplete(allComplete);

    // Auto-advance to next required verification
    if (licenseVerified && activeTab === 'license') {
      setActiveTab('face');
    } else if (faceVerified && activeTab === 'face') {
      setActiveTab('phone');
    } else if (phoneVerified && activeTab === 'phone') {
      setActiveTab('email');
    } else if (emailVerified && activeTab === 'email' && !documentVerified) {
      setActiveTab('document');
    }
  }, [licenseVerified, faceVerified, phoneVerified, emailVerified, documentVerified, governmentIdVerified, biometricVerified, activeTab]);

  // Verification handlers
  const handleLicenseVerification = (data) => {
    setLicenseVerified(true);
    setLicenseData(data);
  };

  const handleFaceVerification = (data) => {
    setFaceVerified(true);
    setFaceData(data);
  };

  const handlePhoneVerification = (data) => {
    setPhoneVerified(true);
    setPhoneData(data);
  };

  const handleEmailVerification = (data) => {
    setEmailVerified(true);
    setEmailData(data);
  };

  const handleDocumentVerification = (data) => {
    setDocumentVerified(true);
    setDocumentData(data);
  };

  const handleGovernmentIdVerification = (data) => {
    setGovernmentIdVerified(true);
    setGovernmentIdData(data);
  };

  const handleBiometricVerification = (data) => {
    setBiometricVerified(true);
    setBiometricData(data);
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {verificationTypes.map((type, index) => {
            const isVerified =
              (type.id === 'license' && licenseVerified) ||
              (type.id === 'face' && faceVerified) ||
              (type.id === 'phone' && phoneVerified) ||
              (type.id === 'email' && emailVerified) ||
              (type.id === 'document' && documentVerified) ||
              (type.id === 'government_id' && governmentIdVerified) ||
              (type.id === 'biometric' && biometricVerified);

            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                  isVerified
                    ? 'bg-green-100 text-green-800'
                    : type.required
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className={`mr-1 ${isVerified ? 'text-green-600' : ''}`}>
                  <type.icon size={12} />
                </div>
                <span>{type.name}</span>
                {type.required && !isVerified && (
                  <span className="ml-1 text-amber-600">*</span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Verification tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap w-full p-1 bg-gray-100 rounded-xl">
              {verificationTypes.map((type, index) => {
                // Determine if this verification type is verified
                const isVerified =
                  (type.id === 'license' && licenseVerified) ||
                  (type.id === 'face' && faceVerified) ||
                  (type.id === 'phone' && phoneVerified) ||
                  (type.id === 'email' && emailVerified) ||
                  (type.id === 'document' && documentVerified) ||
                  (type.id === 'government_id' && governmentIdVerified) ||
                  (type.id === 'biometric' && biometricVerified);

                // Determine if this tab should be disabled
                const isDisabled =
                  // Face verification requires license verification first
                  (type.id === 'face' && !licenseVerified) ||
                  // Government ID and biometric require face verification
                  ((type.id === 'government_id' || type.id === 'biometric') && !faceVerified) ||
                  // If all verifications are complete, disable all tabs
                  (licenseVerified && faceVerified && phoneVerified && emailVerified &&
                   documentVerified && governmentIdVerified && biometricVerified);

                return (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex-1 min-w-[80px]"
                  >
                    <TabsTrigger
                      value={type.id}
                      disabled={isDisabled}
                      className={`
                        relative w-full rounded-lg transition-all duration-300
                        ${isVerified
                          ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-green-500 data-[state=active]:text-white'
                          : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-blue-500 data-[state=active]:text-white'
                        }
                        ${isDisabled && !isVerified ? 'opacity-50' : 'hover:opacity-90'}
                      `}
                    >
                      {type.required && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + (0.1 * index) }}
                          className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full shadow-sm"
                        />
                      )}

                      <div className="flex items-center justify-center">
                        {isVerified ? (
                          <div className="mr-1 bg-white bg-opacity-20 p-1 rounded-full">
                            <Check size={12} />
                          </div>
                        ) : (
                          <div className={`mr-1 ${activeTab === type.id ? 'bg-white bg-opacity-20 p-1 rounded-full' : ''}`}>
                            <type.icon size={12} />
                          </div>
                        )}
                        <span className="hidden sm:inline text-xs">{type.name}</span>
                        <span className="sm:hidden text-xs">{type.name.split(' ')[0]}</span>
                      </div>

                      {/* Animated pulse for active tab */}
                      {activeTab === type.id && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </TabsTrigger>
                  </motion.div>
                );
              })}
            </TabsList>
          </Tabs>
        </motion.div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-6">
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            onClick={onPrev}
            className="relative overflow-hidden group border-2 border-gray-300 hover:border-gray-400 px-6 py-2 rounded-xl transition-all duration-300"
          >
            <span className="absolute inset-0 w-0 bg-gray-100 transition-all duration-300 group-hover:w-full"></span>
            <span className="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </span>
          </Button>

          <Button
            className={`relative overflow-hidden group px-6 py-2 rounded-xl transition-all duration-300 shadow-md ${
              !isRequiredVerificationComplete
                ? 'bg-gray-300 cursor-not-allowed'
                : isAllVerificationComplete
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
            }`}
            onClick={onNext}
            disabled={!isRequiredVerificationComplete}
          >
            <span className="relative flex items-center text-white font-medium">
              {isAllVerificationComplete ? 'Continue with Full Verification' : 'Continue'}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Button>
        </div>

        <div className="w-full border-t border-gray-200 pt-4">
          <Button
            variant="outline"
            className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100 py-5 border-2 border-gray-300"
            onClick={onSkip}
          >
            I'll Complete Later
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VerificationStep;
