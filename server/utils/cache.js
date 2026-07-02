// server/utils/cache.js
const store = new Map();

/**
 * Get cached value if not expired
 */
export function cacheGet(key) {
  const hit = store.get(key);
  if (!hit) return null;
  const { value, exp } = hit;
  if (Date.now() > exp) {
    store.delete(key);
    return null;
  }
  return value;
}

/**
 * Set cache with ttl (ms)
 */
export function cacheSet(key, value, ttlMs = 30000) {
  store.set(key, { value, exp: Date.now() + ttlMs });
}
