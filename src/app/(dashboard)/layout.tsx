import "@/styles/app.scss";
import "@/styles/globals.css";
import AuthSessionProvider from "@/components/providers";
import "react-notifications/lib/notifications.css";

import "swiper/css/bundle";

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
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
