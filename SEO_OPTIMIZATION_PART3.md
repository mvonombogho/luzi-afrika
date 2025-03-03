## Technical SEO

### Performance Optimization

1. **Core Web Vitals**

Optimize for Google's Core Web Vitals metrics:
- Largest Contentful Paint (LCP): < 2.5 seconds
- First Input Delay (FID): < 100 milliseconds
- Cumulative Layout Shift (CLS): < 0.1

2. **Page Speed**

- Leverage Next.js built-in image optimization
- Implement code splitting and lazy loading
- Utilize caching for Sanity data
- Minify CSS and JavaScript files

### Mobile Optimization

- Implement responsive design (already covered in MOBILE_OPTIMIZATION.md)
- Ensure touch targets are properly sized
- Optimize font sizes for mobile readability

### Crawlability

1. **Robots.txt**

The robots.txt file is already implemented but should contain:

```
User-agent: *
Allow: /
Disallow: /studio/
Disallow: /api/

Sitemap: https://luziafrika.com/sitemap.xml
```

2. **XML Sitemap**

The dynamic sitemap.xml generator is implemented but should include:
- All important pages
- Last modified dates
- Change frequency
- Priority levels

3. **Canonical Tags**

Implement canonical tags on all pages to prevent duplicate content issues:

```html
<link rel="canonical" href="https://luziafrika.com/services/hardware-maintenance" />
```

### Security

- Implement HTTPS (automatic with Vercel)
- Set proper security headers

```js
// in next.config.js
module.exports = {
  // ... other config
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

## Local SEO Optimization

### Google My Business

1. **Setup and Verification**

- Create and verify Google My Business listing
- Use exact business name, address, and phone number (NAP)
- Choose appropriate categories (IT Services, Computer Repair, etc.)
- Add business hours and service areas

2. **Optimization**

- Add high-quality photos of business location, team, and services
- Write a keyword-rich business description
- Regularly add posts with company updates and promotions
- Encourage customer reviews

### Local Business Schema

Implement LocalBusiness schema on all pages (already included in implementation):

```jsx
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Luzi Afrika Limited",
    "image": "https://luziafrika.com/logo.png",
    "@id": "https://luziafrika.com",
    "url": "https://luziafrika.com",
    "telephone": "+254XXXXXXXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kimathi Street",
      "addressLocality": "Nairobi",
      "postalCode": "00100",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -1.2864,
      "longitude": 36.8172
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.facebook.com/luziafrika",
      "https://www.linkedin.com/company/luzi-afrika-limited"
    ] 
  }
</script>
```

### NAP Consistency

Ensure Name, Address, and Phone number are consistent across:
- Website (footer, contact page, about page)
- Google My Business listing
- Social media profiles
- Business directories and citations

### Local Citations

Build citations on relevant local directories:
- Yellow Pages Kenya
- Kenya Business Directory
- LinkedIn Company Directory
- Kenya ICT Board listings
- Nairobi Chamber of Commerce