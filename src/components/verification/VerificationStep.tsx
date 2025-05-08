import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check, AlertCircle, ShieldCheck, BadgeCheck, LucideIcon,
  FileText, Phone, Mail, CreditCard, User, Fingerprint,
  IdCard, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import DriverLicenseVerification from './DriverLicenseVerification';
import FaceVerification from './FaceVerification';
import PhoneVerification from './PhoneVerification';
import EmailVerification from './EmailVerification';
import DocumentVerification from './DocumentVerification';
import BiometricVerification from './BiometricVerification';
import GovernmentIdVerification from './GovernmentIdVerification';

interface VerificationStepProps {
  onNext: () => void;
  onPrev: () => void;
  email?: string;
}

// Define verification types
type VerificationType = {
  id: string;
  name: string;
  icon: LucideIcon;
  required: boolean;
  description: string;
};

const VerificationStep: React.FC<VerificationStepProps> = ({ onNext, onPrev, email = '' }) => {
  const [activeTab, setActiveTab] = useState('license');
  const [verificationProgress, setVerificationProgress] = useState(0);

  // Verification states
  const [licenseVerified, setLicenseVerified] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [documentVerified, setDocumentVerified] = useState(false);
  const [governmentIdVerified, setGovernmentIdVerified] = useState(false);
  const [biometricVerified, setBiometricVerified] = useState(false);

  // Verification data
  const [licenseData, setLicenseData] = useState<any>(null);
  const [phoneData, setPhoneData] = useState<any>(null);
  const [emailData, setEmailData] = useState<any>(null);
  const [documentData, setDocumentData] = useState<any>(null);
  const [governmentIdData, setGovernmentIdData] = useState<any>(null);
  const [biometricData, setBiometricData] = useState<any>(null);

  // Define verification types
  const verificationTypes: VerificationType[] = [
    {
      id: 'license',
      name: 'Driver\'s License',
      icon: CreditCard,
      required: true,
      description: 'Verify your driver\'s license for identity confirmation'
    },
    {
      id: 'face',
      name: 'Face Verification',
      icon: User,
      required: true,
      description: 'Confirm your identity with facial recognition'
    },
    {
      id: 'government_id',
      name: 'Government ID',
      icon: IdCard,
      required: false,
      description: 'Verify using passport, national ID, or residence permit'
    },
    {
      id: 'biometric',
      name: 'Biometric',
      icon: Fingerprint,
      required: false,
      description: 'Use fingerprint, face scan, or voice recognition'
    },
    {
      id: 'phone',
      name: 'Phone Number',
      icon: Phone,
      required: false,
      description: 'Verify your phone number for account recovery'
    },
    {
      id: 'email',
      name: 'Email Address',
      icon: Mail,
      required: false,
      description: 'Confirm your email address for notifications'
    },
    {
      id: 'document',
      name: 'Business Document',
      icon: FileText,
      required: false,
      description: 'Verify your business documents for full verification'
    }
  ];

  // Get required verification types
  const requiredVerifications = verificationTypes.filter(v => v.required);

  // Handle verification completion
  const handleLicenseVerification = (verified: boolean, data?: any) => {
    setLicenseVerified(verified);
    if (verified && data) {
      setLicenseData(data);
      updateVerificationProgress();
      // Automatically switch to face verification after successful license verification
      setTimeout(() => {
        setActiveTab('face');
      }, 1500);
    }
  };

  const handleFaceVerification = (verified: boolean) => {
    setFaceVerified(verified);
    updateVerificationProgress();
  };

  const handlePhoneVerification = (verified: boolean, data?: any) => {
    setPhoneVerified(verified);
    if (verified && data) {
      setPhoneData(data);
      updateVerificationProgress();
    }
  };

  const handleEmailVerification = (verified: boolean, data?: any) => {
    setEmailVerified(verified);
    if (verified && data) {
      setEmailData(data);
      updateVerificationProgress();
    }
  };

  const handleDocumentVerification = (verified: boolean, data?: any) => {
    setDocumentVerified(verified);
    if (verified && data) {
      setDocumentData(data);
      updateVerificationProgress();
    }
  };

  const handleGovernmentIdVerification = (verified: boolean, data?: any) => {
    setGovernmentIdVerified(verified);
    if (verified && data) {
      setGovernmentIdData(data);
      updateVerificationProgress();
    }
  };

  const handleBiometricVerification = (verified: boolean, data?: any) => {
    setBiometricVerified(verified);
    if (verified && data) {
      setBiometricData(data);
      updateVerificationProgress();
    }
  };

  // Update verification progress
  const updateVerificationProgress = () => {
    // Calculate progress based on completed verifications
    const completedRequired = [licenseVerified, faceVerified].filter(Boolean).length;
    const totalRequired = requiredVerifications.length;

    const completedOptional = [
      phoneVerified,
      emailVerified,
      documentVerified,
      governmentIdVerified,
      biometricVerified
    ].filter(Boolean).length;
    const totalOptional = verificationTypes.length - totalRequired;

    // Weight required verifications more heavily (70% of progress)
    const requiredWeight = 70;
    const optionalWeight = 30;

    const requiredProgress = (completedRequired / totalRequired) * requiredWeight;
    const optionalProgress = (completedOptional / totalOptional) * optionalWeight;

    const totalProgress = Math.round(requiredProgress + optionalProgress);
    setVerificationProgress(totalProgress);
  };

  // Check if all required verifications are complete
  const isRequiredVerificationComplete = licenseVerified && faceVerified;

  // Check if all verifications are complete
  const isAllVerificationComplete = licenseVerified &&
    faceVerified &&
    phoneVerified &&
    emailVerified &&
    documentVerified &&
    governmentIdVerified &&
    biometricVerified;

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-70"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200 rounded-full -ml-12 -mb-12 opacity-20"></div>

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-full mr-3">
              <BadgeCheck className="text-white" size={28} />
            </div>
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Identity Verification
              </CardTitle>
              <CardDescription className="mt-1">
                Complete the verification process to continue
              </CardDescription>
            </div>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Free verification notice */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 flex items-start shadow-sm"
        >
          <div className="bg-white p-2 rounded-full mr-3 shadow-md">
            <ShieldCheck className="text-blue-500" size={24} />
          </div>
          <div>
            <h4 className="font-medium text-blue-800 text-lg">Free for Station Owners</h4>
            <p className="text-sm text-blue-700 mt-1">
              The verification process is completely free for all station owners. This helps us ensure the security and quality of our platform.
            </p>
          </div>
        </motion.div>

        {/* Verification progress */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">Verification Progress</span>
            </div>
            <motion.span
              key={verificationProgress}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-sm font-bold bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full"
            >
              {verificationProgress}%
            </motion.span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${verificationProgress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
              ></motion.div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 px-1">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-red-100 border border-red-300 rounded-full mr-1 flex items-center justify-center text-[8px] text-red-500 font-bold">!</span>
              <span>Required: {[licenseVerified, faceVerified].filter(Boolean).length}/{requiredVerifications.length}</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-blue-100 border border-blue-300 rounded-full mr-1 flex items-center justify-center text-[8px] text-blue-500 font-bold">+</span>
              <span>Optional: {[phoneVerified, emailVerified, documentVerified, governmentIdVerified, biometricVerified].filter(Boolean).length}/{verificationTypes.length - requiredVerifications.length}</span>
            </div>
          </div>
        </motion.div>

        {/* Verification status summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-3 sm:grid-cols-4 gap-3"
        >
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

            return (
              <motion.div
                key={type.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(type.id)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 shadow-sm ${
                  isVerified
                    ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:border-blue-200 hover:from-blue-50 hover:to-blue-100'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative">
                    {type.required && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.5, delay: 0.5 + (0.1 * index) }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm z-10"
                      />
                    )}
                    {isVerified ? (
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5, delay: 0.2 * index }}
                        className="bg-gradient-to-br from-green-400 to-green-500 p-2.5 rounded-full shadow-md"
                      >
                        <Check className="text-white" size={18} />
                      </motion.div>
                    ) : (
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-2.5 rounded-full shadow-md">
                        <type.icon className={`${activeTab === type.id ? 'text-blue-500' : 'text-gray-400'}`} size={18} />
                      </div>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${
                    isVerified ? 'text-green-800' : activeTab === type.id ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {type.name}
                  </span>

                  {/* Status indicator */}
                  {isVerified ? (
                    <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  ) : type.required ? (
                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  ) : (
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      Optional
                    </span>
                  )}
                </div>
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

          {/* License verification */}
          <TabsContent value="license" className="mt-4">
            {licenseVerified ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-green-800">License Verified</h4>
                    <p className="text-sm text-green-700">Your driver's license has been successfully verified.</p>
                  </div>
                </div>
                {licenseData && (
                  <div className="border rounded-lg p-4 space-y-2">
                    <h4 className="text-sm font-medium">License Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Name:</div>
                      <div>{licenseData.name}</div>
                      <div className="text-gray-500">License Number:</div>
                      <div>{licenseData.licenseNumber}</div>
                      <div className="text-gray-500">Expiry Date:</div>
                      <div>{licenseData.expiryDate}</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <DriverLicenseVerification onVerificationComplete={handleLicenseVerification} />
            )}
          </TabsContent>

          {/* Face verification */}
          <TabsContent value="face" className="mt-4">
            {faceVerified ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-medium text-green-800">Face Verified</h4>
                  <p className="text-sm text-green-700">Your identity has been successfully verified.</p>
                </div>
              </div>
            ) : (
              <FaceVerification onVerificationComplete={handleFaceVerification} />
            )}
          </TabsContent>

          {/* Phone verification */}
          <TabsContent value="phone" className="mt-4">
            {phoneVerified ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-medium text-green-800">Phone Verified</h4>
                  <p className="text-sm text-green-700">
                    Your phone number {phoneData?.phoneNumber} has been successfully verified.
                  </p>
                </div>
              </div>
            ) : (
              <PhoneVerification onVerificationComplete={handlePhoneVerification} />
            )}
          </TabsContent>

          {/* Email verification */}
          <TabsContent value="email" className="mt-4">
            {emailVerified ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-medium text-green-800">Email Verified</h4>
                  <p className="text-sm text-green-700">
                    Your email address {emailData?.email} has been successfully verified.
                  </p>
                </div>
              </div>
            ) : (
              <EmailVerification email={email} onVerificationComplete={handleEmailVerification} />
            )}
          </TabsContent>

          {/* Document verification */}
          <TabsContent value="document" className="mt-4">
            {documentVerified ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-green-800">Document Verified</h4>
                    <p className="text-sm text-green-700">
                      Your {documentData?.documentTypeLabel} has been successfully verified.
                    </p>
                  </div>
                </div>
                {documentData && (
                  <div className="border rounded-lg p-4 space-y-2">
                    <h4 className="text-sm font-medium">Document Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Document Type:</div>
                      <div>{documentData.documentTypeLabel}</div>
                      <div className="text-gray-500">Verification ID:</div>
                      <div>{documentData.verificationId}</div>
                      <div className="text-gray-500">Verified At:</div>
                      <div>{new Date(documentData.verifiedAt).toLocaleString()}</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <DocumentVerification onVerificationComplete={handleDocumentVerification} />
            )}
          </TabsContent>

          {/* Government ID verification */}
          <TabsContent value="government_id" className="mt-4">
            {governmentIdVerified ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-green-800">Government ID Verified</h4>
                    <p className="text-sm text-green-700">
                      Your {governmentIdData?.idTypeLabel} has been successfully verified.
                    </p>
                  </div>
                </div>
                {governmentIdData && (
                  <div className="border rounded-lg p-4 space-y-2">
                    <h4 className="text-sm font-medium">ID Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">ID Type:</div>
                      <div>{governmentIdData.idTypeLabel}</div>
                      <div className="text-gray-500">Verification ID:</div>
                      <div>{governmentIdData.verificationId}</div>
                      <div className="text-gray-500">Verified At:</div>
                      <div>{new Date(governmentIdData.verifiedAt).toLocaleString()}</div>
                      <div className="text-gray-500">Expiry Date:</div>
                      <div>{new Date(governmentIdData.expiryDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <GovernmentIdVerification onVerificationComplete={handleGovernmentIdVerification} />
            )}
          </TabsContent>

          {/* Biometric verification */}
          <TabsContent value="biometric" className="mt-4">
            {biometricVerified ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-green-800">Biometric Verification Complete</h4>
                    <p className="text-sm text-green-700">
                      Your {biometricData?.scanType} scan has been successfully verified.
                    </p>
                  </div>
                </div>
                {biometricData && (
                  <div className="border rounded-lg p-4 space-y-2">
                    <h4 className="text-sm font-medium">Biometric Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Scan Type:</div>
                      <div>{biometricData.scanType}</div>
                      <div className="text-gray-500">Confidence Score:</div>
                      <div>{biometricData.confidenceScore}%</div>
                      <div className="text-gray-500">Verification ID:</div>
                      <div>{biometricData.verificationId}</div>
                      <div className="text-gray-500">Verified At:</div>
                      <div>{new Date(biometricData.verifiedAt).toLocaleString()}</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <BiometricVerification onVerificationComplete={handleBiometricVerification} />
            )}
          </TabsContent>
        </Tabs>

        {/* Required verification complete message */}
        {isRequiredVerificationComplete && !isAllVerificationComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-green-100 p-2 rounded-full">
                <ShieldCheck className="text-green-600" size={24} />
              </div>
              <h3 className="font-medium text-green-800">Required Verification Complete!</h3>
            </div>
            <p className="text-sm text-green-700">
              You've completed all required verifications. You can proceed now or complete the optional verifications for enhanced security.
            </p>
          </motion.div>
        )}

        {/* All verification complete message */}
        {isAllVerificationComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-green-100 p-2 rounded-full">
                <BadgeCheck className="text-green-600" size={24} />
              </div>
              <h3 className="font-medium text-green-800">Full Verification Complete!</h3>
            </div>
            <p className="text-sm text-green-700">
              Congratulations! You've completed all verifications. Your account has the highest level of security and trust.
            </p>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
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
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
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
            {isRequiredVerificationComplete && (
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
            )}
            <span className="relative flex items-center text-white font-medium">
              {isAllVerificationComplete ? 'Continue with Full Verification' : 'Continue'}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>

            {/* Animated dots for disabled state */}
            {!isRequiredVerificationComplete && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ scale: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 bg-white rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                    className="w-1.5 h-1.5 bg-white rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                    className="w-1.5 h-1.5 bg-white rounded-full"
                  />
                </div>
              </div>
            )}
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
};

export default VerificationStep;
