'use client';
import React from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
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

  const connectWeb3AndSignIn = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask or a compatible Web3 wallet.");
        return;
      }

      // Request account access
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[] | undefined;

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const address = accounts[0];

      // Generate a unique message for signing
      const message = `Log in to our app at ${new Date().toISOString()}`;
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, address],
      });

      // Use NextAuth to handle Web3 login
      const response = await signIn("credentials", {
        address,
        signature,
        message,
        redirect: false,
      });

      if (!response?.ok) {
        console.error("Web3 login failed:", response?.error);
      }
    } catch (err) {
      console.error("Error during Web3 login:", err);
    }
  };

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
            {/* Divider */}
            <div className="flex items-center justify-center">
              <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-700"></div>
              <div className="mx-3 text-neutral-300 dark:text-neutral-600">Or</div>
              <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-700"></div>
            </div>
            {/* Web3 Login */}
            <button
              onClick={connectWeb3AndSignIn}
              className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
            >
              <FaWallet className="flex-shrink-0" size="20" />
              <h3 className="flex-grow text-center text-sm font-medium sm:text-sm">
                Login with Web3
              </h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
