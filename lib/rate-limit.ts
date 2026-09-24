/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Suitable for single-instance deployments (e.g., Vercel serverless).
 * For multi-instance deployments, consider using Redis (Upstash) instead.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;

  lastCleanup = now;
  const cutoff = now - windowMs;

  for (const [key, entry] of store.entries()) {
    entry.timestamps = entry.timestamps.filter((ts) => ts > cutoff);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

interface RateLimitOptions {
  /** Maximum number of requests allowed in the window. Default: 5 */
  maxRequests?: number;
  /** Time window in milliseconds. Default: 60_000 (1 minute) */
  windowMs?: number;
}

interface RateLimitResult {
  /** Whether the request is allowed */
  success: boolean;
  /** Number of remaining requests in the current window */
  remaining: number;
  /** Unix timestamp (ms) when the rate limit resets */
  resetAt: number;
}

/**
 * Check if a request from the given key (typically an IP address) is allowed.
 */
export function rateLimit(
  key: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const { maxRequests = 5, windowMs = 60_000 } = options;
  const now = Date.now();
  const cutoff = now - windowMs;

  // Lazy cleanup
  cleanup(windowMs);

  // Get or create entry
  let entry = store.get(key);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(key, entry);
  }

  // Remove timestamps outside the current window
  entry.timestamps = entry.timestamps.filter((ts) => ts > cutoff);

  // Calculate reset time (oldest timestamp in window + window duration)
  const resetAt =
    entry.timestamps.length > 0
      ? entry.timestamps[0] + windowMs
      : now + windowMs;

  // Check limit
  if (entry.timestamps.length >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetAt,
    };
  }

  // Record this request
  entry.timestamps.push(now);

  return {
    success: true,
    remaining: maxRequests - entry.timestamps.length,
    resetAt,
  };
}
