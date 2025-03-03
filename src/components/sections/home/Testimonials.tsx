import TestimonialSlider, { Testimonial } from '@/components/ui/TestimonialSlider';

// Static testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Luzi Afrika has completely transformed our IT infrastructure. Their team's expertise and quick response times have minimized downtime and significantly improved our operational efficiency.",
    author: "David Maina",
    position: "IT Director",
    company: "Nairobi Financial Services"
  },
  {
    id: 2,
    quote: "After struggling with unreliable IT support for years, we finally found Luzi Afrika. Their proactive approach to maintenance has prevented numerous potential issues, and when problems do arise, they're resolved in record time.",
    author: "Sarah Kamau",
    position: "Operations Manager",
    company: "Eastern Healthcare Clinic"
  },
  {
    id: 3,
    quote: "The cloud migration services provided by Luzi Afrika were seamless. They understood our unique needs and created a custom solution that has improved team collaboration and reduced our IT costs by over 30%.",
    author: "Michael Odera",
    position: "CEO",
    company: "Mombasa Logistics Ltd"
  },
  {
    id: 4,
    quote: "As a small business, we needed affordable but reliable IT support. Luzi Afrika delivered exactly that, with flexible packages that grow with our business and technical expertise that rivals much larger firms.",
    author: "Janet Kimani",
    position: "Founder",
    company: "Creative Solutions Kenya"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Trusted by businesses across Kenya to deliver reliable IT support and innovative solutions.
          </p>
        </div>
        
        <TestimonialSlider testimonials={testimonials} />
        
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 items-center opacity-60">
          <div className="w-24 md:w-32">Nairobi Financial</div>
          <div className="w-24 md:w-32">Eastern Healthcare</div>
          <div className="w-24 md:w-32">Mombasa Logistics</div>
          <div className="w-24 md:w-32">Creative Solutions</div>
          <div className="w-24 md:w-32">Kenya Tech Group</div>
        </div>
      </div>
    </section>
  );
}