'use client';
import React from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { FaWallet } from "react-icons/fa";
const loginSocials = [
  {
    name: "Continue with Facebook",
    providerId: "facebook",
    icon: facebookSvg,
  },
  {
    name: "Continue with GitHub",
    providerId: "github",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    providerId: "google",
    icon: googleSvg,
  },
];

const PageLogin = () => {
  const { data: session } = useSession();
  const { sdk, connected, connecting, account } = useSDK();
  
  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  const connectMetamask = async () => {
    console.log("connectMetamask");
    
      try {
        await sdk?.connect();
        console.log(connected);
      } catch (err) {
        console.warn(`No accounts found`, err);
      }

  }

  const disconnectMetamask = async () => {
    if(sdk) {
      await sdk.terminate();
    }
  }
  if (session) {
    // Redirect to home if session exists
    if (typeof window !== "undefined") window.location.href = "/";
    return null;
  }
  
  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl md:text-5xl font-semibold justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <button
                key={index}
                onClick={() => signIn(item.providerId)}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                  sizes="40px"
                />
                <h3 className="flex-grow text-center text-sm font-medium sm:text-sm">
                  {item.name}
                </h3>
              </button>
            ))}
            {/* a responsive stright devider line */}
            <div className="flex items-center justify-center">
              <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-700"></div>
              <div className="mx-3 text-neutral-300 dark:text-neutral-600">Or</div>
              <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-700"></div>
            </div>
            {/* metamask wallet login */}
            {
              connected ? (
                <button
                  onClick={disconnectMetamask}
                  className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                >
                  <FaWallet className="flex-shrink-0" size="20" />
                  <h3 className="flex-grow text-center text-sm font-medium sm:text-sm">
                    Disconnect from MetaMask
                  </h3>
                </button>
              ) : (
                <button
                  onClick={connectMetamask}
                  className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                >
                  <FaWallet className="flex-shrink-0" size="20" />
                  <h3 className="flex-grow text-center text-sm font-medium sm:text-sm">
                    {connecting ? "Connecting to MetaMask..." : "Connect to MetaMask"}
                  </h3>
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
