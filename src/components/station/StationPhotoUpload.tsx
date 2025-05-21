import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  X, 
  ChevronRight, 
  ChevronLeft,
  RotateCw,
  Maximize,
  Minimize,
  Trash2,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StationPhotoUploadProps {
  onComplete: (photos: string[]) => void;
  onCancel: () => void;
}

const StationPhotoUpload: React.FC<StationPhotoUploadProps> = ({ onComplete, onCancel }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [showTips, setShowTips] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const steps = [
    {
      title: "Exterior Front View",
      description: "Take a clear photo of your station's front entrance and signage",
      tips: [
        "Make sure your station name and logo are clearly visible",
        "Capture the entire front facade of the building",
        "Take the photo during daylight for best results",
        "Avoid obstructions like vehicles or people"
      ]
    },
    {
      title: "Fuel Dispensers",
      description: "Photograph your fuel dispensers showing all available fuel types",
      tips: [
        "Ensure fuel type labels are clearly visible",
        "Clean the dispensers before taking the photo",
        "Capture multiple dispensers in one shot if possible",
        "Make sure price displays are visible if applicable"
      ]
    },
    {
      title: "Station Facilities",
      description: "Take photos of additional facilities like convenience store, car wash, etc.",
      tips: [
        "Include all additional services your station offers",
        "Take separate photos of each major facility",
        "Show the interior of your convenience store if applicable",
        "Highlight any unique features of your station"
      ]
    }
  ];
  
  // Initialize camera
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        toast({
          title: "Camera Activated",
          description: "Position your station in frame and take the photo",
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions or try uploading a photo instead.",
        variant: "destructive",
        duration: 5000,
      });
      setIsCameraActive(false);
    }
  };
  
  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };
  
  // Capture photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      setIsCapturing(true);
      
      // Create countdown effect
      let count = 3;
      const countdown = setInterval(() => {
        toast({
          title: "Taking Photo",
          description: `${count}...`,
          duration: 1000,
        });
        
        count--;
        if (count < 0) {
          clearInterval(countdown);
          
          const video = videoRef.current;
          const canvas = canvasRef.current;
          
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          const photoData = canvas.toDataURL('image/jpeg');
          setPhotos(prev => [...prev, photoData]);
          
          toast({
            title: "Photo Captured",
            description: "Your station photo has been saved",
            duration: 2000,
          });
          
          stopCamera();
          setIsCapturing(false);
          
          // Move to next step if available
          if (step < steps.length - 1) {
            setTimeout(() => {
              setStep(prev => prev + 1);
            }, 1000);
          }
        }
      }, 1000);
    }
  };
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File",
          description: "Please upload an image file (JPEG, PNG, etc.)",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoData = event.target?.result as string;
        setPhotos(prev => [...prev, photoData]);
        
        toast({
          title: "Photo Uploaded",
          description: "Your station photo has been saved",
          duration: 2000,
        });
        
        // Move to next step if available
        if (step < steps.length - 1) {
          setTimeout(() => {
            setStep(prev => prev + 1);
          }, 1000);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  // Preview photo
  const handlePreview = (photo: string) => {
    setPreviewImage(photo);
    setShowPreview(true);
  };
  
  // Delete photo
  const handleDelete = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    
    toast({
      title: "Photo Deleted",
      description: "The station photo has been removed",
      duration: 2000,
    });
  };
  
  // Complete the process
  const handleComplete = () => {
    if (photos.length === 0) {
      toast({
        title: "No Photos",
        description: "Please take at least one photo of your station",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    onComplete(photos);
    
    toast({
      title: "Photos Submitted",
      description: "Your station photos have been submitted for verification",
      duration: 3000,
    });
  };
  
  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Station Photo Upload</CardTitle>
            <CardDescription>
              Take photos of your station to complete verification
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowTips(true)}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{step + 1}/{steps.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-green-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">{steps[step].title}</h3>
              <p className="text-gray-500">{steps[step].description}</p>
            </div>
            
            {/* Camera view or upload area */}
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
              {isCameraActive ? (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <Button
                      onClick={capturePhoto}
                      disabled={isCapturing}
                      className="rounded-full w-16 h-16 bg-white border-4 border-green-500 p-0 flex items-center justify-center"
                    >
                      {isCapturing ? (
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="w-10 h-10 bg-red-500 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-green-500 rounded-full" />
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  {photos[step] ? (
                    <div className="relative">
                      <img 
                        src={photos[step]} 
                        alt={`Station ${steps[step].title}`} 
                        className="max-h-[300px] mx-auto rounded-lg"
                      />
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <Button 
                          size="icon" 
                          variant="secondary"
                          onClick={() => handlePreview(photos[step])}
                          className="bg-white/80 hover:bg-white"
                        >
                          <Maximize className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="destructive"
                          onClick={() => handleDelete(step)}
                          className="bg-white/80 hover:bg-red-100 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-2">No photo taken yet</h3>
                      <p className="text-gray-500 mb-4">Take a photo with your camera or upload from your device</p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button 
                          onClick={startCamera}
                          className="flex items-center"
                        >
                          <Camera className="mr-2 h-5 w-5" />
                          Take Photo
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center"
                        >
                          <Upload className="mr-2 h-5 w-5" />
                          Upload Photo
                        </Button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFileUpload} 
                          accept="image/*" 
                          className="hidden" 
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Photo thumbnails */}
            {photos.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Uploaded Photos</h4>
                <div className="flex overflow-x-auto space-x-2 pb-2">
                  {photos.map((photo, index) => (
                    <div 
                      key={index} 
                      className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                        index === step ? 'border-green-500' : 'border-transparent'
                      }`}
                      onClick={() => setStep(index)}
                    >
                      <img 
                        src={photo} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 bg-black/50 text-white text-xs px-1">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div>
          <Button
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setStep(prev => Math.max(0, prev - 1))}
            disabled={step === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          
          {step < steps.length - 1 ? (
            <Button
              onClick={() => setStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={!photos[step]}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete
              <Check className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
      
      {/* Photo preview dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Photo Preview</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="max-h-[70vh] max-w-full object-contain"
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPreview(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Tips dialog */}
      <Dialog open={showTips} onOpenChange={setShowTips}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Photo Tips: {steps[step].title}</DialogTitle>
            <DialogDescription>
              Follow these guidelines for the best results
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <ul className="space-y-2">
              {steps[step].tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-700 mb-1">Why we need these photos</h4>
              <p className="text-xs text-blue-600">
                These photos help us verify your station and improve visibility to customers. 
                Clear, high-quality photos can increase customer trust and engagement.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowTips(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default StationPhotoUpload;
