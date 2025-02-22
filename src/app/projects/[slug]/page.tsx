'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import ProjectHeader from '@/components/projects/ProjectHeader';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectDetails from '@/components/projects/ProjectDetails';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const project = projects[params.slug];

  if (!project) {
    router.push('/');
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-32 px-4 sm:px-6"
    >
      <div className="max-w-screen-xl mx-auto space-y-16">
        <ProjectHeader project={project} />
        <ProjectGallery project={project} />
        <ProjectDetails project={project} />
      </div>
    </section>
  );
}