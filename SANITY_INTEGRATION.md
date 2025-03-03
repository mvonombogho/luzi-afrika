# Sanity CMS Integration

This document outlines the current state of Sanity CMS integration in the Luzi Afrika website project.

## What We've Accomplished

1. **Set up Sanity infrastructure**:
   - Created content schemas for Services, Blog Posts, Authors, and Categories
   - Set up configuration files for Sanity
   - Implemented helper functions for API access and image handling
   - Added the Sanity Studio to the Next.js app at '/studio'

2. **Implemented graceful fallbacks**:
   - All components will attempt to fetch data from Sanity first
   - If Sanity data is not available or there's an error, components will use local data
   - This ensures the site works even during initial setup or if there are connectivity issues

3. **Components connected to Sanity**:
   - Home page Services section
   - Services listing page
   - Service detail page
   - Setup for Blog integration

4. **Ready for content population**:
   - Sanity Studio is fully configured and ready for content creation
   - Data structures match between Sanity schemas and website components

## How to Use

### For Developers

1. **Setup Environment Variables**:
   - Copy `.env.example` to `.env.local`
   - Add your Sanity project ID and token

2. **Access Sanity Studio**:
   - Run the development server: `npm run dev`
   - Visit: `http://localhost:3000/studio`
   - Log in with your Sanity credentials

3. **Modifying Data Structures**:
   - Update schemas in `/sanity/schemas/`
   - The website components will automatically adapt to schema changes

### For Content Managers

1. **Creating Services**:
   - Access the Sanity Studio
   - Navigate to the "Services" section
   - Create new service entries with all required fields
   - Content will automatically appear on the website

2. **Managing Blog Content**:
   - Create authors and categories first
   - Then create blog posts, linking them to authors and categories
   - Add rich text content, images, and metadata

## Next Steps

1. **Complete Blog Integration**:
   - Update blog components to fetch from Sanity
   - Implement image optimization with next/image

2. **Add Project Content Type**:
   - Create schema for projects
   - Connect project components to Sanity

3. **Content Population**:
   - Add actual service content
   - Create blog posts
   - Set up team members and company information

4. **Production Deployment**:
   - Set up proper environment variables
   - Configure CORS settings for Sanity
   - Add authentication for Studio access in production

## Troubleshooting

If you're experiencing issues with the Sanity integration:

1. **Check Environment Variables**:
   - Ensure your `.env.local` file has the correct Sanity project ID and token
   - Verify the dataset name (default is "production")

2. **Network Issues**:
   - Check browser console for API errors
   - Verify your API permissions in Sanity

3. **Schema Mismatches**:
   - If data isn't displaying correctly, ensure your Sanity schema matches the expected data structure
   - Check the types in `/src/types/` for reference