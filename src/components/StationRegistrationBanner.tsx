import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
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

  const requirements = [
    "Valid driver's license",
    "Vehicle insurance",
    "Smartphone with data plan",
    "Clean driving record",
    "Background check approval",
    "21 years or older",
    "Ability to lift up to 30 pounds"
  ];

  return (
    <div className="w-full mx-auto px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto bg-gray-900 dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl">
        {/* Mobile view (stacked) */}
        <div className="block lg:hidden">
          {/* Requirements Section - Mobile */}
          <div className="w-full p-5 bg-gray-900 dark:bg-gray-800 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white mb-3">Requirements</h3>
            <div className="max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              <ul className="space-y-2">
                {requirements.map((requirement, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                  >
                    <div className="bg-green-500 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                      <Check size={10} className="text-white" />
                    </div>
                    <span className="text-white text-sm">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Section - Mobile */}
          <div className="w-full bg-green-500 p-5 flex flex-col justify-center">
            <h2 className="text-xl font-bold text-white mb-3">
              Register your station today for a better future in fuel business!
            </h2>

            <div className="flex flex-col gap-2 mt-3">
              <Button
                className="bg-gray-900 text-white hover:bg-gray-800 w-full"
                onClick={handleRegisterClick}
              >
                Register Station
              </Button>

              <Button
                className="bg-transparent border border-white text-white hover:bg-white/10 w-full"
                onClick={handleFindStationsClick}
              >
                Find Nearby Stations
              </Button>
            </div>

            <div className="mt-4 flex items-start">
              <AlertCircle size={14} className="text-white mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-white/90 text-xs">
                Registration is completely free for station owners. Join our platform and start growing your business today!
              </p>
            </div>
          </div>
        </div>

        {/* Desktop view (side by side) */}
        <div className="hidden lg:flex">
          {/* Requirements Section - Desktop */}
          <div className="w-2/5 p-6 bg-gray-900 dark:bg-gray-800 border-r border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Requirements</h3>
            <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex items-start"
                  >
                    <div className="bg-green-500 p-1 rounded-full mr-3 flex-shrink-0 mt-1">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-white text-sm">{requirement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Section - Desktop */}
          <div className="w-3/5 bg-green-500 p-6 flex flex-col justify-center">
            <motion.h2
              className="text-2xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Register your station today for a better future in fuel business!
            </motion.h2>

            <div className="flex flex-row gap-3 mt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-gray-900 text-white hover:bg-gray-800"
                  onClick={handleRegisterClick}
                >
                  Register Station
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-transparent border border-white text-white hover:bg-white/10"
                  onClick={handleFindStationsClick}
                >
                  Find Nearby Stations
                </Button>
              </motion.div>
            </div>

            <div className="mt-6 flex items-start">
              <AlertCircle size={16} className="text-white mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-white/90 text-sm">
                Registration is completely free for station owners. Join our platform and start growing your business today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationRegistrationBanner;
