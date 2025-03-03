import { Metadata } from 'next';
import { baseMetadata } from '@/app/metadata';
import { urlForImage } from '@/lib/sanity';

type MetadataProps = {
  title: string;
  description?: string;
  image?: any; // Sanity image
  type?: 'website' | 'article';
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  path?: string;
};

/**
 * Generates metadata for any page
 */
export function generateMetadata({
  title,
  description,
  image,
  type = 'website',
  publishedAt,
  updatedAt,
  author,
  path = '',
}: MetadataProps): Metadata {
  // Convert path to absolute URL
  const url = `${baseMetadata.metadataBase}${path.startsWith('/') ? path.slice(1) : path}`;
  
  // Get image URL if provided
  const imageUrl = image 
    ? urlForImage(image).width(1200).height(630).url()
    : (baseMetadata.openGraph?.images as any)?.[0]?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: baseMetadata.openGraph?.siteName,
      locale: 'en_US',
      type,
      ...(type === 'article' && {
        publishedTime: publishedAt,
        modifiedTime: updatedAt,
        authors: author ? [`${baseMetadata.metadataBase}author/${author}`] : undefined,
      }),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: baseMetadata.twitter?.creator,
    },
  };
}

/**
 * Generates blog post metadata
 */
export function generateBlogMetadata(post: any): Metadata {
  return generateMetadata({
    title: post.title,
    description: post.excerpt || post.title,
    image: post.mainImage,
    type: 'article',
    publishedAt: post.publishedAt,
    updatedAt: post._updatedAt,
    author: post.author?.name,
    path: `/blog/${post.slug?.current || post.slug || post._id || ''}`,
  });
}

/**
 * Generates service page metadata
 */
export function generateServiceMetadata(service: any): Metadata {
  // Determine the appropriate identifier for the path
  const serviceIdentifier = service.slug?.current || service._id || '';
  
  return generateMetadata({
    title: service.title,
    description: service.shortDescription || service.title,
    image: service.mainImage,
    path: `/services/${serviceIdentifier}`,
  });
}

/**
 * Generates project page metadata
 */
export function generateProjectMetadata(project: any): Metadata {
  return generateMetadata({
    title: project.title,
    description: project.description || project.title,
    image: project.mainImage,
    path: `/projects/${project.slug?.current || project._id || ''}`,
  });
}