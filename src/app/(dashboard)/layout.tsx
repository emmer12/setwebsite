"use client";
import SideBar from "@/components/dashboard/SideBar";
import Header from "@/components/dashboard/Header";
import "@/styles/app.scss";
import "@/styles/globals.css";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import "swiper/css/bundle";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/hooks/useCartProvider";
// const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}
