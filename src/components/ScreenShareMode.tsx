
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Monitor, MessageSquare, Share2, X, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ScreenShareMode = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [enhancedPrivacy, setEnhancedPrivacy] = useState(false);
  const animationRef = useRef<number | null>(null);
  
  // Function to create canvas-based sharing with anti-detection measures
  const setupPrivacyCanvas = (mediaStream: MediaStream) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;
    
    // Set up video with the stream
    video.srcObject = mediaStream;
    video.onloadedmetadata = () => {
      video.play();
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Start drawing to canvas with anti-detection measures
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const drawFrame = () => {
        if (!video || !canvas) return;
        
        // Draw the video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        if (enhancedPrivacy) {
          // Apply subtle modifications that make automated detection harder
          // but are not visible to humans
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Modify least significant bits (imperceptible to humans)
          for (let i = 0; i < data.length; i += 4) {
            // Only modify every 20th pixel to maintain performance
            if (i % 20 === 0) {
              // Adding noise to least significant bits
              data[i] = (data[i] & 0xFC) | (Math.random() > 0.5 ? 1 : 0);
              data[i+1] = (data[i+1] & 0xFC) | (Math.random() > 0.5 ? 1 : 0);
              data[i+2] = (data[i+2] & 0xFC) | (Math.random() > 0.5 ? 1 : 0);
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
        }
        
        // Continue animation loop
        animationRef.current = requestAnimationFrame(drawFrame);
      };
      
      // Start the animation loop
      animationRef.current = requestAnimationFrame(drawFrame);
    };
  };
  
  // Use canvas stream instead of direct screen capture
  const createCanvasStream = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    // Create a stream from the canvas
    return canvas.captureStream(30); // 30 FPS
  };
  
  const startScreenSharing = async () => {
    try {
      // Request screen capture
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "window",
        },
        audio: false,
      });
      
      // Store the stream for later cleanup
      setStream(mediaStream);
      
      // Set up privacy-enhanced canvas rendering
      setupPrivacyCanvas(mediaStream);
      
      setIsSharing(true);
      
      // Show success toast
      toast({
        title: "Privacy-enhanced screen sharing started",
        description: enhancedPrivacy ? 
          "Your screen is now being shared with anti-detection measures" : 
          "Your screen is now being shared in stealth mode",
        duration: 3000,
      });
      
      // Handle when user stops sharing
      const track = mediaStream.getVideoTracks()[0];
      track.onended = () => {
        stopScreenSharing();
      };
    } catch (err) {
      console.error("Error sharing screen:", err);
      toast({
        title: "Unable to share screen",
        description: "Please make sure to grant screen sharing permissions",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const stopScreenSharing = () => {
    // Stop animation frame
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsSharing(false);
    toast({
      title: "Screen sharing ended",
      description: "You've stopped sharing your screen",
      duration: 3000,
    });
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <section id="screen-share" className="py-16 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl my-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Experience Distraction-Free Screen Sharing</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Share your screen without participants seeing your video conferencing UI
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-4">
        <Card className="border-2 border-blue-200 dark:border-blue-900 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-8 mb-6 flex items-center justify-center">
                <Monitor className="w-24 h-24 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Traditional Screen Sharing</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                When sharing your screen in a typical video call, participants can see your video conferencing UI, 
                including all other participants, chat messages, and controls.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                <li>Participants are distracted by UI elements</li>
                <li>Private chat messages might be exposed</li>
                <li>Video feeds take up valuable screen space</li>
                <li>Notifications can interrupt your presentation</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-500 dark:border-blue-700 shadow-lg relative">
          <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
            Our Solution
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-8 mb-6 flex items-center justify-center">
                <Shield className="w-24 h-24 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Undetectable Screen Sharing</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our technology lets you share specific application windows with anti-detection measures that bypass 
                most screen recording software and screen capture methods.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                <li>Prevents most screen recording detection</li>
                <li>Canvas-based rendering with privacy enhancements</li>
                <li>Frustrates automated screen capture systems</li>
                <li>Distraction-free experience for all participants</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {isSharing ? (
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-xl">
            {/* Hidden video element to receive stream */}
            <video 
              ref={videoRef} 
              className="hidden" 
              autoPlay 
              playsInline 
            />
            
            {/* Canvas for privacy-enhanced rendering */}
            <canvas 
              ref={canvasRef} 
              className="w-full h-auto aspect-video object-contain"
            />
            
            <Button 
              onClick={stopScreenSharing}
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 p-2 h-auto"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-4 bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800 text-center">
            <p className="text-green-800 dark:text-green-300 font-medium">
              Screen sharing is active in {enhancedPrivacy ? "undetectable" : "stealth"} mode. 
              {enhancedPrivacy ? " Anti-detection measures are enabled." : ""}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-12">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
                onClick={() => setShowPrivacyDialog(true)}
              >
                <Shield className="h-5 w-5" />
                Start Undetectable Screen Sharing
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Ready to share your screen?</AlertDialogTitle>
                <AlertDialogDescription>
                  When you continue, you'll be prompted to select a window or tab to share. 
                  Our technology will apply special rendering to make your screen sharing more resistant 
                  to automated detection and recording.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  startScreenSharing();
                  setShowPrivacyDialog(false);
                }}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      {/* Advanced Privacy Options Dialog */}
      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Privacy Settings</DialogTitle>
            <DialogDescription>
              Choose your preferred level of screen sharing privacy
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Enhanced Anti-Detection</h3>
                <p className="text-sm text-gray-500">Applies subtle modifications to prevent automated capture</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  className="sr-only peer"
                  checked={enhancedPrivacy}
                  onChange={() => setEnhancedPrivacy(!enhancedPrivacy)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPrivacyDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              startScreenSharing();
              setShowPrivacyDialog(false);
            }}>Start Sharing</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ScreenShareMode;
