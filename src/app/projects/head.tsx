export default function Head() {
  const title = "Our Projects | Luzi Afrika";
  const description = "Explore our portfolio of successful IT projects and solutions that have helped businesses across Africa transform their digital infrastructure.";
  const ogImage = "https://luziafrika.com/images/projects-og.jpg";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Luzi Afrika" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content="IT services, IT projects, digital transformation, Kenya, Africa, technology solutions, enterprise infrastructure, cloud migration, network security" />
      
      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "headline": "Luzi Afrika Projects Portfolio",
          "description": description,
          "image": ogImage,
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