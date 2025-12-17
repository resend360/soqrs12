// API Error Handler Utility

export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export function handleAPIError(error: any) {
  console.error('API Error:', error)

  if (error instanceof APIError) {
    return {
      error: error.message,
      details: error.details,
      statusCode: error.statusCode,
    }
  }

  // Supabase errors
  if (error.code) {
    return {
      error: 'Database error',
      message: error.message,
      code: error.code,
      statusCode: 500,
    }
  }

  // Generic errors
  return {
    error: 'Internal server error',
    message: error.message || 'Bir hata oluştu',
    statusCode: 500,
  }
}

// Debug wrapper for API calls
export async function withDebug<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = Date.now()
  
  try {
    console.log(`[API] ${name} - Started`)
    const result = await fn()
    const duration = Date.now() - start
    console.log(`[API] ${name} - Success (${duration}ms)`)
    return result
  } catch (error) {
    const duration = Date.now() - start
    console.error(`[API] ${name} - Error (${duration}ms)`, error)
    throw error
  }
}

// Feature flag checker
export function isFeatureEnabled(feature: string): boolean {
  const features: Record<string, boolean> = {
    'qr-generation': true,
    'qr-scanning': true,
    'park-spots': true,
    'park-notes': false, // Not implemented yet
    'social-feed': true,
    'marketplace': true,
    'carpooling': true,
    'vip-qr': false, // Stripe not configured
    'notifications': false, // OneSignal not configured
    'messages': false, // Not implemented yet
    'video-upload': false, // Not in MVP
    'real-time-tracking': false, // Not in MVP
  }

  return features[feature] ?? false
}

// Check if feature is enabled, throw error if not
export function requireFeature(feature: string) {
  if (!isFeatureEnabled(feature)) {
    throw new APIError(
      501,
      `Feature "${feature}" is not implemented yet`,
      { feature, available: false }
    )
  }
}
