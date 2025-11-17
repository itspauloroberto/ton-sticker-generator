const FALLBACK_MANIFEST_URL = 'https://ton-sticker-generator.vercel.app/tonconnect-manifest.json'

export const TONCONNECT_MANIFEST_URL =
  typeof window !== 'undefined'
    ? `${window.location.origin}/tonconnect-manifest.json`
    : FALLBACK_MANIFEST_URL
