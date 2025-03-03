import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';
import { urlForImage } from '@/lib/sanity';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  // Handle Sanity image URL conversion
  const imageUrl = post.coverImage 
    ? urlForImage(post.coverImage).width(featured ? 1200 : 600).height(featured ? 600 : 400).url()
    : '/placeholder-1200-630.jpg';
  
  // Format date or use a fallback
  const formattedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'MMMM d, yyyy')
    : '';
  
  // Get slug URL
  const slugUrl = `/blog/${post.slug.current}`;
  
  if (featured) {
    return (
      <motion.div 
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative h-80 md:h-full">
            <Link href={slugUrl}>
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </Link>
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            {post.category && (
              <Link 
                href={`/blog?category=${post.category._id}`}
                className="text-blue-600 text-sm font-medium mb-2 hover:underline"
              >
                {post.category.name}
              </Link>
            )}
            
            <Link href={slugUrl} className="group">
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
            </Link>
            
            <p className="text-neutral-600 mb-6 line-clamp-3">{post.excerpt}</p>
            
            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  {post.author && (
                    <div className="flex items-center">
                      {post.author.avatar && (
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 relative">
                          <Image
                            src={urlForImage(post.author.avatar).width(60).height(60).url()}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-neutral-500 text-sm">{post.author.title}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-neutral-500 text-sm flex items-center">
                  {formattedDate}
                  {post.readTime && (
                    <span className="ml-3 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.readTime} min
                    </span>
                  )}
                </div>
              </div>
              
              <Link 
                href={slugUrl}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.article 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48">
        <Link href={slugUrl}>
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
        </Link>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-auto">
          {post.category && (
            <Link 
              href={`/blog?category=${post.category._id}`}
              className="text-blue-600 text-sm font-medium mb-2 inline-block hover:underline"
            >
              {post.category.name}
            </Link>
          )}
          
          <Link href={slugUrl} className="group">
            <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
          </Link>
          
          <p className="text-neutral-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
          <div className="text-neutral-500 text-sm">
            {formattedDate}
          </div>
          
          {post.readTime && (
            <div className="text-neutral-500 text-sm flex items-center">
              <Clock size={14} className="mr-1" />
              {post.readTime} min
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}