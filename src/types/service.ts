export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceSlug {
  current: string;
  _type?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon?: string;
  detailedDescription: string;
  benefits: string[];
  caseStudyTitle?: string;
  caseStudyDescription?: string;
  keyFeatures: ServiceFeature[];
  faqs: {
    question: string;
    answer: string;
  }[];
  slug?: ServiceSlug;
}