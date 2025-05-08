
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, ThumbsUp, MapPin, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [testimonialStats, setTestimonialStats] = useState({
    totalReviews: 10482,
    averageRating: 4.8,
    fiveStarPercentage: 92,
    recentReviews: 247
  });

  // Expanded testimonials list
  const testimonials = [
    {
      text: "FuelFriendly has completely changed how I manage fuel for my delivery fleet. The scheduling feature alone has saved us countless hours and improved our efficiency by 30%. The real-time tracking is incredibly accurate!",
      author: "John D.",
      role: "Fleet Manager",
      company: "Express Logistics",
      location: "New York, USA",
      date: "2 days ago",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      verified: true,
      likes: 128
    },
    {
      text: "As a busy mom always on the go, I love how I can find the cheapest gas near me and pay right through the app. The rewards program is an amazing bonus too! I've saved over $200 in just three months of using the service.",
      author: "Sarah L.",
      role: "Regular User",
      location: "Chicago, USA",
      date: "1 week ago",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      verified: true,
      likes: 94
    },
    {
      text: "Since joining the FuelFriendly network, our station has seen a 25% increase in customer traffic. The platform is intuitive and the support team is always responsive. The analytics dashboard helps us make better business decisions.",
      author: "Michael R.",
      role: "Station Owner",
      company: "QuickFuel Stations",
      location: "Miami, USA",
      date: "2 weeks ago",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      verified: true,
      likes: 156
    },
    {
      text: "I travel a lot for work, and FuelFriendly has been a game-changer. I can plan my routes based on fuel prices and availability. The emergency fuel delivery feature saved me when I ran out of gas on a remote highway!",
      author: "Emma T.",
      role: "Sales Representative",
      company: "Global Tech Solutions",
      location: "Seattle, USA",
      date: "3 days ago",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      verified: true,
      likes: 87
    },
    {
      text: "As an Uber driver, fuel costs are a major expense. FuelFriendly helps me find the best prices and the loyalty program gives me additional discounts. I'm saving about 15% on my monthly fuel costs!",
      author: "David K.",
      role: "Rideshare Driver",
      location: "Los Angeles, USA",
      date: "5 days ago",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      verified: true,
      likes: 112
    },
    {
      text: "Our construction company manages multiple vehicles and equipment. FuelFriendly's business account features have streamlined our fuel management and billing. The detailed reports are exactly what our accounting team needed.",
      author: "Jennifer M.",
      role: "Operations Manager",
      company: "BuildRight Construction",
      location: "Denver, USA",
      date: "1 month ago",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      verified: true,
      likes: 73
    },
    {
      text: "I was skeptical at first, but after using FuelFriendly for three months, I'm completely sold. The price predictions have been surprisingly accurate, helping me decide when to fill up. Great service!",
      author: "Robert J.",
      role: "Financial Analyst",
      location: "Boston, USA",
      date: "2 months ago",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
      verified: true,
      likes: 64
    },
    {
      text: "The contactless payment feature is what initially attracted me, especially during the pandemic. Now I use all the features and can't imagine going back to the old way of refueling.",
      author: "Lisa P.",
      role: "Healthcare Worker",
      location: "Philadelphia, USA",
      date: "3 weeks ago",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/8.jpg",
      verified: true,
      likes: 91
    }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  // Simulate real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialStats(prev => ({
        ...prev,
        totalReviews: prev.totalReviews + Math.floor(Math.random() * 3),
        recentReviews: prev.recentReviews + Math.floor(Math.random() * 2)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Navigate to previous testimonial
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };

  // Navigate to next testimonial
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setAutoplay(false);
  };

  // Display stars based on rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-2 bg-green-100 text-green-800 hover:bg-green-200">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                LIVE
              </motion.span>
              <span className="ml-1">TESTIMONIALS</span>
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {testimonialStats.totalReviews.toLocaleString()}+ Satisfied Users Trust FuelFriendly
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed max-w-3xl mx-auto">
              Don't just take our word for it - hear what our users have to say about their experience with FuelFriendly
            </p>
          </motion.div>

          {/* Real-time stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-green-600">{testimonialStats.averageRating}</div>
              <div className="flex mt-1 mb-2">
                {renderStars(5)}
              </div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-green-600">{testimonialStats.fiveStarPercentage}%</div>
              <div className="h-2 bg-gray-200 rounded-full mt-2 mb-3">
                <div
                  className="h-2 bg-yellow-400 rounded-full"
                  style={{ width: `${testimonialStats.fiveStarPercentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500">5-Star Reviews</div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-green-600">
                {testimonialStats.totalReviews.toLocaleString()}
              </div>
              <div className="flex items-center mt-1 mb-2 text-gray-400">
                <User size={14} className="mr-1" />
                <span className="text-xs">Verified Users</span>
              </div>
              <div className="text-sm text-gray-500">Total Reviews</div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 bg-green-100 rounded-full w-16 h-16 -mt-8 -mr-8"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              <div className="relative">
                <div className="text-3xl font-bold text-green-600">
                  +{testimonialStats.recentReviews}
                </div>
                <div className="flex items-center mt-1 mb-2 text-gray-400">
                  <Clock size={14} className="mr-1" />
                  <span className="text-xs">Last 24 hours</span>
                </div>
                <div className="text-sm text-gray-500">New Reviews</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonial carousel */}
        <div className="relative mt-16 max-w-6xl mx-auto">
          <div className="absolute -top-10 left-0 text-8xl text-green-200 opacity-50">
            <Quote />
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex mb-6">
                      {renderStars(testimonials[activeIndex].rating)}
                      <span className="ml-2 text-sm text-gray-500">
                        {testimonials[activeIndex].rating}.0 rating
                      </span>
                    </div>

                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
                      "{testimonials[activeIndex].text}"
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={testimonials[activeIndex].avatar}
                          alt={testimonials[activeIndex].author}
                          className="w-12 h-12 rounded-full mr-4 border-2 border-green-100"
                        />
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-bold text-lg">{testimonials[activeIndex].author}</h4>
                            {testimonials[activeIndex].verified && (
                              <Badge className="ml-2 bg-blue-100 text-blue-700">Verified</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {testimonials[activeIndex].role}
                            {testimonials[activeIndex].company && ` at ${testimonials[activeIndex].company}`}
                          </p>
                        </div>
                      </div>

                      <motion.button
                        className="flex items-center text-gray-500 hover:text-green-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ThumbsUp size={16} className="mr-1" />
                        <span>{testimonials[activeIndex].likes}</span>
                      </motion.button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold mb-4">Additional Details</h4>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin size={16} className="mr-2 text-gray-400 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium">Location</div>
                            <div className="text-sm text-gray-500">{testimonials[activeIndex].location}</div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Clock size={16} className="mr-2 text-gray-400 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium">Reviewed</div>
                            <div className="text-sm text-gray-500">{testimonials[activeIndex].date}</div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Star size={16} className="mr-2 text-gray-400 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium">Experience</div>
                            <div className="text-sm text-gray-500">
                              {testimonials[activeIndex].rating === 5 ? 'Excellent' :
                               testimonials[activeIndex].rating === 4 ? 'Very Good' :
                               testimonials[activeIndex].rating === 3 ? 'Good' :
                               testimonials[activeIndex].rating === 2 ? 'Fair' : 'Poor'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="text-sm text-gray-500 mb-2">Verified Review</div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <motion.div
                          className="h-2 bg-green-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="flex justify-between mt-8">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="mr-2 rounded-full"
                >
                  <ChevronLeft size={18} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-3">
                  {activeIndex + 1} of {testimonials.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAutoplay(!autoplay)}
                  className={`text-xs ${autoplay ? 'bg-green-50 text-green-700 border-green-200' : ''}`}
                >
                  {autoplay ? 'Auto-Playing' : 'Auto-Play'}
                </Button>
              </div>
            </div>
          </div>

          {/* Testimonial thumbnails */}
          <div className="mt-12 overflow-hidden">
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveIndex(index);
                    setAutoplay(false);
                  }}
                  className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                    activeIndex === index
                      ? 'ring-2 ring-green-500 ring-offset-2'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
