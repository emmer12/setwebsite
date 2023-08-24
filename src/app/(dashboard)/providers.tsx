"use client";
import Header from "@/components/Header";
import SideBar from "@/components/dashboard/SideBar";
import { SessionProvider } from "next-auth/react";
import { NotificationContainer } from "react-notifications";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <div>
      <SessionProvider>
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
      </SessionProvider>
    </div>
  );
};

export default Provider;
