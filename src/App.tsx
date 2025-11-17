import { useMemo, useState } from 'react'
import WebApp from '@twa-dev/sdk'

import { StickerAlbum } from './components/StickerAlbum'
import { StickerGenerator } from './components/StickerGenerator'
import { StickerPreview } from './components/StickerPreview'
import { WalletConnectButton } from './components/WalletConnectButton'
import { useStickerAlbum } from './hooks/useStickerAlbum'
import { useTelegramTheme } from './hooks/useTelegramTheme'
import './App.css'

type AppTab = 'create' | 'album'

function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('create')
  const [lastGeneratedSticker, setLastGeneratedSticker] = useState<{ prompt: string; imageUrl: string } | null>(null)
  const { stickers, addSticker, clearAlbum } = useStickerAlbum()

  useTelegramTheme()

  const notify = (message: string) => {
    if (WebApp?.showAlert) {
      WebApp.showAlert(message)
      return
    }

    window.alert(message)
  }

  const handleSaveToAlbum = () => {
    if (!lastGeneratedSticker?.imageUrl) {
      return
    }

    addSticker({
      prompt: lastGeneratedSticker.prompt,
      imageUrl: lastGeneratedSticker.imageUrl,
    })
    notify('Sticker saved to your album!')
  }

  const handleMintSimulation = () => {
    // TODO: Replace this simulated mint with the actual TON transaction logic when ready.
    notify('Mint on TON simulated (no real transaction yet).')
  }

  const tabButtons: { id: AppTab; label: string }[] = useMemo(
    () => [
      { id: 'create', label: 'Create' },
      { id: 'album', label: 'Album' },
    ],
    [],
  )

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <div>
            <p className="eyebrow">AI Sticker Studio</p>
            <h1>Generate Telegram-ready stickers with AI</h1>
            <p className="tagline">Craft ideas, preview results, and keep your favorites close.</p>
          </div>
          <WalletConnectButton />
        </header>

        <div className="tab-bar">
          {tabButtons.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-button ${activeTab === tab.id ? 'tab-button-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'create' ? (
          <div className="create-layout">
            <StickerGenerator onStickerGenerated={setLastGeneratedSticker} />
            <StickerPreview
              prompt={lastGeneratedSticker?.prompt ?? ''}
              imageUrl={lastGeneratedSticker?.imageUrl ?? ''}
              onSaveToAlbum={handleSaveToAlbum}
              onMintOnTon={handleMintSimulation}
            />
          </div>
        ) : (
          <StickerAlbum stickers={stickers} onClear={clearAlbum} />
        )}
      </div>
    </div>
  )
}

export default App
