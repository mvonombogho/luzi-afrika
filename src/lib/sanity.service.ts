import { sanityFetch } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { 
  allServicesQuery, 
  serviceByIdQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  featuredBlogPostsQuery,
  blogCategoriesQuery,
  blogPostsByCategoryQuery,
  blogAuthorsQuery,
  authorBySlugQuery
} from '@/sanity/lib/queries';
import { Service } from '@/types/service';
import { BlogPost, BlogCategory, BlogMetadata, BlogAuthor } from '@/types/blog';

export async function getAllServices(): Promise<Service[]> {
  try {
    const services = await sanityFetch<Service[]>({
      query: allServicesQuery
    });
    
    return services || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const service = await sanityFetch<Service>({
      query: serviceByIdQuery,
      params: { id }
    });
    
    return service;
  } catch (error) {
    console.error(`Error fetching service with ID ${id}:`, error);
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogMetadata[]> {
  try {
    const posts = await sanityFetch<BlogMetadata[]>({
      query: blogPostsQuery
    });
    
    return posts.map(post => ({
      ...post,
      coverImage: urlForImage(post.coverImage).url(),
      author: {
        ...post.author,
        avatar: post.author.avatar ? urlForImage(post.author.avatar).url() : undefined
      }
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogMetadata[]> {
  try {
    const posts = await sanityFetch<BlogMetadata[]>({
      query: featuredBlogPostsQuery
    });
    
    return posts.map(post => ({
      ...post,
      coverImage: urlForImage(post.coverImage).url(),
      author: {
        ...post.author,
        avatar: post.author.avatar ? urlForImage(post.author.avatar).url() : undefined
      }
    }));
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await sanityFetch<BlogPost>({
      query: blogPostBySlugQuery,
      params: { slug }
    });
    
    if (!post) return null;
    
    return {
      ...post,
      coverImage: urlForImage(post.coverImage).url(),
      author: {
        ...post.author,
        avatar: post.author.avatar ? urlForImage(post.author.avatar).url() : undefined
      },
      seo: post.seo ? {
        ...post.seo,
        shareImage: post.seo.shareImage ? urlForImage(post.seo.shareImage).url() : undefined
      } : undefined
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const categories = await sanityFetch<BlogCategory[]>({
      query: blogCategoriesQuery
    });
    
    return categories || [];
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
}

export async function getBlogPostsByCategory(categoryId: string): Promise<BlogMetadata[]> {
  try {
    const posts = await sanityFetch<BlogMetadata[]>({
      query: blogPostsByCategoryQuery,
      params: { categoryId }
    });
    
    return posts.map(post => ({
      ...post,
      coverImage: urlForImage(post.coverImage).url(),
      author: {
        ...post.author,
        avatar: post.author.avatar ? urlForImage(post.author.avatar).url() : undefined
      }
    }));
  } catch (error) {
    console.error(`Error fetching blog posts for category ${categoryId}:`, error);
    return [];
  }
}

export async function getBlogAuthors(): Promise<BlogAuthor[]> {
  try {
    const authors = await sanityFetch<BlogAuthor[]>({
      query: blogAuthorsQuery
    });
    
    return authors.map(author => ({
      ...author,
      avatar: author.avatar ? urlForImage(author.avatar).url() : undefined
    }));
  } catch (error) {
    console.error('Error fetching blog authors:', error);
    return [];
  }
}

export async function getAuthorBySlug(slug: string): Promise<BlogAuthor | null> {
  try {
    const author = await sanityFetch<BlogAuthor>({
      query: authorBySlugQuery,
      params: { slug }
    });
    
    if (!author) return null;
    
    return {
      ...author,
      avatar: author.avatar ? urlForImage(author.avatar).url() : undefined
    };
  } catch (error) {
    console.error(`Error fetching author with slug ${slug}:`, error);
    return null;
  }
}