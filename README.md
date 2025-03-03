# Luzi Afrika Limited Website

This is the official website for Luzi Afrika Limited, a leading provider of comprehensive IT support and consultancy services in Kenya.

## Features

- Modern, responsive design
- Information about IT services offered
- Blog section with filterable content
- Contact form with email integration
- Sanity CMS for content management

## Technology Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP
- **Backend**: Next.js API routes, Resend for email
- **CMS**: Sanity.io
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Sanity.io account (for CMS)
- Resend account (for email functionality)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mvonombogho/luzi-afrika.git
   cd luzi-afrika
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in the required variables

4. **Fix Dynamic Route Conflict**: 
   - Delete the `/src/app/services/[id]` directory:
     ```bash
     rm -rf src/app/services/[id]
     ```
   - See [DYNAMIC_ROUTE_FIX.md](DYNAMIC_ROUTE_FIX.md) for more details

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

## Sanity CMS Setup

We use Sanity.io for content management. See [SANITY_SETUP.md](SANITY_SETUP.md) for detailed instructions on setting up and using the CMS.

Once configured, you can access the Sanity Studio at:
```
http://localhost:3000/studio
```

## Project Structure

- `/src/app` - Next.js app pages & routes
- `/src/components` - Reusable React components
- `/src/data` - Static data and mock content
- `/src/lib` - Utility functions and libraries
- `/src/schemas` - Data validation schemas
- `/src/types` - TypeScript type definitions
- `/sanity` - Sanity CMS configuration and schemas

## Known Issues

- **Dynamic Route Conflict**: The repository has a conflict between `/services/[id]` and `/services/[slug]` routes. Follow the instructions in [DYNAMIC_ROUTE_FIX.md](DYNAMIC_ROUTE_FIX.md) to resolve this issue before starting the development server.

## Deployment

The project is configured for easy deployment on Vercel:

1. Push to GitHub
2. Connect your repository to Vercel
3. Set up the required environment variables
4. Deploy

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Submit a pull request

## License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

---

Developed for Luzi Afrika Limited © 2025