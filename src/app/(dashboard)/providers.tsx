"use client";
import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/SideBar";
import { SessionProvider, useSession } from "next-auth/react";
import { NotificationContainer } from "react-notifications";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  children?: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <div>
      <SessionProvider>
        <ContentWrapper>{children}</ContentWrapper>
      </SessionProvider>
    </div>
  );
};

const ContentWrapper = ({ children }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user.role !== "ADMIN") {
    router.push("/");
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 false">
      <SideBar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="h-full overflow-y-auto">
          <div className="p-5 container">{children}</div>
        </main>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Provider;
