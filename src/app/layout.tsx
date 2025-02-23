// File: src/app/layout.tsx
'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/navigation/Navigation';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/ui/LoadingScreen';
import './styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Luzi Afrika - Illuminating Africa's Digital Future" />
        <title>Luzi Afrika</title>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-black antialiased font-space">
        <LoadingScreen />
        <CustomCursor />
        <Navigation />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}