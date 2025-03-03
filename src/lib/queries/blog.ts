// Queries for fetching blog data from Sanity

// Get all blog posts with essential fields
export const getAllBlogPostsQuery = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage,
    "category": category->{
      _id,
      name
    },
    "author": author->{
      name,
      title,
      "avatar": image
    },
    readTime,
    featured,
    tags
  }
`;

// Get featured blog posts
export const getFeaturedBlogPostsQuery = `
  *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage,
    "category": category->{
      _id,
      name
    },
    "author": author->{
      name,
      title,
      "avatar": image
    },
    readTime,
    featured
  }
`;

// Get a specific blog post by slug with full content
export const getBlogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    coverImage,
    "category": category->{
      _id,
      name
    },
    "author": author->{
      name,
      title,
      "avatar": image
    },
    readTime,
    tags,
    seo
  }
`;

// Get all categories
export const getAllCategoriesQuery = `
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    description
  }
`;

// Get related posts based on category or tags
export const getRelatedPostsQuery = `
  *[_type == "blogPost" && slug.current != $slug && (category._ref == $categoryId || $tags[0] in tags)] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage,
    "category": category->{
      _id,
      name
    },
    readTime
  }
`;
