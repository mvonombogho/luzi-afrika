import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity';
import { urlForImage } from '@/lib/sanity';
import { getServiceBySlugQuery } from '@/lib/queries/services';
import { PortableText } from '@portabletext/react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { generateServiceMetadata } from '@/lib/metadata';
import localServices from '@/data/services';

// Define the props for the page
interface ServicePageProps {
  params: { slug: string };
}

// Generate metadata for the page
export async function generateMetadata(
  { params }: ServicePageProps
): Promise<Metadata> {
  const { slug } = params;
  const service = await getServiceData(slug);
  
  if (!service) {
    return {};
  }
  
  return generateServiceMetadata(service);
}

// Components for rendering portable text
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8 relative rounded-lg overflow-hidden">
          <Image
            src={urlForImage(value).url()}
            alt={value.alt || 'Service image'}
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
    },
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
};

// Try to get service data from Sanity first, then fall back to local data
async function getServiceData(slugOrId: string) {
  try {
    // First try to get from Sanity using the slug
    let sanityService = null;
    try {
      sanityService = await sanityFetch({
        query: getServiceBySlugQuery,
        params: { slug: slugOrId },
      });
    } catch (sanityError) {
      console.error('Sanity fetch error:', sanityError);
    }
    
    if (sanityService) {
      return sanityService;
    }
    
    // If not found in Sanity, try to find in local data by ID or slug
    const localService = localServices.find(service => 
      service.id === slugOrId || 
      service.slug?.current === slugOrId
    );
    
    if (localService) {
      // Transform local service to match Sanity schema format
      return {
        _id: localService.id,
        title: localService.title, 
        shortDescription: localService.description,
        fullDescription: [{
          _type: 'block',
          children: [{ 
            _type: 'span',
            text: localService.detailedDescription
          }]
        }],
        benefits: localService.benefits,
        features: localService.keyFeatures.map(feature => ({
          title: feature.title,
          description: feature.description
        })),
        faq: localService.faqs.map(faq => ({
          question: faq.question,
          answer: faq.answer
        })),
        isAIService: localService.id.includes('ai') || false,
        serviceType: localService.id.split('-').join(' ')
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error in getServiceData:', error);
    return null;
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = params;
  const service = await getServiceData(slug);
  
  if (!service) {
    notFound();
  }
  
  const isAIService = service.isAIService || slug.includes('ai') || slug.includes('agent');
  const themeColor = isAIService ? 'purple' : 'blue';
  
  return (
    <main className="min-h-screen">
      <div className={`bg-${themeColor}-50 pt-20 pb-10`}>
        <div className="max-w-screen-xl mx-auto px-6">
          <Link href="/services" className={`inline-flex items-center text-${themeColor}-600 mb-6 hover:underline`}>
            Back to Services
          </Link>
          
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-2/3">
              {isAIService && (
                <span className={`inline-block bg-${themeColor}-100 text-${themeColor}-800 text-sm font-medium px-3 py-1 rounded-full mb-4`}>
                  AI-Powered Solution
                </span>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{service.title}</h1>
              
              <p className="text-lg text-neutral-700 mb-8">
                {service.shortDescription}
              </p>
            </div>
            
            {service.mainImage && (
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={urlForImage(service.mainImage).url()}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-screen-lg mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          {service.fullDescription ? (
            <PortableText value={service.fullDescription} components={ptComponents} />
          ) : (
            // Fallback content for services without full description
            <div>
              <h2>About This Service</h2>
              <p className="text-lg">{service.shortDescription}</p>
              
              {isAIService && (
                <>
                  <h2 className="mt-8">How Our AI Solution Works</h2>
                  <p>
                    Our AI-powered solutions leverage cutting-edge technology to provide intelligent automation and insights for your business. We combine machine learning, natural language processing, and data analytics to deliver customized solutions that grow smarter over time.
                  </p>
                  
                  <div className="bg-purple-50 border border-purple-100 rounded-lg p-6 my-8">
                    <h3 className="text-xl font-bold mb-4">Key Technologies</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="text-purple-600 mt-1 mr-2 flex-shrink-0" size={18} />
                        <span><strong>Machine Learning</strong>: Algorithms that learn and improve from experience</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-purple-600 mt-1 mr-2 flex-shrink-0" size={18} />
                        <span><strong>Natural Language Processing</strong>: Understanding and generating human language</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-purple-600 mt-1 mr-2 flex-shrink-0" size={18} />
                        <span><strong>Data Analytics</strong>: Extracting meaningful insights from your data</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-purple-600 mt-1 mr-2 flex-shrink-0" size={18} />
                        <span><strong>Custom Neural Networks</strong>: Tailored AI models specific to your business needs</span>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          )}            
        </div>
        
        {/* Benefits Section */}
        {service.benefits && service.benefits.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit: string, index: number) => (
                <div 
                  key={index} 
                  className={`flex items-start p-4 rounded-lg border ${isAIService ? 'border-purple-100' : 'border-blue-100'}`}
                >
                  <CheckCircle className={`text-${themeColor}-600 mt-1 mr-3 flex-shrink-0`} size={20} />
                  <p className="text-neutral-800">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Features Section */}
        {service.features && service.features.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.features.map((feature: any, index: number) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-lg bg-white shadow-md border-t-4 ${isAIService ? 'border-t-purple-500' : 'border-t-blue-500'}`}
                >
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-neutral-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* FAQ Section */}
        {service.faq && service.faq.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {service.faq.map((item: any, index: number) => (
                <div key={index} className="border-b border-neutral-200 pb-6 last:border-0">
                  <h3 className="text-xl font-medium mb-3">{item.question}</h3>
                  <p className="text-neutral-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* CTA Section */}
      <div className={`bg-${themeColor}-50 py-16`}>
        <div className="max-w-screen-lg mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Contact our team to discuss how we can implement this solution for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className={`inline-block px-6 py-3 bg-${themeColor}-600 text-white rounded-lg font-medium hover:bg-${themeColor}-700 transition-colors`}
            >
              Get in Touch
            </Link>
            <Link 
              href="/services"
              className={`inline-block px-6 py-3 border border-${themeColor}-600 text-${themeColor}-600 rounded-lg font-medium hover:bg-${themeColor}-50 transition-colors`}
            >
              Explore More Services
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}