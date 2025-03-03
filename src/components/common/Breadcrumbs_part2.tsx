  
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