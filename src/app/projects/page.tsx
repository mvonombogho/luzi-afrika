'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import OptimizedImage from '@/components/common/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.from('.projects-header > *', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Projects grid animations
      const projectCards = projectsRef.current?.children;
      if (projectCards) {
        gsap.from(projectCards, {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 80%',
          },
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className="pt-32 pb-24">
      <section className="projects-header px-6 mb-24">
        <div className="max-w-screen-xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-8"
          >
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-600 text-lg max-w-2xl"
          >
            Explore our portfolio of successful IT projects and solutions that have helped businesses across Africa transform their digital infrastructure.
          </motion.p>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-screen-xl mx-auto">
          <div
            ref={projectsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group"
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg">
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={450}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-500">{project.category}</span>
                      <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                      <div className="flex items-center gap-1 text-sm group">
                        View Project
                        <ArrowUpRight 
                          size={14}
                          className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>

                    <h2 className="text-xl font-medium">{project.title}</h2>
                    <p className="text-neutral-600">{project.description}</p>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}