interface PerformanceMetric {
  name: string;
  value: number;
  type: 'timing' | 'memory' | 'resource' | 'custom';
  timestamp: number;
  metadata?: Record<string, unknown>;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];
  private isProduction = process.env.NODE_ENV === 'production';
  private endpoint = process.env.NEXT_PUBLIC_PERFORMANCE_ENDPOINT;

  private constructor() {
    if (typeof window !== 'undefined') {
      // Listen for performance events
      this.observePageLoad();
      this.observeResourceTiming();
      this.observeLayoutShifts();
    }
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private observePageLoad(): void {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      this.trackMetric({
        name: 'ttfb',
        value: navigation.responseStart - navigation.requestStart,
        type: 'timing',
        timestamp: Date.now(),
        metadata: {
          url: window.location.href
        }
      });

      this.trackMetric({
        name: 'fcp',
        value: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
        type: 'timing',
        timestamp: Date.now()
      });

      // Track total page load time
      this.trackMetric({
        name: 'page_load',
        value: navigation.loadEventEnd - navigation.startTime,
        type: 'timing',
        timestamp: Date.now()
      });
    });
  }

  private observeResourceTiming(): void {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          this.trackMetric({
            name: 'resource_timing',
            value: entry.duration,
            type: 'resource',
            timestamp: Date.now(),
            metadata: {
              resourceName: entry.name,
              initiatorType: entry.initiatorType
            }
          });
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  private observeLayoutShifts(): void {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
          this.trackMetric({
            name: 'cumulative_layout_shift',
            value: (entry as LayoutShift).value,
            type: 'custom',
            timestamp: Date.now()
          });
        }
      });
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  }

  public trackMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Log in development
    if (!this.isProduction) {
      console.log('Performance metric:', metric);
      return;
    }

    // Send to analytics in production
    if (this.endpoint && this.metrics.length >= 10) {
      this.flushMetrics();
    }
  }

  public trackComponentTiming(
    componentName: string,
    operation: string,
    duration: number
  ): void {
    this.trackMetric({
      name: `component_${operation}`,
      value: duration,
      type: 'timing',
      timestamp: Date.now(),
      metadata: {
        component: componentName
      }
    });
  }

  private async flushMetrics(): Promise<void> {
    if (!this.endpoint || this.metrics.length === 0) return;

    try {
      const metrics = [...this.metrics];
      this.metrics = [];

      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          metrics,
          url: window.location.href,
          timestamp: Date.now(),
          userAgent: navigator.userAgent
        })
      });
    } catch (error) {
      console.error('Failed to send performance metrics:', error);
      // Put the metrics back in the queue
      this.metrics.unshift(...this.metrics);
    }
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// React hook for component performance monitoring
export function usePerformanceMonitoring(componentName: string) {
  return {
    trackRender: () => {
      const startTime = performance.now();
      return () => {
        const duration = performance.now() - startTime;
        performanceMonitor.trackComponentTiming(componentName, 'render', duration);
      };
    },
    trackOperation: (operation: string) => {
      const startTime = performance.now();
      return () => {
        const duration = performance.now() - startTime;
        performanceMonitor.trackComponentTiming(componentName, operation, duration);
      };
    }
  };
}