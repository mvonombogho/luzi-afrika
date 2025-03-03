## On-Page SEO Implementation

### Meta Tags

Ensure every page has proper meta tags. Example implementation:

```jsx
// In the head section of each page
<title>IT Support Services in Nairobi | Luzi Afrika</title>
<meta name="description" content="Professional IT support and maintenance services in Nairobi. Hardware, software, and network solutions for businesses across Kenya." />
<meta name="keywords" content="IT support, computer maintenance, network solutions, Nairobi, Kenya" />
```

### Header Structure

Implement proper heading hierarchy on all pages:

- H1: Main page title (only one per page)
- H2: Major section headings
- H3: Subsection headings
- H4-H6: Further subdivision as needed

Example:

```jsx
<h1>Professional IT Support Services in Nairobi</h1>
<section>
  <h2>Hardware Maintenance Solutions</h2>
  <div>
    <h3>Computer Repair Services</h3>
    <p>...</p>
  </div>
  <div>
    <h3>Server Maintenance</h3>
    <p>...</p>
  </div>
</section>
```

### URL Structure

Implement clean, descriptive URLs:

- Good: `/services/hardware-maintenance`
- Avoid: `/services/s?id=123`

### Image Optimization

1. **Alt Text**: Descriptive alt text for all images with keywords where appropriate

```jsx
<Image 
  src="/images/it-support-nairobi.jpg" 
  alt="IT support technician repairing server hardware in Nairobi office"
  width={800}
  height={600}
/>
```

2. **Image Compression**: Use Next.js Image component with WebP format

3. **Lazy Loading**: Implement for images below the fold

### Content Optimization

1. **Keyword Density**: Target 1-2% keyword density in content

2. **Content Length**: Aim for 800+ words for key service pages

3. **Internal Linking**: Link between relevant content

```jsx
<p>
  Our <Link href="/services/hardware-maintenance">hardware maintenance services</Link> 
  include comprehensive computer repairs and server maintenance.
</p>
```

4. **Structured Data**: Implement JSON-LD for rich snippets

```jsx
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "IT Support Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Luzi Afrika Limited",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressRegion": "Nairobi County",
        "addressCountry": "KE"
      }
    },
    "description": "Professional IT support services for businesses in Nairobi and across Kenya.",
    "areaServed": {
      "@type": "City",
      "name": "Nairobi"
    }
  }
</script>
```