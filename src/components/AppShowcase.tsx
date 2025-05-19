import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface AppShowcaseProps {
  handleAppStoreClick?: () => void;
}

const AppShowcase: React.FC<AppShowcaseProps> = ({ handleAppStoreClick }) => {
  const { toast } = useToast();
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const handleDownloadClick = () => {
    if (handleAppStoreClick) {
      handleAppStoreClick();
    } else {
      setShowDownloadDialog(true);
    }
  };

  const initiateDownload = (platform: 'ios' | 'android') => {
    // In a real app, this would redirect to the app store or start a download
    toast({
      title: `${platform === 'ios' ? 'iOS' : 'Android'} Download Started`,
      description: "Thank you for downloading the FuelFriendly app!",
      duration: 3000,
    });

    // Simulate download starting
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your download has finished. Please install the app to get started!",
        duration: 5000,
      });
    }, 2000);

    // Close dialog after download starts
    setShowDownloadDialog(false);
  };

  return (
    <section className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center mx-auto">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Find, Refuel, Service - One App for Everything!
              </h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our all-in-one solution puts everything you need for fueling at your fingertips. Monitor prices, Schedule Pump-Side service, and even get Traffic update.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleDownloadClick}
                >
                  Download the App
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 to-primary/20 rounded-3xl blur-xl opacity-30"></div>
              <motion.div
                className="relative"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <img
                  src="/lovable-uploads/6d32f5db-8078-4b2d-b0ea-8dbdcfde3eff.png"
                  alt="FuelFriendly App Interface"
                  className="object-contain w-full h-full rounded-xl shadow-xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Download Dialog */}
      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download FuelFriendly</DialogTitle>
            <DialogDescription>
              Choose your platform to download our mobile app
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-6">
            <motion.div
              className="bg-gray-50 p-4 rounded-lg text-center cursor-pointer border border-transparent hover:border-green-500 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => initiateDownload('ios')}
            >
              <div className="bg-gray-100 p-3 rounded-full w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                <svg className="w-12 h-12 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5689 12.9203C17.5497 10.1443 19.8283 8.79465 19.9124 8.74006C18.6135 6.84407 16.6012 6.58714 15.8758 6.56358C14.1517 6.38391 12.4795 7.57982 11.6047 7.57982C10.7298 7.57982 9.35361 6.58358 7.88884 6.61893C5.99285 6.65427 4.22354 7.76304 3.23909 9.49783C1.21902 13.0259 2.73612 18.2392 4.6793 21.0388C5.65196 22.4042 6.78429 23.9213 8.26085 23.859C9.70205 23.7967 10.2304 22.9139 11.9427 22.9139C13.6549 22.9139 14.1478 23.859 15.6601 23.8237C17.2077 23.7967 18.1803 22.4454 19.1295 21.0682C20.2382 19.5088 20.6974 17.9801 20.7209 17.9095C20.6739 17.8918 17.5924 16.721 17.5689 12.9203Z" />
                  <path d="M14.9694 4.28149C15.7772 3.28525 16.3173 1.91084 16.1612 0.523438C14.9929 0.570522 13.5753 1.32232 12.7557 2.29498C12.0186 3.16162 11.3758 4.56773 11.5554 5.93035C12.8779 6.01852 14.1381 5.27731 14.9694 4.28149Z" />
                </svg>
              </div>
              <h4 className="font-medium text-lg">iOS App</h4>
              <p className="text-sm text-gray-500 mt-1">Download on the App Store</p>
            </motion.div>

            <motion.div
              className="bg-gray-50 p-4 rounded-lg text-center cursor-pointer border border-transparent hover:border-green-500 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => initiateDownload('android')}
            >
              <div className="bg-gray-100 p-3 rounded-full w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.60481 21.5988L12.0586 13.145L3.60481 4.69133L3.60481 21.5988Z" />
                  <path d="M14.2851 15.3716L5.83139 23.8253C5.83139 23.8253 6.14563 23.8253 6.54695 23.8253C7.56231 23.8253 8.96854 23.5111 10.3748 22.6373L21.2972 16.3891L14.2851 15.3716Z" />
                  <path d="M21.2984 7.88899L14.2863 6.87152L5.83261 15.3253C5.83261 15.3253 9.98037 23.0962 10.376 22.6385C10.7716 22.1809 21.2984 7.88899 21.2984 7.88899Z" />
                  <path d="M5.83236 0.454578C5.83236 0.454578 5.1905 0.0532505 3.93337 0.908025C2.67625 1.7628 2.83215 3.35418 2.83215 3.35418L12.0586 12.5807L14.2847 10.3546L5.83236 0.454578Z" />
                </svg>
              </div>
              <h4 className="font-medium text-lg">Android App</h4>
              <p className="text-sm text-gray-500 mt-1">Get it on Google Play</p>
            </motion.div>
          </div>

          <div className="pb-4 pt-2">
            <div className="border-t border-gray-200 pt-4">
              <h5 className="font-medium text-center mb-3">Scan QR Code</h5>
              <div className="bg-white p-3 rounded-lg border max-w-[150px] mx-auto">
                <div className="w-full aspect-square bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzAgMzMwIj48cGF0aCBkPSJNMCAwaDMzMHYzMzBIMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTYwIDMwaDMwdjMwSDYwek05MCAzMGgzMHYzMEg5MHpNMTIwIDMwaDMwdjMwaC0zMHpNMTUwIDMwaDMwdjMwaC0zMHpNMTgwIDMwaDMwdjMwaC0zMHpNMjEwIDMwaDMwdjMwaC0zMHpNMjcwIDMwaDMwdjMwaC0zMHpNMzAgNjBoMzB2MzBIMzB6TTIxMCA2MGgzMHYzMGgtMzB6TTI3MCA2MGgzMHYzMGgtMzB6TTMwIDkwaDMwdjMwSDMwek05MCA5MGgzMHYzMEg5MHpNMTIwIDkwaDMwdjMwaC0zMHpNMTUwIDkwaDMwdjMwaC0zMHpNMjEwIDkwaDMwdjMwaC0zMHpNMjcwIDkwaDMwdjMwaC0zMHpNMzAgMTIwaDMwdjMwSDMwek02MCAxMjBoMzB2MzBINjB6TTkwIDEyMGgzMHYzMEg5MHpNMTIwIDEyMGgzMHYzMGgtMzB6TTE1MCAxMjBoMzB2MzBoLTMwek0xODAgMTIwaDMwdjMwaC0zMHpNMjEwIDEyMGgzMHYzMGgtMzB6TTI0MCAxMjBoMzB2MzBoLTMwek0yNzAgMTIwaDMwdjMwaC0zMHpNMzAgMTUwaDMwdjMwSDMwek0yNzAgMTUwaDMwdjMwaC0zMHpNMzAgMTgwaDMwdjMwSDMwek05MCAxODBoMzB2MzBIOTB6TTEyMCAxODBoMzB2MzBoLTMwek0xNTAgMTgwaDMwdjMwaC0zMHpNMTgwIDE4MGgzMHYzMGgtMzB6TTI3MCAxODBoMzB2MzBoLTMwek0zMCAyMTBoMzB2MzBIMzB6TTYwIDIxMGgzMHYzMEg2MHpNOTAgMjEwaDMwdjMwSDkwek0xMjAgMjEwaDMwdjMwaC0zMHpNMTUwIDIxMGgzMHYzMGgtMzB6TTE4MCAyMTBoMzB2MzBoLTMwek0yMTAgMjEwaDMwdjMwaC0zMHpNMjQwIDIxMGgzMHYzMGgtMzB6TTI3MCAyMTBoMzB2MzBoLTMwek0zMCAyNDBoMzB2MzBIMzB6TTYwIDI0MGgzMHYzMEg2MHpNOTAgMjQwaDMwdjMwSDkwek0xMjAgMjQwaDMwdjMwaC0zMHpNMTUwIDI0MGgzMHYzMGgtMzB6TTE4MCAyNDBoMzB2MzBoLTMwek0yMTAgMjQwaDMwdjMwaC0zMHpNMjQwIDI0MGgzMHYzMGgtMzB6TTI3MCAyNDBoMzB2MzBoLTMwek0zMCAyNzBoMzB2MzBIMzB6TTYwIDI3MGgzMHYzMEg2MHpNOTAgMjcwaDMwdjMwSDkwek0xMjAgMjcwaDMwdjMwaC0zMHpNMTUwIDI3MGgzMHYzMGgtMzB6TTE4MCAyNzBoMzB2MzBoLTMwek0yMTAgMjcwaDMwdjMwaC0zMHpNMjQwIDI3MGgzMHYzMGgtMzB6TTI3MCAyNzBoMzB2MzBoLTMweiIvPjwvc3ZnPg==')] bg-center bg-contain"></div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => setShowDownloadDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AppShowcase;
