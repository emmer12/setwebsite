"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DesignCard from "@/components/designs/DesignCard";
import { useRouter } from "next/navigation";

const DesignPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div>
      <div className="h-7 sm:h-32 flex items-center bg-[#ffddc1]">
        <div className="container">
          <h2 className="text-[#263f61] text-2xl sm:text-3xl text-black">
            Your Work ({session?.user?.name})
          </h2>
        </div>
      </div>

      <div className="bg-white">
        <div className="container">
          <div className="py-12 ">
            <div className="flex gap-5">
              <div className="member-side hidden sm:block">
                <ul>
                  <li className="active">All (20)</li>
                  <li>In Progress (16)</li>
                  <li>Completed (4)</li>
                  <li>Canceled (4)</li>
                </ul>
              </div>
              <div className="body flex-1">
                <DesignCard />
                <DesignCard />
                <DesignCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
