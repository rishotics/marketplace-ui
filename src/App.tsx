import React from 'react';
import './App.css';
import Prompt from './prompt'; // <-- Add this line
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { BananaWallet } from '@rize-labs/banana-rainbowkit-plugin'
import { polygonMumbai, optimismGoerli, goerli, gnosis, gnosisChiado  } from "@wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { configureChains, createClient, WagmiConfig } from "wagmi";

function App() {

  const { chains, provider } = configureChains( 
    // currently on these three chains are supported by BananaWallet
    [polygonMumbai, optimismGoerli, goerli, gnosis, gnosisChiado],
    [publicProvider()]
  );

  const connectors = connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [
        // BananaWallet({ chains, connect: { networkId: 80001 } }),
        // metaMaskWallet({ chains, shimDisconnect: true }),
        // rainbowWallet({ chains }),
        // walletConnectWallet({ chains }),
        injectedWallet({ chains, shimDisconnect: true }),
      ],
    },
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Prompt />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
