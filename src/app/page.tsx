'use client';

import Hero from '@/components/sections/home/Hero';
import Services from '@/components/sections/home/Services';
import About from '@/components/sections/home/About';

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <Services />
      <About />
    </main>
  );
}