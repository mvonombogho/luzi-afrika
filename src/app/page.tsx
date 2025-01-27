// app/page.tsx
import Hero from '@/components/sections/home/Hero';
import Services from '@/components/sections/home/Services';

export const metadata = {
  title: 'Luzi Afrika | IT Solutions & Consultancy',
  description: 'Leading provider of comprehensive IT support and consultancy services in Kenya',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Services />
    </div>
  );
}