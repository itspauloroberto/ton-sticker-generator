import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'

import { Button } from './ui/Button'

const shortenAddress = (address: string) => {
  if (address.length <= 10) {
    return address
  }

  return `${address.slice(0, 4)}…${address.slice(-4)}`
}

export const WalletConnectButton = () => {
  const [tonConnectUI] = useTonConnectUI()
  const wallet = useTonWallet()

  if (!wallet) {
    return (
      <Button type="button" variant="secondary" onClick={() => tonConnectUI.openModal()}>
        Connect Wallet
      </Button>
    )
  }

  const { address } = wallet.account

  return (
    <div className="wallet-connect">
      <span className="wallet-address" title={address}>
        {shortenAddress(address)}
      </span>
      <Button type="button" variant="ghost" onClick={() => tonConnectUI.disconnect()}>
        Disconnect
      </Button>
    </div>
  )
}
