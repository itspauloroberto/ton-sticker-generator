import { FormEvent, useState } from 'react'

import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { TextArea } from './ui/TextArea'

interface StickerGeneratorProps {
  onStickerGenerated: (payload: { prompt: string; imageUrl: string }) => void
}

const STYLE_OPTIONS = ['Cute', 'Anime', 'Minimal', 'Meme'] as const

type StickerStyle = (typeof STYLE_OPTIONS)[number]

export const StickerGenerator = ({ onStickerGenerated }: StickerGeneratorProps) => {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState<StickerStyle>(STYLE_OPTIONS[0])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!prompt.trim()) {
      setError('Please describe the sticker you want to generate.')
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate-sticker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim(), style }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate sticker. Please try again.')
      }

      const data: { imageUrl?: string } = await response.json()

      if (!data.imageUrl) {
        throw new Error('The server response did not include an image.')
      }

      onStickerGenerated({ prompt: prompt.trim(), imageUrl: data.imageUrl })
    } catch (generationError) {
      console.error(generationError)
      setError(
        generationError instanceof Error
          ? generationError.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="panel generator" onSubmit={handleSubmit}>
      <div className="panel-title">
        <div>
          <h2>Create Sticker</h2>
          <p>Describe your idea and let the AI craft a Telegram-ready sticker.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <label className="form-label" htmlFor="sticker-prompt">
        Prompt
      </label>
      <TextArea
        id="sticker-prompt"
        placeholder="Describe your sticker (character, style, expression, background…)"
        rows={5}
        value={prompt}
        onChange={(event) => {
          if (error) {
            setError(null)
          }
          setPrompt(event.target.value)
        }}
      />

      <div className="style-section">
        <span className="form-label">Style</span>
        <div className="style-options">
          {STYLE_OPTIONS.map((option) => (
            <label key={option} className="style-option">
              <Input
                type="radio"
                name="sticker-style"
                value={option}
                checked={style === option}
                onChange={() => setStyle(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={isLoading} fullWidth>
        {isLoading ? 'Generating…' : 'Generate sticker'}
      </Button>
    </form>
  )
}
