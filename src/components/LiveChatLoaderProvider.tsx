import React, { useState } from 'react'
import * as Providers from '../providers'
import { State, Provider } from '../types'
import { LiveChatLoaderContext } from '../context'

interface LiveChatLoaderProps {
  provider: Provider
  children: React.ReactNode
  idlePeriod?: number
  providerKey: string
  appID?: string
  baseUrl?: string
  locale?: string
  beforeInit?: () => void
  onReady?: () => void
}

export const LiveChatLoaderProvider = ({
  provider,
  children,
  idlePeriod = 5000,
  baseUrl,
  ...props
}: LiveChatLoaderProps): JSX.Element | null => {
  const [state, setState] = useState<State>('initial')
  const value = {
    provider,
    idlePeriod,
    state,
    setState,
    baseUrl,
    ...props
  }

  const chatProvider = Providers[provider]

  if (!chatProvider) {
    //eslint-disable-next-line no-console
    console.error(
      `Unknown provider given to react-live-chat-loader: ${provider}`
    )
    return null
  }

  return (
    <LiveChatLoaderContext.Provider value={value}>
      <link
        href={baseUrl || chatProvider.domain}
        rel="preconnect"
        crossOrigin=""
      />
      {children}
    </LiveChatLoaderContext.Provider>
  )
}

export default LiveChatLoaderProvider
