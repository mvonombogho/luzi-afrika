'use client';

import { Hero, Services, About, Projects, Contact } from '@/components/sections/home';
import Footer from '@/components/footer/Footer';

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