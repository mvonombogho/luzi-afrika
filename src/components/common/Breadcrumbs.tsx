'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  homeText?: string;
  separator?: React.ReactNode;
  lastItemClassName?: string;
  className?: string;
  overrides?: Record<string, string>;
}

export default function Breadcrumbs({
  homeText = 'Home',
  separator = <ChevronRight size={14} className="mx-2 text-neutral-400" />,
  lastItemClassName = 'text-neutral-600 font-medium',
  className = '',
  overrides = {},
}: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Ignore trailing slashes for the checks
  const path = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;
  
  // If homepage, don't show breadcrumbs
  if (path === '/') {
    return null;
  }
  
  // Utility to capitalize and format path segments
  const formatPathSegment = (segment: string): string => {
    // Check if there's an override for this segment
    if (overrides[segment.toLowerCase()]) {
      return overrides[segment.toLowerCase()];
    }
    
    // Handle paths with hyphens or underscores
    return segment
      .replace(/-|_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Split and filter the path segments
  const segments = path
    .split('/')
    .filter(segment => segment !== '');
  
  // Build the breadcrumb items
  const breadcrumbItems = [
    { href: '/', label: homeText },
    ...segments.map((segment, index) => {
      // The href is the path up to and including the current segment
      const href = `/${segments.slice(0, index + 1).join('/')}`;
      
      // Format the segment for display
      const label = formatPathSegment(segment);
      
      // Is this the last item?
      const isLast = index === segments.length - 1;
      
      return { href, label, isLast };
    }),
  ];

  return (
    <nav aria-label="Breadcrumb" className={`py-2 ${className}`}>
      <ol className="flex items-center text-sm">
        {breadcrumbItems.map((item, index) => {
          const isLastItem = index === breadcrumbItems.length - 1;
          
          return (
            <li 
              key={item.href}
              className={isLastItem ? lastItemClassName : ''}
              aria-current={isLastItem ? 'page' : undefined}
            >
              {isLastItem ? (
                <span>{item.label}</span>
              ) : (
                <>
                  <Link 
                    href={item.href}
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    {item.href === '/' ? (
                      <>
                        <Home size={14} className="mr-1" />
                        <span className="sr-only">{item.label}</span>
                      </>
                    ) : (
                      item.label
                    )}
                  </Link>
                  {index < breadcrumbItems.length - 1 && separator}
                </>
              )}
            </li>
          );
        })}
      </ol>
      
      {/* Schema.org BreadcrumbList markup */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': breadcrumbItems.map((item, index) => ({
              '@type': 'ListItem',
              'position': index + 1,
              'name': item.label,
              'item': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://luziafrika.com'}${item.href}`,
            })),
          }),
        }}
      />
    </nav>
  );
}