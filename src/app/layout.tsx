"use client";
import Footer from "@/components/Footer";
import "./../styles/app.scss";
import "./../styles/globals.css";
import Header from "@/components/Header";
import "swiper/css/grid";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/hooks/useCartProvider";
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
