import { act } from '@testing-library/react';

/**
 * Mock implementation of the browser's Image API for testing
 */
export class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  src: string = '';
  width: number = 0;
  height: number = 0;

  constructor() {
    setTimeout(() => {
      // Simulate natural loading delay
      if (this.src.includes('error')) {
        this.onerror && this.onerror();
      } else {
        this.width = 100;
        this.height = 100;
        this.onload && this.onload();
      }
    }, 0);
  }
}

/**
 * Simulates an image loading successfully
 */
export async function simulateImageLoad(image: HTMLImageElement) {
  await act(async () => {
    const event = new Event('load');
    image.dispatchEvent(event);
  });
}

/**
 * Simulates an image failing to load
 */
export async function simulateImageError(image: HTMLImageElement) {
  await act(async () => {
    const event = new Event('error');
    image.dispatchEvent(event);
  });
}

/**
 * Waits for all images in the document to load
 */
export async function waitForImagesToLoad() {
  const images = document.getElementsByTagName('img');
  const imageLoadPromises = Array.from(images).map(
    img =>
      new Promise(resolve => {
        if (img.complete) {
          resolve(true);
        } else {
          img.addEventListener('load', () => resolve(true));
          img.addEventListener('error', () => resolve(false));
        }
      })
  );
  await Promise.all(imageLoadPromises);
}

/**
 * Mocks the Image constructor for testing
 */
export function mockImageConstructor() {
  const originalImage = window.Image;
  window.Image = MockImage as any;
  return () => {
    window.Image = originalImage;
  };
}

/**
 * Creates a mock IntersectionObserver for testing lazy loading
 */
export function mockIntersectionObserver() {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  });
  window.IntersectionObserver = mockIntersectionObserver;
  return mockIntersectionObserver;
}

/**
 * Helper to test if an image has loaded with specific dimensions
 */
export function expectImageDimensions(image: HTMLImageElement, width: number, height: number) {
  expect(image).toHaveAttribute('width', width.toString());
  expect(image).toHaveAttribute('height', height.toString());
}

/**
 * Helper to test if an image is being lazy loaded
 */
export function expectImageLazyLoading(image: HTMLImageElement) {
  expect(image).toHaveAttribute('loading', 'lazy');
  expect(image).not.toHaveAttribute('fetchpriority', 'high');
}

/**
 * Helper to test if an image has priority loading
 */
export function expectImagePriorityLoading(image: HTMLImageElement) {
  expect(image).not.toHaveAttribute('loading', 'lazy');
  expect(image).toHaveAttribute('fetchpriority', 'high');
}

/**
 * Simulates a responsive image loading at different viewport sizes
 */
export async function testResponsiveImage(image: HTMLImageElement, breakpoints: number[]) {
  for (const width of breakpoints) {
    Object.defineProperty(window, 'innerWidth', { value: width, writable: true });
    window.dispatchEvent(new Event('resize'));
    await waitForImagesToLoad();
  }
}