"use client";
import Button from "@/components/Button";
import SafModal from "@/components/modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";
import { getSubscriptions } from "@/lib/api/subscriptions.api";

import constants from "@/lib/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SetAndForget from "@/components/saf/SetAndForget";
import { Loading } from "@/components/icons";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const pathName = usePathname();
  const { data, error, isLoading } = useSWR(
    "/api/subscription",
    getSubscriptions
  );

  const safSub =
    data?.subscriptions.filter(
      (sub: any) => sub.service == constants.subscription_type.SAF_BASIC
    ) || [];
  const safProSub =
    data?.subscriptions.filter(
      (sub: any) => sub.service == constants.subscription_type.SAF_PRO
    ) || [];
  const vendorSub =
    data?.subscriptions.filter(
      (sub: any) => sub.service == constants.subscription_type.VENDOR_BASIC
    ) || [];

  const aiSub =
    data?.subscriptions.filter(
      (sub: any) => sub.service == constants.subscription_type.DEE_AI_BASIC
    ) || [];
  const aiProSub =
    data?.subscriptions.filter(
      (sub: any) => sub.service == constants.subscription_type.DEE_AI_PRO
    ) || [];

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
        <div className="container">
          <div className="py-12 ">
            <div className="flex gap-5">
              <div className="member-side hidden sm:block">
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

                  {/* <li className={pathName == "/account/ai/dee" ? "active" : ""}>
                    <Link className="block" href="/account/ai/dee">
                      Quotations Recived
                    </Link>
                  </li> */}

                  {/* {aiProSub.length == 0 && (
                    <li
                      className={
                        pathName == "/account/quotes/create" ? "active" : ""
                      }
                    >
                      <Link className="block" href="/account/quotes/create">
                        Upload and Quote
                      </Link>
                    </li>
                  )} */}

                  <li>Guide</li>
                </ul>
              </div>
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
