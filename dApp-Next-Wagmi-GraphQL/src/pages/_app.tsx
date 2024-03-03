import { app } from 'appConfig'
import HeadGlobal from 'components/HeadGlobal'
import { ThemeProvider, useTheme } from 'next-themes'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import 'styles/style.scss'
// Web3Wrapper deps:
import { RainbowKitProvider, connectorsForWallets, darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import {
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { QueryClient, QueryClientProvider } from 'react-query'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1 * 60 * 1000, // Cache for 1  minutes
      staleTime: 30 * 1000, // Refetch after 0.5 minute if data is stale
      refetchInterval: 5 * 60 * 1000, // Refetch data automatically every 5 minutes
    },
  },
})

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <QueryClientProvider client={queryClient}>
        <HeadGlobal />
        <Web3Wrapper>
          <Component key={router.asPath} {...pageProps} />
        </Web3Wrapper>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
export default App

// Web3 Configs
const { chains, provider } = configureChains(
  [sepolia],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID !== '' && process.env.NEXT_PUBLIC_INFURA_ID }),
    jsonRpcProvider({
      rpc: chain => {
        return {
          http: `${chain.rpcUrls.default}`,
        }
      },
    }),
    publicProvider(),
  ]
)

const otherWallets = [
  braveWallet({ chains }),
  ledgerWallet({ chains }),
  coinbaseWallet({ chains, appName: app.name }),
  rainbowWallet({ chains }),
]

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [injectedWallet({ chains }), metaMaskWallet({ chains }), walletConnectWallet({ chains })],
  },
  {
    groupName: 'Other Wallets',
    wallets: otherWallets,
  },
])

const wagmiClient = createClient({ autoConnect: true, connectors, provider })

// Web3Wrapper
export function Web3Wrapper({ children }) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        appInfo={{
          appName: app.name,
          learnMoreUrl: app.url,
        }}
        chains={chains}
        initialChain={0} // Optional, initialChain={1}, initialChain={chain.mainnet}, initialChain={gnosisChain}
        showRecentTransactions={true}
        theme={resolvedTheme === 'dark' ? darkTheme() : lightTheme()}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
