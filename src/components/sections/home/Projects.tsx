'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI-Powered Healthcare Analytics",
    slug: "healthcare-analytics",
    category: "Healthcare",
    description: "Developing intelligent systems for patient data analysis and predictive healthcare outcomes.",
    image: "https://picsum.photos/800/600?random=1",
    year: "2025",
    client: "East African Medical Center"
  },
  {
    title: "FinTech Innovation Platform",
    slug: "fintech-platform",
    category: "Banking & Finance",
    description: "Building next-generation banking infrastructure with AI-driven security and analytics.",
    image: "https://picsum.photos/800/600?random=2",
    year: "2025",
    client: "Major Regional Bank"
  },
  {
    title: "Smart Education System",
    slug: "education-platform",
    category: "EdTech",
    description: "Creating an intelligent learning platform that adapts to individual student needs.",
    image: "https://picsum.photos/800/600?random=3",
    year: "2025",
    client: "International School Network"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1
        },
        y: 50,
        opacity: 0,
        stagger: 0.2
      });

      // Projects stagger animation
      gsap.from(projectsRef.current?.children || [], {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="relative w-full py-32 px-6 bg-neutral-950 text-white overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        <div ref={headingRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 mb-24">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.1] tracking-[-0.02em]"
            >
              Featured<br />Projects
            </motion.h2>
          </div>
          <div className="flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-neutral-400 max-w-lg"
            >
              Explore our portfolio of innovative solutions that are transforming businesses across Africa through technology and artificial intelligence.
            </motion.p>
          </div>
        </div>

        <div 
          ref={projectsRef}
          className="grid grid-cols-1 gap-8 md:gap-12"
        >
          {projects.map((project, index) => (
            <Link 
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-neutral-900 rounded-sm overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <p className="text-sm text-neutral-400 uppercase tracking-[0.2em]">
                        {project.category}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-light">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-neutral-400">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] group-hover:text-neutral-400 transition-colors">
                      View Project
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-sm">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.a
            href="/projects"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] hover:text-neutral-400 transition-colors group"
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(45,45,45,1)_0%,rgba(0,0,0,0)_50%)]" />
    </section>
  );
}