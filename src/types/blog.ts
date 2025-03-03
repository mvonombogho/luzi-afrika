// Blog-related type definitions

export interface Author {
  _id?: string;
  name: string;
  title?: string;
  avatar?: any; // Sanity image reference
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  content: any; // Portable Text content
  coverImage: any; // Sanity image reference
  publishedAt?: string;
  author?: Author;
  category?: Category;
  tags?: string[];
  readTime?: number;
  featured?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    shareImage?: any; // Sanity image reference
  };
}
