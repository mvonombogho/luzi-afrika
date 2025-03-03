'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export interface Testimonial {
  id: string | number;
  quote: string;
  author: string;
  position?: string;
  company?: string;
  image?: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  interval?: number;
  showIndicators?: boolean;
}

export default function TestimonialSlider({
  testimonials,
  autoplay = true,
  interval = 5000,
  showIndicators = true,
}: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Implement autoplay
  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, currentIndex]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden px-8 py-12">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center mx-auto max-w-3xl"
          >
            <div className="mb-8 text-blue-500">
              <Quote size={48} />
            </div>
            <blockquote className="text-xl md:text-2xl font-light italic mb-6 text-neutral-700">
              {testimonials[currentIndex].quote}
            </blockquote>
            <div className="mt-4">
              <p className="font-semibold text-lg">{testimonials[currentIndex].author}</p>
              {(testimonials[currentIndex].position || testimonials[currentIndex].company) && (
                <p className="text-neutral-500">
                  {testimonials[currentIndex].position}
                  {testimonials[currentIndex].position && testimonials[currentIndex].company ? ', ' : ''}
                  {testimonials[currentIndex].company}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all focus:outline-none"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all focus:outline-none"
        aria-label="Next testimonial"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicators */}
      {showIndicators && (
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-blue-500 w-5' : 'bg-neutral-300'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}