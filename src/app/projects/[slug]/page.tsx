import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Tag, Building } from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { urlForImage } from '@/lib/sanity';
import { getProjectBySlugQuery, getRelatedProjectsQuery } from '@/lib/queries/projects';
import { PortableText } from '@portabletext/react';
import { Project } from '@/types/project';
import { generateProjectMetadata } from '@/lib/metadata';

// Define the props for the page
interface ProjectPageProps {
  params: { slug: string };
}

// Generate metadata for the page
export async function generateMetadata(
  { params }: ProjectPageProps
): Promise<Metadata> {
  const { slug } = params;
  const data = await getProject(slug);
  
  if (!data) {
    return {};
  }
  
  return generateProjectMetadata(data.project);
}

// Map category IDs to display names
const categoryNames: Record<string, string> = {
  'it-infrastructure': 'IT Infrastructure',
  'network-setup': 'Network Setup',
  'software-implementation': 'Software Implementation',
  'security-solutions': 'Security Solutions',
  'cloud-migration': 'Cloud Migration',
  'data-management': 'Data Management'
};

// Components for rendering portable text
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8 relative rounded-lg overflow-hidden">
          <Image
            src={urlForImage(value).url()}
            alt={value.alt || 'Project image'}
            width={800}
            height={500}
            className="w-full h-auto object-cover"
          />
          {value.caption && (
            <div className="text-sm text-neutral-600 italic mt-2">
              {value.caption}
            </div>
          )}
        </div>
      );
    }
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>,
    normal: ({ children }: any) => <p className="my-4 text-neutral-800">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 my-6 text-neutral-700 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          target={target}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-2">{children}</li>,
    number: ({ children }: any) => <li className="mb-2">{children}</li>,
  },
};

// Server component to fetch project data
async function getProject(slug: string) {
  try {
    const project = await sanityFetch<Project>({
      query: getProjectBySlugQuery,
      params: { slug },
    });
    
    if (!project) {
      return null;
    }
    
    // Fetch related projects
    const relatedProjects = await sanityFetch<Project[]>({
      query: getRelatedProjectsQuery,
      params: {
        slug,
        category: project.category,
      },
    });
    
    return { project, relatedProjects };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;
  const data = await getProject(slug);
  
  if (!data) {
    notFound();
  }
  
  const { project, relatedProjects } = data;
  const projectDate = project.projectDate ? new Date(project.projectDate) : null;
  
  return (
    <main className="min-h-screen">
      <div className="bg-neutral-50 pt-20 pb-10">
        <div className="max-w-screen-xl mx-auto px-6">
          <Link href="/projects" className="inline-flex items-center text-blue-600 mb-6 hover:underline">
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{project.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-neutral-600 mb-8">
            {projectDate && (
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {format(projectDate, 'MMMM yyyy')}
              </div>
            )}
            
            {project.category && (
              <div className="flex items-center">
                <Tag size={16} className="mr-2" />
                {categoryNames[project.category] || project.category}
              </div>
            )}
            
            {project.client && (
              <div className="flex items-center">
                <Building size={16} className="mr-2" />
                {project.client}
              </div>
            )}
          </div>
          
          {project.mainImage && (
            <div className="rounded-lg overflow-hidden mb-10">
              <Image
                src={urlForImage(project.mainImage).url()}
                alt={project.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="max-w-screen-lg mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <article className="lg:w-2/3">
            <div className="prose prose-lg max-w-none">
              <PortableText value={project.content} components={ptComponents} />
            </div>
            
            {project.technologies && project.technologies.length > 0 && (
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <h3 className="text-lg font-medium mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
          
          <aside className="lg:w-1/3">
            {project.gallery && project.gallery.length > 0 && (
              <div className="bg-neutral-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-medium mb-4">Project Gallery</h3>
                <div className="grid grid-cols-2 gap-3">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <Image 
                        src={urlForImage(image).width(300).height(200).url()}
                        alt={`${project.title} gallery image ${index + 1}`}
                        width={300}
                        height={200}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {project.testimonial && (
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-medium mb-4">Client Testimonial</h3>
                <blockquote className="text-neutral-700 italic">
                  "{project.testimonial.quote}"
                </blockquote>
                <div className="mt-4 text-right">
                  <p className="font-medium">{project.testimonial.author}</p>
                  {project.testimonial.role && (
                    <p className="text-sm text-neutral-600">{project.testimonial.role}</p>
                  )}
                </div>
              </div>
            )}
            
            {relatedProjects && relatedProjects.length > 0 && (
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Related Projects</h3>
                <div className="space-y-4">
                  {relatedProjects.map((relatedProject) => (
                    <div key={relatedProject._id} className="border-b border-neutral-200 pb-4 last:border-0">
                      <Link href={`/projects/${relatedProject.slug.current}`} className="hover:text-blue-600 transition-colors">
                        <h4 className="font-medium mb-1">{relatedProject.title}</h4>
                      </Link>
                      <p className="text-neutral-600 text-sm line-clamp-2">
                        {relatedProject.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
      
      <div className="bg-neutral-50 py-16">
        <div className="max-w-screen-lg mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a similar solution?</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Contact our team to discuss how we can implement a tailored IT solution for your business.
          </p>
          <Link 
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
      
      {/* JSON-LD Structured Data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': project.title,
            'description': project.description,
            'image': project.mainImage ? urlForImage(project.mainImage).url() : undefined,
            'datePublished': project.projectDate,
            'author': {
              '@type': 'Organization',
              'name': 'Luzi Afrika Limited'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Luzi Afrika Limited',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://luziafrika.com/logo.png'
              }
            }
          })
        }}
      />
    </main>
  );
}