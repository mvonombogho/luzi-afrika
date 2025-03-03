import FAQ from '@/components/ui/FAQ';

// FAQ items for the homepage
const faqItems = [
  {
    id: 1,
    question: 'What IT support services does Luzi Afrika provide?',
    answer: 'Luzi Afrika provides a comprehensive range of IT support services including hardware maintenance, software solutions, network security, cloud migration, data management, and custom IT solutions tailored to your business needs.'
  },
  {
    id: 2,
    question: 'How quickly can you respond to IT issues?',
    answer: 'We offer rapid response times, with our standard support packages guaranteeing a response within 4 business hours. For critical issues, our premium support plans provide even faster response times, with some problems resolved remotely within minutes.'
  },
  {
    id: 3,
    question: 'Do you offer both remote and on-site IT support?',
    answer: 'Yes, we provide both remote and on-site IT support. Many issues can be resolved quickly through our secure remote support tools, while more complex problems may require on-site visits from our technical team.'
  },
  {
    id: 4,
    question: 'What areas in Kenya do you serve?',
    answer: 'We primarily serve businesses in Nairobi and surrounding areas, but we also support clients throughout Kenya with our remote IT services and can arrange on-site support for larger projects nationwide.'
  },
  {
    id: 5,
    question: 'Do you offer IT support packages for small businesses?',
    answer: 'Yes, we have tailored IT support packages designed specifically for small businesses with limited budgets. Our scalable solutions grow with your business, ensuring you always have the right level of support without overpaying.'
  }
];

export default function HomeFAQ() {
  return (
    <FAQ 
      items={faqItems} 
      title="Frequently Asked Questions"
      description="Find answers to commonly asked questions about our IT support and services."
      className="bg-neutral-50"
    />
  );
}