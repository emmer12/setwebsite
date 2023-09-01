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
              <div className="body flex-1">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
