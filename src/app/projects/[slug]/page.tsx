'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft } from 'lucide-react';
import { projects } from '@/data/projects';
import OptimizedImage from '@/components/common/OptimizedImage';
import Link from 'next/link';
import { notFound } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // Header animations
      gsap.from('.project-header > *', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Content animations
      gsap.from('.project-content > *', {
        scrollTrigger: {
          trigger: '.project-content',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    notFound();
  }

  return (
    <main ref={sectionRef} className="pt-32">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-20">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
        >
          <ChevronLeft size={16} />
          Back to Projects
        </Link>
      </div>

      {/* Project Header */}
      <section className="project-header relative px-6 mb-24">
        <div className="max-w-screen-xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-neutral-500 mb-4"
          >
            {project.category}
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-8"
          >
            {project.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-[16/9] rounded-lg overflow-hidden"
          >
            <OptimizedImage
              src={project.image}
              alt={project.title}
              width={1920}
              height={1080}
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* To be continued in next chunk... */}
    </main>
  );
}