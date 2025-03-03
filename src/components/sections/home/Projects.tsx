'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { urlForImage } from '@/lib/sanity';
import { getFeaturedProjectsQuery } from '@/lib/queries/projects';

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  client?: string;
  category: string;
  mainImage: any;
  technologies?: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await sanityFetch<Project[]>({ query: getFeaturedProjectsQuery });
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Map category IDs to display names
  const categoryNames: Record<string, string> = {
    'it-infrastructure': 'IT Infrastructure',
    'network-setup': 'Network Setup',
    'software-implementation': 'Software Implementation',
    'security-solutions': 'Security Solutions',
    'cloud-migration': 'Cloud Migration',
    'data-management': 'Data Management'
  };
  
  if (loading) {
    return (
      <section id="projects" className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
            <p className="text-neutral-600">
              Explore some of our recent IT solutions and successful implementations.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="projects" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
          <p className="text-neutral-600">
            Explore some of our recent IT solutions and successful implementations.
          </p>
        </div>
        
        {projects.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((project) => (
              <motion.div 
                key={project._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col"
                variants={itemVariants}
              >
                <div className="relative h-56">
                  {project.mainImage && (
                    <Image
                      src={urlForImage(project.mainImage).width(600).height(400).url()}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-auto">
                    {project.category && (
                      <span className="text-blue-600 text-sm font-medium mb-2 inline-block">
                        {categoryNames[project.category] || project.category}
                      </span>
                    )}
                    
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    
                    <p className="text-neutral-600 text-sm mb-4">{project.description}</p>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index} 
                            className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Link 
                    href={`/projects/${project.slug.current}`}
                    className="inline-flex items-center text-blue-600 font-medium mt-4 hover:underline"
                  >
                    View Project
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-10">
            <p className="text-neutral-600">No projects to display at the moment.</p>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            href="/projects"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}