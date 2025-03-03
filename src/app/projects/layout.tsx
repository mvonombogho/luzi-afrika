import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Luzi Afrika',
  description: 'Explore our portfolio of successful IT projects and solutions across Africa',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}