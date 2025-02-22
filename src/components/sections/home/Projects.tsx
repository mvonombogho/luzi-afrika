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
    title: "Financial Technology",
    slug: "financial-technology",
    category: "Banking & Finance",
    description: "Modernizing banking infrastructure and security systems for enhanced digital transactions and customer experience.",
    image: "https://picsum.photos/800/600?random=1",
    client: "Major Regional Bank",
    duration: "8 months",
    tech: ["Cloud Infrastructure", "Cybersecurity", "API Integration"]
  },
  {
    title: "Healthcare Systems",
    slug: "healthcare-systems",
    category: "Healthcare",
    description: "Digital transformation of medical record management, streamlining patient care and data accessibility.",
    image: "https://picsum.photos/800/600?random=2",
    client: "Private Hospital Network",
    duration: "12 months",
    tech: ["EMR Systems", "Data Security", "Cloud Storage"]
  },
  {
    title: "Education Platform",
    slug: "education-platform",
    category: "EdTech",
    description: "Comprehensive learning management system enabling digital education and remote learning capabilities.",
    image: "https://picsum.photos/800/600?random=3",
    client: "International School Chain",
    duration: "6 months",
    tech: ["React", "Node.js", "WebRTC"]
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1
        },
        y: 100,
        opacity: 0
      });

      // Projects stagger animation
      gsap.from(projectsRef.current?.children || [], {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
        },
        y: 100,
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
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12 sm:mb-16 md:mb-24">
          <motion.div 
            className="max-w-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 
              ref={headingRef}
              className="text-[clamp(2rem,5vw,4rem)] font-light leading-[1.1] tracking-[-0.02em] mb-6"
            >
              Featured Projects
            </h2>
            <p className="text-neutral-600 text-lg sm:text-xl font-light">
              Transforming businesses through innovative technology solutions
            </p>
          </motion.div>
        </div>

        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project) => (
            <Link 
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block group focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4"
            >
              <motion.div
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white h-full rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs sm:text-sm text-neutral-500 uppercase tracking-[0.2em] mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-light tracking-[-0.01em] mb-3">
                        {project.title}
                      </h3>
                    </div>
                    <ArrowUpRight 
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                  
                  <p className="text-sm sm:text-base text-neutral-600 font-light mb-6">
                    {project.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-neutral-100 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-xs sm:text-sm text-neutral-500 space-y-1">
                      <p>Client: {project.client}</p>
                      <p>Duration: {project.duration}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(247,247,247,1)_0%,rgba(255,255,255,0)_50%)]" />
    </section>
  );
}