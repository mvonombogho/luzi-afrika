import { Fragment } from 'react';

interface SchemaOrgProps {
  type: string;
  data: Record<string, any>;
}

const Schema = ({ type, data }: SchemaOrgProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Fragment>
  );
};

export const OrganizationSchema = () => (
  <Schema
    type="Organization"
    data={{
      name: 'Luzi Afrika Limited',
      url: 'https://luziafrika.com',
      logo: 'https://luziafrika.com/logo.png',
      sameAs: [
        'https://twitter.com/luziafrika',
        'https://linkedin.com/company/luziafrika',
        'https://instagram.com/luziafrika',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+254-XXX-XXX-XXX',
        contactType: 'customer service',
        areaServed: 'KE',
        availableLanguage: ['en'],
      },
    }}
  />
);

export const LocalBusinessSchema = () => (
  <Schema
    type="LocalBusiness"
    data={{
      name: 'Luzi Afrika Limited',
      image: 'https://luziafrika.com/office.jpg',
      '@id': 'https://luziafrika.com',
      url: 'https://luziafrika.com',
      telephone: '+254-XXX-XXX-XXX',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Business Street',
        addressLocality: 'Nairobi',
        postalCode: '00100',
        addressCountry: 'KE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -1.2921,
        longitude: 36.8219,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '09:00',
        closes: '17:00',
      },
      sameAs: [
        'https://twitter.com/luziafrika',
        'https://linkedin.com/company/luziafrika',
        'https://instagram.com/luziafrika',
      ],
    }}
  />
);

export default Schema;