import React, { FC } from "react";
import Link from "next/link";
import { Silkscreen } from "next/font/google";
export interface WebLogoProps { }

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ['400', '700'],
});
const WebLogo: FC<WebLogoProps> = () => {
  return (
    <>
    <Link href="/">
          <div className="lg:flex-1 flex items-center">
            {/* <Logo className="flex-shrink-0" /> */}
            <div className={`flex justify-center items-center flex-shrink-0 ${silkscreen.className}`}>
              <svg
                className="w-auto h-16"
                viewBox="0 0 600 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="10"
                  y="50"
                  fontSize="48"
                  fontWeight="bold"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="text-black animate-text-draw tracking-tightest"

                >
                  Event Hub
                </text>
              </svg>
            </div>
          </div>
        </Link>
    </>
  );
};

export default WebLogo;