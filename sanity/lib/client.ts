import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: typeof document !== 'undefined', // use CDN in browser, direct API in SSR
});

// Helper function to handle error cases with data fetching
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
}): Promise<T> {
  try {
    return await client.fetch<T>(query, params, { tags });
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    throw new Error('Failed to fetch data from CMS');
  }
}