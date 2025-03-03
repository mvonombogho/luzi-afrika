// Queries for fetching service data from Sanity

// Get all services
export const getAllServicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    featured,
    isAIService,
    serviceType,
    order
  }
`;

// Get featured services for homepage
export const getFeaturedServicesQuery = `
  *[_type == "service" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    featured,
    isAIService,
    serviceType
  }
`;

// Get AI services
export const getAIServicesQuery = `
  *[_type == "service" && isAIService == true] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    featured,
    isAIService,
    serviceType
  }
`;

// Get a specific service by slug with full content
export const getServiceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    fullDescription,
    icon,
    mainImage,
    benefits,
    features,
    caseStudies,
    faq,
    isAIService,
    serviceType
  }
`;
