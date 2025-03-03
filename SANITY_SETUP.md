# Sanity CMS Setup Guide

This guide will help you set up and configure Sanity CMS for the Luzi Afrika website.

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- A Sanity.io account

## Creating a Sanity Project

1. Sign up or log in to your [Sanity.io](https://www.sanity.io/) account

2. Create a new project:
   - Go to your Sanity dashboard
   - Click "Create new project"
   - Enter "Luzi Afrika CMS" as the project name
   - Choose the "Blog" starter schema (we'll customize it later)
   - Select "With a hosted dataset"
   - Choose the "Production" dataset
   - Select your preferred region

3. Once created, note your Project ID from the dashboard

## Configuring Environment Variables

1. In the root of your project, create a `.env.local` file by copying the example:
   ```bash
   cp .env.example .env.local
   ```

2. Update the environment variables with your Sanity details:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
   ```

3. Generate a Sanity API token for authenticated requests:
   - Go to [manage.sanity.io](https://manage.sanity.io/)
   - Select your project
   - Go to API > Tokens
   - Create a new token with at least "Editor" permissions
   - Add the token to your `.env.local` file:
     ```
     SANITY_API_TOKEN=your_token_here
     ```

4. Get a Resend API key for email functionality:
   - Sign up at [resend.com](https://resend.com/)
   - Create an API key
   - Add it to your `.env.local` file:
     ```
     RESEND_API_KEY=your_resend_api_key_here
     ```

## Accessing Sanity Studio

1. Start your development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Access the Sanity Studio at:
   ```
   http://localhost:3000/studio
   ```

3. Log in with your Sanity credentials

## Creating Content in Sanity

### Services

1. In Sanity Studio, go to the "Service" document type
2. Create new services with the following fields:
   - Title (e.g., "Hardware Support & Maintenance")
   - Slug (will auto-generate from title)
   - Short Description (for service cards)
   - Full Description (rich text)
   - Icon (one of: server, shield, database, network, monitor, hardDrive)
   - Main Image (for service detail pages)
   - Benefits (array of text items)
   - Features (array of text items with titles)
   - Set "Featured" to true for services that should appear on homepage
   - Set an "Order" number to control display sequence

### Blog Posts

1. First, create some Authors and Categories
2. Then create Blog Posts with:
   - Title and slug
   - Author reference
   - Category reference
   - Cover image
   - Content (rich text)
   - Tags
   - Set "Featured" to true for posts that should be highlighted

### Projects

1. Create Projects with:
   - Title and slug 
   - Description
   - Client name
   - Category (from predefined list)
   - Main image and gallery
   - Project date
   - Content (rich text)
   - Technologies used
   - Set "Featured" to true for projects to show on homepage

## CORS Configuration

For production deployment, update the CORS settings in your `sanity.config.ts` file to include your production domain:

```typescript
cors: {
  origin: [
    'http://localhost:3000',
    'http://localhost:3333',
    'https://your-production-domain.com',
  ],
  credentials: true,
}
```

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity + Next.js Guide](https://www.sanity.io/guides/nextjs-app-router-with-sanity-data)
