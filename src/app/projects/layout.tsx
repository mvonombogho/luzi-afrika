'use client';

import Navigation from '@/components/navigation/Navigation';
import CustomCursor from '@/components/ui/CustomCursor';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
      <Navigation />
      {children}
    </>
  );
}