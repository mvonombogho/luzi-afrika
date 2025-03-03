# Deployment Guide for Luzi Afrika Website

This guide provides detailed steps for deploying the Luzi Afrika website using Vercel and setting up the Sanity CMS. Follow these instructions to ensure a smooth deployment process.

## Prerequisites

- A GitHub account with access to the Luzi Afrika repository
- A Vercel account
- A Sanity.io account
- A custom domain (optional)

## Step 1: Set Up Sanity Studio

1. Create a Sanity.io account if you don't already have one at [https://www.sanity.io/](https://www.sanity.io/)

2. Create a new Sanity project:
   - Go to your Sanity dashboard
   - Click "Create new project"
   - Name it "Luzi Afrika"
   - Choose the "Empty schema" option
   - Select your preferred dataset name (e.g., "production")

3. Install the Sanity CLI:
   ```bash
   npm install -g @sanity/cli
   ```

4. Get your project credentials:
   - In your Sanity project dashboard, go to "API"
   - Note your Project ID, Dataset name, and API version
   - Create an API token with "Editor" privileges for CMS integration

## Step 2: Configure Environment Variables

1. In the project root, create a `.env.local` file with the following variables:
   ```env
   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-02-15
   SANITY_API_TOKEN=your-api-token
   
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=https://luziafrika.com
   
   # Email Service (Resend)
   RESEND_API_KEY=your-resend-api-key
   CONTACT_EMAIL=contact@luziafrika.com
   ```

2. Replace the placeholder values with your actual credentials

## Step 3: Deploy to Vercel

1. Push your project to GitHub if you haven't already

2. Sign in to [Vercel](https://vercel.com/) and create a new project:
   - Select "Import Git Repository"
   - Choose the Luzi Afrika repository
   - Vercel will automatically detect that it's a Next.js project

3. Configure project settings:
   - In the "Build and Output Settings" section, keep the defaults
   - In the "Environment Variables" section, add all the variables from your `.env.local` file
   - Click "Deploy"

4. Wait for the deployment to complete

5. Set up your custom domain (optional):
   - Go to your project settings in Vercel
   - Navigate to "Domains"
   - Add your custom domain and follow the instructions to configure DNS

## Step 4: Populate Sanity Content

1. After deployment, navigate to your Sanity Studio at:
   ```
   https://your-site-url.com/studio
   ```

2. Create content for your website:
   - Add services with detailed descriptions
   - Add project case studies
   - Create blog posts
   - Add team members

3. Publish your content when ready

## Step 5: Verify Deployment

1. Visit your website to ensure everything is working correctly:
   - Check all pages load properly
   - Verify that Sanity content is displaying correctly
   - Test contact forms and other interactive elements
   - Check responsive behavior on different devices

## Troubleshooting

- **Missing Environment Variables**: If your site deploys but content isn't loading, check that all environment variables are set in Vercel
- **Build Errors**: Check Vercel build logs for any errors and resolve them
- **CORS Issues**: Ensure your Sanity project CORS origins include your domain

## Maintenance and Updates

- **Content Updates**: All content can be updated through the Sanity Studio interface
- **Code Updates**: Push code changes to GitHub and Vercel will automatically deploy them
- **Database Backups**: Sanity handles backups automatically, but you can export data manually for extra safety
- **Performance Monitoring**: Use Vercel Analytics to monitor site performance

## Support

If you encounter any issues during deployment or have questions about the website, please contact the development team at support@luziafrika.com.
