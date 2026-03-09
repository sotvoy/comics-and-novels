// Simple in-memory rate limiter
// For production, use Redis or similar distributed store

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Clean up every minute

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const defaultConfig: RateLimitConfig = {
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
};

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

/**
 * Check if request is within rate limit
 * @param identifier - Unique identifier (IP, user ID, etc.)
 * @param config - Optional rate limit configuration
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = defaultConfig
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    // New rate limit window
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    };
  }

  if (entry.count >= config.maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;
  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Get rate limit info without incrementing
 */
export function getRateLimitInfo(identifier: string): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    return {
      success: true,
      remaining: defaultConfig.maxRequests,
      resetTime: now + defaultConfig.windowMs,
    };
  }

  return {
    success: entry.count < defaultConfig.maxRequests,
    remaining: Math.max(0, defaultConfig.maxRequests - entry.count),
    resetTime: entry.resetTime,
  };
}

/**
 * Reset rate limit for an identifier
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}
