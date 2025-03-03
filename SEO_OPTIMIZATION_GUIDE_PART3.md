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