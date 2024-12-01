"use client"
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";

//format the address
export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

//connect to metamask function
export const ConnectToMetaMask = () => {
    const { sdk, connected, connecting, account } = useSDK();
    
};