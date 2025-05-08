import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Check, AlertCircle, RefreshCw, Camera, Image } from 'lucide-react';
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

interface DocumentVerificationProps {
  onVerificationComplete: (verified: boolean, documentData?: any) => void;
}

const DocumentVerification: React.FC<DocumentVerificationProps> = ({
  onVerificationComplete
}) => {
  const { toast } = useToast();
  const [documentType, setDocumentType] = useState<string>('business_license');
  const [captureMode, setCaptureMode] = useState<'camera' | 'upload'>('upload');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'capturing' | 'processing' | 'success' | 'failed'>('idle');
  const [progress, setProgress] = useState(0);
  const [documentImage, setDocumentImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Document type options
  const documentTypes = [
    { value: 'business_license', label: 'Business License' },
    { value: 'utility_bill', label: 'Utility Bill' },
    { value: 'tax_document', label: 'Tax Document' },
    { value: 'bank_statement', label: 'Bank Statement' },
    { value: 'incorporation_certificate', label: 'Certificate of Incorporation' }
  ];

  // Handle document type change
  const handleDocumentTypeChange = (value: string) => {
    setDocumentType(value);
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
        description: `Position your ${getDocumentTypeLabel()} within the frame.`,
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
  }, [toast, documentType]);

  // Get document type label
  const getDocumentTypeLabel = () => {
    return documentTypes.find(doc => doc.value === documentType)?.label || 'document';
  };

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
        setDocumentImage(imageDataUrl);
        processDocumentImage(imageDataUrl);
      }
    }
  }, []);

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
      if (!file.type.startsWith('image/') && !file.type.startsWith('application/pdf')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image or PDF file.",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setDocumentImage(imageDataUrl);
        processDocumentImage(imageDataUrl);
      };

      reader.readAsDataURL(file);
    }
  }, [toast]);

  // Process document image (simulated)
  const processDocumentImage = useCallback((imageData: string) => {
    setVerificationStatus('processing');
    stopCamera();

    // Simulate processing with progress updates
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 3;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);

        // Simulate successful verification (85% success rate)
        const isSuccessful = Math.random() < 0.85;

        if (isSuccessful) {
          setVerificationStatus('success');

          // Mock document data
          const documentData = {
            documentType: documentType,
            documentTypeLabel: getDocumentTypeLabel(),
            verificationId: "DOC" + Math.floor(Math.random() * 10000000),
            verifiedAt: new Date().toISOString(),
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
            verified: true
          };

          toast({
            title: "Verification Successful",
            description: `Your ${getDocumentTypeLabel()} has been verified successfully.`,
          });

          onVerificationComplete(true, documentData);
        } else {
          setVerificationStatus('failed');

          toast({
            title: "Verification Failed",
            description: `We couldn't verify your ${getDocumentTypeLabel()}. Please try again with a clearer image.`,
            variant: "destructive"
          });

          onVerificationComplete(false);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [documentType, getDocumentTypeLabel, onVerificationComplete, stopCamera, toast]);

  // Reset verification
  const resetVerification = useCallback(() => {
    setVerificationStatus('idle');
    setProgress(0);
    setDocumentImage(null);
  }, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Document Verification</h3>
        <p className="text-sm text-gray-500">
          Please provide a clear image of your business document for verification
        </p>
      </div>

      {/* Document type selection */}
      {verificationStatus === 'idle' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Document Type</label>
            <Select
              value={documentType}
              onValueChange={handleDocumentTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((doc) => (
                  <SelectItem key={doc.value} value={doc.value}>
                    {doc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div
              onClick={startCamera}
              className="relative cursor-pointer bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-2 border-green-200 rounded-xl p-6 transition-all duration-300 hover:shadow-md flex flex-col items-center justify-center text-center"
            >
              <div className="bg-green-500 text-white p-3 rounded-full mb-3">
                <Camera size={24} />
              </div>
              <h4 className="font-medium text-green-800 mb-1">Use Camera</h4>
              <p className="text-xs text-green-600">Take a photo of your document using your device's camera</p>
            </div>

            <div
              onClick={() => {
                setCaptureMode('upload');
                fileInputRef.current?.click();
              }}
              className="relative cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-200 rounded-xl p-6 transition-all duration-300 hover:shadow-md flex flex-col items-center justify-center text-center"
            >
              <div className="bg-blue-500 text-white p-3 rounded-full mb-3">
                <Upload size={24} />
              </div>
              <h4 className="font-medium text-blue-800 mb-1">Upload Document</h4>
              <p className="text-xs text-blue-600">Select a file from your device (JPG, PNG, PDF)</p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*,application/pdf"
              onChange={handleFileUpload}
            />
          </div>

          <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
            <h4 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
              <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                <FileText size={16} className="text-blue-600" />
              </div>
              Document Requirements
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start space-x-2">
                <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                  <Check size={12} className="text-blue-600" />
                </div>
                <span className="text-xs text-blue-700">Document must be current and not expired</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                  <Check size={12} className="text-blue-600" />
                </div>
                <span className="text-xs text-blue-700">All four corners must be visible</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                  <Check size={12} className="text-blue-600" />
                </div>
                <span className="text-xs text-blue-700">Text must be clearly readable</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                  <Check size={12} className="text-blue-600" />
                </div>
                <span className="text-xs text-blue-700">File must be less than 10MB</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                  <Check size={12} className="text-blue-600" />
                </div>
                <span className="text-xs text-blue-700">Accepted formats: JPG, PNG, PDF</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                  <Check size={12} className="text-blue-600" />
                </div>
                <span className="text-xs text-blue-700">Good lighting conditions</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Camera view */}
      {captureMode === 'camera' && verificationStatus === 'capturing' && (
        <div className="space-y-4">
          <div className="relative border-3 border-dashed border-green-300 rounded-xl overflow-hidden aspect-video bg-gray-50 shadow-lg">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-3 border-green-500 w-4/5 h-4/5 rounded-lg opacity-60 animate-pulse"></div>
            </div>
            <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white text-xs py-1 px-3 rounded-full">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span>LIVE</span>
              </div>
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <div className="bg-black bg-opacity-70 text-white text-xs py-2 px-4 rounded-full inline-block">
                Position document within the green frame
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={captureImage}
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              size="lg"
            >
              <div className="bg-white bg-opacity-20 p-2 rounded-full mr-2">
                <Image size={20} className="text-white" />
              </div>
              <span>Capture Document</span>
            </Button>
          </div>
        </div>
      )}

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Processing state */}
      {verificationStatus === 'processing' && (
        <div className="space-y-4">
          {documentImage && (
            <div className="border rounded-lg overflow-hidden">
              <img src={documentImage} alt="Document" className="w-full" />
            </div>
          )}
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
          {documentImage && (
            <div className="border rounded-lg overflow-hidden">
              <img src={documentImage} alt="Document" className="w-full" />
            </div>
          )}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
            <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-green-800">Verification Successful</h4>
              <p className="text-sm text-green-700">Your {getDocumentTypeLabel()} has been verified successfully.</p>
            </div>
          </div>
        </div>
      )}

      {/* Failed state */}
      {verificationStatus === 'failed' && (
        <div className="space-y-4">
          {documentImage && (
            <div className="border rounded-lg overflow-hidden">
              <img src={documentImage} alt="Document" className="w-full" />
            </div>
          )}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-red-800">Verification Failed</h4>
              <p className="text-sm text-red-700">We couldn't verify your document. Please ensure the image is clear and try again.</p>
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

export default DocumentVerification;
