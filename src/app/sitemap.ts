import { MetadataRoute } from 'next';
import { sanityFetch } from '@/lib/sanity';
import { getAllServicesQuery } from '@/lib/queries/services';
import { getAllProjectsQuery } from '@/lib/queries/projects';

// Static routes that should be included in the sitemap
const routes = [
  '',
  '/about',
  '/services',
  '/projects',
  '/blog',
  '/contact',
  '/ai-solutions',
  '/privacy-policy',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from environment variables or default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://luziafrika.com';
  
  // Static routes
  const staticRoutes = routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
  
  // Fetch services for dynamic routes
  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const services = await sanityFetch<any[]>({
      query: getAllServicesQuery,
    });
    
    serviceRoutes = services.map(service => ({
      url: `${baseUrl}/services/${service.slug.current}`,
      lastModified: new Date(service._updatedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching services for sitemap:', error);
  }
  
  // Fetch projects for dynamic routes
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await sanityFetch<any[]>({
      query: getAllProjectsQuery,
    });
    
    projectRoutes = projects.map(project => ({
      url: `${baseUrl}/projects/${project.slug.current}`,
      lastModified: new Date(project._updatedAt || new Date()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error);
  }
  
  // Combine all routes
  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}