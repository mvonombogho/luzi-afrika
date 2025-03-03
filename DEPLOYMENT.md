# Deployment Guide

This guide provides instructions for deploying the Luzi Afrika website to production using Vercel.

## Prerequisites

- A completed Sanity CMS setup (see [SANITY_SETUP.md](SANITY_SETUP.md))
- A GitHub account with this repository pushed to it
- A Vercel account (free tier is available)

## Deployment Steps with Vercel

### 1. Connect Your Repository to Vercel

1. Sign up or log in to [Vercel](https://vercel.com/)
2. Click "Add New" and select "Project"
3. Select your GitHub repository containing the Luzi Afrika website code
4. Vercel will automatically detect Next.js

### 2. Configure Project Settings

1. **Environment Variables**
   - Add all the required environment variables from your `.env.local` file:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
     NEXT_PUBLIC_SANITY_DATASET=production
     NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
     SANITY_API_TOKEN=your_token
     RESEND_API_KEY=your_resend_api_key
     ```

2. **Build and Output Settings**
   - Leave the build command as the default: `next build`
   - Output directory will automatically be set to `.next`

3. **Project Name**
   - Optionally, customize your project name and domain

### 3. Deploy Your Project

1. Click "Deploy"
2. Wait for the build and deployment to complete
3. Once deployed, Vercel will provide you with a URL for your site

### 4. Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to the "Domains" tab
3. Add your custom domain and follow Vercel's instructions for DNS configuration

## Post-Deployment Configuration

### 1. Update Sanity CORS Settings

1. Go to [manage.sanity.io](https://manage.sanity.io/)
2. Select your project
3. Go to API > CORS origins
4. Add your production domain (e.g., `https://luzi-afrika.com`) with credentials allowed

### 2. Test All Functionality

Verify that all features are working correctly in production:

- Check that Sanity content is displaying properly
- Test the contact form and email functionality
- Verify image loading and optimization
- Check responsive behavior across devices

### 3. Set Up Analytics (Recommended)

1. Create a Google Analytics account if you don't already have one
2. Add your Google Analytics tracking ID to the site
3. Consider implementing Vercel Analytics for performance monitoring

## Continuous Deployment

Vercel automatically sets up continuous deployment from your GitHub repository:

- Any push to the `main` branch will trigger a new deployment
- You can configure preview deployments for pull requests

## Performance Optimization

### 1. Image Optimization

Next.js handles image optimization automatically with the `<Image>` component. Make sure all images use:

```jsx
import Image from 'next/image';
// ...
<Image src="..." alt="..." width={...} height={...} />
```

### 2. Caching Sanity Data

Implement caching strategies to reduce API calls to Sanity:

```jsx
// In your fetch functions (already implemented in the codebase)
export async function sanityFetch<T>({ 
  query, 
  params = {}, 
  tags = [] 
}: { 
  query: string; 
  params?: Record<string, any>;
  tags?: string[];
}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { tags }
  });
}
```

### 3. Static Generation

Use static generation for pages that don't require frequent updates:

```jsx
export const dynamic = 'force-static';
```

## Troubleshooting

### Content Not Updating

If content changes in Sanity aren't reflecting on the site:

1. Check CORS settings in your Sanity project
2. Verify environment variables in Vercel
3. You might need to manually trigger a redeployment in Vercel

### Contact Form Issues

If the contact form isn't sending emails:

1. Check your Resend API key is correctly set in Vercel environment variables
2. Verify email addresses in the API route
3. Check Resend dashboard for any delivery issues

## Security Considerations

1. Keep your Sanity API token secure and don't expose it in client-side code
2. Regularly rotate API keys and tokens
3. Set up rate limiting for your contact form to prevent abuse

## Monitoring

1. Set up Vercel Monitoring for real-time performance insights
2. Configure notification alerts for deployment failures or performance issues
3. Regularly check your error logs in Vercel
