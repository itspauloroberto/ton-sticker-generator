import { ReactNode } from 'react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

import { TONCONNECT_MANIFEST_URL } from '../config/tonconnect'

interface TonConnectProviderProps {
  children: ReactNode
}

export const TonConnectProvider = ({ children }: TonConnectProviderProps) => {
  return (
    <TonConnectUIProvider manifestUrl={TONCONNECT_MANIFEST_URL}>
      {children}
    </TonConnectUIProvider>
  )
}
