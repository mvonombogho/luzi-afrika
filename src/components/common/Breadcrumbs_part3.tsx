
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