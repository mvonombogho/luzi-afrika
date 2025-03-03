/**
 * Simple in-memory cache implementation for Sanity data
 * with cache busting based on time-to-live (TTL)
 */

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

class DataCache {
  private cache: Record<string, CacheEntry<any>> = {};
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes in milliseconds

  /**
   * Set cache entry with a specific time-to-live
   */
  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache[key] = {
      data,
      timestamp: Date.now() + ttl,
    };
  }

  /**
   * Get cache entry if it exists and is not expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache[key];

    if (!entry) {
      return null;
    }

    // Check if entry is expired
    if (Date.now() > entry.timestamp) {
      // Remove expired entry
      delete this.cache[key];
      return null;
    }

    return entry.data as T;
  }

  /**
   * Remove a specific cache entry
   */
  invalidate(key: string): void {
    delete this.cache[key];
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache = {};
  }

  /**
   * Get a cached value or generate it if not in cache
   */
  async getOrSet<T>(
    key: string,
    generator: () => Promise<T>,
    ttl: number = this.defaultTTL
  ): Promise<T> {
    // Try to get from cache first
    const cachedValue = this.get<T>(key);
    if (cachedValue !== null) {
      return cachedValue;
    }

    // Generate the value
    const generatedValue = await generator();
    
    // Store in cache
    this.set(key, generatedValue, ttl);
    
    return generatedValue;
  }
}

// Create singleton instance
export const dataCache = new DataCache();
