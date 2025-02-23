'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Project data
const projectsData = {
  'healthcare-analytics': {
    title: "AI-Powered Healthcare Analytics",
    category: "Healthcare",
    description: "Developing intelligent systems for patient data analysis and predictive healthcare outcomes.",
    image: "https://picsum.photos/1200/800?random=1",
    overview: `Our AI-powered healthcare analytics platform revolutionizes how medical institutions handle patient data and make clinical decisions. The system combines advanced machine learning algorithms with comprehensive data analysis to provide actionable insights for healthcare providers.`,
    challenge: `Healthcare providers faced multiple challenges in managing and analyzing vast amounts of patient data effectively:
    • Complex data integration from multiple sources
    • Need for real-time analysis and predictions
    • Ensuring data security and HIPAA compliance
    • Scalability requirements for growing patient databases`,
    solution: `We developed a comprehensive solution that addresses these challenges:
    • Custom AI algorithms for patient data analysis
    • Real-time monitoring and alert systems
    • Secure, HIPAA-compliant data storage
    • Scalable cloud infrastructure
    • Intuitive dashboard for healthcare providers`,
    technologies: ["Python", "TensorFlow", "AWS", "React", "Node.js"],
    results: [
      "40% reduction in diagnostic time",
      "95% accuracy in predictive analytics",
      "60% improvement in patient data processing",
      "Seamless integration with existing systems"
    ],
    client: "East African Medical Center",
    duration: "8 months"
  },
  'fintech-platform': {
    title: "FinTech Innovation Platform",
    category: "Banking & Finance",
    description: "Building next-generation banking infrastructure with AI-driven security and analytics.",
    image: "https://picsum.photos/1200/800?random=2",
    overview: `A cutting-edge fintech platform that transforms traditional banking operations through AI and machine learning. This solution provides enhanced security, real-time analytics, and improved customer experience for financial institutions.`,
    challenge: `The banking sector faced several critical challenges:
    • Legacy system limitations
    • Growing security threats
    • Need for real-time transaction processing
    • Customer demand for digital services`,
    solution: `Our comprehensive fintech solution includes:
    • AI-powered fraud detection
    • Real-time transaction processing
    • Secure digital banking platform
    • Advanced analytics dashboard
    • Customer behavior analysis`,
    technologies: ["Java", "Python", "Kubernetes", "MongoDB", "React"],
    results: [
      "99.99% system uptime",
      "70% reduction in fraud attempts",
      "50% faster transaction processing",
      "Improved customer satisfaction"
    ],
    client: "Major Regional Bank",
    duration: "12 months"
  },
  'education-platform': {
    title: "Smart Education System",
    category: "EdTech",
    description: "Creating an intelligent learning platform that adapts to individual student needs.",
    image: "https://picsum.photos/1200/800?random=3",
    overview: `An innovative e-learning platform that leverages AI to provide personalized learning experiences. The system adapts to each student's learning pace and style while providing valuable insights to educators.`,
    challenge: `Educational institutions needed to address:
    • Personalized learning requirements
    • Remote education capabilities
    • Student engagement tracking
    • Performance analytics
    • Resource management`,
    solution: `We implemented a comprehensive learning solution:
    • AI-driven personalized learning paths
    • Interactive virtual classrooms
    • Real-time progress tracking
    • Advanced analytics for educators
    • Resource optimization tools`,
    technologies: ["React", "Node.js", "Python", "TensorFlow", "MongoDB"],
    results: [
      "85% increase in student engagement",
      "40% improvement in learning outcomes",
      "90% teacher satisfaction rate",
      "Successful remote learning implementation"
    ],
    client: "International School Network",
    duration: "6 months"
  }
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const project = projectsData[params.slug as keyof typeof projectsData];

  if (!project) {
    router.push('/');
    return null;
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full pt-32 pb-24 px-6 bg-white"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] hover:text-neutral-500 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>

        <div className="project-content space-y-16">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-neutral-500 uppercase tracking-[0.2em]"
              >
                {project.category}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-[-0.02em]"
              >
                {project.title}
              </motion.h1>
            </div>
            <div className="flex items-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-neutral-600 text-lg"
              >
                {project.description}
              </motion.p>
            </div>
          </div>

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-[16/9] rounded-sm overflow-hidden"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-light">Project Overview</h2>
                <p className="text-neutral-600 whitespace-pre-line">{project.overview}</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-light">Challenge</h2>
                <p className="text-neutral-600 whitespace-pre-line">{project.challenge}</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-light">Solution</h2>
                <p className="text-neutral-600 whitespace-pre-line">{project.solution}</p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-light">Results</h2>
                <ul className="space-y-2">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-center gap-2 text-neutral-600">
                      <ArrowUpRight className="w-4 h-4 text-black" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-[0.2em]">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-neutral-100 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-[0.2em]">Project Details</h3>
                <div className="space-y-4 text-neutral-600">
                  <p>Client: {project.client}</p>
                  <p>Duration: {project.duration}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(247,247,247,1)_0%,rgba(255,255,255,0)_50%)]" />
    </section>
  );
}