"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/app.scss";
import "@/styles/globals.css";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "swiper/css/free-mode";
// import "swiper/css/grid";

import "swiper/css/bundle";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/hooks/useCartProvider";
// const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Set Events",
  description: "Set Event Description",
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
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <NotificationContainer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
