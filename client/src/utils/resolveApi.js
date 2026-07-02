// client/src/utils/resolveApi.js

let cachedAPI = null;

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 1000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);
    return response;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

export async function getAPIUrl() {
  if (cachedAPI) return cachedAPI;
  
  const defaultAPI = process.env.REACT_APP_API_URL || "http://localhost:4000";
  const ports = [4000, 4001, 4002, 4003, 4004];
  
  // Try default API first
  try {
    const res = await fetchWithTimeout(`${defaultAPI}/api`, { timeout: 800 });
    if (res.ok) {
      const data = await res.json();
      if (data.ok) {
        cachedAPI = defaultAPI;
        return cachedAPI;
      }
    }
  } catch (e) {
    // continue
  }
  
  // Probe other ports
  for (const port of ports) {
    const probeUrl = `http://localhost:${port}`;
    if (probeUrl === defaultAPI) continue;
    
    try {
      const res = await fetchWithTimeout(`${probeUrl}/api`, { timeout: 800 });
      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          console.log(`📡 Dynamically resolved backend API to port ${port}`);
          cachedAPI = probeUrl;
          return cachedAPI;
        }
      }
    } catch (e) {
      // continue
    }
  }
  
  // Fallback to default
  return defaultAPI;
}
