import { useEffect } from 'react'
import WebApp from '@twa-dev/sdk'

const setCssVar = (variable: string, value?: string) => {
  if (!value) {
    return
  }

  document.documentElement.style.setProperty(variable, value)
}

export const useTelegramTheme = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const applyTheme = () => {
      const themeParams = WebApp?.themeParams ?? {}
      setCssVar('--tg-bg-color', themeParams.bg_color)
      setCssVar('--tg-text-color', themeParams.text_color)
      setCssVar('--tg-secondary-bg-color', themeParams.secondary_bg_color)
      setCssVar('--tg-hint-color', themeParams.hint_color)
      setCssVar('--tg-accent-color', themeParams.button_color)
    }

    applyTheme()

    const unsubscribe = () => {
      try {
        WebApp?.offEvent?.('themeChanged', applyTheme)
      } catch (error) {
        console.error('Unable to detach Telegram theme listener', error)
      }
    }

    try {
      WebApp?.onEvent?.('themeChanged', applyTheme)
    } catch (error) {
      console.error('Unable to attach Telegram theme listener', error)
    }

    return unsubscribe
  }, [])
}
