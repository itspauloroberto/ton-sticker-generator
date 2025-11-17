import { Sticker } from '../types/sticker'
import { Button } from './ui/Button'

interface StickerAlbumProps {
  stickers: Sticker[]
  onClear: () => void
}

const formatTimestamp = (timestamp: string) => {
  try {
    const date = new Date(timestamp)
    return date.toLocaleString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
    })
  } catch (error) {
    console.error('Unable to format timestamp', error)
    return timestamp
  }
}

export const StickerAlbum = ({ stickers, onClear }: StickerAlbumProps) => {
  const handleClear = () => {
    if (!stickers.length) {
      return
    }

    if (window.confirm('Clear all stickers from your album?')) {
      onClear()
    }
  }

  if (!stickers.length) {
    return (
      <div className="panel album-empty">
        <h2>No stickers yet</h2>
        <p>Generate a sticker and save it to your album.</p>
      </div>
    )
  }

  return (
    <div className="panel album">
      <div className="album-header">
        <div>
          <h2>Sticker Album</h2>
          <p>A collection of everything you have created this session.</p>
        </div>
        <Button type="button" variant="ghost" onClick={handleClear}>
          Clear album
        </Button>
      </div>

      <div className="album-grid">
        {stickers.map((sticker) => (
          <div className="album-card" key={sticker.id}>
            <div className="album-image">
              <img src={sticker.imageUrl} alt={sticker.prompt} loading="lazy" />
            </div>
            <p className="album-prompt" title={sticker.prompt}>
              {sticker.prompt}
            </p>
            <span className="album-date">{formatTimestamp(sticker.createdAt)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
