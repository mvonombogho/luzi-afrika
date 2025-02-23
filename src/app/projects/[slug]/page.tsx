'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { projects } from '@/data/projects';
import { validateData } from '@/utils/validation';
import { projectSchema } from '@/schemas/project';
import { useAnalytics } from '@/hooks/useAnalytics';
import { usePerformanceMonitoring } from '@/utils/performance';
import OptimizedImage from '@/components/common/OptimizedImage';
import Gallery from '@/components/sections/project/Gallery';
import Testimonial from '@/components/sections/project/Testimonial';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Initialize analytics and performance monitoring
  const { trackEvent } = useAnalytics();
  const { trackRender, trackOperation } = usePerformanceMonitoring('ProjectDetailPage');

  useEffect(() => {
    // Track page render timing
    const stopRenderTracking = trackRender();
    
    if (!project) {
      trackEvent('project_not_found', { slug });
      return;
    }

    // Validate project data
    const validateProject = async () => {
      const stopValidation = trackOperation('validate_project_data');
      try {
        await validateData(projectSchema, project, 'ProjectDetail');
      } catch (error) {
        trackEvent('project_validation_error', { 
          slug,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
      stopValidation();
    };

    validateProject();

    // Track project view
    trackEvent('project_view', {
      slug,
      title: project.title,
      category: project.category
    });

    return () => {
      stopRenderTracking();
    };
  }, [project, slug, trackEvent, trackOperation, trackRender]);

  if (!project) {
    notFound();
  }

  // Image load tracking
  const handleImageLoad = () => {
    trackEvent('project_image_load', {
      slug,
      imageUrl: project.image
    });
  };

  const handleGalleryImageLoad = (imageUrl: string) => {
    trackEvent('gallery_image_load', {
      slug,
      imageUrl
    });
  };

  return (
    <main ref={sectionRef} className="pt-32">
      {/* Rest of the component remains the same */}
      {/* Just adding performance tracking to key interactions */}
      
      <div className="fixed top-24 left-6 z-20">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
          onClick={() => trackEvent('back_to_projects_click')}
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
              onLoad={handleImageLoad}
            />
          </motion.div>
        </div>
      </section>

      {/* Project Content */}
      <section className="project-content px-6 mb-24">
        {/* Existing content remains the same */}
      </section>

      {/* Project Gallery */}
      {project.gallery && (
        <section className="project-gallery px-6 mb-24">
          <div className="max-w-screen-xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-light mb-8"
            >
              Project Gallery
            </motion.h2>
            <Gallery 
              images={project.gallery} 
              title={project.title}
              onImageLoad={handleGalleryImageLoad}
            />
          </div>
        </section>
      )}

      {/* Rest of the component remains the same */}
    </main>
  );
}