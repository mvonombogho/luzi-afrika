'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// We'll move this to a separate data file later
const projectsData = {
  'financial-technology': {
    title: "Financial Technology",
    category: "Banking & Finance",
    description: "Modernizing banking infrastructure and security systems",
    image: "https://picsum.photos/1200/800?random=1",
    client: "Major Regional Bank",
    duration: "8 months",
    technologies: ["Cloud Infrastructure", "Cybersecurity", "API Integration"]
  },
  'healthcare-systems': {
    title: "Healthcare Systems",
    category: "Healthcare",
    description: "Digital transformation of medical record management",
    image: "https://picsum.photos/1200/800?random=2",
    client: "Private Hospital Network",
    duration: "12 months",
    technologies: ["EMR Systems", "Data Security", "Cloud Storage"]
  },
  'education-platform': {
    title: "Education Platform",
    category: "EdTech",
    description: "Learning management system for institutions",
    image: "https://picsum.photos/1200/800?random=3",
    client: "International School Chain",
    duration: "6 months",
    technologies: ["React", "Node.js", "WebRTC"]
  }
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData[params.slug as keyof typeof projectsData];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-light mb-4">Project not found</h1>
        <Link 
          href="/"
          className="text-sm uppercase tracking-[0.2em] hover:opacity-60 transition-opacity flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-32 px-4 sm:px-6"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-16">
          <Link 
            href="/"
            className="text-sm uppercase tracking-[0.2em] hover:opacity-60 transition-opacity inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>

        <div className="project-content space-y-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.1] tracking-[-0.02em] mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-neutral-600 font-light">
                {project.description}
              </p>
            </motion.div>
          </div>

          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-light mb-6">Project Overview</h2>
              <p className="text-neutral-600 whitespace-pre-line">
                {project.description}
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-neutral-100 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] mb-4">Project Details</h3>
                <div className="space-y-4 text-neutral-600">
                  <p>Client: {project.client}</p>
                  <p>Duration: {project.duration}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}