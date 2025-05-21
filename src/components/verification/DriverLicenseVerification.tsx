import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface DriverLicenseVerificationProps {
  onVerificationComplete: (verified: boolean, licenseData?: any) => void;
}

const DriverLicenseVerification: React.FC<DriverLicenseVerificationProps> = ({ 
  onVerificationComplete 
}) => {
  const { toast } = useToast();
  const [captureMode, setCaptureMode] = useState<'camera' | 'upload'>('camera');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'capturing' | 'processing' | 'success' | 'failed'>('idle');
  const [progress, setProgress] = useState(0);
  const [licenseImage, setLicenseImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment'
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setCaptureMode('camera');
      setVerificationStatus('capturing');
      
      toast({
        title: "Camera Started",
        description: "Position your driver's license within the frame.",
      });
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please try uploading instead.",
        variant: "destructive"
      });
      setCaptureMode('upload');
    }
  }, [toast]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Capture image from camera
  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageDataUrl = canvas.toDataURL('image/png');
        setLicenseImage(imageDataUrl);
        processLicenseImage(imageDataUrl);
      }
    }
  }, []);

  // Handle file upload
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setLicenseImage(imageDataUrl);
        processLicenseImage(imageDataUrl);
      };
      
      reader.readAsDataURL(file);
    }
  }, []);

  // Process license image (simulated)
  const processLicenseImage = useCallback((imageData: string) => {
    setVerificationStatus('processing');
    
    // Simulate processing with progress updates
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        
        // Simulate successful verification (90% success rate)
        const isSuccessful = Math.random() < 0.9;
        
        if (isSuccessful) {
          setVerificationStatus('success');
          
          // Mock license data
          const licenseData = {
            name: "John Doe",
            licenseNumber: "DL" + Math.floor(Math.random() * 10000000),
            expiryDate: "2025-12-31",
            issueDate: "2020-01-15",
            verified: true
          };
          
          toast({
            title: "Verification Successful",
            description: "Your driver's license has been verified successfully.",
          });
          
          onVerificationComplete(true, licenseData);
        } else {
          setVerificationStatus('failed');
          
          toast({
            title: "Verification Failed",
            description: "We couldn't verify your driver's license. Please try again.",
            variant: "destructive"
          });
          
          onVerificationComplete(false);
        }
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [onVerificationComplete, toast]);

  // Reset verification
  const resetVerification = useCallback(() => {
    setVerificationStatus('idle');
    setProgress(0);
    setLicenseImage(null);
    
    if (captureMode === 'camera') {
      startCamera();
    }
  }, [captureMode, startCamera]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Driver's License Verification</h3>
        <p className="text-sm text-gray-500">
          Please provide a clear image of your driver's license for verification
        </p>
      </div>

      {/* Capture mode selection */}
      {verificationStatus === 'idle' && (
        <div className="flex justify-center space-x-4">
          <Button
            onClick={startCamera}
            className="flex items-center space-x-2"
          >
            <Camera size={16} />
            <span>Use Camera</span>
          </Button>
          <Button
            onClick={() => {
              setCaptureMode('upload');
              fileInputRef.current?.click();
            }}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Upload size={16} />
            <span>Upload Image</span>
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </div>
      )}

      {/* Camera view */}
      {captureMode === 'camera' && verificationStatus === 'capturing' && (
        <div className="space-y-4">
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden aspect-video bg-gray-50">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-2 border-green-500 w-4/5 h-3/5 rounded-md opacity-50"></div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button onClick={captureImage} className="bg-green-500 hover:bg-green-600">
              Capture License
            </Button>
          </div>
        </div>
      )}

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Processing state */}
      {verificationStatus === 'processing' && (
        <div className="space-y-4">
          {licenseImage && (
            <div className="border rounded-lg overflow-hidden">
              <img src={licenseImage} alt="Driver's License" className="w-full" />
            </div>
          )}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Verifying license...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      )}

      {/* Success state */}
      {verificationStatus === 'success' && (
        <div className="space-y-4">
          {licenseImage && (
            <div className="border rounded-lg overflow-hidden">
              <img src={licenseImage} alt="Driver's License" className="w-full" />
            </div>
          )}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
            <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-green-800">Verification Successful</h4>
              <p className="text-sm text-green-700">Your driver's license has been verified successfully.</p>
            </div>
          </div>
        </div>
      )}

      {/* Failed state */}
      {verificationStatus === 'failed' && (
        <div className="space-y-4">
          {licenseImage && (
            <div className="border rounded-lg overflow-hidden">
              <img src={licenseImage} alt="Driver's License" className="w-full" />
            </div>
          )}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-red-800">Verification Failed</h4>
              <p className="text-sm text-red-700">We couldn't verify your license. Please ensure the image is clear and try again.</p>
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

export default DriverLicenseVerification;
