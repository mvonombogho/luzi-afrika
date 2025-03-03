import { Suspense } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';
import { sanityFetch } from '@/lib/sanity';
import { getAllProjectsQuery, getProjectCategoriesQuery } from '@/lib/queries/projects';
import ProjectList from '@/components/projects/ProjectList';
import LoadingProjects from '@/components/projects/LoadingProjects';

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

// Server component to fetch projects and categories
async function getProjects() {
  try {
    const projects = await sanityFetch<Project[]>({
      query: getAllProjectsQuery,
    });
    
    // Get unique categories
    const categoriesResponse = await sanityFetch<{ category: string }[]>({
      query: getProjectCategoriesQuery,
    });
    
    const categories = categoriesResponse ? 
      categoriesResponse.map(item => item.category).filter(Boolean) : 
      [];
    
    return { projects, categories };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { projects: [], categories: [] };
  }
}

export default async function ProjectsPage() {
  const { projects, categories } = await getProjects();
  
  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Our Projects"
        subtitle="Explore how we've helped businesses transform their IT infrastructure"
      />
      
      <Suspense fallback={<LoadingProjects />}>
        <ProjectList projects={projects} categories={categories} />
      </Suspense>
      
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Ready to start your project?</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-10">
            Contact our team today to discuss how we can help transform your IT infrastructure.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-blue-500 text-white rounded-lg text-sm font-medium"
            >
              Contact Us
            </motion.button>
          </Link>
        </div>
      </section>
    </main>
  );
}