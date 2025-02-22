'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="mb-16 space-y-12">
      <Link 
        href="/"
        className="text-sm uppercase tracking-[0.2em] hover:opacity-60 transition-opacity inline-flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl space-y-6"
      >
        <div className="space-y-4">
          <span className="text-sm text-neutral-500 uppercase tracking-[0.2em]">
            {project.category}
          </span>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.1] tracking-[-0.02em]">
            {project.title}
          </h1>
        </div>

        <p className="text-xl text-neutral-600 font-light">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-8 pt-4">
          <div>
            <span className="text-sm text-neutral-500 uppercase tracking-[0.2em] block mb-2">
              Client
            </span>
            <span className="text-lg font-light">
              {project.client}
            </span>
          </div>
          <div>
            <span className="text-sm text-neutral-500 uppercase tracking-[0.2em] block mb-2">
              Duration
            </span>
            <span className="text-lg font-light">
              {project.duration}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}