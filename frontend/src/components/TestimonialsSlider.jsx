import React, { useState, useEffect } from 'react';

export default function TestimonialsSlider({ testimonials, autoPlay = true, interval = 4000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(id);
  }, [autoPlay, testimonials.length, interval]);

  const testimonial = testimonials[index];

  return (
    <div className="relative max-w-4xl mx-auto p-8 bg-gradient-to-r from-green-900 via-teal-800 to-green-700 rounded-xl shadow-lg overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-green bg-opacity-40 z-0 rounded-xl"></div>

      {/* Testimonial Content */}
      <div className="relative z-10 text-center text-green-100">
        <p className="text-xl italic mb-4">“{testimonial.text}”</p>
        <p className="text-lg font-semibold text-green-200">{testimonial.name}</p>
        <p className="text-sm text-green-300">{testimonial.role}</p>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute bottom-6 left-6 text-green-900 bg-green-300 bg-opacity-70 hover:bg-opacity-100 transition rounded-full p-3 shadow-lg flex items-center justify-center text-2xl select-none"
        onClick={() => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
        aria-label="Previous Testimonial"
      >
        ‹
      </button>
      <button
        className="absolute bottom-6 right-6 text-green-900 bg-green-300 bg-opacity-70 hover:bg-opacity-100 transition rounded-full p-3 shadow-lg flex items-center justify-center text-2xl select-none"
        onClick={() => setIndex((prev) => (prev + 1) % testimonials.length)}
        aria-label="Next Testimonial"
      >
        ›
      </button>
    </div>
  );
}
