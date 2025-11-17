const FALLBACK_MANIFEST_URL = 'https://ton-sticker-generator.vercel.app/tonconnect-manifest.json?v=2'

export const TONCONNECT_MANIFEST_URL =
  typeof window !== 'undefined'
    ? `${window.location.origin}/tonconnect-manifest.json?v=2`
    : FALLBACK_MANIFEST_URL
