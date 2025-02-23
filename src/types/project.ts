export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  client: string;
  duration: string;
  completionDate: string;
  services: string[];
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
  gallery?: string[];
}

export interface ProjectMeta {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
}