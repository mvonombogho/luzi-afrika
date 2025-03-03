# Mobile Optimization Guide for Luzi Afrika Website

This guide provides best practices and implementation steps to ensure the Luzi Afrika website is fully optimized for mobile devices, delivering an excellent user experience regardless of screen size.

## Overview

Mobile users make up a significant portion of web traffic in Kenya, with many users accessing the internet primarily through smartphones. Optimizing for mobile is not just about responsive design but also about performance, usability, and conversion optimization.

## Responsive Design Testing

### Screen Sizes to Test

1. **Small Mobile**: 320px - 375px
2. **Medium Mobile**: 376px - 428px
3. **Large Mobile/Small Tablet**: 429px - 768px
4. **Tablet**: 769px - 1024px
5. **Desktop**: 1025px+

### Testing Tools

- **ResponsiveChecker Component**: Use the built-in tool during development (visible only in development mode)
- **Chrome DevTools**: Use the device toolbar for simulating different devices
- **Browserstack**: For testing on actual device configurations
- **Lighthouse Mobile Audit**: To check performance and mobile usability

## Responsive Design Guidelines

### Touch Targets

- **Size**: All interactive elements (buttons, links, form controls) should be at least 44x44 pixels
- **Spacing**: Maintain at least 8px spacing between touch targets
- **Feedback**: Provide visual feedback on touch (use active/focus states)

### Typography

- **Minimum Font Size**: 16px for body text
- **Line Height**: 1.5 for optimal readability
- **Contrast**: Ensure text has sufficient contrast against backgrounds (WCAG AA minimum)

### Images

- **Responsive Images**: Use the Next.js Image component with appropriate `sizes` attribute
- **Image Formats**: Serve WebP format with fallbacks
- **Loading Strategy**: Implement lazy loading for images below the fold

### Navigation

- **Mobile Menu**: Ensure hamburger menu is easy to tap (min 44x44px)
- **Simplified Navigation**: Consider simplified navigation for mobile
- **Bottom Navigation**: Consider adding a bottom navigation bar for key actions

## Performance Optimization for Mobile

### Image Optimization

```typescript
// Optimized image component example
<Image
  src={urlForImage(image).width(800).height(600).format('webp').url()}
  alt="Descriptive alt text"
  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 75vw, 800px"
  width={800}
  height={600}
  loading="lazy"
  className="w-full h-auto"
/>
```

### JavaScript Optimization

- **Code Splitting**: Implement dynamic imports for heavy components
- **Lazy Loading**: Use `next/dynamic` for components below the fold

```typescript
// Example of lazy loading a component
import dynamic from 'next/dynamic';

const TestimonialSlider = dynamic(() => import('@/components/ui/TestimonialSlider'), {
  loading: () => <div className="h-64 w-full bg-neutral-100 animate-pulse rounded-lg"></div>,
  ssr: false // If the component doesn't need to be server-rendered
});
```

### CSS Optimization

- **Mobile-First Approach**: Use mobile-first CSS (start with mobile styles, then add breakpoints for larger screens)
- **Minimal CSS**: Utilize Tailwind's purging to minimize CSS size
- **Critical CSS**: Ensure critical CSS is inlined

## Mobile-Specific Features

### Click-to-Call

Implement click-to-call links for phone numbers:

```html
<a href="tel:+254XXXXXXXXX" className="text-blue-600 hover:underline flex items-center">
  <Phone size={16} className="mr-2" />
  +254 XXX XXX XXX
</a>
```

### Maps Integration

Add Google Maps integration with directions:

```html
<a 
  href="https://maps.google.com/?q=Luzi+Afrika+Limited+Nairobi+Kenya" 
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:underline"
>
  <Map size={16} className="mr-2" />
  Get Directions
</a>
```

### Form Optimization

- Use appropriate input types (`tel`, `email`, etc.)
- Enable autocomplete where appropriate
- Implement form validation with clear error messages

## Testing Checklist

### Visual Testing

- [ ] Typography is readable on all screen sizes
- [ ] Images are properly scaled and not pixelated
- [ ] No horizontal scrolling on any screen size
- [ ] Sufficient contrast between text and background
- [ ] All UI elements fit within the screen width

### Interaction Testing

- [ ] All touch targets are adequately sized (min 44x44px)
- [ ] Navigation menu works properly on touch devices
- [ ] Forms are easy to fill out on mobile
- [ ] Scrolling is smooth and not hijacked
- [ ] Dropdowns and accordions work properly with touch

### Performance Testing

- [ ] Page loads within 3 seconds on 3G connection
- [ ] Scrolling is smooth (60 FPS)
- [ ] No layout shifts during loading
- [ ] Images load progressively
- [ ] Lighthouse mobile score above 90

## Implementation Plan

1. **Audit Current State**:
   - Run Lighthouse mobile audit
   - Test on multiple devices/screen sizes
   - Identify problem areas

2. **Fix Critical Issues**:
   - Address any layout problems
   - Fix touch target sizes
   - Optimize images

3. **Enhance Mobile Experience**:
   - Implement mobile-specific features
   - Optimize forms for mobile
   - Add mobile-friendly navigation

4. **Test and Refine**:
   - Conduct user testing on mobile devices
   - Get feedback from team members
   - Make iterative improvements

## Resources

- [Web.dev Mobile Guide](https://web.dev/mobile/)
- [Google's Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [WCAG Mobile Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/mobile/)
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
