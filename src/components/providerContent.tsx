"use client";
import SideBar from "@/components/dashboard/SideBar";
import Header from "@/components/dashboard/Header";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { NotificationContainer } from "react-notifications";

type Props = {
  children?: React.ReactNode;
};

export const ContentWrapper = ({ children }: Props) => {
  // const { data: session } = useSession();
  // const router = useRouter();

  // if (session?.user?.role !== "ADMIN") {
  //   router.push("/");

  //   return <></>;
  // }

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
