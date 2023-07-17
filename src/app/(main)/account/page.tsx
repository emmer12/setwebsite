"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DesignPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="bg-white">
        <div className="container">
          <h1 className="text-3xl">Profile</h1>
          <div className="py-4 w-[300px] max-w-full">
            <div className="flex items-center justify-between my-5">
              <strong>Email</strong>
              <span>{session?.user?.email}</span>
            </div>

            <div className="flex items-center justify-between  my-5">
              <strong>Name</strong>
              <span>{session?.user?.name}</span>
            </div>

            <div className="flex items-center justify-between  my-5">
              <strong>Password</strong>
              <span className="text-4xl">........</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
