import Footer from "@/components/Footer";
import "./../styles/app.scss";
import "./../styles/globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
