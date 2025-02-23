import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Custom render that includes common providers/context
function render(ui: React.ReactElement, { ...renderOptions } = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <>
        {children}
      </>
    );
  }
  return {
    user: userEvent.setup(),
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// Mock window.matchMedia
export function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// Mock IntersectionObserver
export function mockIntersectionObserver() {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
}

// Mock ResizeObserver
export function mockResizeObserver() {
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
}

// Mock performance monitoring
export function mockPerformanceMonitoring() {
  jest.mock('@/utils/performance', () => ({
    performanceMonitor: {
      trackMetric: jest.fn(),
      trackComponentTiming: jest.fn(),
    },
    usePerformanceMonitoring: () => ({
      trackRender: jest.fn(),
      trackOperation: jest.fn(),
    }),
  }));
}

// Mock analytics
export function mockAnalytics() {
  jest.mock('@/hooks/useAnalytics', () => ({
    useAnalytics: () => ({
      trackEvent: jest.fn(),
    }),
    useComponentAnalytics: () => ({
      trackMount: jest.fn(),
      trackUnmount: jest.fn(),
      trackInteraction: jest.fn(),
    }),
  }));
}

// Helper to wait for images to load
export function waitForImages() {
  return new Promise(resolve => {
    const images = document.getElementsByTagName('img');
    if (images.length === 0) {
      resolve(true);
      return;
    }

    let loadedImages = 0;
    Array.from(images).forEach(img => {
      if (img.complete) {
        loadedImages++;
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === images.length) {
            resolve(true);
          }
        });
      }
    });

    if (loadedImages === images.length) {
      resolve(true);
    }
  });
}

// Helper to mock fetch responses
export function mockFetch(response: any) {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response),
    })
  );
}

// Export everything from RTL and user-event
export * from '@testing-library/react';
export { userEvent };
export { render };