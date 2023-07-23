"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const Header = () => {
  const [show, setShow] = useState<boolean>(false);
  const { data: session, status } = useSession();

  return (
    <header className="z-40 py-4 px-[20px]  bg-white shadow-bottom dark:bg-gray-800 h-[70px]">
      <div className="container flex items-center justify-end h-full ">
        <div className="flex gap-3 items-center relative">
          <div
            className="cursor-pointer"
            onClick={() => setShow((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </div>
          {show && (
            <div className=" absolute top-[50px]  w-[200px] rounded-[18px] right-0 overflow-hidden border-gray-200 shadow-sm">
              <div className="bg-orange-50 px-3 py-4">
                <h4 className="font-bold">{session?.user?.name}</h4>
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                  <span>{session?.user?.email}</span>
                </div>
              </div>
              <div className="bg-white px-3 py-3">
                <div
                  className="flex gap-2 cursor-pointer"
                  onClick={() => signOut()}
                  title="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span>Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
