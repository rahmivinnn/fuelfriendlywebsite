import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface StationRegistrationBannerProps {
  onRegisterClick?: () => void;
  onFindStationsClick?: () => void;
}

const StationRegistrationBanner: React.FC<StationRegistrationBannerProps> = ({
  onRegisterClick,
  onFindStationsClick
}) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      navigate('/station-registration');
    }
  };

  const handleFindStationsClick = () => {
    if (onFindStationsClick) {
      onFindStationsClick();
    } else {
      navigate('/nearby-stations');
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto bg-green-500 dark:bg-green-600 rounded-xl overflow-hidden shadow-xl">
        {/* Mobile view */}
        <div className="block lg:hidden">
          <div className="w-full p-5 flex flex-col justify-center">
            <h2 className="text-xl font-bold text-white mb-3">
              Register your fuel center today for a better future in fuel business!
            </h2>

            <div className="flex flex-col gap-2 mt-3">
              <Button
                className="bg-gray-900 text-white hover:bg-gray-800 w-full"
                onClick={handleRegisterClick}
              >
                Register Fuel Center
              </Button>

              <Button
                className="bg-transparent border border-white text-white hover:bg-white/10 w-full"
                onClick={handleFindStationsClick}
              >
                Find Nearby Fuel Centers
              </Button>
            </div>

            <div className="mt-4 flex items-start">
              <AlertCircle size={14} className="text-white mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-white/90 text-xs">
                Registration is completely free for fuel center owners. Join our platform and start growing your business today!
              </p>
            </div>
          </div>
        </div>

        {/* Desktop view */}
        <div className="hidden lg:block">
          <div className="p-8 flex flex-col justify-center">
            <motion.h2
              className="text-3xl font-bold text-white mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Register your fuel center today for a better future in fuel business!
            </motion.h2>

            <div className="flex flex-row gap-4 mt-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-5 text-lg"
                  onClick={handleRegisterClick}
                >
                  Register Fuel Center
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-5 text-lg"
                  onClick={handleFindStationsClick}
                >
                  Find Nearby Fuel Centers
                </Button>
              </motion.div>
            </div>

            <div className="mt-6 flex items-start justify-center">
              <AlertCircle size={18} className="text-white mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-white/90 text-base max-w-xl">
                Registration is completely free for fuel center owners. Join our platform and start growing your business today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationRegistrationBanner;
