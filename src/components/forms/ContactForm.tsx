'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { contactFormSchema, ContactFormData } from '@/schemas/contact';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      setErrorMessage('');
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message');
      }
      
      // Success
      setSubmitStatus('success');
      reset(); // Clear form
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        if (submitStatus === 'success' || submitStatus === 'error') {
          setSubmitStatus('idle');
        }
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label htmlFor="name" className="text-sm uppercase tracking-[0.2em] mb-2 block">
          Name
        </label>
        <input
          type="text"
          id="name"
          disabled={isSubmitting}
          className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-neutral-200'} py-2 focus:outline-none focus:border-black transition-colors disabled:opacity-50 text-base sm:text-lg`}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm uppercase tracking-[0.2em] mb-2 block">
          Email
        </label>
        <input
          type="email"
          id="email"
          disabled={isSubmitting}
          className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-neutral-200'} py-2 focus:outline-none focus:border-black transition-colors disabled:opacity-50 text-base sm:text-lg`}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="company" className="text-sm uppercase tracking-[0.2em] mb-2 block">
          Company
        </label>
        <input
          type="text"
          id="company"
          disabled={isSubmitting}
          className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none focus:border-black transition-colors disabled:opacity-50 text-base sm:text-lg"
          {...register('company')}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm uppercase tracking-[0.2em] mb-2 block">
          Message
        </label>
        <textarea
          id="message"
          disabled={isSubmitting}
          rows={4}
          className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-neutral-200'} py-2 focus:outline-none focus:border-black transition-colors resize-none disabled:opacity-50 text-base sm:text-lg`}
          {...register('message')}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {submitStatus === 'success' && (
        <div className="px-4 py-3 bg-green-50 text-green-600 text-sm rounded-sm">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="px-4 py-3 bg-red-50 text-red-600 text-sm rounded-sm">
          {errorMessage || 'Failed to send message. Please try again.'}
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-8 py-4 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </motion.button>
    </form>
  );
}