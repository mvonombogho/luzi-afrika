/**
 * Generate structured data for SEO
 */

// Company information (centralized for consistency)
export const companyInfo = {
  name: 'Luzi Afrika Limited',
  legalName: 'Luzi Afrika Limited',
  url: 'https://luziafrika.com',
  logo: 'https://luziafrika.com/logo.png',
  foundingDate: '2025',
  founders: [
    {
      name: 'Luzi Afrika Management Team',
      url: 'https://luziafrika.com/about'
    }
  ],
  address: {
    streetAddress: 'Kimathi Street',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi County',
    postalCode: '00100',
    addressCountry: 'KE'
  },
  contactPoint: {
    telephone: '+254-XXX-XXX-XXX',
    contactType: 'customer service',
    email: 'info@luziafrika.com'
  },
  sameAs: [
    'https://www.facebook.com/luziafrika',
    'https://www.linkedin.com/company/luzi-afrika-limited',
    'https://twitter.com/luziafrika'
  ],
  description: 'Leading IT support and solutions provider in Kenya, specializing in hardware support, software solutions, and IT consultancy.'
};

/**
 * Generate LocalBusiness schema
 */
export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${companyInfo.url}/#organization`,
    name: companyInfo.name,
    url: companyInfo.url,
    logo: companyInfo.logo,
    image: companyInfo.logo,
    telephone: companyInfo.contactPoint.telephone,
    email: companyInfo.contactPoint.email,
    foundingDate: companyInfo.foundingDate,
    description: companyInfo.description,
    address: {
      '@type': 'PostalAddress',
      ...companyInfo.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-1.2864', // Nairobi coordinates
      longitude: '36.8172'
    },
    sameAs: companyInfo.sameAs,
    openingHours: [
      'Mo-Fr 08:00-17:00',
      'Sa 09:00-13:00'
    ],
    priceRange: '$$',
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '-1.2864',
        longitude: '36.8172'
      },
      geoRadius: '50000'
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'IT Support Services',
          description: 'Comprehensive IT support for businesses in Kenya.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hardware Maintenance',
          description: 'Professional hardware maintenance and repair services.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Software Solutions',
          description: 'Customized software solutions for business needs.'
        }
      }
    ]
  };
};

/**
 * Generate FAQPage schema
 */
export const generateFAQSchema = (questions: { question: string; answer: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
};

/**
 * Generate Service schema
 */
export const generateServiceSchema = (service: {
  name: string;
  description: string;
  image?: string;
  provider?: string;
  serviceType?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    image: service.image,
    provider: {
      '@type': 'Organization',
      name: service.provider || companyInfo.name,
      url: companyInfo.url
    },
    serviceType: service.serviceType || 'IT Services'
  };
};
