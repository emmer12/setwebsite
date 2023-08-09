"use client";
import { useState } from "react";
import RequestCard from "@/components/designs/RequestsCard";
import Empty from "@/components/Empty";
import { getRequests } from "@/lib/api/vendor.api";
import useSWR from "swr";
import { Loading } from "@/components/icons";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data, error, isLoading } = useSWR(
    "/api/vendors/quotes/requests",
    getRequests
  );

  return (
    <div>
      <div className="header">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-black">Quote requests</h4>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : data?.requests.length < 1 ? (
        <Empty
          title="Empty Request"
          msg="You currently have no quote requests"
        />
      ) : (
        data?.requests.map((request: any, i: number) => (
          <RequestCard key={i} request={request} isVendor={true} />
        ))
      )}
    </div>
  );
};

export default Page;
