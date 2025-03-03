interface ErrorDetails {
  message: string;
  stack?: string;
  componentName?: string;
  additionalInfo?: Record<string, unknown>;
}

class ErrorTracker {
  private static instance: ErrorTracker;
  private isProduction = process.env.NODE_ENV === 'production';
  private endpoint = process.env.NEXT_PUBLIC_ERROR_TRACKING_ENDPOINT;

  private constructor() {
    // Initialize error tracking
    if (typeof window !== 'undefined') {
      window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
    }
  }

  public static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  public async trackError(error: Error, componentName?: string, additionalInfo?: Record<string, unknown>) {
    const errorDetails: ErrorDetails = {
      message: error.message,
      stack: error.stack,
      componentName,
      additionalInfo
    };

    // Always log to console in development
    if (!this.isProduction) {
      console.error('Error tracked:', errorDetails);
      return;
    }

    // Send to error tracking service in production
    if (this.endpoint) {
      try {
        await fetch(this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            ...errorDetails
          }),
        });
      } catch (e) {
        // Fallback to console if error tracking fails
        console.error('Failed to send error to tracking service:', e);
      }
    }
  }

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    this.trackError(
      event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
      'UnhandledRejection'
    );
  };

  public captureException(error: unknown, componentName?: string, additionalInfo?: Record<string, unknown>) {
    if (error instanceof Error) {
      this.trackError(error, componentName, additionalInfo);
    } else {
      this.trackError(new Error(String(error)), componentName, additionalInfo);
    }
  }

  public captureMessage(message: string, componentName?: string, additionalInfo?: Record<string, unknown>) {
    this.trackError(new Error(message), componentName, additionalInfo);
  }
}

export const errorTracker = ErrorTracker.getInstance();

// Helper hook for components
export function useErrorTracking(componentName: string) {
  return {
    trackError: (error: unknown, additionalInfo?: Record<string, unknown>) => {
      errorTracker.captureException(error, componentName, additionalInfo);
    },
    trackMessage: (message: string, additionalInfo?: Record<string, unknown>) => {
      errorTracker.captureMessage(message, componentName, additionalInfo);
    }
  };
}