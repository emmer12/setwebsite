import "@/styles/app.scss";
import "@/styles/globals.css";
import "react-notifications/lib/notifications.css";
import AuthSessionProvider from "./providers";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../../../public/assets/fonts/Beyond Infinity.ttf",
});

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "swiper/css/free-mode";
// import "swiper/css/grid";

import "swiper/css/bundle";
import Head from "next/head";

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
      <Head>
        <link
          rel="preload"
          href="../../../assets/fonts/Adobe Caslon Pro/ACaslonPro-Regular.otf"
          as="font"
          crossOrigin=""
          type="font/otf"
        />
        <link
          rel="preload"
          href="../../../assets/fonts/Beyond Infinity.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <body>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
