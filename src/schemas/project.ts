import { z } from 'zod';

export const testimonialSchema = z.object({
  quote: z.string().min(1, 'Quote is required'),
  author: z.string().min(1, 'Author name is required'),
  position: z.string().min(1, 'Position is required'),
  company: z.string().min(1, 'Company name is required'),
});

export const projectSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Invalid image URL'),
  client: z.string().min(1, 'Client name is required'),
  duration: z.string().min(1, 'Duration is required'),
  completionDate: z.string().min(1, 'Completion date is required'),
  services: z.array(z.string()).min(1, 'At least one service is required'),
  challenge: z.string().min(1, 'Challenge description is required'),
  solution: z.string().min(1, 'Solution description is required'),
  results: z.array(z.string()).min(1, 'At least one result is required'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  testimonial: testimonialSchema.optional(),
  gallery: z.array(z.string().url('Invalid gallery image URL')).optional(),
});

export const projectMetaSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Invalid image URL'),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectMeta = z.infer<typeof projectMetaSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;