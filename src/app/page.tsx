// File: src/app/page.tsx
'use client';

import {
  Hero,
  Services,
  About,
  Projects,
  Contact,
  Footer
} from '@/components';

export default function Home() {
  return (
    <>
      <main className="relative z-10">
        <Hero />
        <Services />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}