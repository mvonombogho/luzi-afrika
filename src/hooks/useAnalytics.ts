import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { performanceMonitor } from '@/utils/performance';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: number;
}

class Analytics {
  private static instance: Analytics;
  private isProduction = process.env.NODE_ENV === 'production';
  private endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
  private queue: AnalyticsEvent[] = [];
  private flushInterval: number | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.setupFlushInterval();
    }
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  private setupFlushInterval(): void {
    // Flush events every 30 seconds or when queue reaches 20 events
    this.flushInterval = window.setInterval(() => this.flushEvents(), 30000);
  }

  public trackEvent(event: AnalyticsEvent): void {
    this.queue.push({
      ...event,
      timestamp: event.timestamp || Date.now()
    });

    // Log in development
    if (!this.isProduction) {
      console.log('Analytics event:', event);
    }

    // Flush if queue gets too large
    if (this.queue.length >= 20) {
      this.flushEvents();
    }
  }

  public trackPageView(path: string, properties?: Record<string, unknown>): void {
    this.trackEvent({
      name: 'page_view',
      properties: {
        path,
        title: document.title,
        referrer: document.referrer,
        ...properties
      }
    });

    // Track performance metrics for the page view
    performanceMonitor.trackMetric({
      name: 'page_view_timing',
      value: performance.now(),
      type: 'timing',
      timestamp: Date.now(),
      metadata: { path }
    });
  }

  private async flushEvents(): Promise<void> {
    if (!this.endpoint || this.queue.length === 0) return;

    try {
      const events = [...this.queue];
      this.queue = [];

      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          events,
          metadata: {
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: Date.now()
          }
        })
      });
    } catch (error) {
      console.error('Failed to send analytics events:', error);
      // Put events back in the queue
      this.queue.unshift(...this.queue);
    }
  }

  public destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
  }
}

export const analytics = Analytics.getInstance();

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    // Only track after initial client-side render
    if (typeof window !== 'undefined') {
      analytics.trackPageView(pathname);
    }
  }, [pathname]);

  // Track search params changes
  useEffect(() => {
    if (searchParams?.toString()) {
      analytics.trackEvent({
        name: 'search_params_change',
        properties: {
          path: pathname,
          params: Object.fromEntries(searchParams.entries())
        }
      });
    }
  }, [searchParams, pathname]);

  const trackEvent = useCallback((name: string, properties?: Record<string, unknown>) => {
    analytics.trackEvent({ name, properties });
  }, []);

  return { trackEvent };
}

// Convenience hook for component-level analytics
export function useComponentAnalytics(componentName: string) {
  const { trackEvent } = useAnalytics();

  return {
    trackMount: () => {
      trackEvent('component_mount', { component: componentName });
    },
    trackUnmount: () => {
      trackEvent('component_unmount', { component: componentName });
    },
    trackInteraction: (action: string, properties?: Record<string, unknown>) => {
      trackEvent('component_interaction', {
        component: componentName,
        action,
        ...properties
      });
    }
  };
}