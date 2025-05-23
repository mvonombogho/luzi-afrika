'use client';

import Hero from '@/components/sections/home/Hero';
// Removed the import for Tagline to prevent duplication
import Services from '@/components/sections/home/Services';
import About from '@/components/sections/home/About';
import Projects from '@/components/sections/home/Projects';
// Import commented out temporarily as we're disabling the Testimonials section
// import Testimonials from '@/components/sections/home/Testimonials';
import HomeFAQ from '@/components/sections/home/HomeFAQ';
import Contact from '@/components/sections/home/Contact';

export default function Home() {
  return (
    <div className="relative z-10">
      <Hero />
      {/* Removed Tagline component to avoid duplication */}
      <Services />
      <About />
      <Projects />
      {/* Testimonials section temporarily removed while business is starting up */}
      {/* <Testimonials /> */}
      <HomeFAQ />
      <Contact />
    </div>
  );
}