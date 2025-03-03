import Accordion from '@/components/ui/Accordion';

interface FAQItem {
  id: string | number;
  question: string;
  answer: React.ReactNode;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  description?: string;
  className?: string;
}

export default function FAQ({ 
  items, 
  title = 'Frequently Asked Questions', 
  description,
  className = ''
}: FAQProps) {
  // Transform FAQ items for the accordion component
  const accordionItems = items.map(item => ({
    id: item.id,
    title: item.question,
    content: item.answer
  }));

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-screen-lg mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
        
        <Accordion items={accordionItems} />
        
        {/* FAQ Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": items.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": typeof item.answer === 'string' 
                    ? item.answer 
                    : 'Please visit our website for the detailed answer.'
                }
              }))
            })
          }}
        />
      </div>
    </section>
  );
}