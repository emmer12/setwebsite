"use client";

import SideBar from "@/components/dashboard/SideBar";
import { BarIcon, TimesIcon } from "@/components/icons";
import { getSubscriptions } from "@/lib/api/subscriptions.api";
import { getVendorById } from "@/lib/prisma/vendors";
import constants from "@/lib/utils/constants";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";

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
  const pathName = usePathname();
  const [menu, setMenu] = useState<boolean>(false);

  const { data, error, isLoading } = useSWR(
    "/api/subscription",
    getSubscriptions
  );

  const vendorQuoteSub =
    data?.subscriptions.filter(
      (sub: any) => sub.service == constants.subscription_type.VENDOR_PRO
    ) || [];

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div>
      <div className="bg-white py-4">
        <div className="container relative ">
          <div
            onClick={() => setMenu((prev) => !prev)}
            className="sm:hidden  inline-flex items-center bg-[#f9fafb] rounded-lg px-[10px] cursor-pointer"
          >
            <span className="my-3 pr-2 cursor-pointer">
              {menu ? "Close" : "Menu"}
            </span>
            {menu ? <TimesIcon /> : <BarIcon />}
          </div>

          <div className="py-12 ">
            <div className="flex gap-5">
              <div className="member-side hidden sm:block">
                <ul>
                  <li
                    className={pathName == "/vendor/dashboard" ? "active" : ""}
                  >
                    <Link href={"/vendor/dashboard"} className="block">
                      Vendor Profile
                    </Link>
                  </li>

                  <li
                    className={
                      pathName == "/vendor/dashboard/requests" ? "active" : ""
                    }
                  >
                    <Link href={"/vendor/dashboard/requests"} className="block">
                      Quote Requests
                    </Link>
                  </li>
                  <li className={pathName == "/account/chats" ? "active" : ""}>
                    <Link href={"/account/chats"} className="block">
                      Messages
                    </Link>
                  </li>
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
                      <li
                        className={
                          pathName == "/vendor/dashboard" ? "active" : ""
                        }
                      >
                        <Link href={"/vendor/dashboard"} className="block">
                          Vendor Profile
                        </Link>
                      </li>

                      <li
                        className={
                          pathName == "/vendor/dashboard/requests"
                            ? "active"
                            : ""
                        }
                      >
                        <Link
                          href={"/vendor/dashboard/requests"}
                          className="block"
                        >
                          Quote Requests
                        </Link>
                      </li>
                      <li
                        className={pathName == "/account/chats" ? "active" : ""}
                      >
                        <Link href={"/account/chats"} className="block">
                          Messages
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="body flex-1">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
