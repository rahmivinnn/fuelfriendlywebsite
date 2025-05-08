import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FileCheck, Upload, Check, AlertCircle, RefreshCw, Camera, 
  Image, Loader2, CreditCard, Passport, IdCard, FileText 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface GovernmentIdVerificationProps {
  onVerificationComplete: (verified: boolean, idData?: any) => void;
}

const GovernmentIdVerification: React.FC<GovernmentIdVerificationProps> = ({ 
  onVerificationComplete 
}) => {
  const { toast } = useToast();
  const [idType, setIdType] = useState<string>('national_id');
  const [captureMode, setCaptureMode] = useState<'camera' | 'upload'>('upload');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'capturing' | 'processing' | 'success' | 'failed'>('idle');
  const [progress, setProgress] = useState(0);
  const [idImage, setIdImage] = useState<string | null>(null);
  const [captureSide, setCaptureSide] = useState<'front' | 'back'>('front');
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // ID type options
  const idTypes = [
    { value: 'national_id', label: 'National ID Card', icon: IdCard, requiresBack: true },
    { value: 'passport', label: 'Passport', icon: Passport, requiresBack: false },
    { value: 'drivers_license', label: 'Driver\'s License', icon: CreditCard, requiresBack: true },
    { value: 'residence_permit', label: 'Residence Permit', icon: FileText, requiresBack: true }
  ];

  // Get current ID type details
  const getCurrentIdType = () => {
    return idTypes.find(id => id.value === idType) || idTypes[0];
  };

  // Handle ID type change
  const handleIdTypeChange = (value: string) => {
    setIdType(value);
    setCaptureSide('front');
    setFrontImage(null);
    setBackImage(null);
  };

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
        description: `Position your ${getCurrentIdType().label} ${captureSide} side within the frame.`,
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
  }, [toast, idType, captureSide]);

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
        
        if (captureSide === 'front') {
          setFrontImage(imageDataUrl);
          
          // If back side is required, switch to back side
          if (getCurrentIdType().requiresBack) {
            setCaptureSide('back');
            toast({
              title: "Front Side Captured",
              description: "Now please capture the back side of your ID.",
            });
          } else {
            // If back side is not required, process the ID
            setIdImage(imageDataUrl);
            processIdImage(imageDataUrl);
          }
        } else {
          setBackImage(imageDataUrl);
          // Process both front and back images
          processIdImage(frontImage!, imageDataUrl);
        }
      }
    }
  }, [captureSide, frontImage]);

  // Handle file upload
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive"
        });
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file.",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        
        if (captureSide === 'front') {
          setFrontImage(imageDataUrl);
          
          // If back side is required, switch to back side
          if (getCurrentIdType().requiresBack) {
            setCaptureSide('back');
            toast({
              title: "Front Side Uploaded",
              description: "Now please upload the back side of your ID.",
            });
          } else {
            // If back side is not required, process the ID
            setIdImage(imageDataUrl);
            processIdImage(imageDataUrl);
          }
        } else {
          setBackImage(imageDataUrl);
          // Process both front and back images
          processIdImage(frontImage!, imageDataUrl);
        }
      };
      
      reader.readAsDataURL(file);
    }
  }, [captureSide, frontImage, toast]);

  // Process ID image (simulated)
  const processIdImage = useCallback((frontImageData: string, backImageData?: string) => {
    setVerificationStatus('processing');
    stopCamera();
    
    // Simulate processing with progress updates
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        
        // Simulate successful verification (85% success rate)
        const isSuccessful = Math.random() < 0.85;
        
        if (isSuccessful) {
          setVerificationStatus('success');
          
          // Mock ID data
          const idData = {
            idType: idType,
            idTypeLabel: getCurrentIdType().label,
            verificationId: "ID" + Math.floor(Math.random() * 10000000),
            verifiedAt: new Date().toISOString(),
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
            verified: true,
            hasBothSides: !!backImageData
          };
          
          toast({
            title: "Verification Successful",
            description: `Your ${getCurrentIdType().label} has been verified successfully.`,
          });
          
          onVerificationComplete(true, idData);
        } else {
          setVerificationStatus('failed');
          
          toast({
            title: "Verification Failed",
            description: `We couldn't verify your ${getCurrentIdType().label}. Please try again with a clearer image.`,
            variant: "destructive"
          });
          
          onVerificationComplete(false);
        }
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [idType, getCurrentIdType, onVerificationComplete, stopCamera, toast]);

  // Reset verification
  const resetVerification = useCallback(() => {
    setVerificationStatus('idle');
    setProgress(0);
    setIdImage(null);
    setFrontImage(null);
    setBackImage(null);
    setCaptureSide('front');
  }, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Get ID type icon
  const IdTypeIcon = getCurrentIdType().icon;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Government ID Verification</h3>
        <p className="text-sm text-gray-500">
          Please provide a clear image of your government-issued ID for verification
        </p>
      </div>

      {/* ID type selection */}
      {verificationStatus === 'idle' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">ID Type</label>
            <Select
              value={idType}
              onValueChange={handleIdTypeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                {idTypes.map((id) => (
                  <SelectItem key={id.value} value={id.value} className="flex items-center">
                    <div className="flex items-center">
                      <id.icon className="mr-2" size={16} />
                      {id.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <IdTypeIcon size={20} className="text-blue-600" />
              </div>
              <h4 className="font-medium text-blue-800">{getCurrentIdType().label}</h4>
            </div>
            
            <p className="text-sm text-blue-700 mb-3">
              {captureSide === 'front' ? 'Please capture the front side of your ID' : 'Please capture the back side of your ID'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div 
                onClick={startCamera}
                className="relative cursor-pointer bg-white bg-opacity-50 hover:bg-opacity-70 border border-blue-200 rounded-lg p-4 transition-all duration-300 hover:shadow-sm flex items-center"
              >
                <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                  <Camera size={18} />
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 text-sm">Use Camera</h5>
                  <p className="text-xs text-blue-600">Take a photo with your device</p>
                </div>
              </div>
              
              <div 
                onClick={() => {
                  setCaptureMode('upload');
                  fileInputRef.current?.click();
                }}
                className="relative cursor-pointer bg-white bg-opacity-50 hover:bg-opacity-70 border border-blue-200 rounded-lg p-4 transition-all duration-300 hover:shadow-sm flex items-center"
              >
                <div className="bg-indigo-500 text-white p-2 rounded-full mr-3">
                  <Upload size={18} />
                </div>
                <div>
                  <h5 className="font-medium text-indigo-800 text-sm">Upload Image</h5>
                  <p className="text-xs text-indigo-600">Select a file from your device</p>
                </div>
              </div>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
            
            <div className="flex items-center text-xs text-blue-700">
              <FileCheck size={14} className="mr-1" />
              {getCurrentIdType().requiresBack 
                ? 'Both front and back sides are required' 
                : 'Only front side is required'}
            </div>
          </div>
        </div>
      )}

      {/* Camera view */}
      {captureMode === 'camera' && verificationStatus === 'capturing' && (
        <div className="space-y-4">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm mb-2">
            {captureSide === 'front' 
              ? `Capturing front side of ${getCurrentIdType().label}` 
              : `Capturing back side of ${getCurrentIdType().label}`}
          </div>
          
          <div className="relative border-3 border-dashed border-blue-300 rounded-xl overflow-hidden aspect-video bg-gray-50 shadow-lg">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-3 border-blue-500 w-4/5 h-4/5 rounded-lg opacity-60 animate-pulse"></div>
            </div>
            <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white text-xs py-1 px-3 rounded-full">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span>LIVE</span>
              </div>
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <div className="bg-black bg-opacity-70 text-white text-xs py-2 px-4 rounded-full inline-block">
                Position ID within the blue frame
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={captureImage} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              size="lg"
            >
              <div className="bg-white bg-opacity-20 p-2 rounded-full mr-2">
                <Image size={20} className="text-white" />
              </div>
              <span>Capture {captureSide === 'front' ? 'Front' : 'Back'} Side</span>
            </Button>
          </div>
        </div>
      )}

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Processing state */}
      {verificationStatus === 'processing' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {frontImage && (
              <div className="flex-1 border rounded-lg overflow-hidden">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 text-xs">Front Side</div>
                <img src={frontImage} alt="ID Front" className="w-full" />
              </div>
            )}
            
            {backImage && (
              <div className="flex-1 border rounded-lg overflow-hidden">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 text-xs">Back Side</div>
                <img src={backImage} alt="ID Back" className="w-full" />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Verifying document...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-500 italic">
              We're checking document validity, expiration date, and authenticity
            </p>
          </div>
        </div>
      )}

      {/* Success state */}
      {verificationStatus === 'success' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {frontImage && (
              <div className="flex-1 border border-green-200 rounded-lg overflow-hidden">
                <div className="bg-green-100 text-green-800 px-3 py-1 text-xs flex items-center">
                  <Check size={12} className="mr-1" />
                  Front Side Verified
                </div>
                <img src={frontImage} alt="ID Front" className="w-full" />
              </div>
            )}
            
            {backImage && (
              <div className="flex-1 border border-green-200 rounded-lg overflow-hidden">
                <div className="bg-green-100 text-green-800 px-3 py-1 text-xs flex items-center">
                  <Check size={12} className="mr-1" />
                  Back Side Verified
                </div>
                <img src={backImage} alt="ID Back" className="w-full" />
              </div>
            )}
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
            <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-green-800">Verification Successful</h4>
              <p className="text-sm text-green-700">Your {getCurrentIdType().label} has been verified successfully.</p>
            </div>
          </div>
        </div>
      )}

      {/* Failed state */}
      {verificationStatus === 'failed' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {frontImage && (
              <div className="flex-1 border border-red-200 rounded-lg overflow-hidden">
                <div className="bg-red-100 text-red-800 px-3 py-1 text-xs">Front Side</div>
                <img src={frontImage} alt="ID Front" className="w-full" />
              </div>
            )}
            
            {backImage && (
              <div className="flex-1 border border-red-200 rounded-lg overflow-hidden">
                <div className="bg-red-100 text-red-800 px-3 py-1 text-xs">Back Side</div>
                <img src={backImage} alt="ID Back" className="w-full" />
              </div>
            )}
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-red-800">Verification Failed</h4>
              <p className="text-sm text-red-700">We couldn't verify your ID. Please ensure the image is clear and try again.</p>
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

export default GovernmentIdVerification;
