import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800 h-[70px]">
      <div className="container flex items-center justify-end h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <div className="flex gap-3 items-center">
          <div onClick={() => signOut()} title="Logout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
          </div>
          <Link href="/">Home</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
