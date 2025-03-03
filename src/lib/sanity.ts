import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { dataCache } from '@/lib/cache';

// Define project configuration
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-15',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
};

// Set up the client for fetching data
export const sanityClient = createClient(config);

// Determine cache TTL based on environment
const CACHE_TTL = process.env.NODE_ENV === 'production'
  ? 5 * 60 * 1000       // 5 minutes in production
  : 30 * 1000;          // 30 seconds in development

// Helper function for fetching data with caching
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  cache = true,
  ttl = CACHE_TTL
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
  cache?: boolean;
  ttl?: number;
}): Promise<T> {
  // Generate cache key from query and params
  const cacheKey = `sanity_${query}_${JSON.stringify(params)}`;
  
  // If caching is disabled, fetch directly
  if (!cache) {
    return sanityClient.fetch<T>(query, params);
  }
  
  // Use cache with fallback to fetch
  return dataCache.getOrSet<T>(
    cacheKey,
    () => sanityClient.fetch<T>(query, params),
    ttl
  );
}

// Set up the image URL builder
const builder = imageUrlBuilder(sanityClient);

// Helper function for generating image URLs
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
