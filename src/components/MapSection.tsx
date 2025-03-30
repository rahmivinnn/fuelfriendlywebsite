
import React from 'react';

const MapSection = () => {
  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Explore Our Service Areas & Fuel Stations Near You
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our global network of stations brings convenience to wherever you are
            </p>
          </div>
        </div>
        <div className="mt-12 relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
          <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center">
            <div className="w-full h-full bg-gray-200 opacity-50">
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 800 400" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="800" height="400" fill="#f3f4f6" />
                <path d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,165.3C672,171,768,213,864,224C960,235,1056,213,1152,202.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
                  fill="#e5e7eb" fillOpacity="1" />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-30 gap-1 w-4/5 opacity-70">
                {Array(300).fill(0).map((_, index) => (
                  <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                ))}
              </div>
              <div className="absolute">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-16 text-center">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-4xl font-bold">4.5k+</span>
            <span className="text-gray-500">Fuel Stations</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-4xl font-bold">1.5k+</span>
            <span className="text-gray-500">Cities Covered</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-4xl font-bold">1000+</span>
            <span className="text-gray-500">Daily Deliveries</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
