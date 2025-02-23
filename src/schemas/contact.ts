import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z
    .string()
    .email('Invalid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  
  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  
  // Additional fields for tracking and validation
  source: z
    .enum(['website', 'referral', 'search', 'social', 'other'])
    .optional(),
  
  projectType: z
    .enum([
      'hardware_support',
      'software_solutions',
      'it_procurement',
      'technical_support',
      'other'
    ])
    .optional(),
  
  budget: z
    .enum(['under_5k', '5k_15k', '15k_30k', 'over_30k', 'not_specified'])
    .optional(),
  
  timeframe: z
    .enum(['immediate', 'within_month', 'within_quarter', 'flexible'])
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Custom error messages for form validation
export const contactFormErrors = {
  name: {
    required: 'Please enter your name',
    min: 'Name must be at least 2 characters',
    max: 'Name is too long'
  },
  email: {
    required: 'Please enter your email',
    invalid: 'Please enter a valid email address'
  },
  message: {
    required: 'Please enter your message',
    min: 'Message is too short',
    max: 'Message is too long'
  }
} as const;

// Validation helper for the contact form
export function validateContactForm(data: unknown): {
  success: boolean;
  data?: ContactFormData;
  errors?: string[];
} {
  try {
    const validData = contactFormSchema.parse(data);
    return {
      success: true,
      data: validData
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(e => e.message)
      };
    }
    return {
      success: false,
      errors: ['An unexpected error occurred']
    };
  }
}