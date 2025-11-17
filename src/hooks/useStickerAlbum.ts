import { useCallback, useEffect, useState } from 'react'

import { Sticker } from '../types/sticker'

const STORAGE_KEY = 'ai-sticker-studio-album'

const readAlbumFromStorage = (): Sticker[] => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY)
    if (!storedValue) {
      return []
    }

    const parsed: Sticker[] = JSON.parse(storedValue)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Unable to read sticker album from storage', error)
    return []
  }
}

const buildStickerId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `sticker-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export const useStickerAlbum = () => {
  const [stickers, setStickers] = useState<Sticker[]>(() => readAlbumFromStorage())

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers))
    } catch (error) {
      console.error('Unable to persist sticker album', error)
    }
  }, [stickers])

  const addSticker = useCallback((sticker: Omit<Sticker, 'id' | 'createdAt'>) => {
    setStickers((current) => [
      {
        id: buildStickerId(),
        createdAt: new Date().toISOString(),
        ...sticker,
      },
      ...current,
    ])
  }, [])

  const clearAlbum = useCallback(() => {
    setStickers([])
  }, [])

  return { stickers, addSticker, clearAlbum }
}
