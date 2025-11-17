export {}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void
        themeParams?: Record<string, string>
        showAlert?: (message: string) => void
        showPopup?: (params: unknown) => void
        onEvent?: (event: string, callback: () => void) => void
        offEvent?: (event: string, callback: () => void) => void
      }
    }
  }
}
