'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { urlForImage } from '@/lib/sanity';

// Define the Project type
interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  category: string;
  mainImage: any;
  client?: string;
  projectDate?: string;
  technologies?: string[];
  featured?: boolean;
}

interface ProjectListProps {
  projects: Project[];
  categories: string[];
}

export default function ProjectList({ projects, categories }: ProjectListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // Filter projects when category changes
  useEffect(() => {
    if (selectedCategory) {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    } else {
      setFilteredProjects(projects);
    }
  }, [selectedCategory, projects]);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Category filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedCategory === null
                  ? 'bg-blue-500 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              All Projects
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/projects/${project.slug.current}`}>
                <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg">
                  {project.mainImage ? (
                    <Image
                      src={urlForImage(project.mainImage).width(600).height(450).url()}
                      alt={project.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                      <span className="text-neutral-500">No image</span>
                    </div>
                  )}
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
              </Link>
            </motion.article>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-light mb-3">No projects found</h3>
            <p className="text-neutral-600 mb-6">
              There are no projects in the selected category. Please select another category.
            </p>
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}