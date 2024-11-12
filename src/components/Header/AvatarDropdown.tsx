"use client";

import { Popover, Transition } from "@/app/headlessui";
import { Fragment } from "react";
import { useSession, signOut } from "next-auth/react";
import Avatar from "@/shared/Avatar/Avatar";
import SwitchDarkMode2 from "@/shared/SwitchDarkMode/SwitchDarkMode2";
import Link from "next/link";

export default function AvatarDropdown() {
  const { data: session } = useSession();

  return (
    <div className="AvatarDropdown">
      {session ? (
        <Popover className="relative">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
              >
                <img
                  src={session.user?.image || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-6 h-6 rounded-full"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3.5 -right-10 sm:right-0 sm:px-0">
                  <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
                      <div className="flex items-center space-x-3">
                        <Avatar
                          imgUrl={session.user?.image || "/default-avatar.png"}
                          sizeClass="w-12 h-12"
                        />
                        <div className="flex-grow">
                          <h4 className="font-semibold">
                            {session.user?.name || "Guest"}
                          </h4>
                          <p className="text-xs mt-0.5">
                            {session.user?.email || "No email"}
                          </p>
                        </div>
                      </div>

                      {/* Profile Links */}
                      <Link href={"/account"} onClick={() => close()}>
                        {/* "My Account" link */}
                      </Link>
                      <Link href={"/checkout"} onClick={() => close()}>
                        {/* "My Order" link */}
                      </Link>
                      <Link href={"/account-savelists"} onClick={() => close()}>
                        {/* "Wishlist" link */}
                      </Link>

                      {/* Dark Mode Toggle */}
                      <div className="flex items-center justify-between p-2 -m-3">
                        <p className="text-sm font-medium">Dark theme</p>
                        <SwitchDarkMode2 />
                      </div>

                      {/* Sign Out */}
                      <button
                        onClick={() => {
                          signOut();
                          close();
                        }}
                        className="w-full text-left p-2 -m-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      ) : (
        <Link href="/login">
          <button className="
            hidden
            lg:flex
            w-10
            h-10
            sm:w-12
            sm:h-12
            rounded-full
            text-slate-700
            dark:text-slate-300
            hover:bg-slate-100
            dark:hover:bg-slate-800
            focus:outline-none
            items-center
            justify-center
          ">
            Login
          </button>
        </Link>
      )}
    </div>
  );
}
