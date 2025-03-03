// Queries for fetching project data from Sanity

// Get all projects with essential fields
export const getAllProjectsQuery = `
  *[_type == "project"] | order(projectDate desc) {
    _id,
    title,
    slug,
    description,
    client,
    category,
    mainImage,
    projectDate,
    featured,
    technologies
  }
`;

// Get featured projects
export const getFeaturedProjectsQuery = `
  *[_type == "project" && featured == true] | order(projectDate desc)[0...4] {
    _id,
    title,
    slug,
    description,
    client,
    category,
    mainImage,
    projectDate,
    featured,
    technologies
  }
`;

// Get a specific project by slug with full content
export const getProjectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    client,
    category,
    mainImage,
    gallery,
    projectDate,
    content,
    technologies,
    testimonial
  }
`;

// Get project categories for filtering
export const getProjectCategoriesQuery = `
  *[_type == "project"] {
    category
  } | order(category) | unique
`;

// Get related projects
export const getRelatedProjectsQuery = `
  *[_type == "project" && slug.current != $slug && category == $category] | order(projectDate desc)[0...3] {
    _id,
    title,
    slug,
    description,
    client,
    category,
    mainImage,
    projectDate
  }
`;
