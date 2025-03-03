'use client';

import { useState, useEffect } from 'react';

export default function ResponsiveChecker() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // Changed to false by default
  
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const updateDimensions = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    // Initial dimensions
    updateDimensions();

    // Update dimensions on resize
    window.addEventListener('resize', updateDimensions);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // If not in development or not visible, don't render
  if (!isVisible || process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Get device category
  const getDeviceCategory = () => {
    if (screenWidth < 640) return 'Mobile';
    if (screenWidth < 768) return 'Large Mobile/Small Tablet';
    if (screenWidth < 1024) return 'Tablet';
    if (screenWidth < 1280) return 'Small Desktop';
    return 'Large Desktop';
  };

  // Get Tailwind breakpoint
  const getTailwindBreakpoint = () => {
    if (screenWidth < 640) return 'Default (< sm)';
    if (screenWidth < 768) return 'sm';
    if (screenWidth < 1024) return 'md';
    if (screenWidth < 1280) return 'lg';
    if (screenWidth < 1536) return 'xl';
    return '2xl';
  };

  return (
    <div className="fixed bottom-0 left-0 bg-blue-500 text-white p-2 text-xs z-50 rounded-tr-md">
      <button
        className="absolute top-0 right-0 p-1"
        onClick={() => setIsVisible(false)}
      >
        ×
      </button>
      <div>
        <strong>Width:</strong> {screenWidth}px | <strong>Height:</strong> {screenHeight}px
      </div>
      <div>
        <strong>Device:</strong> {getDeviceCategory()}
      </div>
      <div>
        <strong>Tailwind:</strong> {getTailwindBreakpoint()}
      </div>
    </div>
  );
}