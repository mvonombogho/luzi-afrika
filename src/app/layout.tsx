'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Navigation from '@/components/navigation/Navigation';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/animations/LoadingScreen';
import PageTransition from '@/components/animations/PageTransition';
import './styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Update Lenis when ScrollTrigger resets
    ScrollTrigger.addEventListener('refresh', () => lenis.start());

    return () => {
      ScrollTrigger.removeEventListener('refresh', () => lenis.start());
      lenis.destroy();
    };
  }, []);

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
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}