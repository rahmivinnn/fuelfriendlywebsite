
import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "FuelFriendly has completely changed how I manage fuel for my delivery fleet. The scheduling feature alone has saved us countless hours and improved our efficiency by 30%.",
      author: "John D.",
      role: "Fleet Manager",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      text: "As a busy mom always on the go, I love how I can find the cheapest gas near me and pay right through the app. The rewards program is an amazing bonus too!",
      author: "Sarah L.",
      role: "Regular User",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      text: "Since joining the FuelFriendly network, our station has seen a 25% increase in customer traffic. The platform is intuitive and the support team is always responsive.",
      author: "Michael R.",
      role: "Station Owner",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              100,000+ Satisfied Users Trust FuelFriendly
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it - hear what our users have to say
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className="w-5 h-5 text-yellow-400 fill-current" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
              </div>
              <div className="flex items-center mt-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <button 
                key={i} 
                className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-primary' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
