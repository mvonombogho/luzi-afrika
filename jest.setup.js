// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/test-path',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock GSAp
jest.mock('gsap', () => ({
  to: jest.fn(),
  from: jest.fn(),
  registerPlugin: jest.fn(),
  context: jest.fn(() => ({
    revert: jest.fn(),
  })),
}));

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: 'ScrollTrigger',
}));

// Mock window.fs for file operations
global.window.fs = {
  readFile: jest.fn(),
  writeFile: jest.fn(),
};

// Mock performance.mark and measure
if (typeof window !== 'undefined') {
  window.performance.mark = jest.fn();
  window.performance.measure = jest.fn();
}

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock ResizeObserver
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});