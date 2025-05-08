import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, AlertCircle, RefreshCw, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface EmailVerificationProps {
  email: string;
  onVerificationComplete: (verified: boolean, emailData?: any) => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ 
  email,
  onVerificationComplete 
}) => {
  const { toast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'sent' | 'verifying' | 'success' | 'failed'>('idle');
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  // Handle verification code change
  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^\d]/g, '');
    setVerificationCode(value);
  };

  // Send verification code
  const sendVerificationCode = () => {
    // Validate email
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setVerificationStatus('sent');
    setTimeLeft(60);
    setIsResendDisabled(true);

    toast({
      title: "Verification Code Sent",
      description: `A verification code has been sent to ${email}.`,
    });

    // In a real app, this would call an API to send an email
    console.log(`Sending verification code ${code} to ${email}`);
  };

  // Verify the code
  const verifyCode = () => {
    setVerificationStatus('verifying');

    // Simulate API call
    setTimeout(() => {
      if (verificationCode === generatedCode) {
        setVerificationStatus('success');
        
        toast({
          title: "Email Verified",
          description: "Your email address has been successfully verified.",
        });

        // Pass the verified email data back to parent
        onVerificationComplete(true, {
          email: email,
          verified: true,
          verifiedAt: new Date().toISOString()
        });
      } else {
        setVerificationStatus('failed');
        
        toast({
          title: "Verification Failed",
          description: "The verification code you entered is incorrect. Please try again.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  // Reset verification
  const resetVerification = () => {
    setVerificationStatus('idle');
    setVerificationCode('');
  };

  // Resend verification code
  const resendVerificationCode = () => {
    // Generate a new random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setTimeLeft(60);
    setIsResendDisabled(true);

    toast({
      title: "New Code Sent",
      description: `A new verification code has been sent to ${email}.`,
    });

    // In a real app, this would call an API to send an email
    console.log(`Resending verification code ${code} to ${email}`);
  };

  // Countdown timer for resend button
  useEffect(() => {
    if (verificationStatus === 'sent' && timeLeft > 0 && isResendDisabled) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      setIsResendDisabled(false);
    }
  }, [timeLeft, isResendDisabled, verificationStatus]);

  // For demo purposes only - show the code in the console
  useEffect(() => {
    if (generatedCode) {
      console.log(`DEMO: Your email verification code is ${generatedCode}`);
      // In a real app, we would never log this or expose it to the client
    }
  }, [generatedCode]);

  // Auto-send verification code on component mount if email is provided
  useEffect(() => {
    if (email && verificationStatus === 'idle') {
      sendVerificationCode();
    }
  }, [email]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Email Verification</h3>
        <p className="text-sm text-gray-500">
          Verify your email address to secure your account
        </p>
      </div>

      {/* Email display */}
      {verificationStatus === 'idle' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              value={email}
              disabled
              className="bg-gray-50"
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll send a verification code to this email
            </p>
          </div>
          <Button
            onClick={sendVerificationCode}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            <Mail size={16} className="mr-2" />
            Send Verification Code
          </Button>
        </div>
      )}

      {/* Verification code input */}
      {verificationStatus === 'sent' && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="verificationCode">Verification Code</Label>
            <Input
              id="verificationCode"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              placeholder="Enter 6-digit code"
              className="text-center text-lg tracking-widest"
              maxLength={6}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={verifyCode}
              className="flex-1 bg-green-500 hover:bg-green-600"
              disabled={verificationCode.length !== 6}
            >
              <Check size={16} className="mr-2" />
              Verify Code
            </Button>
            
            <Button
              onClick={resendVerificationCode}
              variant="outline"
              disabled={isResendDisabled}
              className="flex items-center"
            >
              {isResendDisabled ? (
                <>
                  <Clock size={16} className="mr-2" />
                  {timeLeft}s
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Resend
                </>
              )}
            </Button>
          </div>
          
          <p className="text-xs text-center text-gray-500">
            Didn't receive the code? Check your spam folder or try resending after the timer expires.
          </p>
        </div>
      )}

      {/* Verifying state */}
      {verificationStatus === 'verifying' && (
        <div className="text-center py-4">
          <div className="inline-block p-3 rounded-full bg-blue-100 mb-4">
            <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-sm text-gray-600">Verifying your code...</p>
        </div>
      )}

      {/* Success state */}
      {verificationStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
            <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-green-800">Email Verified</h4>
              <p className="text-sm text-green-700">
                Your email address {email} has been successfully verified.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Failed state */}
      {verificationStatus === 'failed' && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-red-800">Verification Failed</h4>
              <p className="text-sm text-red-700">The code you entered is incorrect. Please try again.</p>
            </div>
          </div>
          <div className="flex justify-center">
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

export default EmailVerification;
