import { performanceMonitor, usePerformanceMonitoring } from '../performance';
import { renderHook } from '@testing-library/react';

// Mock fetch for metric sending
const mockFetch = jest.fn(() => Promise.resolve());
global.fetch = mockFetch;

// Mock performance API
const mockMark = jest.fn();
const mockMeasure = jest.fn();
const mockGetEntriesByType = jest.fn();
const mockGetEntriesByName = jest.fn();

Object.defineProperty(window, 'performance', {
  value: {
    mark: mockMark,
    measure: mockMeasure,
    getEntriesByType: mockGetEntriesByType,
    getEntriesByName: mockGetEntriesByName,
    now: () => Date.now(),
  },
  writable: true,
});

describe('Performance Monitoring', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset metrics queue
    (performanceMonitor as any).metrics = [];
  });

  describe('Performance Monitor', () => {
    it('tracks basic metrics', () => {
      performanceMonitor.trackMetric({
        name: 'test_metric',
        value: 100,
        type: 'timing',
        timestamp: Date.now(),
      });

      // Verify metric was tracked
      expect((performanceMonitor as any).metrics).toHaveLength(1);
      expect((performanceMonitor as any).metrics[0]).toMatchObject({
        name: 'test_metric',
        value: 100,
        type: 'timing',
      });
    });

    it('batches metrics before sending', () => {
      // Add multiple metrics
      for (let i = 0; i < 5; i++) {
        performanceMonitor.trackMetric({
          name: `metric_${i}`,
          value: i,
          type: 'timing',
          timestamp: Date.now(),
        });
      }

      // Verify metrics are batched
      expect((performanceMonitor as any).metrics).toHaveLength(5);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('sends metrics when threshold is reached', () => {
      // Add metrics up to threshold
      for (let i = 0; i < 10; i++) {
        performanceMonitor.trackMetric({
          name: `metric_${i}`,
          value: i,
          type: 'timing',
          timestamp: Date.now(),
        });
      }

      // Verify metrics were sent
      expect(mockFetch).toHaveBeenCalled();
      expect((performanceMonitor as any).metrics).toHaveLength(0);
    });

    it('tracks component timing', () => {
      performanceMonitor.trackComponentTiming(
        'TestComponent',
        'render',
        100
      );

      expect((performanceMonitor as any).metrics[0]).toMatchObject({
        name: 'component_render',
        type: 'timing',
        metadata: {
          component: 'TestComponent'
        }
      });
    });
  });

  describe('usePerformanceMonitoring Hook', () => {
    it('provides tracking functions', () => {
      const { result } = renderHook(() => 
        usePerformanceMonitoring('TestComponent')
      );

      expect(result.current.trackRender).toBeDefined();
      expect(result.current.trackOperation).toBeDefined();
    });

    it('tracks render timing', () => {
      const { result } = renderHook(() => 
        usePerformanceMonitoring('TestComponent')
      );

      const stopTracking = result.current.trackRender();
      stopTracking();

      expect((performanceMonitor as any).metrics[0]).toMatchObject({
        name: 'component_render',
        type: 'timing',
        metadata: {
          component: 'TestComponent'
        }
      });
    });

    it('tracks custom operations', () => {
      const { result } = renderHook(() => 
        usePerformanceMonitoring('TestComponent')
      );

      const stopTracking = result.current.trackOperation('customOp');
      stopTracking();

      expect((performanceMonitor as any).metrics[0]).toMatchObject({
        name: 'component_customOp',
        type: 'timing',
        metadata: {
          component: 'TestComponent'
        }
      });
    });
  });

  describe('Resource Timing', () => {
    beforeEach(() => {
      mockGetEntriesByType.mockReturnValue([{
        name: 'https://example.com/resource',
        entryType: 'resource',
        startTime: 0,
        duration: 100,
        initiatorType: 'fetch'
      }]);
    });

    it('tracks resource timing', () => {
      // Simulate resource load
      const entry = mockGetEntriesByType()[0];
      performanceMonitor.trackMetric({
        name: 'resource_timing',
        value: entry.duration,
        type: 'resource',
        timestamp: Date.now(),
        metadata: {
          resourceName: entry.name,
          initiatorType: entry.initiatorType
        }
      });

      expect((performanceMonitor as any).metrics[0]).toMatchObject({
        name: 'resource_timing',
        type: 'resource',
        metadata: {
          resourceName: 'https://example.com/resource',
          initiatorType: 'fetch'
        }
      });
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      console.error = jest.fn();
    });

    it('handles failed metric submission gracefully', async () => {
      // Add metrics and trigger submission
      for (let i = 0; i < 10; i++) {
        performanceMonitor.trackMetric({
          name: `metric_${i}`,
          value: i,
          type: 'timing',
          timestamp: Date.now(),
        });
      }

      // Wait for fetch to fail
      await new Promise(resolve => setTimeout(resolve, 0));

      // Verify error was logged and metrics were preserved
      expect(console.error).toHaveBeenCalled();
      expect((performanceMonitor as any).metrics).toHaveLength(10);
    });
  });
});