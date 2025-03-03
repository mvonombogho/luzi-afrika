// File: src/app/layout.tsx
'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation, CustomCursor, LoadingScreen, Footer } from '@/components';
import ResponsiveChecker from '@/components/ui/ResponsiveChecker';
import { generateLocalBusinessSchema } from '@/lib/schema';
import './styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate local business schema for structured data
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Luzi Afrika - Illuminating Africa's Digital Future through innovative IT solutions and support services in Kenya. Hardware, software, and network solutions for businesses." />
        
        {/* Primary Meta Tags */}
        <title>Luzi Afrika - IT Support & Solutions in Kenya</title>
        <meta name="title" content="Luzi Afrika - IT Support & Solutions in Kenya" />
        <meta name="description" content="Leading provider of comprehensive IT support and consultancy services in Kenya. We specialize in hardware maintenance, software solutions, and network security." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://luziafrika.com/" />
        <meta property="og:title" content="Luzi Afrika - IT Support & Solutions in Kenya" />
        <meta property="og:description" content="Leading provider of comprehensive IT support and consultancy services in Kenya. We specialize in hardware maintenance, software solutions, and network security." />
        <meta property="og:image" content="https://luziafrika.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://luziafrika.com/" />
        <meta property="twitter:title" content="Luzi Afrika - IT Support & Solutions in Kenya" />
        <meta property="twitter:description" content="Leading provider of comprehensive IT support and consultancy services in Kenya. We specialize in hardware maintenance, software solutions, and network security." />
        <meta property="twitter:image" content="https://luziafrika.com/twitter-image.jpg" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Local Business Schema */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema)
          }}
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://luziafrika.com" />
      </head>
      <body className="bg-white text-black antialiased font-space">
        <div className="flex flex-col min-h-screen">
          <LoadingScreen />
          <CustomCursor />
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        
        {/* ResponsiveChecker is only visible in development mode */}
        <ResponsiveChecker />
      </body>
    </html>
  );
}