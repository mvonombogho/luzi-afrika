'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { neue } from '@/lib/fonts';
import CustomCursor from '@/components/ui/CustomCursor';
import '@/app/styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({
 children,
}: {
 children: React.ReactNode
}) {
 useEffect(() => {
   const lenis = new Lenis({
     duration: 1.2,
     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
     orientation: 'vertical',
     smoothWheel: true,
     smoothTouch: false,
     touchMultiplier: 2,
   });

   const raf = (time: number) => {
     lenis.raf(time);
     requestAnimationFrame(raf);
   };

   requestAnimationFrame(raf);

   gsap.ticker.add((time) => {
     lenis.raf(time * 1000);
   });

   return () => {
     lenis.destroy();
     gsap.ticker.remove(raf);
   };
 }, []);

 return (
   <html lang="en" className={neue.variable}>
     <body className={`${neue.className} antialiased`}>
       <CustomCursor />
       <div className="fixed inset-0 -z-10">
         <div className="absolute inset-0 bg-gradient-radial from-[#f7f7f7] to-white" />
         <div className="bg-noise" />
       </div>
       <main id="smooth-content">
         {children}
       </main>
     </body>
   </html>
 );
}