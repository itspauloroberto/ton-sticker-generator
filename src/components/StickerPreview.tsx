import { Button } from './ui/Button'

interface StickerPreviewProps {
  imageUrl: string
  prompt: string
  onSaveToAlbum: () => void
  onMintOnTon: () => void
}

export const StickerPreview = ({ imageUrl, prompt, onSaveToAlbum, onMintOnTon }: StickerPreviewProps) => {
  const hasSticker = Boolean(imageUrl)

  const handleDownload = () => {
    if (!hasSticker) {
      return
    }

    const anchor = document.createElement('a')
    anchor.href = imageUrl
    anchor.download = 'ai-sticker.png'
    anchor.rel = 'noopener'
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }

  const handleSave = () => {
    if (!hasSticker) {
      return
    }

    onSaveToAlbum()
  }

  const handleMint = () => {
    if (!hasSticker) {
      return
    }

    onMintOnTon()
  }

  return (
    <div className="panel preview">
      <div className="panel-title">
        <div>
          <h2>Sticker Preview</h2>
          <p>Download, save to your album or simulate minting on TON.</p>
        </div>
      </div>

      <div className="preview-frame">
        {hasSticker ? (
          <img src={imageUrl} alt={prompt || 'Generated sticker preview'} />
        ) : (
          <div className="preview-placeholder">Your generated sticker will appear here.</div>
        )}
      </div>

      {hasSticker && (
        <p className="preview-prompt" title={prompt}>
          {prompt}
        </p>
      )}

      <div className="preview-actions">
        <Button type="button" variant="secondary" onClick={handleDownload} disabled={!hasSticker}>
          Download PNG
        </Button>
        <Button type="button" onClick={handleSave} disabled={!hasSticker}>
          Save to album
        </Button>
        <Button type="button" variant="ghost" onClick={handleMint} disabled={!hasSticker}>
          Mint on TON
        </Button>
      </div>
    </div>
  )
}
