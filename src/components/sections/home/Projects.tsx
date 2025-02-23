'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OptimizedImage from '@/components/common/OptimizedImage';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Enterprise Infrastructure Upgrade',
    category: 'Hardware Support',
    description: 'Complete IT infrastructure overhaul for a major financial institution, improving system performance by 200%.',
    image: '/images/projects/infrastructure.jpg'
  },
  {
    title: 'Cloud Migration Solution',
    category: 'Software Solutions',
    description: 'Seamless migration of legacy systems to cloud infrastructure for a manufacturing company.',
    image: '/images/projects/cloud.jpg'
  },
  {
    title: 'Network Security Implementation',
    category: 'Technical Support',
    description: 'Comprehensive security system deployment for a healthcare provider, ensuring HIPAA compliance.',
    image: '/images/projects/security.jpg'
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 1
        },
        y: 100,
        opacity: 0
      });

      // Projects animation
      const projectCards = projectsRef.current?.children;
      if (projectCards) {
        gsap.from(projectCards, {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1
          },
          y: 100,
          opacity: 0,
          stagger: 0.2
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-screen-xl mx-auto">
        <div 
          ref={headingRef}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em]">
            Featured Projects
          </h2>
          <p className="max-w-md text-neutral-600">
            Discover how we've helped businesses across Africa transform their IT infrastructure and achieve digital excellence.
          </p>
        </div>

        <div
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
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
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-1 text-sm group"
                  >
                    View Project
                    <ArrowUpRight 
                      size={14}
                      className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </motion.div>
                </div>

                <h3 className="text-xl font-medium">{project.title}</h3>
                <p className="text-neutral-600">{project.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors"
          >
            View All Projects
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Projects;