import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Monitor, MessageSquare, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScreenShareMode = () => {
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();
  
  const startScreenSharing = async () => {
    try {
      // Request screen capture with corrected type constraints
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      
      // Set up screen sharing
      setIsSharing(true);
      
      // Show success toast
      toast({
        title: "Screen sharing started",
        description: "Your screen is now being shared in stealth mode",
        duration: 3000,
      });
      
      // Handle when user stops sharing
      const track = mediaStream.getVideoTracks()[0];
      track.onended = () => {
        setIsSharing(false);
        toast({
          title: "Screen sharing ended",
          description: "You've stopped sharing your screen",
          duration: 3000,
        });
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
                <Share2 className="w-24 h-24 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Stealth Screen Sharing</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our technology lets you share specific application windows while AI-assisted communication 
                replaces the need for visible video conferencing UI.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                <li>Only your content is visible to participants</li>
                <li>AI assistance provides communication support</li>
                <li>Maximum screen space for your presentation</li>
                <li>Distraction-free experience for all participants</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-12">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Start AI-Assisted Screen Sharing
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ready to share your screen?</AlertDialogTitle>
              <AlertDialogDescription>
                When you continue, you'll be prompted to select a window or tab to share. 
                Only the selected content will be visible to participants, not your entire desktop 
                or video conferencing interface.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={startScreenSharing}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {isSharing && (
        <div className="mt-8 max-w-xl mx-auto bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800 text-center">
          <p className="text-green-800 dark:text-green-300 font-medium">
            Screen sharing is active in stealth mode. Only your selected window is visible to participants.
          </p>
        </div>
      )}
    </section>
  );
};

export default ScreenShareMode;
