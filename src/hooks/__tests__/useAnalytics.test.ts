import { renderHook, act } from '@testing-library/react';
import { useAnalytics, useComponentAnalytics, analytics } from '../useAnalytics';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/test-path',
  useSearchParams: () => new URLSearchParams('test=value'),
}));

// Spy on analytics methods
jest.spyOn(analytics, 'trackEvent');
jest.spyOn(analytics, 'trackPageView');

describe('useAnalytics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('tracks page view on mount', () => {
    renderHook(() => useAnalytics());
    expect(analytics.trackPageView).toHaveBeenCalledWith('/test-path');
  });

  it('tracks search params changes', () => {
    renderHook(() => useAnalytics());
    expect(analytics.trackEvent).toHaveBeenCalledWith({
      name: 'search_params_change',
      properties: expect.objectContaining({
        path: '/test-path',
        params: expect.any(Object)
      })
    });
  });

  it('provides trackEvent function', () => {
    const { result } = renderHook(() => useAnalytics());
    
    act(() => {
      result.current.trackEvent('test_event', { test: 'value' });
    });
    
    expect(analytics.trackEvent).toHaveBeenCalledWith({
      name: 'test_event',
      properties: { test: 'value' }
    });
  });
});

describe('useComponentAnalytics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  const componentName = 'TestComponent';
  
  it('provides component-specific tracking functions', () => {
    const { result } = renderHook(() => useComponentAnalytics(componentName));
    
    expect(result.current.trackMount).toBeDefined();
    expect(result.current.trackUnmount).toBeDefined();
    expect(result.current.trackInteraction).toBeDefined();
  });
  
  it('tracks component mount', () => {
    const { result } = renderHook(() => useComponentAnalytics(componentName));
    
    act(() => {
      result.current.trackMount();
    });
    
    expect(analytics.trackEvent).toHaveBeenCalledWith({
      name: 'component_mount',
      properties: { component: componentName }
    });
  });
  
  it('tracks component unmount', () => {
    const { result } = renderHook(() => useComponentAnalytics(componentName));
    
    act(() => {
      result.current.trackUnmount();
    });
    
    expect(analytics.trackEvent).toHaveBeenCalledWith({
      name: 'component_unmount',
      properties: { component: componentName }
    });
  });
  
  it('tracks component interactions', () => {
    const { result } = renderHook(() => useComponentAnalytics(componentName));
    const action = 'button_click';
    const properties = { buttonId: 'submit' };
    
    act(() => {
      result.current.trackInteraction(action, properties);
    });
    
    expect(analytics.trackEvent).toHaveBeenCalledWith({
      name: 'component_interaction',
      properties: {
        component: componentName,
        action,
        ...properties
      }
    });
  });
});