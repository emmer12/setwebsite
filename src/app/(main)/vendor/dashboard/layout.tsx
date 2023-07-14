"use client";

import SideBar from "@/components/dashboard/SideBar";
import { getSubscriptions } from "@/lib/api/subscriptions.api";
import { getVendorById } from "@/lib/prisma/vendors";
import constants from "@/lib/utils/constants";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathName = usePathname();

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
      <div className="h-7 sm:h-32 flex items-center bg-[#ffe3cd]">
        <div className="container">
          <h2 className="text-[#263f61] text-2xl sm:text-3xl text-center">
            Welcome back!! ({session?.user?.name})
          </h2>
        </div>
      </div>

      <div className="bg-white">
        <div className="container">
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
                  {vendorQuoteSub.length > 0 && (
                    <li
                      className={
                        pathName == "/vendor/dashboard/quotes" ? "active" : ""
                      }
                    >
                      <Link href={"/vendor/dashboard/quotes"} className="block">
                        Design Quotes
                      </Link>
                    </li>
                  )}
                  <li>Messages</li>
                  <li>Guide</li>
                  {vendorQuoteSub.length == 0 && (
                    <li>Upgrade to vendor plus</li>
                  )}
                </ul>
              </div>
              <div className="body flex-1">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
