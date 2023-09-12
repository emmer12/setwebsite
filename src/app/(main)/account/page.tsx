import Button from "@/components/Button";
import { getServerSession } from "next-auth/next";
import NextAuth from "@/pages/api/auth/[...nextauth]";
import TopUpClient from "@/components/TopUpClient";

const DesignPage = async (): Promise<any> => {
  const session: any = await getServerSession(NextAuth);

  return (
    <div>
      <div className="bg-white">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className=" bg-gray-50 p-4 rounded-[18px] rounded-br-[8px] relative">
              <div className="absolute top-4 right-4 cursor-pointer">Edit</div>
              <h1 className="text-xl font-bold">My Profile</h1>

              <div className="py-4 w-[300px] max-w-full">
                <div className="flex items-center justify-between my-5 pointer">
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
            <div className="grid grid-cols-1 gap-3">
              <TopUpClient />
              <div className="p-4 rounded-[18px] rounded-br-[8px] bg-blue-200">
                <h1 className="text-xl font-bold">My Requests</h1>

                <div>You have no request</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
