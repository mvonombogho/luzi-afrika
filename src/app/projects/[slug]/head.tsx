import { projects } from '@/data/projects';

interface Props {
  params: {
    slug: string;
  };
}

export default function Head({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return null;
  }

  const title = `${project.title} | Luzi Afrika Projects`;
  const description = project.description;
  const ogImage = project.image;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Luzi Afrika" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content={`IT services, ${project.category}, ${project.technologies.join(', ')}, Kenya, Africa`} />
      
      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": project.title,
          "description": project.description,
          "image": project.image,
          "datePublished": project.completionDate,
          "author": {
            "@type": "Organization",
            "name": "Luzi Afrika"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Luzi Afrika",
            "logo": {
              "@type": "ImageObject",
              "url": "https://luziafrika.com/logo.png"
            }
          }
        })}
      </script>
    </>
  );
}