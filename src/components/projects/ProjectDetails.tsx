'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Quote } from 'lucide-react';
import type { Project } from '@/data/projects';

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="space-y-16">
      {/* Overview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-light">Project Overview</h2>
        <div className="prose prose-neutral max-w-none">
          <p className="text-neutral-600 text-lg whitespace-pre-line">
            {project.fullDescription}
          </p>
        </div>
      </motion.div>

      {/* Technologies Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-light">Technologies Used</h2>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-neutral-100 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Challenges and Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Challenges Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-light">Challenges</h2>
          <ul className="space-y-4">
            {project.challenges.map((challenge) => (
              <li key={challenge} className="flex items-start gap-3 text-neutral-600">
                <CheckCircle2 className="w-6 h-6 text-neutral-400 mt-1 flex-shrink-0" />
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Solutions Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-light">Solutions</h2>
          <ul className="space-y-4">
            {project.solutions.map((solution) => (
              <li key={solution} className="flex items-start gap-3 text-neutral-600">
                <CheckCircle2 className="w-6 h-6 text-neutral-400 mt-1 flex-shrink-0" />
                <span>{solution}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Outcomes Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-light">Project Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {project.outcomes.map((outcome) => (
            <div
              key={outcome}
              className="p-6 bg-neutral-50 rounded-lg"
            >
              <p className="text-neutral-600">{outcome}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Testimonial Section */}
      {project.testimonial && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 sm:p-12 bg-neutral-950 text-white rounded-lg overflow-hidden"
        >
          <Quote 
            size={120} 
            className="absolute -top-6 -left-6 text-neutral-900 opacity-10" 
          />
          <div className="relative space-y-6">
            <p className="text-xl font-light italic">
              "{project.testimonial.quote}"
            </p>
            <div>
              <p className="font-medium">{project.testimonial.author}</p>
              <p className="text-neutral-400">{project.testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}