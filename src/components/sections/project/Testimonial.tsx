'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  company: string;
}

const Testimonial = ({ quote, author, position, company }: TestimonialProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-neutral-50 rounded-lg p-8 md:p-12 mt-16"
    >
      {/* Quote Icon */}
      <div className="absolute -top-6 left-8">
        <div className="bg-black text-white p-4 rounded-full">
          <Quote size={24} />
        </div>
      </div>

      {/* Quote Content */}
      <div className="pt-6">
        <blockquote className="text-xl md:text-2xl font-light text-neutral-800 mb-8">
          "{quote}"
        </blockquote>

        <div className="flex items-center gap-4">
          <div>
            <p className="font-medium text-black">{author}</p>
            <p className="text-sm text-neutral-600">{position}, {company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonial;