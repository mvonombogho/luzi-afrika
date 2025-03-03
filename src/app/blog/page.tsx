'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import BlogCard from '@/components/blog/BlogCard';
import { sanityFetch } from '@/lib/sanity';
import { getAllBlogPostsQuery, getAllCategoriesQuery } from '@/lib/queries/blog';
import { BlogPost, Category } from '@/types/blog';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch blog posts and categories from Sanity
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fetchedPosts, fetchedCategories] = await Promise.all([
          sanityFetch<BlogPost[]>({ query: getAllBlogPostsQuery }),
          sanityFetch<Category[]>({ query: getAllCategoriesQuery }),
        ]);
        
        setPosts(fetchedPosts);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        // Fall back to empty arrays
        setPosts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Get most recent post for featured display
  const featuredPost = posts.find(post => post.featured) || posts[0];
  
  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      : true;
      
    const matchesCategory = selectedCategory
      ? post.category?._id === selectedCategory
      : true;
      
    return matchesSearch && matchesCategory;
  });
  
  if (loading) {
    return (
      <main className="min-h-screen">
        <PageHeader 
          title="Blog & Resources"
          subtitle="Insights, guides, and news on IT support and technology trends"
        />
        <div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Blog & Resources"
        subtitle="Insights, guides, and news on IT support and technology trends"
      />
      
      <section className="py-16 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto">
          {/* Search and filters */}
          <div className="mb-10 flex flex-col md:flex-row gap-6 justify-between">
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 px-4 pr-10 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === null
                    ? 'bg-blue-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                All
              </button>
              
              {categories.map((category) => category && (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedCategory === category._id
                      ? 'bg-blue-500 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Featured Post */}
          {!searchQuery && !selectedCategory && featuredPost && (
            <div className="mb-16">
              <h2 className="text-2xl font-light mb-6">Featured Article</h2>
              <BlogCard post={featuredPost} featured={true} />
            </div>
          )}
          
          {/* Post Grid */}
          <div>
            <h2 className="text-2xl font-light mb-6">
              {searchQuery || selectedCategory ? 'Search Results' : 'Latest Articles'}
            </h2>
            
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-neutral-50 rounded-lg">
                <h3 className="text-xl font-light mb-3">No articles found</h3>
                <p className="text-neutral-600 mb-6">
                  We couldn't find any articles matching your search criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium"
                >
                  View All Articles
                </button>
              </div>
            )}
          </div>
          
          {/* Newsletter Signup */}
          <div className="mt-20 bg-blue-50 p-10 rounded-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-light mb-4">Stay Updated</h2>
              <p className="text-neutral-600 mb-8">
                Subscribe to our newsletter to receive the latest technology insights, tips, and updates.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow py-3 px-4 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 px-6 bg-blue-500 text-white rounded-lg text-sm font-medium"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}