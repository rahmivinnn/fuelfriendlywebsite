import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Check, AlertCircle, RefreshCw, Loader2, Scan, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface BiometricVerificationProps {
  onVerificationComplete: (verified: boolean, biometricData?: any) => void;
}

const BiometricVerification: React.FC<BiometricVerificationProps> = ({ 
  onVerificationComplete 
}) => {
  const { toast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'scanning' | 'processing' | 'success' | 'failed'>('idle');
  const [progress, setProgress] = useState(0);
  const [scanType, setScanType] = useState<'fingerprint' | 'face' | 'voice'>('fingerprint');

  // Start biometric verification
  const startVerification = (type: 'fingerprint' | 'face' | 'voice') => {
    setScanType(type);
    setVerificationStatus('scanning');
    setProgress(0);
    
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Scan Started`,
      description: `Please follow the instructions to complete your ${type} scan.`,
    });
    
    // Simulate scanning process
    let currentProgress = 0;
    const scanInterval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(scanInterval);
        processBiometricData();
      }
    }, 200);
    
    return () => clearInterval(scanInterval);
  };

  // Process biometric data (simulated)
  const processBiometricData = () => {
    setVerificationStatus('processing');
    setProgress(0);
    
    // Simulate processing with progress updates
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 3;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        
        // Simulate successful verification (90% success rate)
        const isSuccessful = Math.random() < 0.9;
        
        if (isSuccessful) {
          setVerificationStatus('success');
          
          // Mock biometric data
          const biometricData = {
            scanType: scanType,
            verificationId: "BIO" + Math.floor(Math.random() * 10000000),
            verifiedAt: new Date().toISOString(),
            confidenceScore: Math.floor(Math.random() * 20) + 80, // 80-99%
            verified: true
          };
          
          toast({
            title: "Verification Successful",
            description: `Your ${scanType} scan has been verified successfully.`,
          });
          
          onVerificationComplete(true, biometricData);
        } else {
          setVerificationStatus('failed');
          
          toast({
            title: "Verification Failed",
            description: `We couldn't verify your ${scanType} scan. Please try again.`,
            variant: "destructive"
          });
          
          onVerificationComplete(false);
        }
      }
    }, 100);
    
    return () => clearInterval(interval);
  };

  // Reset verification
  const resetVerification = () => {
    setVerificationStatus('idle');
    setProgress(0);
  };

  // Get scan type icon
  const getScanTypeIcon = () => {
    switch (scanType) {
      case 'fingerprint':
        return <Fingerprint size={24} />;
      case 'face':
        return <Scan size={24} />;
      case 'voice':
        return <Shield size={24} />;
      default:
        return <Fingerprint size={24} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Biometric Verification</h3>
        <p className="text-sm text-gray-500">
          Verify your identity using biometric authentication
        </p>
      </div>

      {/* Biometric selection */}
      {verificationStatus === 'idle' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              onClick={() => startVerification('fingerprint')}
              className="relative cursor-pointer bg-gradient-to-br from-purple-50 to-indigo-100 hover:from-purple-100 hover:to-indigo-200 border-2 border-indigo-200 rounded-xl p-6 transition-all duration-300 hover:shadow-md flex flex-col items-center justify-center text-center"
            >
              <div className="bg-indigo-500 text-white p-3 rounded-full mb-3">
                <Fingerprint size={24} />
              </div>
              <h4 className="font-medium text-indigo-800 mb-1">Fingerprint</h4>
              <p className="text-xs text-indigo-600">Scan your fingerprint for verification</p>
            </div>
            
            <div 
              onClick={() => startVerification('face')}
              className="relative cursor-pointer bg-gradient-to-br from-blue-50 to-cyan-100 hover:from-blue-100 hover:to-cyan-200 border-2 border-cyan-200 rounded-xl p-6 transition-all duration-300 hover:shadow-md flex flex-col items-center justify-center text-center"
            >
              <div className="bg-cyan-500 text-white p-3 rounded-full mb-3">
                <Scan size={24} />
              </div>
              <h4 className="font-medium text-cyan-800 mb-1">Face Scan</h4>
              <p className="text-xs text-cyan-600">Use facial recognition for verification</p>
            </div>
            
            <div 
              onClick={() => startVerification('voice')}
              className="relative cursor-pointer bg-gradient-to-br from-emerald-50 to-teal-100 hover:from-emerald-100 hover:to-teal-200 border-2 border-teal-200 rounded-xl p-6 transition-all duration-300 hover:shadow-md flex flex-col items-center justify-center text-center"
            >
              <div className="bg-teal-500 text-white p-3 rounded-full mb-3">
                <Shield size={24} />
              </div>
              <h4 className="font-medium text-teal-800 mb-1">Voice Recognition</h4>
              <p className="text-xs text-teal-600">Verify using your unique voice pattern</p>
            </div>
          </div>
          
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <h4 className="text-sm font-medium text-indigo-800 mb-2 flex items-center">
              <Fingerprint size={16} className="mr-2" />
              Why Biometric Verification?
            </h4>
            <p className="text-xs text-indigo-700 mb-2">
              Biometric verification provides an additional layer of security by using your unique physical characteristics to confirm your identity.
            </p>
            <ul className="text-xs text-indigo-700 space-y-1 list-disc pl-5">
              <li>Enhanced security for your account</li>
              <li>Faster verification in the future</li>
              <li>Prevents unauthorized access</li>
              <li>Your biometric data is encrypted and secure</li>
            </ul>
          </div>
        </div>
      )}

      {/* Scanning state */}
      {verificationStatus === 'scanning' && (
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                <div className="text-indigo-600">
                  {getScanTypeIcon()}
                </div>
              </div>
            </div>
            
            <h4 className="text-lg font-medium text-gray-800 mb-2">
              {scanType === 'fingerprint' && 'Place your finger on the scanner'}
              {scanType === 'face' && 'Look directly at the camera'}
              {scanType === 'voice' && 'Speak the phrase shown below'}
            </h4>
            
            {scanType === 'voice' && (
              <div className="bg-gray-100 p-3 rounded-lg mb-4">
                <p className="text-center font-medium">"My voice is my password"</p>
              </div>
            )}
            
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scanning...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
      )}

      {/* Processing state */}
      {verificationStatus === 'processing' && (
        <div className="text-center py-8">
          <div className="inline-block p-3 rounded-full bg-blue-100 mb-4">
            <Loader2 size={32} className="text-blue-600 animate-spin" />
          </div>
          <h4 className="text-lg font-medium mb-2">Processing Your Biometrics</h4>
          <p className="text-sm text-gray-600 mb-4">Please wait while we verify your identity</p>
          <div className="w-full max-w-md mx-auto space-y-2">
            <div className="flex justify-between text-sm">
              <span>Verifying...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      )}

      {/* Success state */}
      {verificationStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <h4 className="font-medium text-green-800 text-lg mb-2">Biometric Verification Successful</h4>
            <p className="text-sm text-green-700">
              Your {scanType} has been successfully verified with a high confidence score.
            </p>
          </div>
        </motion.div>
      )}

      {/* Failed state */}
      {verificationStatus === 'failed' && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="text-red-600" size={32} />
            </div>
            <h4 className="font-medium text-red-800 text-lg mb-2">Verification Failed</h4>
            <p className="text-sm text-red-700 mb-4">
              We couldn't verify your {scanType}. This could be due to poor scan quality or positioning.
            </p>
            <Button onClick={resetVerification} variant="outline" className="flex items-center space-x-2">
              <RefreshCw size={16} />
              <span>Try Again</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiometricVerification;
