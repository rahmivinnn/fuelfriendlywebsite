import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Check, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface FaceVerificationProps {
  onVerificationComplete: (verified: boolean) => void;
}

const FaceVerification: React.FC<FaceVerificationProps> = ({ 
  onVerificationComplete 
}) => {
  const { toast } = useToast();
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'capturing' | 'processing' | 'success' | 'failed'>('idle');
  const [progress, setProgress] = useState(0);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [detectionMessage, setDetectionMessage] = useState('Position your face in the center');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user' // Front camera
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setVerificationStatus('capturing');
      
      toast({
        title: "Camera Started",
        description: "Position your face within the circle and follow the instructions.",
      });

      // Start face detection simulation
      startFaceDetectionSimulation();
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please try again or use a different device.",
        variant: "destructive"
      });
    }
  }, [toast]);

  // Simulate face detection
  const startFaceDetectionSimulation = useCallback(() => {
    let detectionPhase = 0;
    const phases = [
      { message: "Position your face in the center", duration: 2000 },
      { message: "Look straight at the camera", duration: 2000 },
      { message: "Turn your head slightly to the right", duration: 2000 },
      { message: "Turn your head slightly to the left", duration: 2000 },
      { message: "Blink a few times", duration: 2000 },
      { message: "Face detected! Hold still...", duration: 1000 }
    ];

    const simulateDetection = () => {
      if (detectionPhase < phases.length) {
        setDetectionMessage(phases[detectionPhase].message);
        
        setTimeout(() => {
          detectionPhase++;
          if (detectionPhase === phases.length) {
            setFaceDetected(true);
            captureImage();
          } else {
            simulateDetection();
          }
        }, phases[detectionPhase].duration);
      }
    };

    simulateDetection();
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
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
        setFaceImage(imageDataUrl);
        processFaceImage(imageDataUrl);
      }
    }
  }, []);

  // Process face image (simulated)
  const processFaceImage = useCallback((imageData: string) => {
    setVerificationStatus('processing');
    
    // Simulate processing with progress updates
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        
        // Simulate successful verification (95% success rate)
        const isSuccessful = Math.random() < 0.95;
        
        if (isSuccessful) {
          setVerificationStatus('success');
          
          toast({
            title: "Face Verification Successful",
            description: "Your identity has been verified successfully.",
          });
          
          onVerificationComplete(true);
        } else {
          setVerificationStatus('failed');
          
          toast({
            title: "Verification Failed",
            description: "We couldn't verify your face. Please try again in better lighting.",
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
    setFaceImage(null);
    setFaceDetected(false);
    setDetectionMessage('Position your face in the center');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Face Verification</h3>
        <p className="text-sm text-gray-500">
          Please look at the camera and follow the instructions for identity verification
        </p>
      </div>

      {/* Start verification button */}
      {verificationStatus === 'idle' && (
        <div className="flex justify-center">
          <Button
            onClick={startCamera}
            className="bg-green-500 hover:bg-green-600 flex items-center space-x-2"
          >
            <Camera size={16} />
            <span>Start Face Verification</span>
          </Button>
        </div>
      )}

      {/* Camera view */}
      {verificationStatus === 'capturing' && (
        <div className="space-y-4">
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden aspect-video bg-gray-50">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={`border-2 ${faceDetected ? 'border-green-500' : 'border-yellow-500'} w-48 h-48 rounded-full opacity-50`}></div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <div className="bg-black bg-opacity-50 text-white py-2 px-4 rounded-full inline-block">
                {faceDetected ? (
                  <div className="flex items-center space-x-2">
                    <Check size={16} className="text-green-400" />
                    <span>Face detected! Capturing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Loader2 size={16} className="animate-spin text-yellow-400" />
                    <span>{detectionMessage}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Processing state */}
      {verificationStatus === 'processing' && (
        <div className="space-y-4">
          {faceImage && (
            <div className="border rounded-lg overflow-hidden w-48 h-48 mx-auto">
              <img src={faceImage} alt="Face Capture" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Verifying identity...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      )}

      {/* Success state */}
      {verificationStatus === 'success' && (
        <div className="space-y-4">
          {faceImage && (
            <div className="border rounded-lg overflow-hidden w-48 h-48 mx-auto">
              <img src={faceImage} alt="Face Capture" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
            <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-green-800">Verification Successful</h4>
              <p className="text-sm text-green-700">Your identity has been verified successfully.</p>
            </div>
          </div>
        </div>
      )}

      {/* Failed state */}
      {verificationStatus === 'failed' && (
        <div className="space-y-4">
          {faceImage && (
            <div className="border rounded-lg overflow-hidden w-48 h-48 mx-auto">
              <img src={faceImage} alt="Face Capture" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-red-800">Verification Failed</h4>
              <p className="text-sm text-red-700">We couldn't verify your identity. Please try again in better lighting conditions.</p>
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

export default FaceVerification;
