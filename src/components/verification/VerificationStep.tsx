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
      <CardHeader>
        <CardTitle className="flex items-center">
          <BadgeCheck className="mr-2 text-green-500" size={24} />
          Identity Verification
        </CardTitle>
        <CardDescription>
          Complete the verification process to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Free verification notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
          <ShieldCheck className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-medium text-blue-800">Free for Station Owners</h4>
            <p className="text-sm text-blue-700">
              The verification process is completely free for all station owners. This helps us ensure the security and quality of our platform.
            </p>
          </div>
        </div>

        {/* Verification progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Verification Progress</span>
            <span className="text-sm font-medium">{verificationProgress}%</span>
          </div>
          <Progress value={verificationProgress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Required: {[licenseVerified, faceVerified].filter(Boolean).length}/{requiredVerifications.length}</span>
            <span>Optional: {[phoneVerified, emailVerified, documentVerified].filter(Boolean).length}/{verificationTypes.length - requiredVerifications.length}</span>
          </div>
        </div>

        {/* Verification status summary */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {verificationTypes.map((type) => {
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
              <div
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-md ${
                  isVerified
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="relative">
                    {type.required && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                    )}
                    {isVerified ? (
                      <div className="bg-green-100 p-1.5 rounded-full">
                        <Check className="text-green-500" size={16} />
                      </div>
                    ) : (
                      <div className="bg-gray-100 p-1.5 rounded-full">
                        <type.icon className="text-gray-400" size={16} />
                      </div>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${
                    isVerified ? 'text-green-800' : 'text-gray-600'
                  }`}>
                    {type.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap w-full">
            {verificationTypes.map((type) => {
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
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  disabled={isDisabled}
                  className={`relative flex-1 min-w-[80px] ${isVerified ? 'bg-green-50 data-[state=active]:bg-green-100' : ''}`}
                >
                  {type.required && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                  {isVerified ? (
                    <Check className="mr-1" size={14} />
                  ) : (
                    <type.icon className="mr-1" size={14} />
                  )}
                  <span className="hidden sm:inline">{type.name}</span>
                  <span className="sm:hidden">{type.name.split(' ')[0]}</span>
                </TabsTrigger>
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
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
        >
          Back
        </Button>
        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={onNext}
          disabled={!isRequiredVerificationComplete}
        >
          {isAllVerificationComplete ? 'Continue with Full Verification' : 'Continue'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationStep;
