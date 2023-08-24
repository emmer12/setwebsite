import "@/styles/app.scss";
import "@/styles/globals.css";
import "react-notifications/lib/notifications.css";
import AuthSessionProvider from "./providers";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "swiper/css/free-mode";
// import "swiper/css/grid";

import "swiper/css/bundle";

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
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
