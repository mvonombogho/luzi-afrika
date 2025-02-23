import { onFCP, onLCP, onCLS, onFID, onTTFB } from '../web-vitals';
import { performanceMonitor } from '../performance';

// Mock performanceMonitor
jest.mock('../performance', () => ({
  performanceMonitor: {
    trackMetric: jest.fn(),
  },
}));

describe('Web Vitals Monitoring', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('First Contentful Paint (FCP)', () => {
    it('tracks FCP metric', () => {
      const mockFCP = {
        name: 'FCP',
        value: 1000,
        delta: 1000,
        id: 'v3-1234',
        entries: [],
      };

      onFCP(mockFCP);

      expect(performanceMonitor.trackMetric).toHaveBeenCalledWith({
        name: 'web_vital_fcp',
        value: 1000,
        type: 'web_vital',
        timestamp: expect.any(Number),
        metadata: {
          delta: 1000,
          id: 'v3-1234',
        },
      });
    });
  });

  describe('Largest Contentful Paint (LCP)', () => {
    it('tracks LCP metric', () => {
      const mockLCP = {
        name: 'LCP',
        value: 2500,
        delta: 2500,
        id: 'v3-5678',
        entries: [],
      };

      onLCP(mockLCP);

      expect(performanceMonitor.trackMetric).toHaveBeenCalledWith({
        name: 'web_vital_lcp',
        value: 2500,
        type: 'web_vital',
        timestamp: expect.any(Number),
        metadata: {
          delta: 2500,
          id: 'v3-5678',
        },
      });
    });
  });

  describe('Cumulative Layout Shift (CLS)', () => {
    it('tracks CLS metric', () => {
      const mockCLS = {
        name: 'CLS',
        value: 0.1,
        delta: 0.1,
        id: 'v3-9012',
        entries: [],
      };

      onCLS(mockCLS);

      expect(performanceMonitor.trackMetric).toHaveBeenCalledWith({
        name: 'web_vital_cls',
        value: 0.1,
        type: 'web_vital',
        timestamp: expect.any(Number),
        metadata: {
          delta: 0.1,
          id: 'v3-9012',
        },
      });
    });
  });

  describe('First Input Delay (FID)', () => {
    it('tracks FID metric', () => {
      const mockFID = {
        name: 'FID',
        value: 100,
        delta: 100,
        id: 'v3-3456',
        entries: [],
      };

      onFID(mockFID);

      expect(performanceMonitor.trackMetric).toHaveBeenCalledWith({
        name: 'web_vital_fid',
        value: 100,
        type: 'web_vital',
        timestamp: expect.any(Number),
        metadata: {
          delta: 100,
          id: 'v3-3456',
        },
      });
    });
  });

  describe('Time to First Byte (TTFB)', () => {
    it('tracks TTFB metric', () => {
      const mockTTFB = {
        name: 'TTFB',
        value: 200,
        delta: 200,
        id: 'v3-7890',
        entries: [],
      };

      onTTFB(mockTTFB);

      expect(performanceMonitor.trackMetric).toHaveBeenCalledWith({
        name: 'web_vital_ttfb',
        value: 200,
        type: 'web_vital',
        timestamp: expect.any(Number),
        metadata: {
          delta: 200,
          id: 'v3-7890',
        },
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles zero values', () => {
      const mockMetric = {
        name: 'FCP',
        value: 0,
        delta: 0,
        id: 'v3-zero',
        entries: [],
      };

      onFCP(mockMetric);

      expect(performanceMonitor.trackMetric).toHaveBeenCalledWith(
        expect.objectContaining({
          value: 0,
          metadata: expect.objectContaining({
            delta: 0,
          }),
        })
      );
    });

    it('handles very large values', () => {
      const mockMetric = {
        name: 'LCP',
        value: 999999,
        delta: 999999,
        id: 'v3-large',
        entries: [],
      };

      onLCP(mockMetric);

      expect(performanceMonitor.trackMetric).toHaveBeenCalledWith(
        expect.objectContaining({
          value: 999999,
          metadata: expect.objectContaining({
            delta: 999999,
          }),
        })
      );
    });

    it('handles missing entries array', () => {
      const mockMetric = {
        name: 'CLS',
        value: 0.1,
        delta: 0.1,
        id: 'v3-no-entries',
      };

      // @ts-ignore - Testing missing entries
      onCLS(mockMetric);

      expect(performanceMonitor.trackMetric).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('handles invalid metric objects gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error');
      
      // @ts-ignore - Testing invalid input
      onFCP(null);
      // @ts-ignore - Testing invalid input
      onLCP(undefined);
      // @ts-ignore - Testing invalid input
      onCLS({});

      expect(consoleSpy).toHaveBeenCalled();
      expect(performanceMonitor.trackMetric).not.toHaveBeenCalled();
    });
  });
});