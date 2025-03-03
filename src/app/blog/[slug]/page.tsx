import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { urlForImage } from '@/lib/sanity';
import { getBlogPostBySlugQuery, getRelatedPostsQuery } from '@/lib/queries/blog';
import { PortableText } from '@portabletext/react';
import { BlogPost } from '@/types/blog';

// Define the props for the page
interface BlogPostPageProps {
  params: { slug: string };
}

// Components for rendering portable text
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8 relative rounded-lg overflow-hidden">
          <Image
            src={urlForImage(value).url()}
            alt={value.alt || 'Blog post image'}
            width={800}
            height={500}
            className="w-full h-auto object-cover"
          />
          {value.caption && (
            <div className="text-sm text-neutral-600 italic mt-2">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
    code: ({ value }: any) => {
      return (
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg my-6 overflow-x-auto">
          <code>{value.code}</code>
          {value.filename && (
            <div className="text-sm text-neutral-400 mt-2">
              {value.filename}
            </div>
          )}
        </pre>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>,
    normal: ({ children }: any) => <p className="my-4 text-neutral-800">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 my-6 text-neutral-700 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          target={target}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-2">{children}</li>,
    number: ({ children }: any) => <li className="mb-2">{children}</li>,
  },
};

// Server component to fetch blog post data
async function getPost(slug: string) {
  try {
    const post = await sanityFetch<BlogPost>({
      query: getBlogPostBySlugQuery,
      params: { slug },
    });
    
    if (!post) {
      return null;
    }
    
    // Fetch related posts
    const relatedPosts = await sanityFetch<BlogPost[]>({
      query: getRelatedPostsQuery,
      params: {
        slug,
        categoryId: post.category?._id || '',
        tags: post.tags || [],
      },
    });
    
    return { post, relatedPosts };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const data = await getPost(slug);
  
  if (!data) {
    notFound();
  }
  
  const { post, relatedPosts } = data;
  const publishDate = post.publishedAt ? new Date(post.publishedAt) : new Date();
  
  return (
    <main className="min-h-screen">
      <div className="bg-neutral-50 pt-20 pb-10">
        <div className="max-w-screen-xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center text-blue-600 mb-6 hover:underline">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-neutral-600 mb-8">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              {format(publishDate, 'MMMM d, yyyy')}
            </div>
            
            {post.readTime && (
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                {post.readTime} min read
              </div>
            )}
            
            {post.category && (
              <Link 
                href={`/blog?category=${post.category._id}`} 
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {post.category.name}
              </Link>
            )}
          </div>
          
          {post.coverImage && (
            <div className="rounded-lg overflow-hidden mb-10">
              <Image
                src={urlForImage(post.coverImage).url()}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="max-w-screen-lg mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <article className="lg:w-2/3">
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.content} components={ptComponents} />
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Tag size={18} className="mr-2" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm hover:bg-neutral-200 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
          
          <aside className="lg:w-1/3">
            {post.author && (
              <div className="bg-neutral-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-medium mb-4">Author</h3>
                <div className="flex items-center">
                  {post.author.avatar && (
                    <div className="mr-4">
                      <Image
                        src={urlForImage(post.author.avatar).url()}
                        alt={post.author.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">{post.author.name}</h4>
                    {post.author.title && (
                      <p className="text-neutral-600 text-sm">{post.author.title}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost._id} className="border-b border-neutral-200 pb-4 last:border-0">
                      <Link href={`/blog/${relatedPost.slug.current}`} className="hover:text-blue-600 transition-colors">
                        <h4 className="font-medium mb-1">{relatedPost.title}</h4>
                      </Link>
                      {relatedPost.publishedAt && (
                        <p className="text-neutral-600 text-sm">
                          {format(new Date(relatedPost.publishedAt), 'MMMM d, yyyy')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}