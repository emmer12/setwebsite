"use client";
import { useState } from "react";
import DesignCard from "@/components/designs/DesignCard";
import RequestCard from "@/components/designs/RequestsCard";
import Button from "@/components/Button";
import Empty from "@/components/Empty";
import { getRequests } from "@/lib/api/user.api";
import useSWR from "swr";
import { Loading } from "@/components/icons";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data, error, isLoading } = useSWR("/api/users/requests", getRequests);

  return (
    <div>
      <div className="header">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-black">My Quotes</h4>
          <Button to="/account/my-requests/create" text="Make a Request" />
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : data?.requests.length < 1 ? (
        <Empty
          actionText="Make Request"
          title="Empty Requires"
          link="/account/my-requests/create"
          msg="You have't make a request"
        />
      ) : (
        data?.requests.map((request: any, i: number) => (
          <RequestCard key={i} request={request} isVendor={false} />
        ))
      )}
    </div>
  );
};

export default Page;
