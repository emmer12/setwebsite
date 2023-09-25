"use client";
import Button from "@/components/Button";
import SafModal from "@/components/modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";
import { getSubscriptions } from "@/lib/api/subscriptions.api";
import { motion, AnimatePresence } from "framer-motion";

import constants from "@/lib/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SetAndForget from "@/components/saf/SetAndForget";
import { BarIcon, Loading, TimesIcon } from "@/components/icons";

const sideLeft = {
  hidden: { x: "-100%" },
  visible: {
    x: "0%",
    transition: {
      delayChildren: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    x: "-100%",
    transition: {
      ease: "easeOut",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const pathName = usePathname();
  const { data, error, isLoading } = useSWR(
    "/api/subscription",
    getSubscriptions
  );

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loading />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const isVendor = session?.user?.role == constants.roles.VENDOR;

  return (
    <div>
      <div className="em__banner items-center ">
        <div className="container">
          <h2 className="text-[#263f61] text-2xl sm:text-3xl text-center">
            Welcome back! {session?.user?.name}
          </h2>
        </div>
      </div>

      <div className="bg-white">
        <div className="container relative">
          <div
            onClick={() => setMenu((prev) => !prev)}
            className="sm:hidden inline-flex items-center bg-[#f9fafb] rounded-lg px-[10px] cursor-pointer"
          >
            <span className="my-3 pr-2 cursor-pointer">
              {menu ? "Close" : "Menu"}
            </span>
            {menu ? <TimesIcon /> : <BarIcon />}
          </div>
          <div className="py-10 ">
            <div className="flex gap-5">
              <div className="member-side hidden sm:block ">
                <ul>
                  <li className={pathName == "/account" ? "active" : ""}>
                    <Link className="block" href="/account">
                      {" "}
                      Profile
                    </Link>
                  </li>

                  <li
                    className={
                      [
                        "/account/my-requests/create",
                        "/account/my-requests",
                      ].includes(pathName as string)
                        ? "active"
                        : ""
                    }
                  >
                    <Link className="block" href="/account/my-requests">
                      {" "}
                      My Requests
                    </Link>
                  </li>
                  <li onClick={() => setOpen(true)}>Set and Forget</li>
                  {isVendor && (
                    <li
                      className={
                        pathName == "/vendor/dashboard" ? "active" : ""
                      }
                    >
                      <Link className="block" href="/vendor/dashboard">
                        Vendor Dashboard
                      </Link>
                    </li>
                  )}

                  <li className={pathName == "/account/ai/dee" ? "active" : ""}>
                    <Link className="block" href="/account/ai/dee">
                      Design with Dee
                    </Link>
                  </li>

                  <li className={pathName == "/account/chats" ? "active" : ""}>
                    <Link className="block" href="/account/chats">
                      Messages
                    </Link>
                  </li>
                  <li>Guide</li>
                </ul>
              </div>
              <AnimatePresence>
                {menu && (
                  <motion.div
                    variants={sideLeft}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="member-side-mobile absolute block sm:hidden "
                  >
                    <ul>
                      <li className={pathName == "/account" ? "active" : ""}>
                        <Link className="block" href="/account">
                          {" "}
                          Profile
                        </Link>
                      </li>

                      <li
                        className={
                          [
                            "/account/my-requests/create",
                            "/account/my-requests",
                          ].includes(pathName as string)
                            ? "active"
                            : ""
                        }
                      >
                        <Link className="block" href="/account/my-requests">
                          {" "}
                          My Requests
                        </Link>
                      </li>
                      <li onClick={() => setOpen(true)}>Set and Forget</li>
                      {isVendor && (
                        <li
                          className={
                            pathName == "/vendor/dashboard" ? "active" : ""
                          }
                        >
                          <Link className="block" href="/vendor/dashboard">
                            Vendor Dashboard
                          </Link>
                        </li>
                      )}

                      <li
                        className={
                          pathName == "/account/ai/dee" ? "active" : ""
                        }
                      >
                        <Link className="block" href="/account/ai/dee">
                          Design with Dee
                        </Link>
                      </li>

                      <li
                        className={pathName == "/account/chats" ? "active" : ""}
                      >
                        <Link className="block" href="/account/chats">
                          Messages
                        </Link>
                      </li>
                      <li>Guide</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="body flex-1">{children}</div>
            </div>
          </div>
        </div>
      </div>

      <SafModal open={open} close={() => setOpen(false)}>
        <SetAndForget
          close={() => setOpen(false)}
          points={session?.user?.saf_points}
        />
      </SafModal>
    </div>
  );
}
