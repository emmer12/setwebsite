import Link from "next/link";
import React from "react";
import { Logo } from "../icons";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathName = usePathname();

  return (
    <aside
      id="desktopSidebar"
      className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block"
    >
      <div className="text-gray-500 dark:text-gray-400">
        <div className="ml-6 py-6">
          <Link
            href="/"
            className="text-lg font-bold text-gray-800 dark:text-gray-200"
          >
            <Logo />
          </Link>
        </div>
        <ul>
          <li className="relative px-6 py-3">
            <Link
              className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100 text-gray-800 %`}
              href="/dashboard"
            >
              {pathName == "/dashboard" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-[#eeab6f] rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11 2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6"></path>
              </svg>
              <span className="ml-4">Dashboard</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            <a
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 "
              href="/dashboard/backdrops"
            >
              {pathName == "/dashboard/backdrops" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-[#eeab6f] rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <span className="ml-4">Backdrops</span>
            </a>
          </li>

          <li className="relative px-6 py-3">
            <Link
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 "
              href="/dashboard/users"
            >
              {pathName == "/dashboard/users" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-[#eeab6f] rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <svg
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <span className="ml-4">Users</span>
            </Link>
          </li>

          {/* <li className="relative px-6 py-3">
            <button
              className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 "
              aria-haspopup="true"
            >
              <span className="inline-flex items-center">
                <svg
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm0 8a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm12 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6z"></path>
                </svg>
                <span className="ml-4">Pages</span>
              </span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-4 h-4 "
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li> */}
        </ul>
        <div className="px-6 my-6">
          {/* <button
            className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-[#eeab6f] border border-transparent active:bg-[#eeab6f] hover:bg-purple-700 focus:ring focus:ring-purple-300"
            type="button"
          >
            Create account
            <span className="ml-2" aria-hidden="true">
              +
            </span>
          </button> */}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
