'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { projects } from '@/data/projects';
import { validateData } from '@/utils/validation';
import { projectMetaSchema } from '@/schemas/project';
import { useAnalytics } from '@/hooks/useAnalytics';
import { usePerformanceMonitoring } from '@/utils/performance';
import OptimizedImage from '@/components/common/OptimizedImage';

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [hasLoadedImages, setHasLoadedImages] = useState(false);

  // Initialize analytics and performance monitoring
  const { trackEvent } = useAnalytics();
  const { trackRender, trackOperation } = usePerformanceMonitoring('ProjectsListPage');

  useEffect(() => {
    // Track page render timing
    const stopRenderTracking = trackRender();

    // Validate projects data
    const validateProjects = async () => {
      const stopValidation = trackOperation('validate_projects_data');
      try {
        await Promise.all(
          projects.map(project => 
            validateData(projectMetaSchema, project, 'ProjectsList')
          )
        );
      } catch (error) {
        trackEvent('projects_validation_error', {
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
      stopValidation();
    };

    validateProjects();

    // Track projects list view
    trackEvent('projects_list_view', {
      projectCount: projects.length,
      categories: [...new Set(projects.map(p => p.category))]
    });

    return () => {
      stopRenderTracking();
    };
  }, [trackEvent, trackOperation, trackRender]);

  // Track when all images have loaded
  const handleAllImagesLoaded = () => {
    if (!hasLoadedImages) {
      setHasLoadedImages(true);
      trackEvent('all_project_images_loaded', {
        timeToLoad: performance.now()
      });
    }
  };

  // Track individual image loads
  const handleImageLoad = (slug: string) => {
    trackEvent('project_thumbnail_load', { slug });
  };

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
                onClick={() => trackEvent('project_card_click', { slug: project.slug })}
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg">
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={450}
                      className="group-hover:scale-105 transition-transform duration-500"
                      onLoad={() => {
                        handleImageLoad(project.slug);
                        if (index === projects.length - 1) {
                          handleAllImagesLoaded();
                        }
                      }}
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