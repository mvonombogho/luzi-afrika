// Service queries
export const allServicesQuery = `*[_type == "service"] | order(order asc) {
  id,
  title,
  description,
  features,
  icon,
}`;

export const serviceByIdQuery = `*[_type == "service" && id.current == $id][0] {
  id,
  title,
  description,
  features,
  detailedDescription,
  benefits,
  caseStudyTitle,
  caseStudyDescription,
  keyFeatures,
  faqs,
  icon,
}`;

// Blog queries
export const blogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  "id": _id,
  "slug": slug.current,
  title,
  excerpt,
  "coverImage": coverImage,
  "date": publishedAt,
  "author": author->{name, title, "avatar": avatar},
  "category": category->{
    "id": id.current,
    name
  },
  tags,
  readTime,
}`;

export const featuredBlogPostsQuery = `*[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3] {
  "id": _id,
  "slug": slug.current,
  title,
  excerpt,
  "coverImage": coverImage,
  "date": publishedAt,
  "author": author->{name, title, "avatar": avatar},
  "category": category->{
    "id": id.current,
    name
  },
  tags,
  readTime,
}`;

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  "id": _id,
  "slug": slug.current,
  title,
  excerpt,
  "coverImage": coverImage,
  "date": publishedAt,
  "author": author->{name, title, "avatar": avatar},
  "category": category->{
    "id": id.current,
    name
  },
  content,
  tags,
  readTime,
  "seo": {
    "metaTitle": seo.metaTitle,
    "metaDescription": seo.metaDescription,
    "shareImage": seo.shareImage
  }
}`;

export const blogPostsByCategoryQuery = `*[_type == "blogPost" && category->id.current == $categoryId] | order(publishedAt desc) {
  "id": _id,
  "slug": slug.current,
  title,
  excerpt,
  "coverImage": coverImage,
  "date": publishedAt,
  "author": author->{name, title, "avatar": avatar},
  "category": category->{
    "id": id.current,
    name
  },
  tags,
  readTime,
}`;

export const relatedBlogPostsQuery = `*[_type == "blogPost" && category->id.current == $categoryId && slug.current != $slug] | order(publishedAt desc)[0...3] {
  "id": _id,
  "slug": slug.current,
  title,
  excerpt,
  "coverImage": coverImage,
  "date": publishedAt,
  "author": author->{name, title, "avatar": avatar},
  "category": category->{
    "id": id.current,
    name
  },
  tags,
  readTime,
}`;

export const blogCategoriesQuery = `*[_type == "category"] | order(name asc) {
  "id": id.current,
  name,
  description,
  color
}`;

// Author queries
export const blogAuthorsQuery = `*[_type == "author"] {
  "id": _id,
  "slug": slug.current,
  name,
  title,
  "avatar": avatar,
  bio,
  email,
  socialLinks
}`;

export const authorBySlugQuery = `*[_type == "author" && slug.current == $slug][0] {
  "id": _id,
  "slug": slug.current,
  name,
  title,
  "avatar": avatar,
  bio,
  email,
  socialLinks
}`;