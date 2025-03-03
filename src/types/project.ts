// Project-related type definitions

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  client?: string;
  category: string;
  mainImage: any; // Sanity image reference
  gallery?: any[]; // Array of Sanity image references
  projectDate?: string;
  content: any; // Portable Text content
  technologies?: string[];
  featured?: boolean;
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
}
